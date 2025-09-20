import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Fingerprint,
  Eye,
  Camera,
  CheckCircle,
  ArrowLeft,
  Zap,
  Heart,
  Activity,
  Plane,
  FileText,
  Droplets
} from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    emergencyContact: "",
    
    // KYC Information
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    idNumber: "",
    occupation: "",
    address: "",
    
    // Health Information
    bloodGroup: "",
    height: "",
    weight: "",
    bloodPressure: "",
    sugarLevel: "",
    fitnessLevel: "",
    allergies: "",
    medications: "",
    medicalConditions: [] as string[],
    
    // Travel Information
    purposeOfVisit: "",
    visitDuration: "",
    accommodationAddress: "",
    previousVisits: "",
    travelInsurance: ""
  });

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMedicalConditionChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: checked 
        ? [...prev.medicalConditions, condition]
        : prev.medicalConditions.filter(c => c !== condition)
    }));
  };

  const medicalConditionsList = [
    "Diabetes", "Hypertension", "Heart Disease", "Asthma", "Epilepsy", 
    "Arthritis", "Kidney Disease", "Liver Disease", "Cancer", "Mental Health Conditions",
    "Thyroid Disorders", "Blood Disorders", "Neurological Conditions", "Autoimmune Diseases",
    "Chronic Pain", "Sleep Disorders", "Digestive Disorders", "Skin Conditions", "None"
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const fitnessLevels = ["Excellent", "Very Good", "Good", "Fair", "Poor"];
  const visitPurposes = ["Tourism", "Business", "Medical", "Education", "Transit", "Family Visit", "Conference/Event"];
  const visitDurations = ["1-7 days", "1-2 weeks", "2-4 weeks", "1-2 months", "2-6 months", "More than 6 months"];

  const handleNext = () => {
    console.log("handleNext called, current step:", currentStep, "total steps:", totalSteps);
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      console.log("Moving to next step:", nextStep);
      setCurrentStep(nextStep);
    } else {
      console.log("Already at last step, cannot proceed");
    }
  };

  const handleGenerateID = () => {
    console.log("Generate ID button clicked! Current step:", currentStep);
    console.log("Is generating:", isGenerating);
    
    setIsGenerating(true);
    console.log("Set isGenerating to true");
    
    // Simulate blockchain ID generation with enhanced data
    setTimeout(() => {
      console.log("Timeout completed, moving to completion step");
      setIsGenerating(false);
      setCurrentStep(9); // Completion step (step 9)
      console.log("Moved to completion step 9");
    }, 4000);
  };

  const biometricSteps = [
    { icon: Camera, title: "Facial Recognition", description: "Capture secure facial biometrics", status: "pending" },
    { icon: Fingerprint, title: "Fingerprint Scan", description: "Record digital fingerprints", status: "pending" },
    { icon: Eye, title: "Retinal Scan", description: "Advanced eye verification", status: "pending" },
    { icon: Shield, title: "Blockchain Integration", description: "Generate quantum-secured ID", status: "pending" }
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
            <h1 className="text-3xl font-orbitron font-bold text-glow">Digital ID Registration</h1>
            <p className="text-muted-foreground font-rajdhani">
              Create your secure blockchain-verified tourist identity
            </p>
          </div>
        </div>
        
        <Badge variant="outline" className="animate-pulse-glow">
          <Shield className="w-4 h-4 mr-1" />
          SECURE REGISTRATION
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-rajdhani">Registration Progress</span>
          <span className="text-sm font-orbitron text-primary">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-3 safety-meter" />
      </div>

      <div className="max-w-4xl mx-auto">
        {currentStep === 1 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Provide your basic details for identity verification</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country of Origin</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="United States"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="+1 (555) 987-6543"
                  className="cyber-card"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={handleNext} className="glow-button font-orbitron">
                Continue to KYC Verification
                <FileText className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold mb-2">KYC Verification</h2>
              <p className="text-muted-foreground">Complete your identity verification details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  placeholder="e.g., American"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number</Label>
                <Input
                  id="passportNumber"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                  placeholder="A12345678"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idNumber">National ID Number</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="123456789"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  placeholder="Software Engineer"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Home Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Main Street, City, State/Province, Postal Code"
                  className="cyber-card"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="glow-button font-orbitron">
                Continue to Health Details
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold mb-2">Health Information</h2>
              <p className="text-muted-foreground">Provide your health details for emergency situations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                  <SelectTrigger className="cyber-card">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fitnessLevel">Fitness Level</Label>
                <Select onValueChange={(value) => handleInputChange("fitnessLevel", value)}>
                  <SelectTrigger className="cyber-card">
                    <SelectValue placeholder="Select fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    {fitnessLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="175"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="70"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                  placeholder="120/80"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sugarLevel">Sugar Level</Label>
                <Input
                  id="sugarLevel"
                  value={formData.sugarLevel}
                  onChange={(e) => handleInputChange("sugarLevel", e.target.value)}
                  placeholder="90 mg/dL"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="List any known allergies (food, medication, environmental)"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  placeholder="List current medications and dosages"
                  className="cyber-card"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="glow-button font-orbitron">
                Continue to Medical Conditions
                <Activity className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 4 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <Activity className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold mb-2">Medical Conditions</h2>
              <p className="text-muted-foreground">Select any existing medical conditions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalConditionsList.map((condition) => (
                <div key={condition} className="flex items-center space-x-2 cyber-card p-4">
                  <Checkbox
                    id={condition}
                    checked={formData.medicalConditions.includes(condition)}
                    onCheckedChange={(checked) => 
                      handleMedicalConditionChange(condition, checked as boolean)
                    }
                  />
                  <Label htmlFor={condition} className="text-sm">{condition}</Label>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="glow-button font-orbitron">
                Continue to Travel Info
                <Plane className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 5 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <Plane className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold mb-2">Travel Information</h2>
              <p className="text-muted-foreground">Provide details about your visit</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
                <Select onValueChange={(value) => handleInputChange("purposeOfVisit", value)}>
                  <SelectTrigger className="cyber-card">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitPurposes.map((purpose) => (
                      <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visitDuration">Visit Duration</Label>
                <Select onValueChange={(value) => handleInputChange("visitDuration", value)}>
                  <SelectTrigger className="cyber-card">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitDurations.map((duration) => (
                      <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="accommodationAddress">Accommodation Address</Label>
                <Textarea
                  id="accommodationAddress"
                  value={formData.accommodationAddress}
                  onChange={(e) => handleInputChange("accommodationAddress", e.target.value)}
                  placeholder="Hotel name and address or accommodation details"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousVisits">Previous Visits</Label>
                <Input
                  id="previousVisits"
                  value={formData.previousVisits}
                  onChange={(e) => handleInputChange("previousVisits", e.target.value)}
                  placeholder="Number of previous visits or 'First time'"
                  className="cyber-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travelInsurance">Travel Insurance</Label>
                <Input
                  id="travelInsurance"
                  value={formData.travelInsurance}
                  onChange={(e) => handleInputChange("travelInsurance", e.target.value)}
                  placeholder="Insurance company and policy number"
                  className="cyber-card"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="glow-button font-orbitron">
                Continue to Biometrics
                <Fingerprint className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 6 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <Fingerprint className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-orbitron font-bold mb-2">Biometric Verification</h2>
              <p className="text-muted-foreground">Secure your identity with advanced biometric scanning</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {biometricSteps.map((step, idx) => (
                <div key={idx} className="cyber-card p-6 text-center">
                  <step.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  <Button variant="outline" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Start Scan
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(5)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="glow-button font-orbitron">
                Continue to Permissions
                <MapPin className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 7 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold mb-2">Location & Permissions</h2>
              <p className="text-muted-foreground">Configure your safety monitoring preferences</p>
            </div>

            <div className="space-y-6">
              <div className="cyber-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">GPS Tracking</h3>
                    <p className="text-sm text-muted-foreground">Enable real-time location monitoring</p>
                  </div>
                  <Badge variant="outline" className="text-success border-success/30">
                    REQUIRED
                  </Badge>
                </div>
              </div>

              <div className="cyber-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Health Monitoring</h3>
                    <p className="text-sm text-muted-foreground">Track vitals and detect emergencies</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30">
                    RECOMMENDED
                  </Badge>
                </div>
              </div>

              <div className="cyber-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Emergency Contacts</h3>
                    <p className="text-sm text-muted-foreground">Allow automatic emergency notifications</p>
                  </div>
                  <Badge variant="outline" className="text-success border-success/30">
                    REQUIRED
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(6)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="glow-button font-orbitron">
                Generate Digital ID
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 8 && (
          <Card className="cyber-card p-8">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full border-4 flex items-center justify-center ${
                isGenerating ? 'border-primary animate-spin' : 'border-success'
              }`}>
                {isGenerating ? (
                  <Zap className="w-12 h-12 text-primary animate-pulse" />
                ) : (
                  <Shield className="w-12 h-12 text-primary" />
                )}
              </div>
              
              <h2 className="text-2xl font-orbitron font-bold mb-2">
                {isGenerating ? 'Generating Digital ID' : 'Ready to Generate'}
              </h2>
              <p className="text-muted-foreground">
                {isGenerating 
                  ? 'Creating your blockchain-secured identity with complete KYC and health data...' 
                  : 'Click below to create your quantum-encrypted digital ID with integrated health and travel data'
                }
              </p>
            </div>

            {isGenerating && (
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span>Encrypting biometric data...</span>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Processing health information...</span>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Validating KYC documents...</span>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Generating blockchain hash...</span>
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Registering with global network...</span>
                  <div className="w-5 h-5 border-2 border-muted border-t-transparent rounded-full animate-spin opacity-50" />
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button 
                onClick={handleGenerateID} 
                disabled={isGenerating}
                className="glow-button font-orbitron text-lg px-8 py-4"
              >
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Shield className="w-6 h-6 mr-3" />
                    Generate My Digital ID
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 9 && (
          <Card className="cyber-card p-8 text-center">
            <CheckCircle className="w-24 h-24 text-success mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-glow">
              Digital ID Generated Successfully!
            </h2>
            <p className="text-muted-foreground mb-8">
              Your quantum-encrypted tourist identity with complete KYC, health, and travel data has been created and registered on the blockchain
            </p>

            <div className="cyber-card p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">Your Digital ID Details:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ID Number:</span>
                  <span className="text-primary font-mono">STSE-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Blockchain Hash:</span>
                  <span className="text-primary font-mono">0x{Math.random().toString(16).slice(2, 10)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Blood Group:</span>
                  <span className="text-primary">{formData.bloodGroup || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Health Data:</span>
                  <span className="text-success">Encrypted & Secured</span>
                </div>
                <div className="flex justify-between">
                  <span>KYC Status:</span>
                  <span className="text-success">Verified</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Level:</span>
                  <span className="text-success">Quantum Encrypted</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-success">Active & Verified</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => navigate("/tourist-dashboard")} 
                className="w-full glow-button font-orbitron"
              >
                Access Tourist Dashboard
                <MapPin className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                onClick={() => navigate("/login")} 
                className="w-full glow-button font-orbitron"
                variant="outline"
              >
                Login to Portal
                <Shield className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="w-full"
              >
                Return to Home
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;