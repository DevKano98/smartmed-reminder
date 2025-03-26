
import { Check, Clock, FileEdit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { itemFadeIn } from "./AnimatedTransition";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
  instructions?: string;
  status?: "taken" | "skipped" | "pending";
}

interface MedicationCardProps {
  medication: Medication;
  isUpcoming?: boolean;
  onStatusChange?: (id: string, status: "taken" | "skipped" | "pending") => void;
  onEdit?: (id: string) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  isUpcoming = false,
  onStatusChange,
  onEdit,
}) => {
  const { id, name, dosage, time, frequency, instructions, status = "pending" } = medication;

  const getStatusColor = () => {
    switch (status) {
      case "taken":
        return "bg-green-500";
      case "skipped":
        return "bg-amber-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "taken":
        return <Check size={14} />;
      case "skipped":
        return <X size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <motion.div variants={itemFadeIn}>
      <Card className="overflow-hidden transition-all-200 hover:shadow-card">
        <div className="flex items-center gap-4 p-4">
          <div className="relative flex-shrink-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-health-100 text-health-700`}>
              <div className="font-semibold">{time.split(":")[0]}</div>
            </div>
            <div 
              className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white ${getStatusColor()}`}
            >
              {getStatusIcon()}
            </div>
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-lg truncate">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{dosage}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
              <span>{frequency}</span>
            </div>
            {instructions && (
              <p className="text-sm mt-1 text-muted-foreground line-clamp-1">
                {instructions}
              </p>
            )}
          </div>

          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => onEdit(id)}
            >
              <FileEdit size={18} />
            </Button>
          )}
        </div>

        {isUpcoming && onStatusChange && (
          <div className="border-t px-4 py-3 flex gap-2 bg-muted/30">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white hover:bg-green-50 hover:text-green-600 hover:border-green-200"
              onClick={() => onStatusChange(id, "taken")}
            >
              <Check size={16} className="mr-1" /> Take
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
              onClick={() => onStatusChange(id, "skipped")}
            >
              <X size={16} className="mr-1" /> Skip
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default MedicationCard;
