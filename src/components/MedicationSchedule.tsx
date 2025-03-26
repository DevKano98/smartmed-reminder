
import { useState, useEffect } from "react";
import { Medication } from "./MedicationCard";
import MedicationCard from "./MedicationCard";
import { motion } from "framer-motion";
import { staggerContainer } from "./AnimatedTransition";
import { Clock8, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MedicationScheduleProps {
  medications: Medication[];
  onStatusChange: (id: string, status: "taken" | "skipped" | "pending") => void;
}

const MedicationSchedule: React.FC<MedicationScheduleProps> = ({
  medications,
  onStatusChange,
}) => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingMeds, setUpcomingMeds] = useState<Medication[]>([]);
  const [pastMeds, setPastMeds] = useState<Medication[]>([]);

  useEffect(() => {
    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();

    const upcoming: Medication[] = [];
    const past: Medication[] = [];

    medications.forEach((med) => {
      const [hours, minutes] = med.time.split(":").map(Number);
      const medTime = hours * 60 + minutes;

      if (medTime > now) {
        upcoming.push(med);
      } else {
        past.push(med);
        
        // Send notification for missed medications
        if (med.status === "pending") {
          toast({
            title: "Missed Medication",
            description: `You missed taking ${med.name} at ${med.time}`,
            variant: "destructive",
          });
        }
      }
    });

    // Sort by time
    upcoming.sort((a, b) => {
      const [hoursA, minutesA] = a.time.split(":").map(Number);
      const [hoursB, minutesB] = b.time.split(":").map(Number);
      return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
    });

    past.sort((a, b) => {
      const [hoursA, minutesA] = a.time.split(":").map(Number);
      const [hoursB, minutesB] = b.time.split(":").map(Number);
      return (hoursB * 60 + minutesB) - (hoursA * 60 + minutesA);
    });

    setUpcomingMeds(upcoming);
    setPastMeds(past);
  }, [medications, currentTime, toast]);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Clock8 size={20} className="text-health-600" /> Upcoming Medications
        </h2>
        {upcomingMeds.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-4"
          >
            {upcomingMeds.map((med) => (
              <MedicationCard
                key={med.id}
                medication={med}
                isUpcoming={true}
                onStatusChange={onStatusChange}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
            <p className="text-muted-foreground">No upcoming medications for today</p>
          </div>
        )}
      </section>

      {pastMeds.length > 0 && (
        <section>
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-health-600" /> Past Medications
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-4"
          >
            {pastMeds.map((med) => (
              <MedicationCard
                key={med.id}
                medication={med}
                onStatusChange={onStatusChange}
              />
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default MedicationSchedule;
