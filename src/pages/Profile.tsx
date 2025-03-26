
import { useState, useEffect } from "react";
import AnimatedTransition from "@/components/AnimatedTransition";
import ProfileSection from "@/components/ProfileSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Shield, User } from "lucide-react";
import NotificationSettings from "@/components/profile/NotificationSettings";
import PrivacySettings from "@/components/profile/PrivacySettings";
import AccountSection from "@/components/profile/AccountSection";
import { UserProfile } from "@/types/profile";

// Demo profile data
const demoProfile = {
  name: "Alex Johnson",
  age: "42",
  phone: "555-123-4567",
  emergencyContact: {
    name: "Sarah Johnson",
    phone: "555-987-6543",
    relation: "Spouse",
  },
};

const Profile = () => {
  const [profile, setProfile] = useState(demoProfile);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    // In a real app, load from backend
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      localStorage.setItem("userProfile", JSON.stringify(demoProfile));
    }
  }, []);

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  return (
    <AnimatedTransition className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and application settings
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <User size={16} className="mr-2" /> Personal
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <BellRing size={16} className="mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Shield size={16} className="mr-2" /> Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <ProfileSection profile={profile} onUpdateProfile={handleUpdateProfile} />
          <AccountSection />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <PrivacySettings />
        </TabsContent>
      </Tabs>
    </AnimatedTransition>
  );
};

export default Profile;
