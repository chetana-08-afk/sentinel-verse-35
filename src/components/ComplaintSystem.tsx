import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  Phone, 
  Upload, 
  MessageCircle, 
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Complaint {
  id: string;
  type: 'panic' | 'no_contact' | 'unsafe_location' | 'health_concern' | 'other';
  description: string;
  evidence?: File[];
  voiceNote?: Blob;
  timestamp: Date;
  status: 'pending' | 'acknowledged' | 'investigating' | 'resolved';
  escalationLevel: 'local' | 'regional' | 'national';
}

interface ComplaintSystemProps {
  onComplaintSubmit: (complaint: Omit<Complaint, 'id' | 'timestamp' | 'status'>) => void;
  complaints: Complaint[];
}

const ComplaintSystem: React.FC<ComplaintSystemProps> = ({ 
  onComplaintSubmit, 
  complaints 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    type: '' as Complaint['type'],
    description: '',
    escalationLevel: 'local' as Complaint['escalationLevel']
  });

  const complaintTypes = [
    { value: 'panic', label: 'Panic Alert - Immediate Danger', urgent: true },
    { value: 'no_contact', label: 'No Contact from Child', urgent: true },
    { value: 'unsafe_location', label: 'Child in Unsafe Area', urgent: false },
    { value: 'health_concern', label: 'Health Emergency', urgent: true },
    { value: 'other', label: 'Other Safety Concern', urgent: false }
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedAudio(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      setTimeout(() => {
        mediaRecorder.stop();
        setIsRecording(false);
      }, 30000); // Max 30 seconds
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const submitComplaint = () => {
    if (!formData.type || !formData.description.trim()) return;

    onComplaintSubmit({
      type: formData.type,
      description: formData.description,
      evidence: selectedFiles.length > 0 ? selectedFiles : undefined,
      voiceNote: recordedAudio || undefined,
      escalationLevel: formData.escalationLevel
    });

    // Reset form
    setFormData({ type: '' as Complaint['type'], description: '', escalationLevel: 'local' });
    setSelectedFiles([]);
    setRecordedAudio(null);
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return 'text-warning border-warning/30';
      case 'acknowledged': return 'text-primary border-primary/30';
      case 'investigating': return 'text-secondary border-secondary/30';
      case 'resolved': return 'text-success border-success/30';
      default: return 'text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Actions */}
      <Card className="cyber-card p-6 border-destructive/30 bg-destructive/5">
        <h3 className="text-lg font-orbitron font-bold mb-4 text-destructive">
          Emergency Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="h-16 sos-button"
            onClick={() => setFormData({ ...formData, type: 'panic' })}
          >
            <AlertTriangle className="w-6 h-6 mr-2" />
            <div>
              <div className="font-bold">PANIC ALERT</div>
              <div className="text-xs">Immediate danger</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 border-warning/50 text-warning"
            onClick={() => setFormData({ ...formData, type: 'no_contact' })}
          >
            <Phone className="w-6 h-6 mr-2" />
            <div>
              <div className="font-bold">No Contact</div>
              <div className="text-xs">Can't reach child</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 border-secondary/50 text-secondary"
            onClick={() => window.open('tel:911')}
          >
            <Shield className="w-6 h-6 mr-2" />
            <div>
              <div className="font-bold">Call Police</div>
              <div className="text-xs">Direct escalation</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Complaint Form */}
      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">File Complaint</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Complaint Type</label>
            <Select onValueChange={(value: Complaint['type']) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="cyber-card">
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
                {complaintTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      {type.urgent && <AlertTriangle className="w-4 h-4 text-destructive" />}
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the situation in detail..."
              className="cyber-card min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Escalation Level</label>
            <Select 
              value={formData.escalationLevel}
              onValueChange={(value: Complaint['escalationLevel']) => 
                setFormData({ ...formData, escalationLevel: value })
              }
            >
              <SelectTrigger className="cyber-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local Authorities</SelectItem>
                <SelectItem value="regional">Regional Police</SelectItem>
                <SelectItem value="national">National Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Evidence Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Evidence Upload</label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="evidence-upload"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('evidence-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files ({selectedFiles.length})
                </Button>
              </div>

              <div>
                <Button
                  variant="outline"
                  className={`w-full ${isRecording ? 'border-destructive text-destructive' : ''}`}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {isRecording ? 'Stop Recording' : recordedAudio ? 'Re-record Voice' : 'Record Voice Note'}
                </Button>
              </div>
            </div>

            {(selectedFiles.length > 0 || recordedAudio) && (
              <div className="text-sm text-success">
                {selectedFiles.length > 0 && <div>✓ {selectedFiles.length} file(s) attached</div>}
                {recordedAudio && <div>✓ Voice note recorded</div>}
              </div>
            )}
          </div>

          <Button
            onClick={submitComplaint}
            disabled={!formData.type || !formData.description.trim()}
            className="w-full glow-button font-orbitron"
          >
            <Shield className="w-4 h-4 mr-2" />
            Submit Complaint
          </Button>
        </div>
      </Card>

      {/* Recent Complaints */}
      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">Recent Complaints</h3>
        
        <div className="space-y-3">
          {complaints.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No complaints filed yet
            </div>
          ) : (
            complaints.map((complaint) => (
              <div key={complaint.id} className="p-4 bg-muted/10 rounded-lg border border-primary/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(complaint.status)}>
                      {complaint.status.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">
                      {complaintTypes.find(t => t.value === complaint.type)?.label}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {complaint.timestamp.toLocaleString()}
                  </div>
                </div>
                
                <p className="text-sm text-foreground mb-2">{complaint.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Level: {complaint.escalationLevel}
                  </span>
                  {complaint.evidence && (
                    <span className="text-primary">
                      {complaint.evidence.length} file(s) attached
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default ComplaintSystem;