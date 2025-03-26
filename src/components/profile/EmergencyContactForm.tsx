
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

interface EmergencyContactFormProps {
  emergencyContact: EmergencyContact | undefined;
  onChange: (field: string, value: string) => void;
  onAddEmergencyContact: () => void;
  isAddingEmergencyContact: boolean;
}

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({
  emergencyContact,
  onChange,
  onAddEmergencyContact,
  isAddingEmergencyContact
}) => {
  if (isAddingEmergencyContact || emergencyContact) {
    return (
      <div className="mt-6 pt-4 border-t">
        <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emergency-name">Contact Name</Label>
            <Input
              id="emergency-name"
              value={emergencyContact?.name || ""}
              onChange={(e) => onChange("emergencyContact.name", e.target.value)}
              placeholder="Enter contact name"
              required={isAddingEmergencyContact}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency-phone">Contact Phone</Label>
            <Input
              id="emergency-phone"
              value={emergencyContact?.phone || ""}
              onChange={(e) => onChange("emergencyContact.phone", e.target.value)}
              placeholder="Enter contact phone"
              required={isAddingEmergencyContact}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency-relation">Relationship</Label>
            <Input
              id="emergency-relation"
              value={emergencyContact?.relation || ""}
              onChange={(e) => onChange("emergencyContact.relation", e.target.value)}
              placeholder="e.g., Spouse, Parent, Child"
              required={isAddingEmergencyContact}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button 
      type="button" 
      variant="outline" 
      className="mt-2"
      onClick={onAddEmergencyContact}
    >
      <UserPlus size={16} className="mr-2" />
      Add Emergency Contact
    </Button>
  );
};

export default EmergencyContactForm;
