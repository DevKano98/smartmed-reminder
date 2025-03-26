
import { useState, useEffect } from "react";
import AnimatedTransition from "@/components/AnimatedTransition";
import ProfileSection from "@/components/ProfileSection";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Bookmark, LogOut, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

  const handleUpdateProfile = (updatedProfile: any) => {
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
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Account</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium">Medical Records</h3>
                  <p className="text-sm text-muted-foreground">View and manage your medical records</p>
                </div>
                <Button className="hover:bg-primary/90">
                  <Bookmark size={16} className="mr-2" /> Records
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50 hover:border-red-200 w-full">
                  <LogOut size={16} className="mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Reminder Methods</h3>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get medication reminders by email</p>
                  </div>
                  <Switch id="email-notifications" />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive text message reminders</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Reminder Timing</h3>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="advance-notifications">Advance Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified 15 minutes before scheduled time</p>
                  </div>
                  <Switch id="advance-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="repeat-notifications">Repeat Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send follow-up reminders if not taken</p>
                  </div>
                  <Switch id="repeat-notifications" defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Data Sharing</h3>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="caregiver-sharing">Caregiver Access</Label>
                    <p className="text-sm text-muted-foreground">Allow your emergency contacts to view your medication schedule</p>
                  </div>
                  <Switch id="caregiver-sharing" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="doctor-sharing">Healthcare Provider Access</Label>
                    <p className="text-sm text-muted-foreground">Share medication compliance with your doctor</p>
                  </div>
                  <Switch id="doctor-sharing" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Analytics</h3>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="usage-analytics">App Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve the app by sharing anonymous usage data</p>
                  </div>
                  <Switch id="usage-analytics" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </AnimatedTransition>
  );
};

export default Profile;
