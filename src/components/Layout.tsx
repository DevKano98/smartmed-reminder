
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-4 container mx-auto">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>{children}</div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
