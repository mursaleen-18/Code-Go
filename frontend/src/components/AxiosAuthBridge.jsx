import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setAuthTokenGetter } from "../lib/axios";
import App from "../App";

function AxiosAuthBridge() {
  const { getToken } = useAuth();

  useEffect(() => {
    setAuthTokenGetter(getToken);
  }, [getToken]);

  return <App />;
}

export default AxiosAuthBridge;
