import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, RocketIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="codego-panel dynamic-card bg-base-100 rounded-lg p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="brand-mark w-12 h-12 rounded-lg flex items-center justify-center ring-2 ring-secondary/50">
                <RocketIcon className="w-6 h-6 text-secondary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-base-content">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-lg text-base-content/60 lg:ml-16">
              Pick a problem, open a room, and keep momentum.
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group btn btn-primary btn-lg"
          >
            <div className="flex items-center gap-3 font-bold text-lg">
              <ZapIcon className="w-6 h-6" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
