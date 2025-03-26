import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FileEdit, User, User2, Phone, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, itemFadeIn } from "./AnimatedTransition";

interface UserProfile {
  name: string;
  age: string;
  phone: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isAddingEmergencyContact, setIsAddingEmergencyContact] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      const parentObj = formData[parent as keyof UserProfile];
      const updatedParentObj = typeof parentObj === 'object' && parentObj !== null
        ? { ...parentObj, [child]: value }
        : { [child]: value };
        
      setFormData({
        ...formData,
        [parent]: updatedParentObj,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    setIsAddingEmergencyContact(false);
    toast.success("Profile updated successfully");
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContact: {
        name: "",
        phone: "",
        relation: "",
      },
    });
    setIsAddingEmergencyContact(true);
  };

  if (isEditing) {
    return (
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="bg-white rounded-xl shadow-card p-6"
      >
        <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {(isAddingEmergencyContact || formData.emergencyContact) && (
            <div className="mt-6 pt-4 border-t">
              <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-name">Contact Name</Label>
                  <Input
                    id="emergency-name"
                    name="emergencyContact.name"
                    value={formData.emergencyContact?.name || ""}
                    onChange={handleChange}
                    placeholder="Enter contact name"
                    required={isAddingEmergencyContact}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Contact Phone</Label>
                  <Input
                    id="emergency-phone"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact?.phone || ""}
                    onChange={handleChange}
                    placeholder="Enter contact phone"
                    required={isAddingEmergencyContact}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-relation">Relationship</Label>
                  <Input
                    id="emergency-relation"
                    name="emergencyContact.relation"
                    value={formData.emergencyContact?.relation || ""}
                    onChange={handleChange}
                    placeholder="e.g., Spouse, Parent, Child"
                    required={isAddingEmergencyContact}
                  />
                </div>
              </div>
            </div>
          )}

          {!isAddingEmergencyContact && !formData.emergencyContact && (
            <Button 
              type="button" 
              variant="outline" 
              className="mt-2"
              onClick={addEmergencyContact}
            >
              <UserPlus size={16} className="mr-2" />
              Add Emergency Contact
            </Button>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              type="button" 
              className="flex-1"
              onClick={() => {
                setIsEditing(false);
                setFormData(profile);
                setIsAddingEmergencyContact(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">Save Changes</Button>
          </div>
        </form>
      </motion.div>
    );
  }

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
            onClick={() => setIsEditing(true)}
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

        {profile.emergencyContact && (
          <motion.div variants={itemFadeIn} className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Contact Name</p>
                <p className="font-medium">{profile.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{profile.emergencyContact.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Relationship</p>
                <p className="font-medium">{profile.emergencyContact.relation}</p>
              </div>
            </div>
          </motion.div>
        )}

        {!profile.emergencyContact && (
          <motion.div variants={itemFadeIn} className="mt-6 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                addEmergencyContact();
                setIsEditing(true);
              }}
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

export default ProfileSection;

const pageTransition = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
