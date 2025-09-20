import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  UserPlus, 
  LogIn, 
  Users, 
  MapPin, 
  Brain,
  Zap,
  Eye,
  Heart
} from "lucide-react";
import heroImage from "@/assets/hero-safety-city.jpg";
import aiAvatarImage from "@/assets/ai-safety-avatar.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const mainOptions = [
    {
      id: "register",
      title: "Register & Generate Digital ID",
      description: "Create secure blockchain-verified tourist identity with biometric authentication",
      icon: UserPlus,
      gradient: "from-primary to-accent",
      route: "/register",
      features: ["Blockchain Security", "Biometric Auth", "Digital Passport"]
    },
    {
      id: "login",
      title: "Login to Portal",
      description: "Access your dashboard after secure authentication and verification",
      icon: LogIn,
      gradient: "from-secondary to-primary",
      route: "/login",
      features: ["Secure Access", "Biometric Auth", "Dashboard Access"]
    }
  ];

  const features = [
    { icon: Brain, title: "AI Safety Avatar", desc: "Intelligent threat detection" },
    { icon: Eye, title: "Crowd Monitoring", desc: "Real-time density analysis" },
    { icon: Heart, title: "Health Tracking", desc: "Vital signs monitoring" },
    { icon: Zap, title: "Instant Alerts", desc: "Emergency response system" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 text-primary border-primary/30 animate-pulse-glow">
              <Shield className="w-4 h-4 mr-2" />
              STSE v2.0 - AI POWERED SAFETY
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-glow">
              SMART TOURIST
              <br />
              SAFETY ECOSYSTEM
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 font-rajdhani">
              Advanced AI-powered safety platform with real-time monitoring, 
              emergency response, and intelligent threat detection for tourists worldwide.
            </p>

            {/* Hero Image */}
            <div className="relative max-w-5xl mx-auto mb-16">
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 animate-pulse-glow">
                <img 
                  src={heroImage} 
                  alt="Futuristic Safety City Interface" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </div>
          </div>

          {/* Main Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
            {mainOptions.map((option, index) => (
              <Card
                key={option.id}
                className={`cyber-card p-8 cursor-pointer transition-all duration-500 hover:scale-105 ${
                  hoveredCard === option.id ? 'animate-glow' : ''
                }`}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(option.route)}
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${option.gradient} p-4 mb-6 animate-float`}>
                    <option.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-orbitron font-bold mb-4 text-glow">
                    {option.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 font-rajdhani">
                    {option.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-primary">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full glow-button font-orbitron font-bold"
                    variant="outline"
                  >
                    ACCESS SYSTEM
                  </Button>
                </div>
                
                {/* Cyber scan effect */}
                {hoveredCard === option.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-cyber-scan" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* AI Safety Avatar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">
                Meet Your AI Safety Guardian
              </h2>
              <p className="text-lg text-muted-foreground mb-8 font-rajdhani">
                Our advanced AI avatar provides 24/7 safety monitoring, predictive threat analysis, 
                and instant emergency response coordination using quantum-encrypted communication.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-primary/30 animate-pulse-glow">
                <img 
                  src={aiAvatarImage} 
                  alt="AI Safety Avatar" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Floating status indicators */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-success rounded-full border-2 border-background animate-pulse">
                <div className="w-full h-full bg-success rounded-full animate-ping" />
              </div>
              <div className="absolute top-1/2 -left-4 w-6 h-6 bg-primary rounded-full border-2 border-background animate-pulse" />
            </div>
          </div>

          {/* System Status Bar */}
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="font-orbitron font-semibold">SYSTEM STATUS: OPERATIONAL</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Active Users:</span>
                  <span className="text-primary font-bold">127,849</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Threats Prevented:</span>
                  <span className="text-success font-bold">99.7%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Response Time:</span>
                  <span className="text-warning font-bold">&lt;15s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;