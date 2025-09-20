import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Radio, MapPin, Heart, Battery, Clock, Activity, Zap, Signal } from "lucide-react";

interface SilentPingProps {
  onPingRequest: () => Promise<any>;
  lastPingResponse: any;
}

const SilentPing = ({ onPingRequest, lastPingResponse }: SilentPingProps) => {
  const [isPinging, setIsPinging] = useState(false);
  const [autoMode, setAutoMode] = useState(false);

  const handleSilentPing = async () => {
    if (isPinging) return;
    setIsPinging(true);
    try {
      await onPingRequest();
    } catch (error) {
      console.error('Ping failed:', error);
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Radio className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-orbitron font-bold">Silent Ping System</h2>
          </div>
          <Badge variant="outline" className={autoMode ? 'text-success border-success/30' : 'text-muted-foreground border-muted/30'}>
            {autoMode ? 'AUTO MODE' : 'MANUAL MODE'}
          </Badge>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg mb-6">
          <div>
            <h3 className="font-semibold">Automatic Pinging</h3>
            <p className="text-sm text-muted-foreground">Send silent pings every 15 minutes automatically</p>
          </div>
          <Switch checked={autoMode} onCheckedChange={setAutoMode} />
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
      </Card>

      {lastPingResponse && (
        <Card className="cyber-card p-6">
          <h3 className="text-lg font-orbitron font-bold mb-4">Latest Ping Response</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <Signal className="w-5 h-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{lastPingResponse.responseTime}s</div>
              <div className="text-xs text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <MapPin className="w-5 h-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">±{lastPingResponse.location.accuracy}m</div>
              <div className="text-xs text-muted-foreground">Location Accuracy</div>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <Heart className="w-5 h-5 mx-auto mb-2 text-destructive" />
              <div className="text-2xl font-bold">{lastPingResponse.healthStats.heartRate}</div>
              <div className="text-xs text-muted-foreground">BPM</div>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <Battery className="w-5 h-5 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold">{lastPingResponse.healthStats.batteryLevel}%</div>
              <div className="text-xs text-muted-foreground">Battery</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SilentPing;