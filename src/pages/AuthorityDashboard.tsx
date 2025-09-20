import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  AlertTriangle, 
  Users, 
  Shield, 
  Phone, 
  Eye, 
  Search,
  Home,
  Activity,
  FileText,
  Radio,
  Clock,
  Zap
} from "lucide-react";

const AuthorityDashboard = () => {
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: "A001",
      type: "SOS",
      severity: "critical",
      tourist: "Maria Rodriguez",
      location: "Times Square, NYC",
      time: "2 min ago",
      description: "Emergency SOS activated - possible assault",
      responderAssigned: false
    },
    {
      id: "A002", 
      type: "Medical",
      severity: "high",
      tourist: "James Chen",
      location: "Central Park",
      time: "8 min ago",
      description: "Fall detected - heart rate elevated",
      responderAssigned: true
    },
    {
      id: "A003",
      type: "Security",
      severity: "medium", 
      tourist: "Anonymous",
      location: "Brooklyn Bridge",
      time: "15 min ago",
      description: "Suspicious activity reported by AI system",
      responderAssigned: false
    }
  ]);

  const [mapData] = useState({
    activeTourists: 1247,
    emergencyResponse: 3,
    safeZones: 89,
    threatLevel: "moderate"
  });

  const dispatchTeams = [
    { id: "T001", name: "Alpha Team", status: "available", location: "Manhattan Central", responders: 4 },
    { id: "T002", name: "Bravo Team", status: "responding", location: "Times Square", responders: 3 },
    { id: "T003", name: "Charlie Team", status: "busy", location: "Central Park", responders: 5 },
    { id: "T004", name: "Delta Team", status: "available", location: "Brooklyn", responders: 4 }
  ];

  const blockchainVerifications = [
    { id: "BC001", tourist: "Sarah Johnson", verified: true, timestamp: "10:23 AM", country: "Canada" },
    { id: "BC002", tourist: "Ahmed Hassan", verified: true, timestamp: "10:19 AM", country: "Egypt" },
    { id: "BC003", tourist: "Liu Wei", verified: false, timestamp: "10:15 AM", country: "China" }
  ];

  const handleDispatch = (alertId: string, teamId: string) => {
    setActiveAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, responderAssigned: true }
          : alert
      )
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-destructive border-destructive/50';
      case 'high': return 'text-warning border-warning/50';
      case 'medium': return 'text-accent border-accent/50';
      default: return 'text-primary border-primary/50';
    }
  };

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-success border-success/50';
      case 'responding': return 'text-warning border-warning/50';
      case 'busy': return 'text-destructive border-destructive/50';
      default: return 'text-muted border-muted/50';
    }
  };

  return (
    <div className="min-h-screen p-6 cyber-grid bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-glow">Authority Command Center</h1>
          <p className="text-muted-foreground font-rajdhani">
            Real-time emergency coordination and tourist safety management
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Badge variant="outline" className="animate-pulse-glow border-warning/50 text-warning">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {activeAlerts.length} ACTIVE ALERTS
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Quick Stats */}
        <Card className="cyber-card p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-orbitron font-bold">{mapData.activeTourists}</div>
              <div className="text-sm text-muted-foreground">Active Tourists</div>
            </div>
          </div>
        </Card>

        <Card className="cyber-card p-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-warning" />
            <div>
              <div className="text-2xl font-orbitron font-bold">{mapData.emergencyResponse}</div>
              <div className="text-sm text-muted-foreground">Emergency Responses</div>
            </div>
          </div>
        </Card>

        <Card className="cyber-card p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-success" />
            <div>
              <div className="text-2xl font-orbitron font-bold">{mapData.safeZones}</div>
              <div className="text-sm text-muted-foreground">Safe Zones</div>
            </div>
          </div>
        </Card>

        <Card className="cyber-card p-4">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-accent" />
            <div>
              <div className="text-2xl font-orbitron font-bold text-accent">{mapData.threatLevel}</div>
              <div className="text-sm text-muted-foreground">Threat Level</div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Priority Alerts</TabsTrigger>
          <TabsTrigger value="map">Live Map</TabsTrigger>
          <TabsTrigger value="dispatch">Dispatch Teams</TabsTrigger>
          <TabsTrigger value="verification">Blockchain ID</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="cyber-card p-6">
              <h3 className="text-xl font-orbitron font-bold mb-4">Critical Alerts</h3>
              
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-muted/10 rounded-lg border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    
                    <h4 className="font-semibold mb-1">{alert.tourist}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{alert.location}</p>
                    <p className="text-sm mb-3">{alert.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${alert.responderAssigned ? 'text-success' : 'text-warning'}`}>
                        {alert.responderAssigned ? 'Responder Assigned' : 'Awaiting Assignment'}
                      </span>
                      
                      {!alert.responderAssigned && (
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" onClick={() => handleDispatch(alert.id, 'T001')}>
                            <Radio className="w-4 h-4 mr-1" />
                            Dispatch
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="cyber-card p-6">
              <h3 className="text-xl font-orbitron font-bold mb-4">Evidence Log</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">Audio Recording - A001</div>
                      <div className="text-xs text-muted-foreground">Emergency call transcript</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">GPS Tracking - A002</div>
                      <div className="text-xs text-muted-foreground">Location history and route</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">Health Data - A002</div>
                      <div className="text-xs text-muted-foreground">Vitals and fall detection</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card className="cyber-card p-6">
            <h3 className="text-xl font-orbitron font-bold mb-4">Live Map with Threat Clusters</h3>
            
            <div className="relative w-full h-96 bg-muted/20 rounded-lg border border-primary/20 overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="text-lg text-muted-foreground mb-2">Real-time Threat Detection Map</p>
                  <p className="text-sm text-primary">Heatmap & Cluster Analysis Active</p>
                </div>
              </div>
              
              {/* Simulated threat clusters */}
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-destructive/60 rounded-full animate-pulse" />
              <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-warning/60 rounded-full animate-pulse" />
              <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-success/60 rounded-full" />
              
              {/* Tourist markers */}
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full animate-ping" />
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary rounded-full animate-ping" />
              <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-primary rounded-full animate-ping" />
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="w-4 h-4 bg-destructive rounded-full mx-auto mb-1" />
                <div className="text-xs">High Risk</div>
              </div>
              <div>
                <div className="w-4 h-4 bg-warning rounded-full mx-auto mb-1" />
                <div className="text-xs">Medium Risk</div>
              </div>
              <div>
                <div className="w-4 h-4 bg-success rounded-full mx-auto mb-1" />
                <div className="text-xs">Safe Zone</div>
              </div>
              <div>
                <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-1" />
                <div className="text-xs">Tourist</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="dispatch">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="cyber-card p-6">
              <h3 className="text-xl font-orbitron font-bold mb-4">Response Teams</h3>
              
              <div className="space-y-4">
                {dispatchTeams.map((team) => (
                  <div key={team.id} className="p-4 bg-muted/10 rounded-lg border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{team.name}</h4>
                      <Badge variant="outline" className={getTeamStatusColor(team.status)}>
                        {team.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      Location: {team.location}
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Responders: {team.responders}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" disabled={team.status !== 'available'}>
                        <Radio className="w-4 h-4 mr-1" />
                        Deploy
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="cyber-card p-6">
              <h3 className="text-xl font-orbitron font-bold mb-4">Emergency Resources</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Ambulances Available</span>
                    <span className="text-xl font-bold text-success">7</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Response time: 4-8 minutes</div>
                </div>
                
                <div className="p-4 bg-muted/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Police Units Ready</span>
                    <span className="text-xl font-bold text-primary">12</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Response time: 2-5 minutes</div>
                </div>
                
                <div className="p-4 bg-muted/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Fire Department</span>
                    <span className="text-xl font-bold text-warning">3</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Response time: 5-10 minutes</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification">
          <Card className="cyber-card p-6">
            <h3 className="text-xl font-orbitron font-bold mb-4">Blockchain Identity Verification</h3>
            
            <div className="space-y-4">
              {blockchainVerifications.map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-primary/10">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      verification.verified ? 'bg-success' : 'bg-destructive'
                    } animate-pulse`} />
                    
                    <div>
                      <div className="font-semibold">{verification.tourist}</div>
                      <div className="text-sm text-muted-foreground">
                        {verification.country} • {verification.timestamp}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={verification.verified ? 'text-success border-success/50' : 'text-destructive border-destructive/50'}
                    >
                      {verification.verified ? 'VERIFIED' : 'PENDING'}
                    </Badge>
                    
                    <Button size="sm" variant="outline">
                      <Search className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthorityDashboard;