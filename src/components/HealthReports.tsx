import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Calendar as CalendarIcon, Activity, MapPin, Heart } from "lucide-react";

interface HealthReportsProps {
  onGenerateReport: (date: Date) => Promise<any>;
  reports: any[];
}

const HealthReports = ({ onGenerateReport, reports }: HealthReportsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDate] = useState<Date>(new Date());

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await onGenerateReport(selectedDate);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = (report: any) => {
    const reportData = {
      generatedDate: new Date().toISOString(),
      reportDate: report.date.toDateString(),
      summary: {
        totalSteps: report.totalSteps,
        avgHeartRate: report.avgHeartRate,
        safetyScore: `${report.safetyScore}%`
      }
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-report-${report.date.toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-orbitron font-bold">Health & Safety Reports</h2>
        </div>

        <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full h-12" size="lg">
          {isGenerating ? (
            <>
              <Activity className="w-5 h-5 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2" />
              Generate Health Report for {selectedDate.toDateString()}
            </>
          )}
        </Button>

        {isGenerating && <Progress value={undefined} className="h-2 mt-4" />}
      </Card>

      <Card className="cyber-card p-6">
        <h3 className="text-lg font-orbitron font-bold mb-4">Generated Reports ({reports.length})</h3>
        {reports.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No reports generated yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, idx) => (
              <div key={idx} className="border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">{report.date.toDateString()}</h4>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report)}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-background/50 rounded">
                    <Activity className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold">{report.totalSteps?.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Steps</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded">
                    <Heart className="w-5 h-5 mx-auto mb-1 text-destructive" />
                    <div className="text-lg font-bold">{report.avgHeartRate}</div>
                    <div className="text-xs text-muted-foreground">Avg BPM</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded">
                    <MapPin className="w-5 h-5 mx-auto mb-1 text-success" />
                    <div className="text-lg font-bold">{report.distanceTraveled}km</div>
                    <div className="text-xs text-muted-foreground">Distance</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default HealthReports;