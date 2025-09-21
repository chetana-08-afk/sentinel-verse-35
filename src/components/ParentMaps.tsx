import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Settings, AlertTriangle, Shield, Eye } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  timestamp: Date;
  accuracy?: number;
}

interface GeoBoundary {
  lat: number;
  lng: number;
  radius: number;
  name: string;
}

interface ParentMapsProps {
  childLocation: Location;
  geoBoundaries: GeoBoundary[];
  onBoundaryAlert?: (boundary: GeoBoundary, location: Location) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const ParentMaps = ({ childLocation, geoBoundaries, onBoundaryAlert }: ParentMapsProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showApiInput, setShowApiInput] = useState(true);
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const loadGoogleMapsScript = () => {
    if (!apiKey) return;

    // Remove existing script if any
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsMapLoaded(true);
      initializeMap();
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Maps script');
      alert('Failed to load Google Maps. Please check your API key.');
    };
    
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google || !isMapLoaded) return;

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: childLocation.lat, lng: childLocation.lng },
      zoom: 15,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ saturation: -15 }, { lightness: 5 }]
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [{ color: '#1e40af' }, { lightness: 20 }]
        }
      ]
    });

    setMap(googleMap);

    // Add child location marker
    const childMarker = new window.google.maps.Marker({
      position: { lat: childLocation.lat, lng: childLocation.lng },
      map: googleMap,
      title: 'Child\'s Current Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#ef4444" stroke="#ffffff" stroke-width="3"/>
            <circle cx="20" cy="20" r="8" fill="#ffffff"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 20)
      }
    });

    // Add info window for child location
    const childInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 5px 0; font-weight: bold;">Child's Location</h3>
          <p style="margin: 0; font-size: 12px;">Last updated: ${childLocation.timestamp.toLocaleTimeString()}</p>
          ${childLocation.accuracy ? `<p style="margin: 0; font-size: 12px;">Accuracy: ±${childLocation.accuracy}m</p>` : ''}
        </div>
      `
    });

    childMarker.addListener('click', () => {
      childInfoWindow.open(googleMap, childMarker);
    });

    // Add geo-safe boundaries
    geoBoundaries.forEach((boundary, index) => {
      // Create circle for safe zone
      const circle = new window.google.maps.Circle({
        strokeColor: '#10b981',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#10b981',
        fillOpacity: 0.15,
        map: googleMap,
        center: { lat: boundary.lat, lng: boundary.lng },
        radius: boundary.radius
      });

      // Add marker for zone center
      const zoneMarker = new window.google.maps.Marker({
        position: { lat: boundary.lat, lng: boundary.lng },
        map: googleMap,
        title: boundary.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="13" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
              <text x="15" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="bold">S</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 30),
          anchor: new window.google.maps.Point(15, 15)
        }
      });

      // Add info window for safe zone
      const zoneInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; font-weight: bold;">${boundary.name}</h3>
            <p style="margin: 0; font-size: 12px;">Safe Zone (${boundary.radius}m radius)</p>
          </div>
        `
      });

      zoneMarker.addListener('click', () => {
        zoneInfoWindow.open(googleMap, zoneMarker);
      });

      // Check if child is outside boundary
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(childLocation.lat, childLocation.lng),
        new window.google.maps.LatLng(boundary.lat, boundary.lng)
      );

      if (distance > boundary.radius && onBoundaryAlert) {
        onBoundaryAlert(boundary, childLocation);
      }
    });
  };

  useEffect(() => {
    if (apiKey && isMapLoaded) {
      initializeMap();
    }
  }, [childLocation, geoBoundaries, isMapLoaded]);

  const handleLoadMap = () => {
    if (!apiKey.trim()) {
      alert('Please enter your Google Maps API key');
      return;
    }
    setShowApiInput(false);
    loadGoogleMapsScript();
  };

  const resetApiKey = () => {
    setApiKey("");
    setIsMapLoaded(false);
    setShowApiInput(true);
    setMap(null);
    
    // Remove the script
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.remove();
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Interactive Maps</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiInput(!showApiInput)}
          >
            <Settings className="w-4 h-4 mr-1" />
            {isMapLoaded ? 'Change API Key' : 'Settings'}
          </Button>
          <Badge variant="outline" className="text-primary border-primary/30">
            <MapPin className="w-3 h-3 mr-1" />
            GOOGLE MAPS
          </Badge>
        </div>
      </div>

      {(showApiInput || !isMapLoaded) && (
        <div className="mb-4 p-4 bg-muted/10 rounded-lg border">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Google Maps API Key
              </label>
              <Input
                type="password"
                placeholder="Enter your Google Maps API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a 
                  href="https://console.cloud.google.com/google/maps-apis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Cloud Console
                </a>
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleLoadMap} disabled={!apiKey.trim()}>
                Load Map
              </Button>
              {isMapLoaded && (
                <Button variant="outline" onClick={resetApiKey}>
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {!isMapLoaded && !showApiInput && (
        <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
          </div>
        </div>
      )}

      {!isMapLoaded && showApiInput && (
        <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Enter your Google Maps API key to view the interactive map</p>
          </div>
        </div>
      )}
      
      {isMapLoaded && (
        <div className="relative h-80 rounded-lg overflow-hidden border border-primary/20">
          <div ref={mapRef} className="h-full w-full" />
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center justify-between">
          <span>Child Location:</span>
          <span className="font-mono text-xs">
            {childLocation.lat.toFixed(6)}, {childLocation.lng.toFixed(6)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Last Update:</span>
          <span>{childLocation.timestamp.toLocaleTimeString()}</span>
        </div>
      </div>

      {geoBoundaries.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Safe Zones:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {geoBoundaries.map((boundary, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/10 rounded">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="text-sm">{boundary.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{boundary.radius}m</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ParentMaps;