import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Settings, AlertTriangle } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  timestamp: Date;
  accuracy?: number;
}

interface GeoBoundary {
  lat: number;
  lng: number;
  radius: number; // in meters
  name: string;
}

interface MapComponentProps {
  childLocation: Location;
  geoBoundaries: GeoBoundary[];
  onBoundaryAlert?: (boundary: GeoBoundary, location: Location) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  childLocation, 
  geoBoundaries, 
  onBoundaryAlert 
}) => {
  const [mapProvider, setMapProvider] = useState<'osm' | 'google'>('osm');
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);

  // Check if child is outside any safe boundaries
  useEffect(() => {
    geoBoundaries.forEach(boundary => {
      const distance = calculateDistance(
        childLocation.lat, 
        childLocation.lng,
        boundary.lat,
        boundary.lng
      );
      
      if (distance > boundary.radius && onBoundaryAlert) {
        onBoundaryAlert(boundary, childLocation);
      }
    });
  }, [childLocation, geoBoundaries, onBoundaryAlert]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const getTileLayerUrl = () => {
    if (mapProvider === 'google' && googleMapsApiKey) {
      return `https://maps.googleapis.com/maps/api/staticmap?center={lat},{lng}&zoom={z}&size=256x256&maptype=roadmap&key=${googleMapsApiKey}`;
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  const getTileLayerAttribution = () => {
    if (mapProvider === 'google') {
      return '© Google Maps';
    }
    return '© OpenStreetMap contributors';
  };

  return (
    <Card className="cyber-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-orbitron font-bold">Live Location Tracking</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiInput(!showApiInput)}
          >
            <Settings className="w-4 h-4 mr-1" />
            Map Settings
          </Button>
          <Badge variant="outline" className="text-primary border-primary/30">
            <MapPin className="w-3 h-3 mr-1" />
            REAL-TIME
          </Badge>
        </div>
      </div>

      {showApiInput && (
        <div className="mb-4 p-4 bg-muted/10 rounded-lg border">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="mapProvider"
                  checked={mapProvider === 'osm'}
                  onChange={() => setMapProvider('osm')}
                />
                <span>OpenStreetMap (Free)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="mapProvider"
                  checked={mapProvider === 'google'}
                  onChange={() => setMapProvider('google')}
                />
                <span>Google Maps</span>
              </label>
            </div>
            
            {mapProvider === 'google' && (
              <div>
                <Input
                  placeholder="Enter Google Maps API Key"
                  value={googleMapsApiKey}
                  onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                  className="cyber-card"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Get your API key from Google Cloud Console
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="relative h-80 rounded-lg overflow-hidden border border-primary/20">
        <MapContainer
          center={[childLocation.lat, childLocation.lng]}
          zoom={15}
          className="h-full w-full"
        >
          <TileLayer
            url={getTileLayerUrl()}
            attribution={getTileLayerAttribution()}
          />
          
          {/* Child's current location */}
          <Marker position={[childLocation.lat, childLocation.lng]}>
            <Popup>
              <div className="text-center">
                <strong>Child's Location</strong>
                <br />
                <small>
                  Last updated: {childLocation.timestamp.toLocaleTimeString()}
                  {childLocation.accuracy && (
                    <><br />Accuracy: ±{childLocation.accuracy}m</>
                  )}
                </small>
              </div>
            </Popup>
          </Marker>

          {/* Geo-safe boundaries */}
          {geoBoundaries.map((boundary, index) => (
            <Circle
              key={index}
              center={[boundary.lat, boundary.lng]}
              radius={boundary.radius}
              pathOptions={{
                color: '#10b981',
                fillColor: '#10b981',
                fillOpacity: 0.1,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-center">
                  <strong>{boundary.name}</strong>
                  <br />
                  <small>Safe Zone ({boundary.radius}m radius)</small>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center justify-between">
          <span>Coordinates:</span>
          <span className="font-mono text-xs">
            {childLocation.lat.toFixed(6)}, {childLocation.lng.toFixed(6)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Last Update:</span>
          <span>{childLocation.timestamp.toLocaleTimeString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default MapComponent;