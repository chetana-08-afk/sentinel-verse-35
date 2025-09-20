import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Radio, 
  Clock, 
  MapPin, 
  Heart, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface PingResponse {
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
    accuracy: number;
  };
  healthStats: {
    heartRate: number;
    steps: number;
    batteryLevel: number;
  };
  recentActivity: string[];
  responseTime: number; // in seconds
}

interface SilentPingProps {
  onPingRequest: () => Promise<PingResponse | null>;
  lastPingResponse?: PingResponse | null;
}

const SilentPing: React.FC<SilentPingProps> = ({ onPingRequest, lastPingResponse }) => {
  const [isPinging, setIsPinging] = useState(false);
  const [pingHistory, setPingHistory] = useState<PingResponse[]>([]);
  const [autoMode, setAutoMode] = useState(false);
  const [nextAutoPing, setNextAutoPing] = useState<Date | null>(null);

  // Auto-ping functionality
  useEffect(() => {
    if (!autoMode) return;

    const interval = setInterval(async () => {
      await handlePing();
      setNextAutoPing(new Date(Date.now() + 15 * 60 * 1000)); // Next ping in 15 minutes
    }, 15 * 60 * 1000); // Every 15 minutes

    // Set initial next ping time
    if (!nextAutoPing) {
      setNextAutoPing(new Date(Date.now() + 15 * 60 * 1000));
    }

    return () => clearInterval(interval);
  }, [autoMode]);

  const handlePing = async () => {
    setIsPinging(true);
    try {
      const response = await onPingRequest();
      if (response) {
        setPingHistory(prev => [response, ...prev.slice(0, 9)]); // Keep last 10
      }
    } catch (error) {
      console.error('Ping failed:', error);
    } finally {
      setIsPinging(false);
    }
  };

  const getResponseStatus = (responseTime: number) => {
    if (responseTime <= 5) return { status: 'excellent', color: 'text-success', label: 'Excellent' };
    if (responseTime <= 15) return { status: 'good', color: 'text-primary', label: 'Good' };
    if (responseTime <= 30) return { status: 'slow', color: 'text-warning', label: 'Slow' };
    return { status: 'failed', color: 'text-destructive', label: 'Failed' };
  };

  const formatTimeUntilNext = () => {
    if (!nextAutoPing) return '';
    const diff = nextAutoPing.getTime() - Date.now();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Silent Ping Controls */}
      <Card className="cyber-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-orbitron font-bold">Silent Ping System</h3>
          <Badge variant="outline" className="text-primary border-primary/30">
            <Radio className="w-3 h-3 mr-1" />
            ACTIVE
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handlePing}
              disabled={isPinging}
              className="h-16 glow-button"
            >
              {isPinging ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  <div>
                    <div className="font-bold">Pinging...</div>
                    <div className="text-xs">Requesting status</div>
                  </div>
                </>
              ) : (
                <>
                  <Radio className="w-6 h-6 mr-2" />
                  <div>
                    <div className="font-bold">Send Silent Ping</div>
                    <div className="text-xs">Get instant status</div>
                  </div>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setAutoMode(!autoMode)}
              className={`h-16 ${autoMode ? 'border-primary/50 text-primary' : ''}`}
            >
              <Clock className="w-6 h-6 mr-2" />
              <div>
                <div className="font-bold">Auto Mode</div>
                <div className="text-xs">
                  {autoMode ? `Next: ${formatTimeUntilNext()}` : 'Every 15 minutes'}
                </div>
              </div>
            </Button>
          </div>

          {autoMode && nextAutoPing && (
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between text-sm">
                <span>Next automatic ping in:</span>
                <span className="font-mono font-bold text-primary">
                  {formatTimeUntilNext()}
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Latest Response */}
      {lastPingResponse && (
        <Card className="cyber-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-orbitron font-bold">Latest Response</h3>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={getResponseStatus(lastPingResponse.responseTime).color}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {getResponseStatus(lastPingResponse.responseTime).label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {lastPingResponse.responseTime}s response
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location */}
            <div className="p-4 bg-muted/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold">Location</span>
              </div>
              <div className="text-sm space-y-1">
                <div>Lat: {lastPingResponse.location.lat.toFixed(6)}</div>
                <div>Lng: {lastPingResponse.location.lng.toFixed(6)}</div>
                <div className="text-muted-foreground">
                  ±{lastPingResponse.location.accuracy}m accuracy
                </div>
              </div>
            </div>

            {/* Health Stats */}
            <div className="p-4 bg-muted/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-4 h-4 text-secondary" />
                <span className="font-semibold">Health</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Heart Rate:</span>
                  <span className="font-bold text-secondary">
                    {lastPingResponse.healthStats.heartRate} BPM
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Steps:</span>
                  <span className="font-bold">{lastPingResponse.healthStats.steps.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Battery:</span>
                  <span className="font-bold text-warning">
                    {lastPingResponse.healthStats.batteryLevel}%
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-4 bg-muted/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-4 h-4 text-accent" />
                <span className="font-semibold">Activity</span>
              </div>
              <div className="space-y-1">
                {lastPingResponse.recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    • {activity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Last updated: {lastPingResponse.timestamp.toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                Response time: {lastPingResponse.responseTime}s
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Ping History */}
      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">Ping History</h3>
        
        <div className="space-y-2">
          {pingHistory.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No ping history yet. Send your first silent ping above.
            </div>
          ) : (
            pingHistory.map((ping, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/5 rounded-lg border border-primary/10">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    getResponseStatus(ping.responseTime).status === 'excellent' ? 'bg-success' :
                    getResponseStatus(ping.responseTime).status === 'good' ? 'bg-primary' :
                    getResponseStatus(ping.responseTime).status === 'slow' ? 'bg-warning' : 'bg-destructive'
                  }`} />
                  <div>
                    <div className="text-sm font-medium">
                      {ping.timestamp.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      HR: {ping.healthStats.heartRate} • Steps: {ping.healthStats.steps} • Battery: {ping.healthStats.batteryLevel}%
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {ping.responseTime}s
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default SilentPing;