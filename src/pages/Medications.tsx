
import { useState, useEffect } from "react";
import AnimatedTransition, { staggerContainer, itemFadeIn } from "@/components/AnimatedTransition";
import { Button } from "@/components/ui/button";
import MedicationCard, { Medication } from "@/components/MedicationCard";
import AddMedicationForm from "@/components/AddMedicationForm";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Pill, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

const Medications = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingMedication, setEditingMedication] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const savedMedications = localStorage.getItem("medications");
    
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    } else {
      setMedications(demoMedications);
      localStorage.setItem("medications", JSON.stringify(demoMedications));
    }
  }, []);

  useEffect(() => {
    const results = medications.filter((med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.frequency.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Sort medications by time
    results.sort((a, b) => {
      const [hoursA, minutesA] = a.time.split(":").map(Number);
      const [hoursB, minutesB] = b.time.split(":").map(Number);
      return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
    });
    
    setFilteredMedications(results);
  }, [medications, searchQuery]);

  useEffect(() => {
    localStorage.setItem("medications", JSON.stringify(medications));
  }, [medications]);

  const handleAddMedication = (newMedication: Medication) => {
    setMedications((prev) => [...prev, newMedication]);
  };

  const handleDeleteMedication = (id: string) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
    toast.success("Medication deleted successfully");
  };

  const handleEditMedication = (id: string) => {
    setEditingMedication(id);
  };

  const handleStatusChange = (id: string, status: "taken" | "skipped" | "pending") => {
    setMedications((prevMeds) =>
      prevMeds.map((med) =>
        med.id === id ? { ...med, status } : med
      )
    );
  };

  return (
    <AnimatedTransition className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Medications</h1>
          <p className="text-muted-foreground">
            Manage your medications and schedule
          </p>
        </div>
        <Button onClick={() => setIsAddFormVisible(true)}>
          <Plus size={16} className="mr-2" /> Add Medication
        </Button>
      </div>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search medications..."
          className="pl-10 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchQuery("")}
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {filteredMedications.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4"
        >
          {filteredMedications.map((med) => (
            <div key={med.id} className="relative">
              <MedicationCard
                medication={med}
                onStatusChange={handleStatusChange}
                onEdit={handleEditMedication}
              />
              <motion.div
                variants={itemFadeIn}
                className="absolute bottom-4 right-4"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteMedication(med.id)}
                >
                  Delete
                </Button>
              </motion.div>
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-muted/30 rounded-xl border border-border">
          <div className="w-16 h-16 rounded-full bg-health-100 flex items-center justify-center mb-4">
            <Pill size={24} className="text-health-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">No medications found</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {searchQuery
              ? "No medications match your search. Try with different keywords."
              : "You haven't added any medications yet. Start by adding your first medication."}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAddFormVisible(true)}>
              <Plus size={16} className="mr-2" /> Add Medication
            </Button>
          )}
        </div>
      )}

      {/* Add Medication Dialog */}
      <Dialog open={isAddFormVisible} onOpenChange={setIsAddFormVisible}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
          <AddMedicationForm
            onClose={() => setIsAddFormVisible(false)}
            onAddMedication={handleAddMedication}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Medication Dialog - In a real app, this would be a separate component */}
      <Dialog
        open={!!editingMedication}
        onOpenChange={(open) => !open && setEditingMedication(null)}
      >
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
          <AnimatePresence>
            {editingMedication && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="glassmorphism rounded-xl max-w-md w-full mx-auto p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Edit Medication</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingMedication(null)}
                  >
                    <X size={18} />
                  </Button>
                </div>

                <p className="text-center py-12 text-muted-foreground">
                  The medication editing form would go here in a complete app.
                  <br />
                  <br />
                  For this demo, we've focused on the core functionality.
                </p>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="flex-1"
                    onClick={() => setEditingMedication(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={() => {
                      toast.success("Medication updated successfully");
                      setEditingMedication(null);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </AnimatedTransition>
  );
};

export default Medications;
