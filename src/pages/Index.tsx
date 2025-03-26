
import { Link } from "react-router-dom";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Bell, Pill, ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import { motion } from "framer-motion";

const staggerItems = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

const Index = () => {
  return (
    <AnimatedTransition className="min-h-screen">
      <div className="max-w-6xl w-full px-4 mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-14 mt-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 bg-primary/10 rounded-xl animate-pulse"></div>
              <div className="absolute inset-2 bg-primary/20 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            MedRemind
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your complete healthcare companion for managing medications, connecting with providers, 
            and accessing health assistance anytime, anywhere.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/medications">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg" variant="outline" className="gap-2">
                Setup Profile
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Features Cards */}
        <motion.div 
          variants={staggerItems}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Card className="p-6 hover:shadow-md transition-all-200 h-full border-l-4 border-l-primary overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Pill className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Medication Management</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Track medications, set reminders, and manage your prescriptions all in one place.
              </p>
              <Link to="/medications" className="inline-flex items-center text-primary font-medium group">
                <span className="group-hover:mr-2 transition-all">View Medications</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="p-6 hover:shadow-md transition-all-200 h-full border-l-4 border-l-primary/80 overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Video className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Video Consultations</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Connect with healthcare providers through secure, high-quality video calls.
              </p>
              <Link to="/video-call" className="inline-flex items-center text-primary font-medium group">
                <span className="group-hover:mr-2 transition-all">Start Video Call</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="p-6 hover:shadow-md transition-all-200 h-full border-l-4 border-l-primary/60 overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-semibold">AI Health Assistant</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Get answers to your health questions with our intelligent AI chat assistant.
              </p>
              <Link to="/ai-chat" className="inline-flex items-center text-primary font-medium group">
                <span className="group-hover:mr-2 transition-all">Chat with AI</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="p-6 hover:shadow-md transition-all-200 h-full border-l-4 border-l-primary/40 overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Bell className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Smart Notifications</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Customize how and when you receive important health reminders and alerts.
              </p>
              <Link to="/profile" className="inline-flex items-center text-primary font-medium group">
                <span className="group-hover:mr-2 transition-all">Manage Notifications</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="p-6 hover:shadow-md transition-all-200 h-full border-l-4 border-l-primary/20 overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <UserRound className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Personalized Profile</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Maintain your health profile and emergency contacts for quick access when needed.
              </p>
              <Link to="/profile" className="inline-flex items-center text-primary font-medium group">
                <span className="group-hover:mr-2 transition-all">View Profile</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="p-6 hover:shadow-md transition-all-200 h-full border-l-4 border-l-primary/10 overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <ShieldCheck className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Privacy Controls</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Manage your privacy settings and control who has access to your health information.
              </p>
              <Link to="/profile" className="inline-flex items-center text-primary font-medium group">
                <span className="group-hover:mr-2 transition-all">Privacy Settings</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Testimonial Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-accent/50 rounded-xl p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Why People Love MedRemind</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 bg-background/80 backdrop-blur-sm">
              <p className="italic text-muted-foreground mb-4">
                "MedRemind has completely transformed how I manage my medications. The reminders are reliable and the app is so easy to use."
              </p>
              <div className="font-medium">Sarah T.</div>
            </Card>
            
            <Card className="p-5 bg-background/80 backdrop-blur-sm">
              <p className="italic text-muted-foreground mb-4">
                "The video consultation feature saved me so much time. I was able to talk to my doctor without leaving my home."
              </p>
              <div className="font-medium">Michael K.</div>
            </Card>
            
            <Card className="p-5 bg-background/80 backdrop-blur-sm">
              <p className="italic text-muted-foreground mb-4">
                "The AI health assistant is incredibly helpful. It answers my questions quickly and accurately."
              </p>
              <div className="font-medium">Lisa R.</div>
            </Card>
          </div>
        </motion.div>
        
        {/* Footer Section */}
        <div className="text-center border-t pt-8 pb-4">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by <span className="font-medium">codeblooded</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} MedRemind. All rights reserved.
          </p>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
