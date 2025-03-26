
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { pageTransition } from "./AnimatedTransition";

interface AddMedicationFormProps {
  onClose: () => void;
  onAddMedication: (medication: any) => void;
}

const frequencyOptions = [
  "Once daily",
  "Twice daily",
  "Three times daily",
  "Every other day",
  "Weekly",
  "As needed",
];

const AddMedicationForm: React.FC<AddMedicationFormProps> = ({ 
  onClose,
  onAddMedication 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: "",
    frequency: "Once daily",
    instructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFrequencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, frequency: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.dosage || !formData.time) {
      toast.error("Please fill all required fields");
      return;
    }

    const newMedication = {
      id: crypto.randomUUID(),
      ...formData,
      status: "pending",
    };

    onAddMedication(newMedication);
    toast.success("Medication added successfully");
    onClose();
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
      className="glassmorphism rounded-xl max-w-md w-full mx-auto p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Add Medication</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Medication Name*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter medication name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage*</Label>
          <Input
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="e.g., 10mg, 1 tablet"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time*</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency*</Label>
          <Select
            defaultValue={formData.frequency}
            onValueChange={handleFrequencyChange}
          >
            <SelectTrigger id="frequency" className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {frequencyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">Instructions (Optional)</Label>
          <Textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="e.g., Take with food, avoid alcohol"
            className="resize-none"
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" type="button" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">Add Medication</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddMedicationForm;
