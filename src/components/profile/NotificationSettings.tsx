
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Bell, BellRing, Clock, Smartphone, Mail } from "lucide-react";

const NotificationSettings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [advanceEnabled, setAdvanceEnabled] = useState(true);
  const [repeatEnabled, setRepeatEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("15");

  const handleSaveSettings = () => {
    toast.success("Notification settings saved successfully");
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        <div>
          <Button onClick={handleSaveSettings} size="sm">
            Save Settings
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium flex items-center">
            <Bell className="mr-2 text-primary" size={18} />
            Reminder Methods
          </h3>
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5 flex items-center">
              <Smartphone className="mr-2 text-muted-foreground" size={16} />
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
            </div>
            <Switch 
              id="push-notifications" 
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5 flex items-center">
              <Mail className="mr-2 text-muted-foreground" size={16} />
              <div>
                <Label htmlFor="email-notifications">Email Reminders</Label>
                <p className="text-sm text-muted-foreground">Get medication reminders by email</p>
              </div>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailEnabled}
              onCheckedChange={setEmailEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5 flex items-center">
              <Smartphone className="mr-2 text-muted-foreground" size={16} />
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive text message reminders</p>
              </div>
            </div>
            <Switch 
              id="sms-notifications" 
              checked={smsEnabled}
              onCheckedChange={setSmsEnabled}
            />
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium flex items-center">
            <Clock className="mr-2 text-primary" size={18} />
            Reminder Timing
          </h3>
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="advance-notifications">Advance Reminders</Label>
              <p className="text-sm text-muted-foreground">Get notified before scheduled time</p>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={reminderTime}
                onValueChange={setReminderTime}
                disabled={!advanceEnabled}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 min</SelectItem>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
              <Switch 
                id="advance-notifications" 
                checked={advanceEnabled}
                onCheckedChange={setAdvanceEnabled}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="repeat-notifications">Repeat Reminders</Label>
              <p className="text-sm text-muted-foreground">Send follow-up reminders if not taken</p>
            </div>
            <Switch 
              id="repeat-notifications" 
              checked={repeatEnabled}
              onCheckedChange={setRepeatEnabled}
            />
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium flex items-center">
            <BellRing className="mr-2 text-primary" size={18} />
            Test Notifications
          </h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => toast.info("This is a test notification", {
                description: "Your notification settings are working correctly"
              })}
            >
              Send Test Notification
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground text-right mt-6">
        Made by codeblooded
      </div>
    </Card>
  );
};

export default NotificationSettings;
