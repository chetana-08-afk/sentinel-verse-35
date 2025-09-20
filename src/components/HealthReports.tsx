import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Download, 
  Heart, 
  Activity, 
  MapPin, 
  AlertTriangle,
  TrendingUp,
  Calendar as CalendarIcon,
  FileText,
  BarChart3
} from 'lucide-react';

interface DailySafetyReport {
  date: Date;
  totalSteps: number;
  avgHeartRate: number;
  maxHeartRate: number;
  minHeartRate: number;
  areasVisited: string[];
  alertsTriggered: {
    type: string;
    time: Date;
    severity: 'low' | 'medium' | 'high';
  }[];
  safetyScore: number;
  distanceTraveled: number; // in km
  timeInSafeZones: number; // in hours
  batteryUsage: number; // percentage
}

interface HealthReportsProps {
  reports: DailySafetyReport[];
  onGenerateReport: (date: Date) => Promise<DailySafetyReport>;
}

const HealthReports: React.FC<HealthReportsProps> = ({ reports, onGenerateReport }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const todayReport = reports.find(r => 
    r.date.toDateString() === new Date().toDateString()
  );

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      await onGenerateReport(selectedDate);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = (report: DailySafetyReport) => {
    const reportContent = {
      date: report.date.toDateString(),
      summary: {
        safetyScore: report.safetyScore,
        totalSteps: report.totalSteps,
        avgHeartRate: report.avgHeartRate,
        distanceTraveled: report.distanceTraveled,
        timeInSafeZones: report.timeInSafeZones
      },
      healthMetrics: {
        heartRate: {
          average: report.avgHeartRate,
          maximum: report.maxHeartRate,
          minimum: report.minHeartRate
        },
        activity: {
          steps: report.totalSteps,
          distance: report.distanceTraveled
        },
        device: {
          batteryUsage: report.batteryUsage
        }
      },
      locations: {
        areasVisited: report.areasVisited,
        timeInSafeZones: report.timeInSafeZones
      },
      alerts: report.alertsTriggered.map(alert => ({
        type: alert.type,
        time: alert.time.toLocaleString(),
        severity: alert.severity
      }))
    };

    const blob = new Blob([JSON.stringify(reportContent, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safety-report-${report.date.toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getAlertColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'text-success border-success/30';
      case 'medium': return 'text-warning border-warning/30';
      case 'high': return 'text-destructive border-destructive/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card className="cyber-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-orbitron font-bold">Health & Safety Reports</h3>
          <Badge variant="outline" className="text-primary border-primary/30">
            <FileText className="w-3 h-3 mr-1" />
            DAILY REPORTS
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Date</label>
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start cyber-card">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {selectedDate.toDateString()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setShowCalendar(false);
                    }
                  }}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Actions</label>
            <Button
              onClick={generateReport}
              disabled={isGenerating}
              className="w-full glow-button"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Today's Summary */}
      {todayReport && (
        <Card className="cyber-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-orbitron font-bold">Today's Summary</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadReport(todayReport)}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-primary mb-1">
                {todayReport.safetyScore}%
              </div>
              <div className="text-xs text-muted-foreground">Safety Score</div>
              <Progress value={todayReport.safetyScore} className="h-1 mt-2" />
            </div>

            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-secondary mb-1">
                {todayReport.totalSteps.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Steps</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-accent mb-1">
                {todayReport.avgHeartRate}
              </div>
              <div className="text-xs text-muted-foreground">Avg Heart Rate</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-success mb-1">
                {todayReport.distanceTraveled.toFixed(1)}km
              </div>
              <div className="text-xs text-muted-foreground">Distance</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Areas Visited */}
            <div className="p-4 bg-muted/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold">Areas Visited</span>
              </div>
              <div className="space-y-1">
                {todayReport.areasVisited.slice(0, 5).map((area, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {area}
                  </div>
                ))}
                {todayReport.areasVisited.length > 5 && (
                  <div className="text-xs text-primary">
                    +{todayReport.areasVisited.length - 5} more areas
                  </div>
                )}
              </div>
            </div>

            {/* Alerts Today */}
            <div className="p-4 bg-muted/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="font-semibold">Alerts Today</span>
              </div>
              <div className="space-y-2">
                {todayReport.alertsTriggered.length === 0 ? (
                  <div className="text-sm text-success">No alerts today ✓</div>
                ) : (
                  todayReport.alertsTriggered.slice(0, 3).map((alert, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{alert.type}</span>
                      <Badge variant="outline" className={`text-xs ${getAlertColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Historical Reports */}
      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">Historical Reports</h3>
        
        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No reports generated yet. Generate your first report above.
            </div>
          ) : (
            reports
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .slice(0, 10)
              .map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-primary/10">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-bold">
                        {report.date.getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {report.date.toLocaleDateString('en', { month: 'short' })}
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-sm">
                        Safety Score: {report.safetyScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {report.totalSteps.toLocaleString()} steps • {report.avgHeartRate} BPM avg • {report.alertsTriggered.length} alerts
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Progress value={report.safetyScore} className="w-16 h-2" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadReport(report)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
          )}
        </div>

        {reports.length > 10 && (
          <div className="text-center mt-4">
            <Button variant="outline" size="sm">
              View All Reports ({reports.length})
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HealthReports;