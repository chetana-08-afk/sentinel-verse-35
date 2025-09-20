import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Users, Phone, Video, AlertTriangle, Shield, Zap, UserCheck } from "lucide-react";

const FamilySOS = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [groupCallActive, setGroupCallActive] = useState(false);

  const familyMembers = [
    { id: 1, name: 'John Johnson', role: 'Father', isOnline: true, emergencyContact: true },
    { id: 2, name: 'Lisa Johnson', role: 'Mother', isOnline: false, emergencyContact: true },
    { id: 3, name: 'Mike Rodriguez', role: 'Uncle', isOnline: true, emergencyContact: true }
  ];

  const handleTriggerFamilySOS = () => {
    setEmergencyActive(true);
    setTimeout(() => setEmergencyActive(false), 30000);
  };

  const handleStartGroupCall = () => {
    setGroupCallActive(true);
    setTimeout(() => setGroupCallActive(false), 30000);
  };

  return (
    <div className="space-y-6">
      {emergencyActive && (
        <Card className="cyber-card p-6 border-destructive/30 bg-destructive/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
              <h2 className="text-xl font-orbitron font-bold text-destructive">FAMILY SOS ACTIVE</h2>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Button onClick={handleStartGroupCall} disabled={groupCallActive} className="bg-success hover:bg-success/90">
              <Video className="w-4 h-4 mr-2" />
              {groupCallActive ? 'Call In Progress...' : 'Start Group Video Call'}
            </Button>
            <Button variant="outline" onClick={() => setEmergencyActive(false)} className="border-destructive text-destructive">
              End Emergency
            </Button>
          </div>
        </Card>
      )}

      <Card className="cyber-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-orbitron font-bold">Family Emergency Network</h2>
          </div>
          <Badge variant="outline" className={emergencyActive ? 'text-destructive border-destructive/30 animate-pulse' : 'text-success border-success/30'}>
            {emergencyActive ? 'EMERGENCY ACTIVE' : 'NETWORK READY'}
          </Badge>
        </div>

        <div className="text-center mb-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg" className={`h-16 px-8 text-lg font-bold ${emergencyActive ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-destructive hover:bg-destructive/90 text-white'}`} disabled={emergencyActive}>
                <Zap className="w-6 h-6 mr-3" />
                {emergencyActive ? 'EMERGENCY IN PROGRESS' : 'TRIGGER FAMILY SOS'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="cyber-card">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-destructive font-orbitron">Activate Family Emergency Network</AlertDialogTitle>
                <AlertDialogDescription>This will immediately notify all emergency contacts. Use only in genuine emergencies.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleTriggerFamilySOS} className="bg-destructive hover:bg-destructive/90">Activate Emergency Network</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>

      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">Family Network Members</h3>
        <div className="space-y-4">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
              <div>
                <h4 className="font-semibold">{member.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className={member.isOnline ? 'text-success border-success/30' : 'text-muted-foreground border-muted/30'}>
                    {member.isOnline ? 'ONLINE' : 'OFFLINE'}
                  </Badge>
                  {member.emergencyContact && (
                    <Badge variant="outline" className="text-destructive border-destructive/30">EMERGENCY CONTACT</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FamilySOS;