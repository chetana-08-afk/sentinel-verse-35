import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapComponent from "@/components/MapComponent";
import ComplaintSystemEnhanced from "@/components/ComplaintSystemEnhanced";
import SilentPing from "@/components/SilentPing";
import HealthReports from "@/components/HealthReports";
import ConsentManager from "@/components/ConsentManager";
import { 
  MapPin, 
  Heart, 
  AlertTriangle, 
  Shield, 
  Users, 
  Clock, 
  Battery,
  Home,
  Phone,
  MessageCircle,
  Eye,
  Bell,
  LogIn,
  FileText,
  Settings,
  Radio,
  TrendingUp,
  Activity,
  UserCheck,
  Award
} from "lucide-react";
import RiskPrediction from "@/components/RiskPrediction";
import FamilySOS from "@/components/FamilySOS";
import TrustBadgeSystem from "@/components/TrustBadgeSystem";

const ParentDashboard = () => {
  const navigate = useNavigate();
  
  // Add error boundary for useAuth
  let authData;
  try {
    authData = useAuth();
  } catch (error) {
    console.error('Auth context error:', error);
    // Fallback behavior
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Setting up parent dashboard...</p>
        </div>
      </div>
    );
  }
  
  const { logout, user } = authData;
  
  // Enhanced child data with more comprehensive tracking
  const [childData, setChildData] = useState({
    name: "Sarah Johnson",
    age: 16,
    location: {
      lat: 40.7580,
      lng: -73.9855,
      timestamp: new Date(),
      accuracy: 10
    },
    safetyScore: 92,
    heartRate: 68,
    batteryLevel: 78,
    lastUpdate: new Date(),
    consentEnabled: true,
    isOnline: true,
    currentActivity: "Walking in Central Park"
  });

  // Geo-safe boundaries
  const [geoBoundaries, setGeoBoundaries] = useState([
    {
      lat: 40.7580,
      lng: -73.9855,
      radius: 500,
      name: "Central Park Safe Zone"
    },
    {
      lat: 40.7505,
      lng: -73.9934,
      radius: 300,
      name: "Times Square Area"
    }
  ]);

  // Sample complaints data
  const [complaints, setComplaints] = useState<any[]>([]);
  
  // Sample guardians data
  const [guardians, setGuardians] = useState<any[]>([
    {
      id: '1',
      name: 'John Johnson',
      email: 'john@example.com',
      relationship: 'Father',
      permissions: {
        viewLocation: true,
        viewHealth: true,
        receiveAlerts: true,
        callChild: true
      },
      accessLevel: 'full' as const,
      addedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lastAccess: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  // Sample health reports
  const [healthReports, setHealthReports] = useState<any[]>([]);
  
  // Last ping response
  const [lastPingResponse, setLastPingResponse] = useState<any>(null);

  const [alerts] = useState([
    { 
      id: 1, 
      type: "info", 
      message: "Sarah entered Central Park - verified safe zone", 
      time: "5 min ago",
      severity: "low"
    },
    { 
      id: 2, 
      type: "warning", 
      message: "Device battery below 80%", 
      time: "20 min ago",
      severity: "medium"
    }
  ]);

  const healthMetrics = [
    { label: "Heart Rate", value: childData.heartRate, unit: "BPM", status: "normal", icon: Heart },
    { label: "Activity Level", value: 65, unit: "%", status: "active", icon: Users },
    { label: "Sleep Quality", value: 89, unit: "%", status: "good", icon: Clock },
  ];

  // Handlers for new features
  const handleComplaintSubmit = (complaint: any) => {
    const newComplaint = {
      ...complaint,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'pending' as const,
      escalationLevel: 0
    };
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const handleSilentPing = async () => {
    // Simulate ping request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = {
      timestamp: new Date(),
      location: {
        lat: childData.location.lat + (Math.random() - 0.5) * 0.001,
        lng: childData.location.lng + (Math.random() - 0.5) * 0.001,
        accuracy: Math.floor(Math.random() * 20) + 5
      },
      healthStats: {
        heartRate: childData.heartRate + Math.floor(Math.random() * 10) - 5,
        steps: Math.floor(Math.random() * 5000) + 8000,
        batteryLevel: childData.batteryLevel - Math.floor(Math.random() * 5)
      },
      recentActivity: [
        "Walking in Central Park",
        "Visited coffee shop",
        "Took photos at fountain"
      ],
      responseTime: Math.floor(Math.random() * 10) + 1
    };
    
    setLastPingResponse(response);
    return response;
  };

  const handleGenerateHealthReport = async (date: Date) => {
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const report = {
      date,
      totalSteps: Math.floor(Math.random() * 5000) + 8000,
      avgHeartRate: Math.floor(Math.random() * 20) + 60,
      maxHeartRate: Math.floor(Math.random() * 30) + 120,
      minHeartRate: Math.floor(Math.random() * 20) + 50,
      areasVisited: ["Central Park", "Times Square", "Brooklyn Bridge", "High Line"],
      alertsTriggered: [],
      safetyScore: Math.floor(Math.random() * 20) + 80,
      distanceTraveled: Math.floor(Math.random() * 10) + 5,
      timeInSafeZones: Math.floor(Math.random() * 8) + 4,
      batteryUsage: Math.floor(Math.random() * 30) + 40
    };
    
    setHealthReports(prev => [report, ...prev]);
    return report;
  };

  const handleBoundaryAlert = (boundary: any, location: any) => {
    // Handle when child goes outside safe boundary
    console.log(`Alert: Child left ${boundary.name}`, location);
  };

  const handleAddGuardian = (guardian: any) => {
    const newGuardian = {
      ...guardian,
      id: Date.now().toString(),
      addedDate: new Date()
    };
    setGuardians(prev => [...prev, newGuardian]);
  };

  const handleRemoveGuardian = (id: string) => {
    setGuardians(prev => prev.filter(g => g.id !== id));
  };

  const handleUpdatePermissions = (id: string, permissions: any) => {
    setGuardians(prev => prev.map(g => 
      g.id === id ? { ...g, permissions } : g
    ));
  };

  const handleGenerateShareLink = (id: string) => {
    const link = `https://parent-portal.stse.com/shared/${id}/${Date.now()}`;
    setGuardians(prev => prev.map(g => 
      g.id === id ? { ...g, sharedLink: link } : g
    ));
    return link;
  };

  const handleRevokeAccess = (id: string) => {
    setGuardians(prev => prev.map(g => 
      g.id === id ? { ...g, sharedLink: undefined } : g
    ));
  };

  const toggleConsent = () => {
    setChildData(prev => ({ ...prev, consentEnabled: !prev.consentEnabled }));
  };

  return (
    <div className="min-h-screen p-6 cyber-grid bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-glow">Parent Dashboard</h1>
          <p className="text-muted-foreground font-rajdhani">
            {user?.digitalId} | Monitoring: {childData.name} | Last Update: {childData.lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>
            <LogIn className="w-4 h-4 mr-2" />
            Logout
          </Button>
          <Badge variant="outline" className={`animate-pulse-glow ${
            childData.consentEnabled ? 'border-success/50 text-success' : 'border-warning/50 text-warning'
          }`}>
            <Eye className="w-4 h-4 mr-1" />
            {childData.consentEnabled ? 'MONITORING ACTIVE' : 'MONITORING PAUSED'}
          </Badge>
        </div>
      </div>

      {/* Tabs for organized features */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="family">Family SOS</TabsTrigger>
          <TabsTrigger value="consent">Consent</TabsTrigger>
          <TabsTrigger value="trust">Trust Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Child Info Card */}
            <div className="xl:col-span-1">
              <Card className="cyber-card p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-orbitron font-bold">{childData.name}</h3>
                  <p className="text-muted-foreground">Age: {childData.age}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Safety Score</span>
                    <span className="text-xl font-bold text-success">{childData.safetyScore}%</span>
                  </div>
                  
                  <Progress value={childData.safetyScore} className="h-2 safety-meter" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Device Battery</span>
                    <div className="flex items-center space-x-2">
                      <Battery className="w-4 h-4 text-warning" />
                      <span className="text-warning font-bold">{childData.batteryLevel}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Live Location Map */}
            <div className="lg:col-span-2 xl:col-span-2">
              <Card className="cyber-card p-6 h-96">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-orbitron font-bold">Live Location Tracking</h2>
                  <Badge variant="outline" className="text-primary border-primary/30">
                    <MapPin className="w-3 h-3 mr-1" />
                    REAL-TIME
                  </Badge>
                </div>
                
                <MapComponent 
                  childLocation={childData.location}
                  geoBoundaries={geoBoundaries}
                  onBoundaryAlert={handleBoundaryAlert}
                />

                <div className="mt-4 flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {childData.name}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </Card>
            </div>

            {/* AI Risk Prediction */}
            <div className="xl:col-span-1">
              <RiskPrediction />
            </div>

            {/* Health Metrics */}
            <div className="lg:col-span-2 xl:col-span-2">
              <Card className="cyber-card p-6">
                <h3 className="text-lg font-orbitron font-bold mb-4">Health & Activity Monitor</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {healthMetrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <metric.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-orbitron font-bold mb-1">{metric.value}</div>
                      <div className="text-xs text-muted-foreground mb-2">{metric.unit}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          metric.status === 'normal' || metric.status === 'good' ? 'text-success border-success/30' :
                          metric.status === 'active' ? 'text-primary border-primary/30' : 'text-warning border-warning/30'
                        }`}
                      >
                        {metric.status.toUpperCase()}
                      </Badge>
                      <div className="text-sm mt-2">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Risk Alerts */}
            <div className="lg:col-span-2 xl:col-span-2">
              <Card className="cyber-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-orbitron font-bold">Risk Alerts & Notifications</h3>
                  <Bell className="w-5 h-5 text-primary animate-pulse" />
                </div>
                
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-4 bg-muted/10 rounded-lg border border-primary/10">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        alert.severity === 'high' ? 'bg-destructive animate-pulse' :
                        alert.severity === 'medium' ? 'bg-warning animate-pulse' : 'bg-success'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold capitalize">{alert.type}</span>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm font-rajdhani text-foreground">{alert.message}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      View All Alerts
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="complaints">
          <ComplaintSystemEnhanced 
            onComplaintSubmit={handleComplaintSubmit}
            complaints={complaints}
          />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <SilentPing 
                onPingRequest={handleSilentPing}
                lastPingResponse={lastPingResponse}
              />
            </div>
            <div>
              <HealthReports 
                onGenerateReport={handleGenerateHealthReport}
                reports={healthReports}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="family">
          <FamilySOS />
        </TabsContent>

        <TabsContent value="consent">
          <ConsentManager 
            guardians={guardians}
            onAddGuardian={handleAddGuardian}
            onRemoveGuardian={handleRemoveGuardian}
            onUpdatePermissions={handleUpdatePermissions}
            onGenerateShareLink={handleGenerateShareLink}
            onRevokeAccess={handleRevokeAccess}
          />
        </TabsContent>

        <TabsContent value="trust">
          <TrustBadgeSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;