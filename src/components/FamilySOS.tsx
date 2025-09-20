import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Plus, 
  Phone, 
  Video, 
  AlertTriangle, 
  Shield,
  UserPlus,
  Mail,
  Trash2
} from "lucide-react";

const FamilySOS = () => {
  const { toast } = useToast();
  const [guardians, setGuardians] = useState([
    {
      id: '1',
      name: 'John Johnson',
      email: 'john@example.com',
      relationship: 'Father',
      phone: '+1-555-0101',
      status: 'online',
      lastSeen: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Mary Johnson',
      email: 'mary@example.com',
      relationship: 'Mother',
      phone: '+1-555-0102',
      status: 'online',
      lastSeen: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Robert Smith',
      email: 'robert@example.com',
      relationship: 'Uncle',
      phone: '+1-555-0103',
      status: 'offline',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  const [newGuardian, setNewGuardian] = useState({
    name: '',
    email: '',
    relationship: '',
    phone: ''
  });

  const handleAddGuardian = () => {
    if (!newGuardian.name || !newGuardian.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in name and email",
        variant: "destructive"
      });
      return;
    }

    const guardian = {
      ...newGuardian,
      id: Date.now().toString(),
      status: 'offline' as const,
      lastSeen: new Date()
    };

    setGuardians(prev => [...prev, guardian]);
    setNewGuardian({ name: '', email: '', relationship: '', phone: '' });
    
    toast({
      title: "Guardian Added",
      description: `${guardian.name} has been added to the SOS group`,
    });
  };

  const handleRemoveGuardian = (id: string) => {
    setGuardians(prev => prev.filter(g => g.id !== id));
    toast({
      title: "Guardian Removed",
      description: "Guardian has been removed from the SOS group",
    });
  };

  const handleGroupCall = () => {
    toast({
      title: "Initiating Group Call",
      description: "Calling all available guardians...",
    });
  };

  const handleEmergencyAlert = () => {
    toast({
      title: "🚨 EMERGENCY ALERT SENT",
      description: "All guardians have been notified immediately",
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-success' : 'bg-muted-foreground';
  };

  return (
    <Card className="cyber-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-orbitron font-bold">Family SOS Group</h3>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-success border-success/30">
            <Users className="w-3 h-3 mr-1" />
            {guardians.filter(g => g.status === 'online').length} Online
          </Badge>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button 
          onClick={handleEmergencyAlert}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Emergency Alert
        </Button>
        <Button onClick={handleGroupCall} variant="outline">
          <Video className="w-4 h-4 mr-2" />
          Group Call
        </Button>
      </div>

      {/* Guardians List */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-muted-foreground">GUARDIANS</h4>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Guardian
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Guardian</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Full Name"
                  value={newGuardian.name}
                  onChange={(e) => setNewGuardian(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={newGuardian.email}
                  onChange={(e) => setNewGuardian(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  placeholder="Relationship (e.g., Uncle, Aunt)"
                  value={newGuardian.relationship}
                  onChange={(e) => setNewGuardian(prev => ({ ...prev, relationship: e.target.value }))}
                />
                <Input
                  placeholder="Phone Number"
                  value={newGuardian.phone}
                  onChange={(e) => setNewGuardian(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Button onClick={handleAddGuardian} className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Guardian
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {guardians.map((guardian) => (
          <div key={guardian.id} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg border border-primary/10">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{guardian.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(guardian.status)} border-2 border-background`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{guardian.name}</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveGuardian(guardian.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{guardian.relationship}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={`text-xs ${guardian.status === 'online' ? 'text-success border-success/30' : 'text-muted-foreground border-muted-foreground/30'}`}>
                  {guardian.status.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Last seen: {guardian.lastSeen.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Group Settings */}
      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Group Settings</span>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• All members receive simultaneous alerts</li>
          <li>• Group video calls available 24/7</li>
          <li>• Escalation to authorities if no response</li>
        </ul>
      </div>
    </Card>
  );
};

export default FamilySOS;