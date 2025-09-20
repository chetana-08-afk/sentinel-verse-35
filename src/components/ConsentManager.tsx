import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Share2, 
  Shield,
  Clock,
  Link,
  UserPlus,
  Settings
} from 'lucide-react';

interface Guardian {
  id: string;
  name: string;
  email: string;
  relationship: string;
  permissions: {
    viewLocation: boolean;
    viewHealth: boolean;
    receiveAlerts: boolean;
    callChild: boolean;
  };
  accessLevel: 'view-only' | 'moderate' | 'full';
  sharedLink?: string;
  addedDate: Date;
  lastAccess?: Date;
}

interface ConsentManagerProps {
  guardians: Guardian[];
  onAddGuardian: (guardian: Omit<Guardian, 'id' | 'addedDate'>) => void;
  onRemoveGuardian: (id: string) => void;
  onUpdatePermissions: (id: string, permissions: Guardian['permissions']) => void;
  onGenerateShareLink: (id: string) => string;
  onRevokeAccess: (id: string) => void;
}

const ConsentManager: React.FC<ConsentManagerProps> = ({
  guardians,
  onAddGuardian,
  onRemoveGuardian,
  onUpdatePermissions,
  onGenerateShareLink,
  onRevokeAccess
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    email: '',
    relationship: '',
    permissions: {
      viewLocation: true,
      viewHealth: false,
      receiveAlerts: true,
      callChild: false
    },
    accessLevel: 'view-only' as Guardian['accessLevel'],
    sharedLink: undefined
  });

  const relationships = [
    'Mother', 'Father', 'Grandmother', 'Grandfather',
    'Aunt', 'Uncle', 'Sibling', 'Family Friend', 'Guardian', 'Other'
  ];

  const accessLevels = [
    { value: 'view-only', label: 'View Only', description: 'Can only view information' },
    { value: 'moderate', label: 'Moderate', description: 'Can view and receive alerts' },
    { value: 'full', label: 'Full Access', description: 'All permissions including emergency actions' }
  ];

  const handleAddGuardian = () => {
    if (!newGuardian.name || !newGuardian.email || !newGuardian.relationship) return;

    onAddGuardian({
      ...newGuardian,
      lastAccess: undefined
    });

    // Reset form
    setNewGuardian({
      name: '',
      email: '',
      relationship: '',
      permissions: {
        viewLocation: true,
        viewHealth: false,
        receiveAlerts: true,
        callChild: false
      },
      accessLevel: 'view-only',
      sharedLink: undefined
    });
    setShowAddForm(false);
  };

  const updatePermission = (guardianId: string, permission: keyof Guardian['permissions'], value: boolean) => {
    const guardian = guardians.find(g => g.id === guardianId);
    if (!guardian) return;

    const updatedPermissions = {
      ...guardian.permissions,
      [permission]: value
    };

    onUpdatePermissions(guardianId, updatedPermissions);
  };

  const generateShareLink = (guardianId: string) => {
    const link = onGenerateShareLink(guardianId);
    navigator.clipboard.writeText(link);
  };

  const getAccessLevelColor = (level: Guardian['accessLevel']) => {
    switch (level) {
      case 'view-only': return 'text-success border-success/30';
      case 'moderate': return 'text-warning border-warning/30';
      case 'full': return 'text-destructive border-destructive/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Consent Overview */}
      <Card className="cyber-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-orbitron font-bold">Consent & Access Management</h3>
          <Badge variant="outline" className="text-primary border-primary/30">
            <Shield className="w-3 h-3 mr-1" />
            {guardians.length} GUARDIANS
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <div className="text-2xl font-orbitron font-bold text-primary mb-1">
              {guardians.length}
            </div>
            <div className="text-xs text-muted-foreground">Total Guardians</div>
          </div>

          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <div className="text-2xl font-orbitron font-bold text-warning mb-1">
              {guardians.filter(g => g.accessLevel === 'full').length}
            </div>
            <div className="text-xs text-muted-foreground">Full Access</div>
          </div>

          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <div className="text-2xl font-orbitron font-bold text-success mb-1">
              {guardians.filter(g => g.lastAccess && 
                (Date.now() - g.lastAccess.getTime()) < 24 * 60 * 60 * 1000).length}
            </div>
            <div className="text-xs text-muted-foreground">Active Today</div>
          </div>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full glow-button"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Guardian
        </Button>
      </Card>

      {/* Add Guardian Form */}
      {showAddForm && (
        <Card className="cyber-card p-6 border-primary/30">
          <h3 className="text-lg font-orbitron font-bold mb-4">Add New Guardian</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  value={newGuardian.name}
                  onChange={(e) => setNewGuardian({ ...newGuardian, name: e.target.value })}
                  placeholder="Enter guardian's name"
                  className="cyber-card"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  value={newGuardian.email}
                  onChange={(e) => setNewGuardian({ ...newGuardian, email: e.target.value })}
                  placeholder="guardian@example.com"
                  className="cyber-card"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Relationship</label>
                <Select 
                  value={newGuardian.relationship}
                  onValueChange={(value) => setNewGuardian({ ...newGuardian, relationship: value })}
                >
                  <SelectTrigger className="cyber-card">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map((rel) => (
                      <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Access Level</label>
                <Select 
                  value={newGuardian.accessLevel}
                  onValueChange={(value: Guardian['accessLevel']) => 
                    setNewGuardian({ ...newGuardian, accessLevel: value })
                  }
                >
                  <SelectTrigger className="cyber-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accessLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div>{level.label}</div>
                          <div className="text-xs text-muted-foreground">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Permissions</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">View Location</span>
                  <Switch
                    checked={newGuardian.permissions.viewLocation}
                    onCheckedChange={(checked) => 
                      setNewGuardian({
                        ...newGuardian,
                        permissions: { ...newGuardian.permissions, viewLocation: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">View Health Data</span>
                  <Switch
                    checked={newGuardian.permissions.viewHealth}
                    onCheckedChange={(checked) => 
                      setNewGuardian({
                        ...newGuardian,
                        permissions: { ...newGuardian.permissions, viewHealth: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Receive Alerts</span>
                  <Switch
                    checked={newGuardian.permissions.receiveAlerts}
                    onCheckedChange={(checked) => 
                      setNewGuardian({
                        ...newGuardian,
                        permissions: { ...newGuardian.permissions, receiveAlerts: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Call Child</span>
                  <Switch
                    checked={newGuardian.permissions.callChild}
                    onCheckedChange={(checked) => 
                      setNewGuardian({
                        ...newGuardian,
                        permissions: { ...newGuardian.permissions, callChild: checked }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddGuardian} className="flex-1 glow-button">
                <Plus className="w-4 h-4 mr-2" />
                Add Guardian
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Guardians List */}
      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">Current Guardians</h3>
        
        <div className="space-y-4">
          {guardians.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No guardians added yet. Add a guardian above to start sharing access.
            </div>
          ) : (
            guardians.map((guardian) => (
              <div key={guardian.id} className="p-4 bg-muted/10 rounded-lg border border-primary/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{guardian.name}</h4>
                      <Badge variant="outline" className={getAccessLevelColor(guardian.accessLevel)}>
                        {guardian.accessLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {guardian.email} • {guardian.relationship}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Added: {guardian.addedDate.toLocaleDateString()}
                      {guardian.lastAccess && (
                        <> • Last access: {guardian.lastAccess.toLocaleString()}</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateShareLink(guardian.id)}
                    >
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRevokeAccess(guardian.id)}
                      className="text-warning border-warning/30"
                    >
                      <EyeOff className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveGuardian(guardian.id)}
                      className="text-destructive border-destructive/30"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Location</span>
                    <Switch
                      checked={guardian.permissions.viewLocation}
                      onCheckedChange={(checked) => 
                        updatePermission(guardian.id, 'viewLocation', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Health</span>
                    <Switch
                      checked={guardian.permissions.viewHealth}
                      onCheckedChange={(checked) => 
                        updatePermission(guardian.id, 'viewHealth', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Alerts</span>
                    <Switch
                      checked={guardian.permissions.receiveAlerts}
                      onCheckedChange={(checked) => 
                        updatePermission(guardian.id, 'receiveAlerts', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Call</span>
                    <Switch
                      checked={guardian.permissions.callChild}
                      onCheckedChange={(checked) => 
                        updatePermission(guardian.id, 'callChild', checked)
                      }
                    />
                  </div>
                </div>

                {guardian.sharedLink && (
                  <div className="mt-3 p-2 bg-primary/10 rounded border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Link className="w-3 h-3 text-primary" />
                        <span className="text-xs font-mono">{guardian.sharedLink}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(guardian.sharedLink!)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default ConsentManager;