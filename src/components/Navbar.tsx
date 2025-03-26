
import { Bell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Dashboard" },
  { path: "/medications", label: "Medications" },
  { path: "/profile", label: "Profile" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all-300 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold text-primary text-xl flex items-center gap-2"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse-slow"></div>
          </div>
          <span>MedRemind</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all-200 ${
                location.pathname === path
                  ? "bg-primary text-white"
                  : "hover:bg-secondary"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-secondary"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md py-4 px-4"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all-200 ${
                    location.pathname === path
                      ? "bg-primary text-white"
                      : "hover:bg-secondary"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
