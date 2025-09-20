import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Star, 
  MapPin, 
  Car, 
  Building, 
  AlertTriangle,
  Plus,
  Flag,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

const TrustBadgeSystem = () => {
  const { toast } = useToast();
  const [verifiedServices, setVerifiedServices] = useState([
    {
      id: '1',
      name: 'Grand Plaza Hotel',
      type: 'hotel',
      location: 'Times Square, NYC',
      rating: 4.8,
      trustScore: 95,
      verified: true,
      reports: 0,
      lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Yellow Cab Co.',
      type: 'taxi',
      location: 'Manhattan Area',
      rating: 4.2,
      trustScore: 87,
      verified: true,
      reports: 2,
      lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Brooklyn Hostel',
      type: 'hotel',
      location: 'Brooklyn, NYC',
      rating: 3.9,
      trustScore: 72,
      verified: false,
      reports: 5,
      lastUpdated: new Date(Date.now() - 48 * 60 * 60 * 1000)
    }
  ]);

  const [newReport, setNewReport] = useState({
    serviceId: '',
    type: 'positive',
    description: '',
    evidence: ''
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'hotel': return Building;
      case 'taxi': return Car;
      default: return MapPin;
    }
  };

  const getTrustColor = (score: number) => {
    if (score >= 90) return "text-success border-success/30 bg-success/10";
    if (score >= 70) return "text-warning border-warning/30 bg-warning/10";
    return "text-destructive border-destructive/30 bg-destructive/10";
  };

  const handleSubmitReport = () => {
    if (!newReport.serviceId || !newReport.description) {
      toast({
        title: "Missing Information",
        description: "Please select a service and provide description",
        variant: "destructive"
      });
      return;
    }

    // Update service based on report
    setVerifiedServices(prev => prev.map(service => {
      if (service.id === newReport.serviceId) {
        const adjustment = newReport.type === 'positive' ? 2 : -5;
        return {
          ...service,
          trustScore: Math.max(0, Math.min(100, service.trustScore + adjustment)),
          reports: newReport.type === 'negative' ? service.reports + 1 : service.reports,
          lastUpdated: new Date()
        };
      }
      return service;
    }));

    setNewReport({ serviceId: '', type: 'positive', description: '', evidence: '' });
    
    toast({
      title: "Report Submitted",
      description: "Thank you for helping improve the safety ecosystem",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <Card className="cyber-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-orbitron font-bold">Trust Badge System</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Report Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Service Experience</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <select 
                className="w-full p-2 border rounded-md bg-background"
                value={newReport.serviceId}
                onChange={(e) => setNewReport(prev => ({ ...prev, serviceId: e.target.value }))}
              >
                <option value="">Select Service</option>
                {verifiedServices.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
              
              <select 
                className="w-full p-2 border rounded-md bg-background"
                value={newReport.type}
                onChange={(e) => setNewReport(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="positive">Positive Experience</option>
                <option value="negative">Safety Concern</option>
              </select>
              
              <Textarea
                placeholder="Describe your experience..."
                value={newReport.description}
                onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
              />
              
              <Input
                placeholder="Evidence (optional - photo/document reference)"
                value={newReport.evidence}
                onChange={(e) => setNewReport(prev => ({ ...prev, evidence: e.target.value }))}
              />
              
              <Button onClick={handleSubmitReport} className="w-full">
                Submit Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Verified Services */}
      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-semibold text-muted-foreground">VERIFIED SERVICES</h4>
        
        {verifiedServices.map((service) => {
          const ServiceIcon = getServiceIcon(service.type);
          
          return (
            <div key={service.id} className="p-4 bg-muted/10 rounded-lg border border-primary/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <ServiceIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold">{service.name}</h5>
                    <p className="text-xs text-muted-foreground">{service.location}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant="outline" className={getTrustColor(service.trustScore)}>
                    <Shield className="w-3 h-3 mr-1" />
                    {service.trustScore}% Trust
                  </Badge>
                  {service.verified && (
                    <Badge variant="outline" className="text-success border-success/30 ml-2">
                      VERIFIED
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(service.rating)}
                    <span className="text-sm font-semibold ml-1">{service.rating}</span>
                  </div>
                  
                  {service.reports > 0 && (
                    <div className="flex items-center space-x-1 text-warning">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-xs">{service.reports} reports</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2">
                Last updated: {service.lastUpdated.toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Trust Score Legend</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-success">90-100%: Highly Trusted</div>
          <div className="text-warning">70-89%: Moderately Safe</div>
          <div className="text-destructive">Below 70%: Use Caution</div>
        </div>
      </div>
    </Card>
  );
};

export default TrustBadgeSystem;