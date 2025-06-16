import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserRound } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-base-100 shadow flex items-center justify-between px-6 py-4 z-50 relative">
      <div
        className="text-2xl font-bold text-primary cursor-pointer"
        onClick={() => navigate("/")}
      >
        SupportAgent
      </div>
      {/* Mobile menu button */}
      <button
        className="md:hidden btn btn-ghost btn-circle ml-auto"
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        <button
          className="btn btn-ghost text-base"
          onClick={() => navigate("/create-ticket")}
        >
          Create Ticket
        </button>
        <div
          className="relative"
          //   tabIndex={0}
          onMouseEnter={() => setProfileOpen(true)}
          onFocus={() => setProfileOpen(true)}
          onBlur={(e) => {
            // Only close if focus moves outside the dropdown
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setProfileOpen(false);
            }
          }}
        >
          <button
            className="btn btn-circle btn-ghost flex items-center justify-center"
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <UserRound />
          </button>
          {profileOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-lg py-2 z-50 border border-base-200"
              tabIndex={-1}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                className="block w-full text-left px-4 py-2 hover:bg-base-200 text-base cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-base-200 text-base cursor-pointer"
                onClick={() => navigate("/my-tickets")}
              >
                My Tickets
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-error/20 text-error text-base cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-64 h-full bg-base-100 shadow-lg flex flex-col p-6 gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end btn btn-ghost btn-circle mb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              className="btn btn-ghost text-base text-left"
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
            >
              Home
            </button>
            <button
              className="btn btn-ghost text-base text-left"
              onClick={() => {
                navigate("/create-ticket");
                setMobileMenuOpen(false);
              }}
            >
              Create Ticket
            </button>
            <div className="border-t border-base-200 my-2"></div>
            <button
              className="btn btn-ghost text-base text-left"
              onClick={() => {
                navigate("/profile");
                setMobileMenuOpen(false);
              }}
            >
              Profile
            </button>
            <button
              className="btn btn-ghost text-base text-left"
              onClick={() => {
                navigate("/my-tickets");
                setMobileMenuOpen(false);
              }}
            >
              My Tickets
            </button>
            <button
              className="btn btn-ghost text-base text-left text-error"
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
