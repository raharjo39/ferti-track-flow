
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
      // Initialize the map centered on Indonesia
      leafletMap.current = L.map(mapRef.current).setView([-2.5489, 118.0149], 5);

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

    // Create custom marker icons
    const createCustomIcon = (status: string) => {
      const color = getMarkerColor(status);
      return L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin bg-${color}-500"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });
    };

    // Add markers for each sack
    sacks.forEach(sack => {
      if (sack.location && sack.location.lat && sack.location.lng) {
        const marker = L.marker([sack.location.lat, sack.location.lng], {
          icon: createCustomIcon(sack.status),
          title: sack.location.name
        }).addTo(markersLayer.current!);

        // Add tooltip with location name
        marker.bindTooltip(sack.location.name);

        // Add click event to marker
        marker.on('click', () => {
          setSelectedSack(sack);
        });
      }
    });

    // Add CSS for custom markers if it doesn't exist
    if (!document.getElementById('marker-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'marker-styles';
      styleEl.innerHTML = `
        .custom-marker {
          background-color: transparent;
          border: none;
        }
        .marker-pin {
          width: 18px;
          height: 18px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          position: relative;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        }
        .marker-pin::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 4px;
          left: 4px;
        }
        .bg-blue-500 { background: #3b82f6; }
        .bg-orange-500 { background: #f97316; }
        .bg-purple-500 { background: #a855f7; }
        .bg-green-500 { background: #22c55e; }
        .bg-gray-500 { background: #6b7280; }
      `;
      document.head.appendChild(styleEl);
    }

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
            <h4 className="font-medium">Karung {selectedSack.id}</h4>
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
