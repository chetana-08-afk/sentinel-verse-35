import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Users, Shield, Eye, Share2, Trash2, MapPin, Heart, Bell, Phone } from "lucide-react";

interface ConsentManagerProps {
  guardians: any[];
  onAddGuardian: (guardian: any) => void;
  onRemoveGuardian: (id: string) => void;
  onUpdatePermissions: (id: string, permissions: any) => void;
  onGenerateShareLink: (id: string) => string;
  onRevokeAccess: (id: string) => void;
}

const ConsentManager = ({ guardians, onAddGuardian, onRemoveGuardian, onUpdatePermissions, onGenerateShareLink }: ConsentManagerProps) => {
  const [isAddingGuardian, setIsAddingGuardian] = useState(false);
  const [newGuardian, setNewGuardian] = useState({ name: "", email: "", relationship: "", accessLevel: "limited" });

  const handleAddGuardian = () => {
    if (!newGuardian.name || !newGuardian.email) return;
    onAddGuardian({ ...newGuardian, permissions: { viewLocation: true, viewHealth: false, receiveAlerts: true, callChild: false } });
    setNewGuardian({ name: "", email: "", relationship: "", accessLevel: "limited" });
    setIsAddingGuardian(false);
  };

  const handleUpdatePermission = (guardianId: string, permission: string, value: boolean) => {
    const guardian = guardians.find(g => g.id === guardianId);
    if (!guardian) return;
    const updatedPermissions = { ...guardian.permissions, [permission]: value };
    onUpdatePermissions(guardianId, updatedPermissions);
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-orbitron font-bold">Consent & Access Management</h2>
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">{guardians.length} GUARDIANS</Badge>
        </div>

        <Dialog open={isAddingGuardian} onOpenChange={setIsAddingGuardian}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Guardian
            </Button>
          </DialogTrigger>
          <DialogContent className="cyber-card">
            <DialogHeader>
              <DialogTitle className="font-orbitron">Add New Guardian</DialogTitle>
              <DialogDescription>Grant trusted family members access to safety information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Guardian's full name" value={newGuardian.name} onChange={(e) => setNewGuardian(prev => ({ ...prev, name: e.target.value }))} />
              <Input type="email" placeholder="guardian@example.com" value={newGuardian.email} onChange={(e) => setNewGuardian(prev => ({ ...prev, email: e.target.value }))} />
              <Input placeholder="e.g., Uncle, Aunt, Family Friend" value={newGuardian.relationship} onChange={(e) => setNewGuardian(prev => ({ ...prev, relationship: e.target.value }))} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingGuardian(false)}>Cancel</Button>
              <Button onClick={handleAddGuardian}>Add Guardian</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      {guardians.length === 0 ? (
        <Card className="cyber-card p-8 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Guardians Added</h3>
          <Button onClick={() => setIsAddingGuardian(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add First Guardian
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {guardians.map((guardian) => (
            <Card key={guardian.id} className="cyber-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{guardian.name}</h3>
                  <p className="text-sm text-muted-foreground">{guardian.email}</p>
                  <Badge variant="outline">{guardian.relationship}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onGenerateShareLink(guardian.id)}>
                    <Share2 className="w-4 h-4 mr-1" />
                    Share Access
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onRemoveGuardian(guardian.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(guardian.permissions).map(([permission, enabled]) => {
                  const icons = { viewLocation: MapPin, viewHealth: Heart, receiveAlerts: Bell, callChild: Phone };
                  const labels = { viewLocation: 'View Location', viewHealth: 'View Health Data', receiveAlerts: 'Receive Alerts', callChild: 'Call Child' };
                  const IconComponent = icons[permission as keyof typeof icons];
                  
                  return (
                    <div key={permission} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`w-4 h-4 ${enabled ? 'text-success' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">{labels[permission as keyof typeof labels]}</span>
                      </div>
                      <Switch checked={enabled as boolean} onCheckedChange={(value) => handleUpdatePermission(guardian.id, permission, value)} />
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsentManager;