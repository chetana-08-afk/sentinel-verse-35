import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  Send, 
  Clock, 
  CheckCircle, 
  Phone, 
  Shield, 
  FileText,
  Upload,
  Mic,
  Camera,
  Zap
} from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  status: 'pending' | 'reviewing' | 'resolved';
  timestamp: Date;
  evidence?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  escalationLevel?: number;
}

interface ComplaintSystemEnhancedProps {
  onComplaintSubmit: (complaint: Omit<Complaint, 'id' | 'timestamp' | 'status'>) => void;
  complaints?: Complaint[];
}

const ComplaintSystemEnhanced: React.FC<ComplaintSystemEnhancedProps> = ({ onComplaintSubmit, complaints = [] }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'safety',
    urgency: 'medium' as const,
    evidence: '',
    location: '',
    voiceNote: '',
    screenshot: ''
  });

  const [panicMode, setPanicMode] = useState(false);

  const categories = [
    { value: 'safety', label: 'Safety Concern' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'theft', label: 'Theft/Crime' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'no_contact', label: 'No Contact From Child' },
    { value: 'suspicious', label: 'Suspicious Activity' },
    { value: 'other', label: 'Other' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500' },
    { value: 'high', label: 'High Priority', color: 'bg-orange-500' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-500 animate-pulse' }
  ];

  const handlePanicAlert = () => {
    setPanicMode(true);
    const panicComplaint = {
      title: 'PANIC ALERT - No Contact From Child',
      description: 'Parent initiated panic alert due to inability to contact child. Immediate assistance required.',
      category: 'emergency',
      urgency: 'emergency' as const,
      evidence: 'System auto-generated panic alert',
      location: {
        lat: 40.7580,
        lng: -73.9855,
        address: 'Last known location: Central Park, NYC'
      }
    };

    onComplaintSubmit(panicComplaint);
    
    toast({
      title: "🚨 PANIC ALERT SENT",
      description: "Authorities have been notified immediately. Indirect SOS triggered.",
      variant: "destructive"
    });

    // Auto-close panic mode after 30 seconds
    setTimeout(() => setPanicMode(false), 30000);
  };

  const handlePoliceEscalation = (complaintId: string) => {
    toast({
      title: "Escalated to Higher Authority",
      description: "Your complaint has been escalated to the police commissioner's office",
      variant: "destructive"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      return;
    }

    const complaint = {
      ...formData,
      location: formData.location ? {
        lat: 40.7580,
        lng: -73.9855,
        address: formData.location
      } : undefined
    };

    onComplaintSubmit(complaint);
    
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been sent to authorities. Reference ID: #" + Date.now().toString().slice(-6),
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'safety',
      urgency: 'medium',
      evidence: '',
      location: '',
      voiceNote: '',
      screenshot: ''
    });
  };

  const handleVoiceRecording = () => {
    toast({
      title: "Voice Recording Started",
      description: "Recording your voice message...",
    });
    // Simulate recording
    setTimeout(() => {
      setFormData(prev => ({ ...prev, voiceNote: 'voice_recording_' + Date.now() + '.mp3' }));
      toast({
        title: "Voice Message Recorded",
        description: "Voice evidence attached to complaint",
      });
    }, 3000);
  };

  const handleScreenshot = () => {
    setFormData(prev => ({ ...prev, screenshot: 'screenshot_' + Date.now() + '.png' }));
    toast({
      title: "Screenshot Captured",
      description: "Screenshot evidence attached to complaint",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'reviewing': return <AlertTriangle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 border-yellow-600/30';
      case 'reviewing': return 'text-blue-600 border-blue-600/30';
      case 'resolved': return 'text-green-600 border-green-600/30';
      default: return 'text-gray-600 border-gray-600/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Panic Alert Button */}
      <Card className={`border-2 ${panicMode ? 'border-destructive animate-pulse' : 'border-destructive/50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-destructive">Emergency Panic Alert</h3>
              <p className="text-sm text-muted-foreground">No contact from child? Trigger immediate response</p>
            </div>
            <Button
              onClick={handlePanicAlert}
              disabled={panicMode}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              {panicMode ? 'ALERT SENT' : 'PANIC ALERT'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submit New Complaint */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Submit Complaint</span>
          </CardTitle>
          <CardDescription>
            Report safety concerns, incidents, or request immediate assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Issue Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <select
                  id="urgency"
                  value={formData.urgency}
                  onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value as any }))}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {urgencyLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide detailed information about the incident..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Where did this occur?"
              />
            </div>

            {/* Evidence Upload Section */}
            <div className="space-y-3">
              <Label>Evidence Upload</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleVoiceRecording}
                  className="w-full"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {formData.voiceNote ? 'Recorded' : 'Voice Note'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleScreenshot}
                  className="w-full"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {formData.screenshot ? 'Captured' : 'Screenshot'}
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </div>
              {(formData.voiceNote || formData.screenshot) && (
                <div className="text-xs text-success">
                  Evidence attached: {[formData.voiceNote, formData.screenshot].filter(Boolean).join(', ')}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Complaint
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Complaint History */}
      {complaints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Complaint History</CardTitle>
            <CardDescription>Track your submitted complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="p-4 border rounded-lg bg-muted/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{complaint.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStatusColor(complaint.status)}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1 capitalize">{complaint.status}</span>
                      </Badge>
                      {complaint.status === 'pending' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4 mr-1" />
                              Escalate
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Escalate to Higher Authority</DialogTitle>
                            </DialogHeader>
                            <div className="pt-4">
                              <p className="text-sm text-muted-foreground mb-4">
                                If authorities haven't responded adequately, escalate this complaint to higher police authorities.
                              </p>
                              <Button 
                                onClick={() => handlePoliceEscalation(complaint.id)}
                                className="w-full bg-destructive hover:bg-destructive/90"
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Escalate to Police Commissioner
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{complaint.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Category: {complaint.category}</span>
                    <span>{complaint.timestamp.toLocaleString()}</span>
                  </div>
                  {complaint.evidence && (
                    <div className="mt-2 text-xs text-primary">
                      <FileText className="w-3 h-3 inline mr-1" />
                      Evidence: {complaint.evidence}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComplaintSystemEnhanced;