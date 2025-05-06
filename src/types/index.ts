
export interface SackData {
  id: string;
  rfidTag: string;
  status: 'at-warehouse' | 'in-transit' | 'at-field-site' | 'with-farmer' | 'empty-returned';
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  timestamps: {
    created: string;
    warehouse?: string;
    inTransit?: string;
    fieldSite?: string;
    farmer?: string;
    returned?: string;
  };
  proofImage?: string;
  batch: string;
  farmer?: string;
}

export interface ScanEvent {
  id: string;
  type: 'gate' | 'gun';
  location: string;
  timestamp: string;
  rfidTag: string;
  status: string;
  operator?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'warehouse-manager' | 'field-officer' | 'farmer';
  location?: string;
}

export interface FarmerPersona {
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
