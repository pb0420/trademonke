'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationServiceProps {
  onLocationUpdate: (location: LocationData | null) => void;
  className?: string;
}

export function LocationService({ onLocationUpdate, className }: LocationServiceProps) {
  const [loading, setLoading] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    // Check if location is already stored
    const stored = localStorage.getItem('user-location');
    if (stored) {
      try {
        const location = JSON.parse(stored);
        setHasLocation(true);
        onLocationUpdate(location);
      } catch (error) {
        console.error('Error parsing stored location:', error);
      }
    }
  }, [onLocationUpdate]);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding to get address (mock implementation)
      const address = await reverseGeocode(latitude, longitude);
      
      const locationData: LocationData = {
        latitude,
        longitude,
        address
      };

      // Store location
      localStorage.setItem('user-location', JSON.stringify(locationData));
      
      setHasLocation(true);
      onLocationUpdate(locationData);
      
      toast.success(`Location updated: ${address || 'Location found'}`);
    } catch (error: any) {
      console.error('Error getting location:', error);
      
      let errorMessage = 'Unable to get your location';
      if (error.code === 1) {
        errorMessage = 'Location access denied. Please enable location services.';
      } else if (error.code === 2) {
        errorMessage = 'Location unavailable. Please try again.';
      } else if (error.code === 3) {
        errorMessage = 'Location request timed out. Please try again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearLocation = () => {
    localStorage.removeItem('user-location');
    setHasLocation(false);
    onLocationUpdate(null);
    toast.success('Location cleared');
  };

  return (
    <div className={className}>
      {hasLocation ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={clearLocation}
          className="text-xs rounded-full bg-green-100 text-green-700 hover:bg-green-200 border-0"
        >
          <MapPin className="h-3 w-3 mr-1 text-green-500" />
          Location Set
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          disabled={loading}
          className="text-xs rounded-full bg-white/80 border-muted hover:bg-white hover:shadow-md"
        >
          {loading ? (
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          ) : (
            <MapPin className="h-3 w-3 mr-1" />
          )}
          {loading ? 'Finding...' : 'Near me'}
        </Button>
      )}
    </div>
  );
}

// Mock reverse geocoding function
async function reverseGeocode(lat: number, lon: number): Promise<string> {
  // In a real app, you would use a service like Google Maps API or OpenStreetMap
  // For now, return a mock address based on coordinates
  
  // Sydney area coordinates
  if (lat > -34.0 && lat < -33.5 && lon > 151.0 && lon < 151.5) {
    const areas = ['Sydney CBD', 'Bondi', 'Manly', 'Parramatta', 'Chatswood', 'Surry Hills', 'Newtown'];
    return areas[Math.floor(Math.random() * areas.length)] + ', NSW';
  }
  
  // Melbourne area
  if (lat > -38.0 && lat < -37.5 && lon > 144.5 && lon < 145.5) {
    return 'Melbourne, VIC';
  }
  
  // Default
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}