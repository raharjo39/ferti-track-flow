
import { SackData } from "@/types";
import { Card } from "@/components/ui/card";
import { MapPin, Truck, Package } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SackMapProps {
  sacks: SackData[];
  satelliteView?: boolean;
}

// OpenStreetMap integration
const SackMap = ({ sacks, satelliteView = false }: SackMapProps) => {
  const [selectedSack, setSelectedSack] = useState<SackData | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const [mapView, setMapView] = useState<'standard' | 'satellite'>('standard');
  
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

      // Create a layer group for markers
      markersLayer.current = L.layerGroup().addTo(leafletMap.current);
      
      // Add control layers for map types
      const standardMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      
      const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });
      
      if (satelliteView) {
        satelliteMap.addTo(leafletMap.current);
        setMapView('satellite');
      } else {
        standardMap.addTo(leafletMap.current);
        setMapView('standard');
      }
      
      const baseMaps = {
        "Standard": standardMap,
        "Satellite": satelliteMap
      };
      
      L.control.layers(baseMaps).addTo(leafletMap.current);
    }

    // Clean up on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [satelliteView]);
  
  // Update map view when satellite view changes
  useEffect(() => {
    if (!leafletMap.current) return;
    
    // Toggle between map views
    if (satelliteView && mapView !== 'satellite') {
      // Remove current tile layer
      leafletMap.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          leafletMap.current?.removeLayer(layer);
        }
      });
      
      // Add satellite layer
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(leafletMap.current);
      
      setMapView('satellite');
    } else if (!satelliteView && mapView !== 'standard') {
      // Remove current tile layer
      leafletMap.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          leafletMap.current?.removeLayer(layer);
        }
      });
      
      // Add standard layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap.current);
      
      setMapView('standard');
    }
  }, [satelliteView, mapView]);

  // Update markers when sacks change
  useEffect(() => {
    if (!leafletMap.current || !markersLayer.current) return;

    // Clear existing markers
    markersLayer.current.clearLayers();

    // Create marker icon based on status
    const createMarkerIcon = (status: string) => {
      const color = getMarkerColor(status);
      
      // Get the appropriate icon for different statuses
      const getIconHtml = () => {
        switch (status) {
          case 'in-transit':
            return `<div class="marker-icon bg-${color}-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M22 18h-2a1 1 0 0 1-1-1v-5l3-3v8a1 1 0 0 1-1 1Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`;
          case 'at-warehouse':
            return `<div class="marker-icon bg-${color}-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg></div>`;
          default:
            return `<div class="marker-icon bg-${color}-500"></div>`;
        }
      };
      
      return L.divIcon({
        html: getIconHtml(),
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
    };

    // Add markers for each sack
    sacks.forEach(sack => {
      if (sack.location && sack.location.lat && sack.location.lng) {
        const marker = L.marker([sack.location.lat, sack.location.lng], {
          icon: createMarkerIcon(sack.status),
          title: sack.location.name
        }).addTo(markersLayer.current!);

        // Add tooltip with location name
        marker.bindTooltip(`<b>${sack.id}</b><br>${sack.location.name}`);

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
        .marker-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .bg-blue-500 { background: #3b82f6; }
        .bg-orange-500 { background: #f97316; }
        .bg-purple-500 { background: #a855f7; }
        .bg-green-500 { background: #22c55e; }
        .bg-gray-500 { background: #6b7280; }
        
        .marker-ping {
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          transform-origin: center;
          animation: ping 1.5s ease-in-out infinite;
          background: rgba(34, 197, 94, 0.3);
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          70% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Add animated route for in-transit sacks
    const inTransitSacks = sacks.filter(s => s.status === 'in-transit');
    if (inTransitSacks.length > 0) {
      inTransitSacks.forEach(sack => {
        // Find destination (either field site or warehouse)
        const destinations = sacks.filter(s => s.status === 'at-field-site' || s.status === 'at-warehouse');
        if (destinations.length > 0 && sack.location) {
          // Get nearest destination
          const destination = destinations.reduce((nearest, current) => {
            if (!nearest.location || !current.location) return current;
            
            const distToNearest = calculateDistance(
              sack.location.lat, 
              sack.location.lng, 
              nearest.location.lat, 
              nearest.location.lng
            );
            
            const distToCurrent = calculateDistance(
              sack.location.lat, 
              sack.location.lng, 
              current.location.lat, 
              current.location.lng
            );
            
            return distToCurrent < distToNearest ? current : nearest;
          }, destinations[0]);
          
          if (destination.location) {
            // Draw route line
            const route = L.polyline([
              [sack.location.lat, sack.location.lng],
              [destination.location.lat, destination.location.lng]
            ], {
              color: '#f97316',
              weight: 3,
              opacity: 0.7,
              dashArray: '10, 10',
              animate: 1000 // Custom property for animation
            }).addTo(markersLayer.current!);
          }
        }
      });
    }

    // Adjust map view to fit all markers
    if (sacks.length > 0 && markersLayer.current.getLayers().length > 0) {
      const markerBounds = L.featureGroup(markersLayer.current.getLayers()).getBounds();
      leafletMap.current.fitBounds(markerBounds, { padding: [30, 30] });
    }
  }, [sacks]);
  
  // Helper function to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  return (
    <Card className="relative overflow-hidden" style={{ height: "400px" }}>
      {/* OpenStreetMap container */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full" />
      
      {/* Info box for selected sack */}
      {selectedSack && (
        <div 
          className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md max-w-[250px] z-[1000]"
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
          <div className="mt-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Kondisi:</span>
              <span className="text-green-600 font-medium">Normal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Suhu:</span>
              <span>26°C</span>
            </div>
          </div>
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
      
      {/* Live tracking badge */}
      <div className="absolute bottom-4 left-4 bg-green-50 text-green-800 border border-green-200 rounded px-2 py-1 text-xs flex items-center z-[1000]">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
        Live Tracking
      </div>
    </Card>
  );
};

export default SackMap;
