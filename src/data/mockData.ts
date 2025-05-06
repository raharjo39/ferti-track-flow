import { SackData, ScanEvent, User } from "../types";

// Mock RFID sack data with Indonesian locations
export const mockSacks: SackData[] = [
  {
    id: "S001",
    rfidTag: "RFID-001-2025-XYZ",
    status: "at-warehouse",
    location: {
      lat: -6.1753924,
      lng: 106.8271528,
      name: "Gudang Pusat Jakarta"
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
      lat: -6.9034443,
      lng: 107.6431575,
      name: "Dalam Perjalanan ke Bandung"
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
      lat: -7.7971173,
      lng: 110.3687685,
      name: "Pusat Distribusi Yogyakarta"
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
      lat: -8.4095178,
      lng: 115.188916,
      name: "Area Pertanian Bali"
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
    farmer: "Pak Wayan"
  },
  {
    id: "S005",
    rfidTag: "RFID-005-2025-XYZ",
    status: "empty-returned",
    location: {
      lat: -0.9415846,
      lng: 100.4172783,
      name: "Pusat Pengumpulan Padang"
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
    farmer: "Bu Minah"
  },
  {
    id: "S006",
    rfidTag: "RFID-006-2025-XYZ",
    status: "at-warehouse",
    location: {
      lat: -2.9706452,
      lng: 104.7754636,
      name: "Gudang Palembang"
    },
    timestamps: {
      created: "2025-05-02T10:20:00Z",
      warehouse: "2025-05-02T11:15:00Z"
    },
    batch: "BT-2025-002"
  },
  {
    id: "S007",
    rfidTag: "RFID-007-2025-XYZ",
    status: "in-transit",
    location: {
      lat: -3.6553743,
      lng: 128.1806591,
      name: "Pengiriman ke Ambon"
    },
    timestamps: {
      created: "2025-05-02T10:25:00Z",
      warehouse: "2025-05-02T11:20:00Z",
      inTransit: "2025-05-06T08:45:00Z"
    },
    batch: "BT-2025-002"
  },
  {
    id: "S008",
    rfidTag: "RFID-008-2025-XYZ",
    status: "at-field-site",
    location: {
      lat: -5.1342962,
      lng: 119.4124282,
      name: "Pusat Distribusi Makassar"
    },
    timestamps: {
      created: "2025-05-02T10:30:00Z",
      warehouse: "2025-05-02T11:25:00Z",
      inTransit: "2025-05-06T08:50:00Z",
      fieldSite: "2025-05-06T14:30:00Z"
    },
    batch: "BT-2025-002"
  },
  {
    id: "S009",
    rfidTag: "RFID-009-2025-XYZ",
    status: "with-farmer",
    location: {
      lat: -8.5901041,
      lng: 116.096962,
      name: "Lahan Pertanian Lombok"
    },
    timestamps: {
      created: "2025-05-02T10:35:00Z",
      warehouse: "2025-05-02T11:30:00Z",
      inTransit: "2025-05-06T08:55:00Z",
      fieldSite: "2025-05-06T14:35:00Z",
      farmer: "2025-05-07T09:30:00Z"
    },
    proofImage: "/placeholder.svg",
    batch: "BT-2025-002",
    farmer: "Pak Hasan"
  },
  {
    id: "S010",
    rfidTag: "RFID-010-2025-XYZ",
    status: "empty-returned",
    location: {
      lat: 3.5951956,
      lng: 98.6722227,
      name: "Pusat Pengumpulan Medan"
    },
    timestamps: {
      created: "2025-04-27T09:10:00Z",
      warehouse: "2025-04-27T10:05:00Z",
      inTransit: "2025-04-30T08:45:00Z",
      fieldSite: "2025-04-30T16:20:00Z",
      farmer: "2025-05-01T08:45:00Z",
      returned: "2025-05-06T10:25:00Z"
    },
    batch: "BT-2025-002",
    farmer: "Bu Sari"
  }
];

// Mock scan events
export const mockScanEvents: ScanEvent[] = [
  {
    id: "E001",
    type: "gate",
    location: "Gudang Pusat Jakarta",
    timestamp: "2025-05-01T08:30:00Z",
    rfidTag: "RFID-001-2025-XYZ",
    status: "Terdaftar di gudang",
    operator: "Budi Santoso"
  },
  {
    id: "E002",
    type: "gate",
    location: "Gudang Pusat Jakarta",
    timestamp: "2025-05-05T09:15:00Z",
    rfidTag: "RFID-002-2025-XYZ",
    status: "Dikirim dari gudang",
    operator: "Budi Santoso"
  },
  {
    id: "E003",
    type: "gate",
    location: "Pusat Distribusi Yogyakarta",
    timestamp: "2025-05-05T10:45:00Z",
    rfidTag: "RFID-003-2025-XYZ",
    status: "Sampai di lokasi lapangan",
    operator: "Wati Susanti"
  },
  {
    id: "E004",
    type: "gun",
    location: "Pusat Distribusi Yogyakarta",
    timestamp: "2025-05-05T13:20:00Z",
    rfidTag: "RFID-004-2025-XYZ",
    status: "Dipilih untuk distribusi ke petani",
    operator: "Wati Susanti"
  },
  {
    id: "E005",
    type: "gun",
    location: "Area Pertanian Bali",
    timestamp: "2025-05-05T14:30:00Z",
    rfidTag: "RFID-004-2025-XYZ",
    status: "Dikirim ke petani",
    operator: "Pak Wayan"
  },
  {
    id: "E006",
    type: "gun",
    location: "Pusat Pengumpulan Padang",
    timestamp: "2025-05-05T08:15:00Z",
    rfidTag: "RFID-005-2025-XYZ",
    status: "Karung kosong dikembalikan",
    operator: "Bu Minah"
  }
];

// Mock users with Indonesian profiles
export const mockUsers: User[] = [
  {
    id: "U001",
    name: "Budi Santoso",
    role: "warehouse-manager",
    location: "Gudang Pusat Jakarta"
  },
  {
    id: "U002",
    name: "Wati Susanti",
    role: "field-officer",
    location: "Pusat Distribusi Bogor"
  },
  {
    id: "U003",
    name: "Joko Widodo",
    role: "farmer",
    location: "Perkebunan Bogor Utara"
  },
  {
    id: "U004",
    name: "Siti Aminah",
    role: "farmer",
    location: "Perkebunan Bogor Timur"
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
      return 'Di Gudang';
    case 'in-transit':
      return 'Dalam Perjalanan';
    case 'at-field-site':
      return 'Di Pusat Lapangan';
    case 'with-farmer':
      return 'Dengan Petani';
    case 'empty-returned':
      return 'Karung Dikembalikan';
    default:
      return status;
  }
};

// Indonesian farmer personas with detailed information
export const farmerPersonas = [
  {
    id: "F001",
    name: "Pak Joko",
    age: 45,
    location: {
      village: "Desa Suka Makmur",
      district: "Kecamatan Citeureup",
      regency: "Kabupaten Bogor",
      province: "Jawa Barat",
      coordinates: {
        lat: -6.5984157,
        lng: 106.7976839
      }
    },
    photo: "/placeholder.svg",
    farmDetails: {
      size: "2.5 hektar",
      crops: ["Padi", "Jagung", "Singkong"],
      annualProduction: "12 ton padi, 8 ton jagung",
      fertilizerUsage: "250kg/hektar"
    },
    bio: "Pak Joko telah bertani selama lebih dari 20 tahun. Ia mengelola lahan warisan keluarga dan telah mengadopsi beberapa teknologi pertanian modern."
  },
  {
    id: "F002",
    name: "Bu Siti",
    age: 38,
    location: {
      village: "Desa Tani Jaya",
      district: "Kecamatan Ciomas",
      regency: "Kabupaten Bogor",
      province: "Jawa Barat",
      coordinates: {
        lat: -6.6057128,
        lng: 106.8231301
      }
    },
    photo: "/placeholder.svg",
    farmDetails: {
      size: "1.8 hektar",
      crops: ["Padi", "Sayuran"],
      annualProduction: "9 ton padi, 5 ton sayuran campuran",
      fertilizerUsage: "200kg/hektar"
    },
    bio: "Bu Siti adalah ketua kelompok tani wanita di desanya. Dia fokus pada pertanian berkelanjutan dan telah membantu banyak petani mengadopsi praktik pertanian ramah lingkungan."
  },
  {
    id: "F003",
    name: "Pak Andi",
    age: 52,
    location: {
      village: "Desa Sumber Makmur",
      district: "Kecamatan Tenjolaya",
      regency: "Kabupaten Bogor",
      province: "Jawa Barat",
      coordinates: {
        lat: -6.6641948,
        lng: 106.7054335
      }
    },
    photo: "/placeholder.svg",
    farmDetails: {
      size: "3.2 hektar",
      crops: ["Padi", "Kedelai", "Cabai"],
      annualProduction: "15 ton padi, 2 ton kedelai, 4 ton cabai",
      fertilizerUsage: "300kg/hektar"
    },
    bio: "Pak Andi adalah generasi ketiga dari keluarga petani. Dia telah berhasil menerapkan sistem rotasi tanaman yang meningkatkan produktivitas lahannya."
  }
];
