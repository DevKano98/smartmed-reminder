
import { useState } from "react";
import { toast } from "sonner";
import { UserProfile } from "@/types/profile";
import ProfileDisplay from "./profile/ProfileDisplay";
import ProfileEditForm from "./profile/ProfileEditForm";

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
  };

  const handleSave = (updatedProfile: UserProfile) => {
    onUpdateProfile(updatedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleAddEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContact: {
        name: "",
        phone: "",
        relation: "",
      },
    });
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <ProfileEditForm 
        profile={formData}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    );
  }

  return (
    <ProfileDisplay 
      profile={profile}
      onEdit={handleEdit}
      onAddEmergencyContact={handleAddEmergencyContact}
    />
  );
};

export default ProfileSection;
