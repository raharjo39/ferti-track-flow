
import { SackData, ScanEvent, User } from "../types";

// Mock RFID sack data
export const mockSacks: SackData[] = [
  {
    id: "S001",
    rfidTag: "RFID-001-2025-XYZ",
    status: "at-warehouse",
    location: {
      lat: 1.289494,
      lng: 103.849983,
      name: "Central Warehouse"
    },
    timestamps: {
      created: "2025-05-01T08:00:00Z",
      warehouse: "2025-05-01T08:30:00Z"
    },
    batch: "BT-2025-001"
  },
  {
    id: "S002",
    rfidTag: "RFID-002-2025-XYZ",
    status: "in-transit",
    location: {
      lat: 1.301256,
      lng: 103.856677,
      name: "In Transit"
    },
    timestamps: {
      created: "2025-05-01T08:05:00Z",
      warehouse: "2025-05-01T08:35:00Z",
      inTransit: "2025-05-05T09:15:00Z"
    },
    batch: "BT-2025-001"
  },
  {
    id: "S003",
    rfidTag: "RFID-003-2025-XYZ",
    status: "at-field-site",
    location: {
      lat: 1.320114,
      lng: 103.879509,
      name: "Eastern Field Distribution Center"
    },
    timestamps: {
      created: "2025-05-01T08:10:00Z",
      warehouse: "2025-05-01T08:40:00Z",
      inTransit: "2025-05-05T09:20:00Z",
      fieldSite: "2025-05-05T10:45:00Z"
    },
    batch: "BT-2025-001"
  },
  {
    id: "S004",
    rfidTag: "RFID-004-2025-XYZ",
    status: "with-farmer",
    location: {
      lat: 1.334627,
      lng: 103.894470,
      name: "Farmer John's Plantation"
    },
    timestamps: {
      created: "2025-05-01T08:15:00Z",
      warehouse: "2025-05-01T08:45:00Z",
      inTransit: "2025-05-05T09:25:00Z",
      fieldSite: "2025-05-05T10:50:00Z",
      farmer: "2025-05-05T14:30:00Z"
    },
    proofImage: "/placeholder.svg",
    batch: "BT-2025-001",
    farmer: "Farmer John"
  },
  {
    id: "S005",
    rfidTag: "RFID-005-2025-XYZ",
    status: "empty-returned",
    location: {
      lat: 1.320114,
      lng: 103.879509,
      name: "Eastern Field Distribution Center"
    },
    timestamps: {
      created: "2025-04-25T08:20:00Z",
      warehouse: "2025-04-25T08:50:00Z",
      inTransit: "2025-04-28T09:30:00Z",
      fieldSite: "2025-04-28T11:00:00Z",
      farmer: "2025-04-29T09:00:00Z",
      returned: "2025-05-05T08:15:00Z"
    },
    batch: "BT-2025-001",
    farmer: "Farmer Lisa"
  }
];

// Mock scan events
export const mockScanEvents: ScanEvent[] = [
  {
    id: "E001",
    type: "gate",
    location: "Central Warehouse",
    timestamp: "2025-05-01T08:30:00Z",
    rfidTag: "RFID-001-2025-XYZ",
    status: "Registered at warehouse",
    operator: "Alex Chen"
  },
  {
    id: "E002",
    type: "gate",
    location: "Central Warehouse Exit",
    timestamp: "2025-05-05T09:15:00Z",
    rfidTag: "RFID-002-2025-XYZ",
    status: "Dispatched from warehouse",
    operator: "Alex Chen"
  },
  {
    id: "E003",
    type: "gate",
    location: "Eastern Field Distribution Center",
    timestamp: "2025-05-05T10:45:00Z",
    rfidTag: "RFID-003-2025-XYZ",
    status: "Arrived at field site",
    operator: "Maria Wong"
  },
  {
    id: "E004",
    type: "gun",
    location: "Eastern Field Distribution Center",
    timestamp: "2025-05-05T13:20:00Z",
    rfidTag: "RFID-004-2025-XYZ",
    status: "Selected for farmer distribution",
    operator: "Maria Wong"
  },
  {
    id: "E005",
    type: "gun",
    location: "Farmer John's Plantation",
    timestamp: "2025-05-05T14:30:00Z",
    rfidTag: "RFID-004-2025-XYZ",
    status: "Delivered to farmer",
    operator: "John Smith"
  },
  {
    id: "E006",
    type: "gun",
    location: "Eastern Field Distribution Center",
    timestamp: "2025-05-05T08:15:00Z",
    rfidTag: "RFID-005-2025-XYZ",
    status: "Empty sack returned",
    operator: "Lisa Chen"
  }
];

// Mock users
export const mockUsers: User[] = [
  {
    id: "U001",
    name: "Alex Chen",
    role: "warehouse-manager",
    location: "Central Warehouse"
  },
  {
    id: "U002",
    name: "Maria Wong",
    role: "field-officer",
    location: "Eastern Field Distribution Center"
  },
  {
    id: "U003",
    name: "John Smith",
    role: "farmer",
    location: "Northern Plantation"
  },
  {
    id: "U004",
    name: "Lisa Chen",
    role: "farmer",
    location: "Eastern Plantation"
  }
];

// Utility function to get status badge colors
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'at-warehouse':
      return 'bg-blue-100 text-blue-800';
    case 'in-transit':
      return 'bg-yellow-100 text-yellow-800';
    case 'at-field-site':
      return 'bg-purple-100 text-purple-800';
    case 'with-farmer':
      return 'bg-green-100 text-green-800';
    case 'empty-returned':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'at-warehouse':
      return 'At Warehouse';
    case 'in-transit':
      return 'In Transit';
    case 'at-field-site':
      return 'At Field Site';
    case 'with-farmer':
      return 'With Farmer';
    case 'empty-returned':
      return 'Empty Returned';
    default:
      return status;
  }
};
