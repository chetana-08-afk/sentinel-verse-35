import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, Upload, Mic, Camera, FileText, Shield, Zap } from "lucide-react";

interface ComplaintSystemEnhancedProps {
  onComplaintSubmit: (complaint: any) => void;
  complaints: any[];
}

const ComplaintSystemEnhanced = ({ onComplaintSubmit, complaints }: ComplaintSystemEnhancedProps) => {
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "safety",
    evidence: [] as any[]
  });

  const handlePanicAlert = () => {
    const panicComplaint = {
      title: "EMERGENCY - Indirect SOS Triggered",
      description: "Parent has triggered emergency panic alert. Immediate assistance required.",
      priority: "critical",
      category: "emergency",
      type: "panic_proxy"
    };
    onComplaintSubmit(panicComplaint);
  };

  const handleSubmitComplaint = () => {
    if (!newComplaint.title || !newComplaint.description) return;
    onComplaintSubmit(newComplaint);
    setNewComplaint({ title: "", description: "", priority: "medium", category: "safety", evidence: [] });
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card p-6 border-destructive/30 bg-destructive/5">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-orbitron font-bold text-destructive">Emergency Response</h2>
          <Button onClick={handlePanicAlert} size="lg" className="w-full h-16 text-xl font-bold bg-destructive hover:bg-destructive/90 text-white">
            <AlertTriangle className="w-6 h-6 mr-3" />
            RAISE PANIC ALERT - INDIRECT SOS
          </Button>
        </div>
      </Card>

      <Card className="cyber-card p-6">
        <h3 className="text-xl font-orbitron font-bold mb-6">Submit Safety Complaint</h3>
        <div className="space-y-4">
          <Input placeholder="Complaint Title" value={newComplaint.title} onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))} />
          <Textarea placeholder="Detailed Description" value={newComplaint.description} onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))} rows={4} />
          <Button onClick={handleSubmitComplaint} className="w-full" disabled={!newComplaint.title || !newComplaint.description}>
            <Shield className="w-4 h-4 mr-2" />
            Submit Complaint to Authorities
          </Button>
        </div>
      </Card>

      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">Complaint History ({complaints.length})</h3>
        {complaints.length === 0 ? (
          <p className="text-center text-muted-foreground">No complaints filed</p>
        ) : (
          <div className="space-y-3">
            {complaints.map((complaint, idx) => (
              <div key={idx} className="p-4 bg-muted/10 rounded-lg border border-primary/10">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{complaint.title}</h4>
                  <Badge variant="outline" className="text-primary border-primary/30">{complaint.priority?.toUpperCase()}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{complaint.description}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ComplaintSystemEnhanced;