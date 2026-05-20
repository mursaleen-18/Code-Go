import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

const withTimeout = (promise, message, timeoutMs = 15000) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), timeoutMs);
    }),
  ]);

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;

    const initCall = async () => {
      setStreamClient(null);
      setCall(null);
      setChatClient(null);
      setChannel(null);

      if (loadingSession || !session?.callId) {
        setIsInitializingCall(true);
        return;
      }

      if (!isHost && !isParticipant) {
        setIsInitializingCall(false);
        return;
      }

      if (session.status === "completed") {
        setIsInitializingCall(false);
        return;
      }

      try {
        setIsInitializingCall(true);
        const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        setStreamClient(client);

        videoCall = client.call("default", session.callId);
        await withTimeout(videoCall.join(), "Timed out while joining the video call");
        setCall(videoCall);
        setIsInitializingCall(false);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        await withTimeout(
          chatClientInstance.connectUser(
            {
              id: userId,
              name: userName,
              image: userImage,
            },
            token
          ),
          "Timed out while connecting to session chat"
        );
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel("messaging", session.callId);
        await withTimeout(chatChannel.watch(), "Timed out while loading session chat");
        setChannel(chatChannel);
      } catch (error) {
        setIsInitializingCall(false);
        toast.error(error.message || "Failed to join video call");
        console.error("Error init call", error);
      }
    };

    initCall();

    // cleanup - performance reasons
    return () => {
      // iife
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
