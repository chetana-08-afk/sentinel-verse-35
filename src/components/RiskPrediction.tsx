import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Clock, MapPin } from "lucide-react";

const RiskPrediction = () => {
  const [riskLevel, setRiskLevel] = useState(25);
  const [predictions, setPredictions] = useState([
    {
      id: 1,
      type: "location",
      message: "Entering low-signal area at night",
      risk: "medium",
      probability: 65,
      timeframe: "2 hours"
    },
    {
      id: 2,
      type: "activity",
      message: "Unusual movement pattern detected",
      risk: "low",
      probability: 30,
      timeframe: "30 minutes"
    },
    {
      id: 3,
      type: "health",
      message: "Heart rate trending upward",
      risk: "low",
      probability: 20,
      timeframe: "1 hour"
    }
  ]);

  useEffect(() => {
    // Simulate dynamic risk updates
    const interval = setInterval(() => {
      setRiskLevel(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-success border-success/30";
    if (risk < 70) return "text-warning border-warning/30";
    return "text-destructive border-destructive/30";
  };

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return "LOW RISK";
    if (risk < 70) return "MODERATE RISK";
    return "HIGH RISK";
  };

  return (
    <Card className="cyber-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-orbitron font-bold">AI Risk Prediction</h3>
        <TrendingUp className="w-5 h-5 text-primary" />
      </div>

      {/* Risk Level Gauge */}
      <div className="text-center mb-6">
        <div className="text-3xl font-orbitron font-bold mb-2">{Math.round(riskLevel)}%</div>
        <Progress value={riskLevel} className="h-3 mb-2" />
        <Badge variant="outline" className={getRiskColor(riskLevel)}>
          {getRiskLabel(riskLevel)}
        </Badge>
      </div>

      {/* Risk Factors */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground">RISK FACTORS</h4>
        {predictions.map((prediction) => (
          <div key={prediction.id} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              prediction.risk === 'high' ? 'bg-destructive animate-pulse' :
              prediction.risk === 'medium' ? 'bg-warning animate-pulse' : 'bg-success'
            }`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium capitalize">{prediction.type}</span>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{prediction.timeframe}</span>
                </div>
              </div>
              <p className="text-sm text-foreground">{prediction.message}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-muted-foreground">Probability:</span>
                <span className="text-xs font-bold">{prediction.probability}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Items */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Recommended Actions</span>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Send silent ping to check status</li>
          <li>• Monitor location more closely</li>
          <li>• Consider contacting child if risk increases</li>
        </ul>
      </div>
    </Card>
  );
};

export default RiskPrediction;