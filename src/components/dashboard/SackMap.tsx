
import { SackData } from "@/types";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SackMapProps {
  sacks: SackData[];
}

// OpenStreetMap integration
const SackMap = ({ sacks }: SackMapProps) => {
  const [selectedSack, setSelectedSack] = useState<SackData | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  
  // Get pin color based on status
  const getPinColor = (status: string) => {
    switch (status) {
      case 'at-warehouse': return 'text-blue-500';
      case 'in-transit': return 'text-yellow-500';
      case 'at-field-site': return 'text-purple-500';
      case 'with-farmer': return 'text-green-500';
      case 'empty-returned': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };
  
  // Get marker color based on status
  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'at-warehouse': return 'blue';
      case 'in-transit': return 'orange';
      case 'at-field-site': return 'purple';
      case 'with-farmer': return 'green';
      case 'empty-returned': return 'gray';
      default: return 'gray';
    }
  };

  // Initialize map when component mounts
  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      // Initialize the map
      leafletMap.current = L.map(mapRef.current).setView([-6.5984157, 106.7976839], 10);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap.current);

      // Create a layer group for markers
      markersLayer.current = L.layerGroup().addTo(leafletMap.current);
    }

    // Clean up on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  // Update markers when sacks change
  useEffect(() => {
    if (!leafletMap.current || !markersLayer.current) return;

    // Clear existing markers
    markersLayer.current.clearLayers();

    // Create custom marker icon
    const createMarkerIcon = (status: string) => {
      const markerColor = getMarkerColor(status);
      return L.divIcon({
        className: `custom-marker-icon marker-${markerColor}`,
        html: `<div class="marker-pin bg-${markerColor}-500"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });
    };

    // Add markers for each sack
    sacks.forEach(sack => {
      if (sack.location && sack.location.lat && sack.location.lng) {
        const marker = L.marker([sack.location.lat, sack.location.lng], {
          icon: createMarkerIcon(sack.status),
          title: sack.location.name
        }).addTo(markersLayer.current!);

        // Add click event to marker
        marker.on('click', () => {
          setSelectedSack(sack);
        });
      }
    });

    // Adjust map view to fit all markers
    if (sacks.length > 0 && markersLayer.current.getLayers().length > 0) {
      const markerBounds = L.featureGroup(markersLayer.current.getLayers()).getBounds();
      leafletMap.current.fitBounds(markerBounds, { padding: [30, 30] });
    }
  }, [sacks]);

  return (
    <Card className="relative overflow-hidden" style={{ height: "400px" }}>
      {/* OpenStreetMap container */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full" />
      
      {/* Info box for selected sack */}
      {selectedSack && (
        <div 
          className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md max-w-[200px] z-[1000]"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">Sack {selectedSack.id}</h4>
            <button 
              className="text-gray-500 text-xs"
              onClick={() => setSelectedSack(null)}
            >
              ✕
            </button>
          </div>
          <StatusBadge status={selectedSack.status} />
          <p className="mt-2 text-xs">{selectedSack.location?.name}</p>
          {selectedSack.farmer && (
            <p className="mt-1 text-xs text-gray-600">Petani: {selectedSack.farmer}</p>
          )}
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white/90 p-2 rounded shadow-sm z-[1000] text-xs">
        <div className="font-medium mb-1">Status Karung:</div>
        <div className="grid gap-1">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Di Gudang</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span>Dalam Perjalanan</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span>Di Pusat Lapangan</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Dengan Petani</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
            <span>Karung Dikembalikan</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SackMap;
