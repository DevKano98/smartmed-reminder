
import { Bell, Menu, MessageSquare, User, Video, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { path: "/", label: "Dashboard" },
  { path: "/medications", label: "Medications" },
  { path: "/video-call", label: "Video Call" },
  { path: "/ai-chat", label: "AI Chat" },
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
          ? "py-3 bg-background/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold text-primary text-xl flex items-center gap-2"
        >
          <motion.div 
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            whileHover={{ rotate: -5, scale: 1.05 }}
            className="relative w-8 h-8 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse-slow"></div>
          </motion.div>
          <span className="relative">
            MedRemind
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute -bottom-1 left-0 h-0.5 bg-primary/30 rounded-full"
            />
          </span>
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
              {path === "/medications" && (
                <Badge className="ml-2 py-0 h-5" variant="secondary">New</Badge>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-secondary"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-auto">
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Medication Reminder</span>
                    <span className="text-xs text-muted-foreground">It's time to take your Aspirin</span>
                    <span className="text-xs text-muted-foreground">5 mins ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Appointment Scheduled</span>
                    <span className="text-xs text-muted-foreground">Your appointment with Dr. Smith is confirmed</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Refill Needed</span>
                    <span className="text-xs text-muted-foreground">Your prescription will run out in 3 days</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center" asChild>
                <Link to="/profile" className="w-full text-center cursor-pointer text-primary font-medium">
                  View All Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary"
            >
              <User size={18} />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md py-4 px-4 overflow-hidden"
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
                  <div className="flex items-center justify-between">
                    <span>{label}</span>
                    {path === "/medications" && (
                      <Badge className="py-0 h-5" variant="secondary">New</Badge>
                    )}
                  </div>
                </Link>
              ))}
              
              <div className="flex items-center justify-between mt-2 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-secondary"
                >
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
                
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-secondary"
                  >
                    <User size={18} />
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
