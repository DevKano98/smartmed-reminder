
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bookmark, LogOut } from "lucide-react";

const AccountSection = () => {
  return (
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
  );
};

export default AccountSection;
