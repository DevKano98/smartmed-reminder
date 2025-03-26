
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const NotificationSettings = () => {
  return (
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
  );
};

export default NotificationSettings;
