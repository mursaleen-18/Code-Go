import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, TerminalIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-nav backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="brand-mark size-10 rounded-lg flex items-center justify-center ring-2 ring-secondary/40">
            <TerminalIcon className="size-5 text-secondary" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl text-base-content font-mono">Code Go</span>
            <span className="text-xs text-primary font-semibold -mt-1">Pair. Solve. Ship.</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/problems")
                  ? "bg-neutral text-neutral-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/dashboard")
                  ? "bg-neutral text-neutral-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Dashboard</span>
            </div>
          </Link>

          <ThemeToggle />

          <div className="ml-2 mt-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
