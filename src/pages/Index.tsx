
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Database, MapPin, Smartphone, Check, Truck, Package, RotateCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScanLogTable from "@/components/dashboard/ScanLogTable";
import { mockSacks, mockScanEvents } from "@/data/mockData";
import SackMap from "@/components/dashboard/SackMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessFlow from "@/components/dashboard/ProcessFlow";

const Index = () => {
  // Calculate stats
  const totalSacks = mockSacks.length;
  const inWarehouse = mockSacks.filter(s => s.status === 'at-warehouse').length;
  const inTransit = mockSacks.filter(s => s.status === 'in-transit').length;
  const withFarmers = mockSacks.filter(s => s.status === 'with-farmer').length;
  const returnRate = Math.round((mockSacks.filter(s => s.status === 'empty-returned').length / totalSacks) * 100);
  const completedCycles = Math.floor(returnRate / 20); // Just for demo
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <p className="text-muted-foreground">
                Sistem Manajemen Rantai Pasok Pupuk Berbasis RFID & IoT
              </p>
              <p className="text-xs text-green-600 mt-1 font-medium">
                ✓ Tracking Digital Twin Aktif | 
                ✓ 12 Unit IoT Terhubung
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Prepared by:</span> Galactic Indonesia Perkasa
            </div>
          </div>
        </div>

        {/* Process Flow Visualization */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Smart Process Flow</CardTitle>
            <CardDescription>
              Aliran proses digital dari gudang ke petani dan pengembalian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProcessFlow />
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Karung" 
            value={totalSacks} 
            icon={<Package className="h-6 w-6" />} 
            description="Total karung pupuk dalam sistem"
          />
          <StatCard 
            title="Di Gudang" 
            value={inWarehouse} 
            icon={<MapPin className="h-6 w-6" />}
            description="Karung yang tersedia di gudang"
          />
          <StatCard 
            title="Dengan Petani" 
            value={withFarmers} 
            icon={<Smartphone className="h-6 w-6" />}
            description="Karung terkirim ke petani" 
          />
          <StatCard 
            title="Pengembalian" 
            value={`${returnRate}%`} 
            icon={<RotateCw className="h-6 w-6" />}
            description="Persentase karung kosong kembali" 
          />
        </div>

        {/* Map and Recent Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Digital Twin Tracking</CardTitle>
                  <CardDescription>
                    Pelacakan real-time dengan visual drone/satelit
                  </CardDescription>
                </div>
                <Tabs defaultValue="map" className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="map">Peta</TabsTrigger>
                    <TabsTrigger value="satellite">Satelit</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <SackMap sacks={mockSacks} />
            </CardContent>
          </Card>
          
          {/* Recent Scans */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pemindaian IoT & RFID Terbaru</CardTitle>
                <CardDescription>
                  Aktivitas dan data sensor terbaru
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScanLogTable events={mockScanEvents} limit={5} />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* IoT Monitoring & Gamification */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monitoring Kondisi IoT</CardTitle>
              <CardDescription>
                Data sensor dari karung pupuk dalam perjalanan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="border rounded-lg p-3 flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">KELEMBABAN</div>
                  <div className="text-2xl font-bold">67%</div>
                  <div className="text-xs text-green-600">✓ Normal</div>
                </div>
                <div className="border rounded-lg p-3 flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">SUHU</div>
                  <div className="text-2xl font-bold">26°C</div>
                  <div className="text-xs text-green-600">✓ Normal</div>
                </div>
                <div className="border rounded-lg p-3 flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">POSISI GPS</div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-green-600">✓ Aktif</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Gamifikasi Petani</CardTitle>
              <CardDescription>
                Program reward untuk pengembalian karung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="inline-block rounded-full bg-green-100 p-3 mb-2">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-medium">Siklus Pengembalian</div>
                <div className="text-3xl font-bold mt-1">{completedCycles}</div>
                <div className="text-xs text-gray-500 mt-1">Total Selesai</div>
                
                <div className="mt-4 text-left">
                  <div className="text-sm font-medium mb-1">Poin Rewards</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${returnRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>{returnRate} poin</span>
                    <span>100 poin</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Kumpulkan 100 poin untuk mendapatkan diskon pupuk 10%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
