
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const PrivacySettings = () => {
  return (
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
  );
};

export default PrivacySettings;
