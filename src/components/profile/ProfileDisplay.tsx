
import { motion } from "framer-motion";
import { staggerContainer, itemFadeIn } from "../AnimatedTransition";
import { UserProfile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { FileEdit, User, User2, Phone, UserPlus } from "lucide-react";
import EmergencyContactDisplay from "./EmergencyContactDisplay";

interface ProfileDisplayProps {
  profile: UserProfile;
  onEdit: () => void;
  onAddEmergencyContact: () => void;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ 
  profile, 
  onEdit,
  onAddEmergencyContact
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="bg-white rounded-xl shadow-card overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onEdit}
            className="rounded-full hover:bg-secondary"
          >
            <FileEdit size={18} />
          </Button>
        </div>

        <motion.div variants={itemFadeIn} className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-health-100 flex-shrink-0 flex items-center justify-center text-health-700">
              <User2 size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-health-100 flex-shrink-0 flex items-center justify-center text-health-700">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">{profile.age}</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-health-100 flex-shrink-0 flex items-center justify-center text-health-700">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{profile.phone}</p>
            </div>
          </div>
        </motion.div>

        {profile.emergencyContact ? (
          <EmergencyContactDisplay emergencyContact={profile.emergencyContact} />
        ) : (
          <motion.div variants={itemFadeIn} className="mt-6 pt-4">
            <Button 
              variant="outline" 
              onClick={onAddEmergencyContact}
            >
              <UserPlus size={16} className="mr-2" />
              Add Emergency Contact
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileDisplay;
