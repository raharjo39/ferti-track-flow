
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Plant, Home, Ruler } from "lucide-react";

interface FarmerPersonaProps {
  farmer: {
    id: string;
    name: string;
    age: number;
    location: {
      village: string;
      district: string;
      regency: string;
      province: string;
      coordinates: {
        lat: number;
        lng: number;
      }
    };
    photo: string;
    farmDetails: {
      size: string;
      crops: string[];
      annualProduction: string;
      fertilizerUsage: string;
    };
    bio: string;
  }
}

const FarmerPersona = ({ farmer }: FarmerPersonaProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={farmer.photo} alt={farmer.name} />
            <AvatarFallback>{farmer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{farmer.name}</CardTitle>
            <CardDescription>Usia {farmer.age} tahun</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
            <Home className="h-4 w-4" /> Lokasi
          </h4>
          <div className="text-sm">
            <p>{farmer.location.village}</p>
            <p>{farmer.location.district}, {farmer.location.regency}</p>
            <p>{farmer.location.province}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
            <Plant className="h-4 w-4" /> Informasi Pertanian
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Ruler className="h-3 w-3 text-gray-500" /> 
              <span>Luas:</span>
            </div>
            <div>{farmer.farmDetails.size}</div>
            
            <div className="flex items-center gap-2">
              <Plant className="h-3 w-3 text-gray-500" /> 
              <span>Tanaman:</span>
            </div>
            <div>{farmer.farmDetails.crops.join(', ')}</div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🌾</span> 
              <span>Produksi:</span>
            </div>
            <div>{farmer.farmDetails.annualProduction}</div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🧪</span> 
              <span>Pupuk:</span>
            </div>
            <div>{farmer.farmDetails.fertilizerUsage}</div>
          </div>
        </div>
        
        <div className="pt-1">
          <p className="text-sm italic">{farmer.bio}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-green-50 text-xs text-green-800">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>
            Koordinat: {farmer.location.coordinates.lat}, {farmer.location.coordinates.lng}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FarmerPersona;
