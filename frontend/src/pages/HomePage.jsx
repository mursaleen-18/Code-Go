import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  RouteIcon,
  TerminalIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import ThemeToggle from "../components/ThemeToggle";

function HomePage() {
  return (
    <div className="codego-shell min-h-screen">
      {/* NAVBAR */}
      <nav className="glass-nav backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="brand-mark size-10 rounded-lg flex items-center justify-center ring-2 ring-secondary/40">
              <TerminalIcon className="size-5 text-secondary" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl text-base-content font-mono">
                Code Go
              </span>
              <span className="text-xs text-primary font-semibold -mt-1">Pair. Solve. Ship.</span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignInButton mode="modal">
              <button className="group btn btn-neutral gap-2">
                <span>Get Started</span>
                <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="badge badge-secondary badge-lg text-secondary-content border border-neutral/10 shadow-sm">
              <ZapIcon className="size-4" />
              Interview rooms in one click
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-base-content">
              Code faster.
              <br />
              <span className="text-primary">Go live.</span>
            </h1>

            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              A crisp workspace for pair interviews, solo practice, live code execution, and
              focused video sessions without the extra ceremony.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg bg-base-100 border-primary/20">
                <CheckIcon className="size-4 text-success" />
                Video Rooms
              </div>
              <div className="badge badge-lg bg-base-100 border-primary/20">
                <CheckIcon className="size-4 text-success" />
                Monaco Editor
              </div>
              <div className="badge badge-lg bg-base-100 border-primary/20">
                <CheckIcon className="size-4 text-success" />
                Judge0 Runner
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg">
                  Open Workspace
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <Link to="/problems" className="btn btn-outline btn-lg border-neutral/30">
                <RouteIcon className="size-5" />
                Explore Problems
              </Link>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 codego-panel">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="codego-panel dynamic-card bg-neutral text-neutral-content rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="size-3 rounded-full bg-error" />
              <div className="size-3 rounded-full bg-warning" />
              <div className="size-3 rounded-full bg-secondary" />
              <span className="ml-3 text-sm font-mono text-neutral-content/70">code-go/session.js</span>
            </div>
            <div className="grid md:grid-cols-[1fr_0.8fr]">
              <div className="p-6 font-mono text-sm leading-7">
                <p className="text-secondary">function runInterview(candidate) {"{"}</p>
                <p className="pl-4 text-neutral-content/80">const room = createRoom(candidate);</p>
                <p className="pl-4 text-neutral-content/80">room.shareEditor();</p>
                <p className="pl-4 text-accent">room.startVideo();</p>
                <p className="pl-4 text-primary-content">return room.solve("two-sum");</p>
                <p className="text-secondary">{"}"}</p>
              </div>
              <div className="bg-base-100 text-base-content p-5">
                <div className="text-xs uppercase tracking-widest text-primary font-bold mb-4">
                  Live queue
                </div>
                <div className="space-y-3">
                  {["Two Sum", "Reverse String", "Max Subarray"].map((item, index) => (
                    <div key={item} className="flex items-center justify-between rounded-md bg-base-200 p-3">
                      <span className="font-semibold">{item}</span>
                      <span className={`badge ${index === 0 ? "badge-secondary" : "badge-outline"}`}>
                        {index === 0 ? "running" : "ready"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary font-mono">Move</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Focused tools for interviews, practice, and review sessions
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 codego-panel dynamic-card">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-secondary/25 rounded-lg flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during interviews
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 codego-panel dynamic-card">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-secondary/25 rounded-lg flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 codego-panel dynamic-card">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-secondary/25 rounded-lg flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
