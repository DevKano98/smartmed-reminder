
export interface UserProfile {
  name: string;
  age: string;
  phone: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}
