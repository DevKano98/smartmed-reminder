
import { motion } from "framer-motion";
import { itemFadeIn } from "../AnimatedTransition";

interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

interface EmergencyContactDisplayProps {
  emergencyContact: EmergencyContact;
}

const EmergencyContactDisplay: React.FC<EmergencyContactDisplayProps> = ({ emergencyContact }) => {
  return (
    <motion.div variants={itemFadeIn} className="mt-8 pt-6 border-t">
      <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Contact Name</p>
          <p className="font-medium">{emergencyContact.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone Number</p>
          <p className="font-medium">{emergencyContact.phone}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Relationship</p>
          <p className="font-medium">{emergencyContact.relation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyContactDisplay;
