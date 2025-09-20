import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Star, Shield, MapPin, Car, Building, Coffee, ShoppingBag, CheckCircle, Search, Plus } from "lucide-react";

const TrustBadgeSystem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newReview, setNewReview] = useState({ serviceName: "", rating: 5, comment: "", location: "" });

  const trustedServices = [
    {
      id: 1,
      name: "Mario's Pizza Palace",
      type: "restaurant",
      address: "123 Main St, Manhattan",
      trustScore: 95,
      verified: true,
      averageRating: 4.8,
      totalReviews: 127
    },
    {
      id: 2,
      name: "SafeRide Taxi Co",
      type: "transportation", 
      address: "Citywide Service",
      trustScore: 89,
      verified: true,
      averageRating: 4.6,
      totalReviews: 203
    }
  ];

  const handleSubmitReview = () => {
    if (!newReview.serviceName || !newReview.comment) return;
    setNewReview({ serviceName: "", rating: 5, comment: "", location: "" });
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return Coffee;
      case 'transportation': return Car;
      case 'accommodation': return Building;
      case 'shopping': return ShoppingBag;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-orbitron font-bold">Trust Badge System</h2>
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">{trustedServices.filter(s => s.verified).length} VERIFIED SERVICES</Badge>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <Shield className="w-6 h-6 mx-auto mb-2 text-success" />
            <div className="text-2xl font-bold">{trustedServices.filter(s => s.verified).length}</div>
            <div className="text-sm text-muted-foreground">Verified Services</div>
          </div>
          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <Star className="w-6 h-6 mx-auto mb-2 text-warning" />
            <div className="text-2xl font-bold">{trustedServices.reduce((sum, s) => sum + s.totalReviews, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Reviews</div>
          </div>
          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-success" />
            <div className="text-2xl font-bold">{Math.round(trustedServices.reduce((sum, s) => sum + s.trustScore, 0) / trustedServices.length)}%</div>
            <div className="text-sm text-muted-foreground">Avg Trust Score</div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Services</TabsTrigger>
          <TabsTrigger value="review">Submit Review</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <Card className="cyber-card p-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </Card>

          <div className="space-y-4">
            {trustedServices.map((service) => {
              const ServiceIcon = getServiceIcon(service.type);
              return (
                <Card key={service.id} className="cyber-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ServiceIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        {service.verified && <CheckCircle className="w-5 h-5 text-success" />}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{service.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-success border-success/30">{service.trustScore}% Trust Score</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          <span>{service.averageRating} ({service.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="review">
          <Card className="cyber-card p-6">
            <h3 className="text-lg font-orbitron font-bold mb-6">Submit Service Review</h3>
            <div className="space-y-4">
              <Input placeholder="Service Name" value={newReview.serviceName} onChange={(e) => setNewReview(prev => ({ ...prev, serviceName: e.target.value }))} />
              <Input placeholder="Location" value={newReview.location} onChange={(e) => setNewReview(prev => ({ ...prev, location: e.target.value }))} />
              <div>
                <label className="text-sm font-semibold">Rating</label>
                <div className="flex items-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star key={rating} className={`w-8 h-8 cursor-pointer ${rating <= newReview.rating ? 'text-warning fill-current' : 'text-muted-foreground'}`} onClick={() => setNewReview(prev => ({ ...prev, rating }))} />
                  ))}
                </div>
              </div>
              <Textarea placeholder="Share your experience..." value={newReview.comment} onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))} rows={4} />
              <Button onClick={handleSubmitReview} className="w-full" disabled={!newReview.serviceName || !newReview.comment}>
                <Plus className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrustBadgeSystem;