import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ParentMaps from "@/components/ParentMaps";
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
  LogOut,
  Radio,
  TrendingUp,
  Activity,
  FileText,
  Download,
  Zap,
  Signal,
  UserPlus,
  Trash2,
  Award,
  Star,
  Video
} from "lucide-react";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  // Child data
  const [childData] = useState({
    name: "Sarah Johnson",
    age: 16,
    location: { lat: 40.7580, lng: -73.9855, timestamp: new Date(), accuracy: 10 },
    safetyScore: 92,
    heartRate: 68,
    batteryLevel: 78,
    isOnline: true,
    currentActivity: "Walking in Central Park"
  });

  // Complaints state
  const [complaints, setComplaints] = useState<any[]>([]);
  const [newComplaint, setNewComplaint] = useState({ title: "", description: "" });

  // Silent ping state
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingResponse, setLastPingResponse] = useState<any>(null);

  // Health reports state
  const [healthReports, setHealthReports] = useState<any[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Geo boundaries for maps
  const geoBoundaries = [
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
  ];

  // Guardians state
  const [guardians, setGuardians] = useState([
    {
      id: '1',
      name: 'John Johnson',
      email: 'john@example.com',
      relationship: 'Father',
      isOnline: true
    }
  ]);

  // Trust badges state
  const [trustedServices] = useState([
    { id: 1, name: "Mario's Pizza Palace", type: "restaurant", rating: 4.8, trustScore: 95 },
    { id: 2, name: "SafeRide Taxi Service", type: "taxi", rating: 4.6, trustScore: 89 },
    { id: 3, name: "Grand Central Hotel", type: "hotel", rating: 4.7, trustScore: 92 }
  ]);

  // Handlers
  const handlePanicAlert = () => {
    const panicComplaint = {
      id: Date.now().toString(),
      title: "EMERGENCY - Indirect SOS Triggered",
      description: "Parent has triggered emergency panic alert. Immediate assistance required.",
      priority: "critical",
      timestamp: new Date(),
      status: 'pending'
    };
    setComplaints(prev => [panicComplaint, ...prev]);
  };

  const handleSubmitComplaint = () => {
    if (!newComplaint.title || !newComplaint.description) return;
    const complaint = {
      ...newComplaint,
      id: Date.now().toString(),
      timestamp: new Date(),
      priority: "medium",
      status: 'pending'
    };
    setComplaints(prev => [complaint, ...prev]);
    setNewComplaint({ title: "", description: "" });
  };

  const handleSilentPing = async () => {
    setIsPinging(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = {
      timestamp: new Date(),
      location: { lat: 40.7580, lng: -73.9855, accuracy: 8 },
      healthStats: { heartRate: 72, steps: 12500, batteryLevel: 75 },
      responseTime: 2
    };
    
    setLastPingResponse(response);
    setIsPinging(false);
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const report = {
      date: new Date(),
      totalSteps: 12500,
      avgHeartRate: 68,
      safetyScore: 92,
      distanceTraveled: 8
    };
    
    setHealthReports(prev => [report, ...prev]);
    setIsGeneratingReport(false);
  };

  const alerts = [
    { id: 1, type: "info", message: "Sarah entered Central Park - verified safe zone", time: "5 min ago", severity: "low" },
    { id: 2, type: "warning", message: "Device battery below 80%", time: "20 min ago", severity: "medium" }
  ];

  return (
    <div className="min-h-screen p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">
            {user?.digitalId} | Monitoring: {childData.name}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
          <Badge variant="outline" className="text-success border-success/30">
            <Eye className="w-4 h-4 mr-1" />
            MONITORING ACTIVE
          </Badge>
        </div>
      </div>

      {/* Tabs */}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Child Info Card */}
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold">{childData.name}</h3>
                <p className="text-muted-foreground">Age: {childData.age}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Safety Score</span>
                  <span className="text-xl font-bold text-success">{childData.safetyScore}%</span>
                </div>
                
                <Progress value={childData.safetyScore} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Device Battery</span>
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-warning" />
                    <span className="text-warning font-bold">{childData.batteryLevel}%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Location Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Live Location</h2>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <MapPin className="w-3 h-3 mr-1" />
                  REAL-TIME
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="h-40 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Live Map View</p>
                    <p className="text-xs text-muted-foreground">Central Park Area</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {childData.name}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </Card>

            {/* AI Risk Prediction */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">AI Risk Prediction</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">25%</div>
                <Progress value={25} className="h-3 mb-2" />
                <Badge variant="outline" className="text-success border-success/30">
                  LOW RISK
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground">RISK FACTORS</h4>
                <div className="p-3 bg-muted/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-sm">Currently in verified safe zone</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Health Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Health & Activity Monitor</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">{childData.heartRate}</div>
                <div className="text-xs text-muted-foreground mb-2">BPM</div>
                <Badge variant="outline" className="text-success border-success/30">
                  NORMAL
                </Badge>
                <div className="text-sm mt-2">Heart Rate</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">65</div>
                <div className="text-xs text-muted-foreground mb-2">%</div>
                <Badge variant="outline" className="text-primary border-primary/30">
                  ACTIVE
                </Badge>
                <div className="text-sm mt-2">Activity Level</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">89</div>
                <div className="text-xs text-muted-foreground mb-2">%</div>
                <Badge variant="outline" className="text-success border-success/30">
                  GOOD
                </Badge>
                <div className="text-sm mt-2">Sleep Quality</div>
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Risk Alerts & Notifications</h3>
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
                    <p className="text-sm text-foreground">{alert.message}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="complaints">
          <div className="space-y-6">
            {/* Emergency Alert */}
            <Card className="p-6 border-destructive/30 bg-destructive/5">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-destructive">Emergency Response</h2>
                <Button onClick={handlePanicAlert} size="lg" className="w-full h-16 text-xl font-bold bg-destructive hover:bg-destructive/90 text-white">
                  <AlertTriangle className="w-6 h-6 mr-3" />
                  RAISE PANIC ALERT - INDIRECT SOS
                </Button>
              </div>
            </Card>

            {/* Submit Complaint */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Submit Safety Complaint</h3>
              <div className="space-y-4">
                <Input 
                  placeholder="Complaint Title" 
                  value={newComplaint.title} 
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))} 
                />
                <Textarea 
                  placeholder="Detailed Description" 
                  value={newComplaint.description} 
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))} 
                  rows={4} 
                />
                <Button onClick={handleSubmitComplaint} className="w-full" disabled={!newComplaint.title || !newComplaint.description}>
                  <Shield className="w-4 h-4 mr-2" />
                  Submit Complaint to Authorities
                </Button>
              </div>
            </Card>

            {/* Complaint History */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Complaint History ({complaints.length})</h3>
              {complaints.length === 0 ? (
                <p className="text-center text-muted-foreground">No complaints filed</p>
              ) : (
                <div className="space-y-3">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="p-4 bg-muted/10 rounded-lg border border-primary/10">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{complaint.title}</h4>
                        <Badge variant="outline" className="text-primary border-primary/30">
                          {complaint.priority?.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{complaint.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Maps Section */}
          <ParentMaps 
            childLocation={childData.location}
            geoBoundaries={geoBoundaries}
            onBoundaryAlert={(boundary, location) => {
              console.log(`Alert: Child left ${boundary.name}`, location);
            }}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Silent Ping */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Radio className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">Silent Ping System</h2>
                </div>
              </div>

              <Button onClick={handleSilentPing} disabled={isPinging} className="w-full h-12" size="lg">
                {isPinging ? (
                  <>
                    <Signal className="w-5 h-5 mr-2 animate-pulse" />
                    Pinging Device...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Send Silent Ping Now
                  </>
                )}
              </Button>

              {isPinging && <Progress value={undefined} className="h-2 mt-4" />}

              {lastPingResponse && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-4">Latest Ping Response</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/10 rounded-lg">
                      <Signal className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{lastPingResponse.responseTime}s</div>
                      <div className="text-xs text-muted-foreground">Response Time</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg">
                      <Heart className="w-5 h-5 mx-auto mb-2 text-destructive" />
                      <div className="text-2xl font-bold">{lastPingResponse.healthStats.heartRate}</div>
                      <div className="text-xs text-muted-foreground">BPM</div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Health Reports */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Health & Safety Reports</h2>
              </div>

              <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="w-full h-12" size="lg">
                {isGeneratingReport ? (
                  <>
                    <Activity className="w-5 h-5 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Generate Health Report
                  </>
                )}
              </Button>

              {isGeneratingReport && <Progress value={undefined} className="h-2 mt-4" />}

              {healthReports.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-4">Generated Reports ({healthReports.length})</h3>
                  <div className="space-y-4">
                    {healthReports.map((report, idx) => (
                      <div key={idx} className="border border-primary/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold">{report.date.toDateString()}</h4>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-background/50 rounded">
                            <div className="text-lg font-bold">{report.totalSteps?.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Steps</div>
                          </div>
                          <div className="text-center p-3 bg-background/50 rounded">
                            <div className="text-lg font-bold">{report.avgHeartRate}</div>
                            <div className="text-xs text-muted-foreground">Avg BPM</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="family">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Family SOS Network</h2>
              </div>
              <Badge variant="outline" className="text-primary border-primary/30">
                {guardians.length} MEMBERS
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-destructive/30 bg-destructive/5">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-bold text-destructive">Emergency Alert</h3>
                  <Button className="w-full bg-destructive hover:bg-destructive/90 text-white">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Trigger Family Emergency Alert
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-primary/30 bg-primary/5">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-bold text-primary">Group Video Call</h3>
                  <Button className="w-full">
                    <Video className="w-4 h-4 mr-2" />
                    Start Emergency Group Call
                  </Button>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Family Network Members</h3>
              <div className="space-y-4">
                {guardians.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.relationship}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={member.isOnline ? "text-success border-success/30" : "text-muted-foreground"}>
                        {member.isOnline ? 'ONLINE' : 'OFFLINE'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="consent">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Consent & Access Management</h2>
              </div>
              <Badge variant="outline" className="text-primary border-primary/30">
                {guardians.length} GUARDIANS
              </Badge>
            </div>

            <Button className="w-full mb-6">
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Guardian
            </Button>

            <div className="space-y-4">
              {guardians.map((guardian) => (
                <Card key={guardian.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{guardian.name}</h3>
                      <p className="text-sm text-muted-foreground">{guardian.email}</p>
                      <Badge variant="outline">{guardian.relationship}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Access permissions: View Location, Receive Alerts
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trust">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Trust Badge System</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trustedServices.map((service) => (
                <Card key={service.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{service.type}</p>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/30">
                      <Award className="w-3 h-3 mr-1" />
                      VERIFIED
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                  
                  <div className="text-sm">
                    Trust Score: <span className="font-bold text-success">{service.trustScore}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;