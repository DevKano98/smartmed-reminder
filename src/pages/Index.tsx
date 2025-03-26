
import { Link } from "react-router-dom";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Bell, Pill } from "lucide-react";

const Index = () => {
  return (
    <AnimatedTransition className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to MedRemind</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your complete healthcare companion for managing medications, connecting with providers, and accessing health assistance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 hover:shadow-md transition-all-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Pill className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Medication Management</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Track medications, set reminders, and manage your prescriptions all in one place.
            </p>
            <Link to="/medications">
              <Button className="w-full">View Medications</Button>
            </Link>
          </Card>
          
          <Card className="p-6 hover:shadow-md transition-all-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Video className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Video Consultations</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Connect with healthcare providers through secure, high-quality video calls.
            </p>
            <Link to="/video-call">
              <Button className="w-full">Start Video Call</Button>
            </Link>
          </Card>
          
          <Card className="p-6 hover:shadow-md transition-all-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-semibold">AI Health Assistant</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Get answers to your health questions with our intelligent AI chat assistant.
            </p>
            <Link to="/ai-chat">
              <Button className="w-full">Chat with AI</Button>
            </Link>
          </Card>
          
          <Card className="p-6 hover:shadow-md transition-all-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Bell className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Smart Notifications</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Customize how and when you receive important health reminders and alerts.
            </p>
            <Link to="/profile">
              <Button className="w-full">Manage Notifications</Button>
            </Link>
          </Card>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Made by <span className="font-medium">codeblooded</span>
          </p>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
