import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  AlertTriangle, 
  Heart, 
  Shield, 
  Phone, 
  Users, 
  Navigation, 
  Activity,
  Zap,
  Bell,
  Home,
  MessageCircle,
  LogIn
} from "lucide-react";

const TouristDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [safetyScore, setSafetyScore] = useState(87);
  const [heartRate, setHeartRate] = useState(72);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time data updates
      setHeartRate(prev => prev + Math.floor(Math.random() * 6) - 3);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSOSActivation = () => {
    setIsSOSActive(true);
    // In a real app, this would trigger emergency protocols
    setTimeout(() => setIsSOSActive(false), 5000);
  };

  const quickActions = [
    { icon: Shield, label: "Women Safety", color: "text-secondary", urgent: true },
    { icon: Phone, label: "Fake Call", color: "text-accent" },
    { icon: Users, label: "Find Safe Stay", color: "text-success" },
    { icon: Navigation, label: "Safe Route", color: "text-primary" }
  ];

  const notifications = [
    { type: "warning", message: "High crowd density detected in Times Square", time: "2 min ago" },
    { type: "info", message: "Weather alert: Heavy rain expected at 3 PM", time: "15 min ago" },
    { type: "success", message: "You've entered a verified safe zone", time: "1 hour ago" }
  ];

  return (
    <div className="min-h-screen p-6 cyber-grid bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-glow">Tourist Dashboard</h1>
          <p className="text-muted-foreground font-rajdhani">
            Welcome {user?.digitalId} | {currentTime.toLocaleString()} | Location: Manhattan, NYC
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
          <Badge variant="outline" className="animate-pulse-glow">
            <Shield className="w-4 h-4 mr-1" />
            PROTECTED
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Live Map Section */}
        <div className="lg:col-span-2 xl:col-span-2">
          <Card className="cyber-card p-6 h-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-orbitron font-bold">Live Location</h2>
              <Badge variant="outline" className="text-success border-success/30">
                <MapPin className="w-3 h-3 mr-1" />
                GPS ACTIVE
              </Badge>
            </div>
            
            {/* Map Placeholder with Grid Overlay */}
            <div className="relative w-full h-64 bg-muted/20 rounded-lg border border-primary/20 overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse" />
                  <p className="text-sm text-muted-foreground">Live OpenStreetMap Integration</p>
                  <p className="text-xs text-primary">40.7589° N, 73.9851° W</p>
                </div>
              </div>
              
              {/* Simulated location markers */}
              <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-primary rounded-full animate-ping" />
              <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-warning rounded-full" />
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-success rounded-full" />
            </div>
          </Card>
        </div>

        {/* Emergency SOS */}
        <div className="xl:col-span-1">
          <Card className={`cyber-card p-6 ${isSOSActive ? 'animate-pulse bg-destructive/20' : ''}`}>
            <h3 className="text-lg font-orbitron font-bold mb-4 text-center">Emergency SOS</h3>
            
            <Button
              onClick={handleSOSActivation}
              className={`w-full h-24 text-xl font-orbitron font-bold sos-button ${
                isSOSActive ? 'animate-pulse scale-110' : ''
              }`}
              disabled={isSOSActive}
            >
              {isSOSActive ? (
                <>
                  <Activity className="w-8 h-8 mr-2 animate-pulse" />
                  SENDING ALERT...
                </>
              ) : (
                <>
                  <Zap className="w-8 h-8 mr-2" />
                  SOS
                </>
              )}
            </Button>
            
            {isSOSActive && (
              <p className="text-center text-sm text-destructive mt-2 animate-pulse">
                Emergency services have been notified!
              </p>
            )}
          </Card>
        </div>

        {/* Safety Score */}
        <div className="xl:col-span-1">
          <Card className="cyber-card p-6">
            <h3 className="text-lg font-orbitron font-bold mb-4">Safety Score</h3>
            
            <div className="text-center mb-4">
              <div className="text-4xl font-orbitron font-black text-primary mb-2">
                {safetyScore}%
              </div>
              <Progress value={safetyScore} className="h-2 safety-meter" />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Location Safety</span>
                <span className="text-success">High</span>
              </div>
              <div className="flex justify-between">
                <span>Crowd Density</span>
                <span className="text-warning">Medium</span>
              </div>
              <div className="flex justify-between">
                <span>Weather Risk</span>
                <span className="text-success">Low</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Health Stats */}
        <div className="lg:col-span-1">
          <Card className="cyber-card p-6">
            <h3 className="text-lg font-orbitron font-bold mb-4">Health Monitor</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-secondary animate-pulse" />
                  <span>Heart Rate</span>
                </div>
                <span className="text-xl font-bold text-secondary">{heartRate} BPM</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Fall Detection</span>
                </div>
                <Badge variant="outline" className="text-success border-success/30">NORMAL</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>Stress Level</span>
                </div>
                <span className="text-success">Low</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="cyber-card p-6">
            <h3 className="text-lg font-orbitron font-bold mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className={`h-16 flex-col space-y-1 glow-button ${action.urgent ? 'border-secondary/50' : ''}`}
                >
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                  <span className="text-xs font-rajdhani">{action.label}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-2 xl:col-span-2">
          <Card className="cyber-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-orbitron font-bold">Live Notifications</h3>
              <Bell className="w-5 h-5 text-primary animate-pulse" />
            </div>
            
            <div className="space-y-3">
              {notifications.map((notif, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg border border-primary/10">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notif.type === 'warning' ? 'bg-warning' : 
                    notif.type === 'info' ? 'bg-primary' : 'bg-success'
                  } animate-pulse`} />
                  <div className="flex-1">
                    <p className="text-sm font-rajdhani">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Assistant */}
        <div className="lg:col-span-1 xl:col-span-2">
          <Card className="cyber-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-orbitron font-bold">AI Safety Assistant</h3>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            </div>
            
            <div className="bg-muted/10 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-rajdhani mb-1">
                    "I'm monitoring your surroundings. Current area is safe with low threat level. 
                    I recommend taking the subway for your next destination."
                  </p>
                  <p className="text-xs text-muted-foreground">AI Guardian • Just now</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with AI Guardian
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;