
import { SackData } from "@/types";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { useState } from "react";

interface SackMapProps {
  sacks: SackData[];
}

// Simple map without actual map service integration
const SackMap = ({ sacks }: SackMapProps) => {
  const [selectedSack, setSelectedSack] = useState<SackData | null>(null);
  
  // Min and max coordinates from our data to normalize positions
  const minLat = 1.28;
  const maxLat = 1.34;
  const minLng = 103.84;
  const maxLng = 103.9;
  
  // Calculate relative position on our "map"
  const getPosition = (lat?: number, lng?: number) => {
    if (!lat || !lng) return { left: "50%", top: "50%" };
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100; // Invert Y as map coords are top to bottom
    
    return {
      left: `${x}%`,
      top: `${y}%`
    };
  };
  
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

  return (
    <Card className="relative overflow-hidden" style={{ height: "400px" }}>
      {/* Simple map background */}
      <div className="absolute inset-0 bg-gray-100">
        {/* Simplified roads */}
        <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-gray-300"></div>
        <div className="absolute top-0 bottom-0 left-[40%] w-[2px] bg-gray-300"></div>
        <div className="absolute top-[60%] left-[40%] right-0 h-[2px] bg-gray-300"></div>
        
        {/* Landmarks */}
        <div className="absolute top-[20%] left-[20%] bg-blue-200 p-2 rounded text-xs">
          Central Warehouse
        </div>
        <div className="absolute top-[50%] left-[60%] bg-purple-200 p-2 rounded text-xs">
          Eastern Field Center
        </div>
        <div className="absolute top-[70%] left-[80%] bg-green-200 p-2 rounded text-xs">
          Farmer Plantations
        </div>
      </div>
      
      {/* Map pins for each sack */}
      {sacks.map((sack) => {
        if (!sack.location) return null;
        const position = getPosition(sack.location.lat, sack.location.lng);
        
        return (
          <div
            key={sack.id}
            className={`absolute map-marker cursor-pointer ${getPinColor(sack.status)}`}
            style={{ 
              ...position, 
              transform: 'translate(-50%, -50%)' 
            }}
            onClick={() => setSelectedSack(sack)}
          >
            <MapPin size={24} />
          </div>
        );
      })}
      
      {/* Info box for selected sack */}
      {selectedSack && (
        <div 
          className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md max-w-[200px]"
          style={{ zIndex: 10 }}
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
            <p className="mt-1 text-xs text-gray-600">Farmer: {selectedSack.farmer}</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default SackMap;
