
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";
import EmergencyContactForm from "./EmergencyContactForm";

interface ProfileEditFormProps {
  profile: UserProfile;
  onCancel: () => void;
  onSave: (profile: UserProfile) => void;
}

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

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  profile,
  onCancel,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isAddingEmergencyContact, setIsAddingEmergencyContact] = useState(false);

  const handleChange = (name: string, value: string) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <EmergencyContactForm 
          emergencyContact={formData.emergencyContact}
          onChange={handleChange}
          onAddEmergencyContact={addEmergencyContact}
          isAddingEmergencyContact={isAddingEmergencyContact}
        />

        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            type="button" 
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">Save Changes</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileEditForm;
