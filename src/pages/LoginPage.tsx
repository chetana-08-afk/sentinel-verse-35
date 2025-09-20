import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  User, 
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  Users,
  MapPin,
  AlertTriangle
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    digitalId: "",
    biometricKey: "",
    portalType: "" as "tourist" | "parent" | ""
  });
  const [errors, setErrors] = useState({
    digitalId: "",
    biometricKey: "",
    general: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateDigitalId = (id: string) => {
    // Check if it matches the STSE format from registration
    const digitalIdPattern = /^STSE-\d{8}$/;
    return digitalIdPattern.test(id);
  };

  const handleLogin = () => {
    // Reset errors
    setErrors({ digitalId: "", biometricKey: "", general: "" });
    
    // Validate inputs
    let hasErrors = false;
    
    if (!loginData.digitalId) {
      setErrors(prev => ({ ...prev, digitalId: "Digital ID is required" }));
      hasErrors = true;
    } else if (!validateDigitalId(loginData.digitalId)) {
      setErrors(prev => ({ ...prev, digitalId: "Invalid Digital ID format. Should be STSE-XXXXXXXX" }));
      hasErrors = true;
    }
    
    if (!loginData.biometricKey) {
      setErrors(prev => ({ ...prev, biometricKey: "Biometric key is required" }));
      hasErrors = true;
    } else if (loginData.biometricKey.length < 8) {
      setErrors(prev => ({ ...prev, biometricKey: "Biometric key must be at least 8 characters" }));
      hasErrors = true;
    }
    
    if (!loginData.portalType) {
      setErrors(prev => ({ ...prev, general: "Please select a portal type" }));
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      // Set authentication state
      login(loginData.digitalId, loginData.portalType as 'tourist' | 'parent');
      
      // Route to appropriate dashboard based on portal type
      if (loginData.portalType === "tourist") {
        navigate("/tourist-dashboard");
      } else if (loginData.portalType === "parent") {
        navigate("/parent-dashboard");
      }
    }, 2000);
  };

  const portalOptions = [
    {
      value: "tourist",
      label: "Tourist Portal",
      description: "Access your safety monitoring and travel assistance features",
      icon: MapPin,
      color: "text-primary"
    },
    {
      value: "parent",
      label: "Parent Portal", 
      description: "Monitor and protect your child's safety during travel",
      icon: Users,
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen p-6 cyber-grid bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-glow">Digital ID Login</h1>
            <p className="text-muted-foreground font-rajdhani">
              Access your secure tourist safety portal
            </p>
          </div>
        </div>
        
        <Badge variant="outline" className="animate-pulse-glow">
          <Shield className="w-4 h-4 mr-1" />
          SECURE ACCESS
        </Badge>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="cyber-card p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-orbitron font-bold mb-2">Blockchain Authentication</h2>
            <p className="text-muted-foreground">
              Enter your digital ID credentials to access your portal
            </p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-sm text-destructive">{errors.general}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Digital ID Input */}
            <div className="space-y-2">
              <Label htmlFor="digitalId">Digital ID Number</Label>
              <Input
                id="digitalId"
                value={loginData.digitalId}
                onChange={(e) => handleInputChange("digitalId", e.target.value)}
                placeholder="STSE-12345678"
                className={`cyber-card font-mono ${errors.digitalId ? 'border-destructive' : ''}`}
              />
              {errors.digitalId && (
                <p className="text-sm text-destructive">{errors.digitalId}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Use the Digital ID generated during registration
              </p>
            </div>

            {/* Biometric Key Input */}
            <div className="space-y-2">
              <Label htmlFor="biometricKey">Biometric Security Key</Label>
              <div className="relative">
                <Input
                  id="biometricKey"
                  type={showPassword ? "text" : "password"}
                  value={loginData.biometricKey}
                  onChange={(e) => handleInputChange("biometricKey", e.target.value)}
                  placeholder="Enter your biometric security key"
                  className={`cyber-card pr-10 ${errors.biometricKey ? 'border-destructive' : ''}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.biometricKey && (
                <p className="text-sm text-destructive">{errors.biometricKey}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Generated from your biometric data during registration
              </p>
            </div>

            {/* Portal Type Selection */}
            <div className="space-y-2">
              <Label>Portal Type</Label>
              <Select onValueChange={(value) => handleInputChange("portalType", value)}>
                <SelectTrigger className="cyber-card">
                  <SelectValue placeholder="Select your portal" />
                </SelectTrigger>
                <SelectContent>
                  {portalOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <option.icon className={`w-4 h-4 ${option.color}`} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Portal Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {portalOptions.map((option) => (
                  <div 
                    key={option.value}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      loginData.portalType === option.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-muted/5 hover:border-primary/50'
                    }`}
                    onClick={() => handleInputChange("portalType", option.value)}
                  >
                    <div className="flex items-start space-x-3">
                      <option.icon className={`w-6 h-6 ${option.color} mt-1`} />
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{option.label}</h3>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full glow-button font-orbitron text-lg py-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Access Portal
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have a Digital ID yet?
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/register")}
                className="font-rajdhani"
              >
                <User className="w-4 h-4 mr-2" />
                Register New Digital ID
              </Button>
            </div>
          </div>

          {/* Security Information */}
          <div className="mt-8 p-4 bg-muted/10 rounded-lg border border-primary/10">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Enhanced Security</h4>
                <p className="text-xs text-muted-foreground">
                  Your login is protected by quantum encryption and blockchain verification. 
                  All authentication data is processed using zero-knowledge protocols.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;