
import { useState, useEffect } from "react";
import AnimatedTransition, { staggerContainer } from "@/components/AnimatedTransition";
import MedicationSchedule from "@/components/MedicationSchedule";
import { motion } from "framer-motion";
import { Medication } from "@/components/MedicationCard";
import { Activity, Calendar, CalendarCheck, Check, Info, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const demoMedications: Medication[] = [
  {
    id: "1",
    name: "Amoxicillin",
    dosage: "500mg",
    time: "08:00",
    frequency: "Three times daily",
    instructions: "Take with food",
    status: "pending",
  },
  {
    id: "2",
    name: "Ibuprofen",
    dosage: "400mg",
    time: "12:00",
    frequency: "Twice daily",
    instructions: "Take after meal",
    status: "pending",
  },
  {
    id: "3",
    name: "Lisinopril",
    dosage: "10mg",
    time: "20:00",
    frequency: "Once daily",
    status: "pending",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayStats, setTodayStats] = useState({
    total: 0,
    taken: 0,
    skipped: 0,
    pending: 0,
  });

  useEffect(() => {
    // In a real app, this would be loaded from a database
    // For demo, we'll use the mock data
    const savedMedications = localStorage.getItem("medications");
    
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    } else {
      setMedications(demoMedications);
      localStorage.setItem("medications", JSON.stringify(demoMedications));
    }
  }, []);

  useEffect(() => {
    // Calculate stats
    const stats = {
      total: medications.length,
      taken: medications.filter((med) => med.status === "taken").length,
      skipped: medications.filter((med) => med.status === "skipped").length,
      pending: medications.filter((med) => med.status === "pending").length,
    };
    
    setTodayStats(stats);
    
    // Save to localStorage
    localStorage.setItem("medications", JSON.stringify(medications));
  }, [medications]);

  const handleStatusChange = (id: string, status: "taken" | "skipped" | "pending") => {
    setMedications((prevMeds) =>
      prevMeds.map((med) =>
        med.id === id ? { ...med, status } : med
      )
    );

    if (status === "taken") {
      toast.success("Medication marked as taken");
    } else if (status === "skipped") {
      toast.info("Medication marked as skipped");
    }
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const getComplianceRate = () => {
    if (todayStats.total === 0) return 0;
    return Math.round((todayStats.taken / todayStats.total) * 100);
  };

  return (
    <AnimatedTransition className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hello there,</h1>
        <p className="text-muted-foreground">
          {formatDate()}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-6 mb-8"
      >
        <Card className="overflow-hidden">
          <div className="bg-health-50 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Activity size={20} className="text-health-600" /> Today's Progress
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-health-700 hover:text-health-800 hover:bg-health-100 -mr-2"
                onClick={() => navigate("/medications")}
              >
                View All <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-health-100/50 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-100 mb-2 flex items-center justify-center">
                  <Check size={20} className="text-green-600" />
                </div>
                <p className="text-2xl font-semibold">{todayStats.taken}</p>
                <p className="text-sm text-muted-foreground">Taken</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-health-100/50 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 mb-2 flex items-center justify-center">
                  <X size={20} className="text-amber-600" />
                </div>
                <p className="text-2xl font-semibold">{todayStats.skipped}</p>
                <p className="text-sm text-muted-foreground">Skipped</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-health-100/50 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 mb-2 flex items-center justify-center">
                  <Calendar size={20} className="text-blue-600" />
                </div>
                <p className="text-2xl font-semibold">{todayStats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium mb-1">Today's Compliance Rate</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-health-500 h-2.5 rounded-full"
                  style={{ width: `${getComplianceRate()}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {getComplianceRate()}% of medications taken
              </p>
            </div>
            
            <Button
              onClick={() => navigate("/medications")}
              className="min-w-[140px]"
            >
              <CalendarCheck size={16} className="mr-2" />
              Manage Meds
            </Button>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6 flex items-start gap-4 bg-health-50 border-health-100">
          <div className="rounded-full w-10 h-10 flex items-center justify-center bg-health-100 flex-shrink-0">
            <Info size={20} className="text-health-700" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Why adherence matters</h3>
            <p className="text-sm text-muted-foreground">
              Taking your medications as prescribed is crucial for your treatment's success.
              Regular adherence can lead to better health outcomes and fewer complications.
            </p>
          </div>
        </Card>
      </motion.div>

      <MedicationSchedule 
        medications={medications}
        onStatusChange={handleStatusChange}
      />
    </AnimatedTransition>
  );
};

export default Dashboard;
