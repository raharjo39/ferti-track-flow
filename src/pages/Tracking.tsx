
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { mockSacks, mockScanEvents } from "@/data/mockData";
import { SackData } from "@/types";
import SackMap from "@/components/dashboard/SackMap";
import SackFlow from "@/components/dashboard/SackFlow";
import { Label } from "@/components/ui/label";
import { Search, Map, Camera, Truck, Check, Clock } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import SackCard from "@/components/dashboard/SackCard";
import ScanLogTable from "@/components/dashboard/ScanLogTable";
import { Switch } from "@/components/ui/switch";

const Tracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSack, setSelectedSack] = useState<SackData | null>(null);
  const [satelliteView, setSatelliteView] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery) return;
    
    const sack = mockSacks.find(
      s => s.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           s.rfidTag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (sack) {
      setSelectedSack(sack);
    } else {
      setSelectedSack(null);
    }
  };
  
  const getFilteredEvents = (sackId: string) => {
    const sack = mockSacks.find(s => s.id === sackId);
    if (!sack) return [];
    
    return mockScanEvents.filter(event => event.rfidTag === sack.rfidTag);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Twin Tracking</h1>
          <p className="text-muted-foreground">
            Pelacakan karung pupuk secara real-time dan visualisasi berbasis satelit
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Cari Karung</CardTitle>
            <CardDescription>
              Temukan karung spesifik berdasarkan ID atau tag RFID
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Masukkan ID karung atau tag RFID..."
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Cari
              </Button>
            </div>
            
            {selectedSack && (
              <div className="mt-4 border-t pt-4">
                <Label className="text-sm">Hasil Pencarian:</Label>
                <div className="mt-2">
                  <SackCard sack={selectedSack} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Peta Lokasi</CardTitle>
                  <CardDescription>
                    Pelacakan real-time untuk karung pupuk
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="satellite-view" className="text-sm">Tampilan Satelit</Label>
                  <Switch 
                    id="satellite-view" 
                    checked={satelliteView}
                    onCheckedChange={setSatelliteView}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SackMap sacks={mockSacks} satelliteView={satelliteView} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ikhtisar Status</CardTitle>
              <CardDescription>
                Status terkini semua karung dalam sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                {['at-warehouse', 'in-transit', 'at-field-site', 'with-farmer', 'empty-returned'].map(status => {
                  const count = mockSacks.filter(s => s.status === status).length;
                  return (
                    <div key={status} className="text-center border rounded-md p-2">
                      <StatusBadge status={status} />
                      <div className="text-2xl font-bold mt-2">{count}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-4">
                {selectedSack ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">Perjalanan Karung {selectedSack.id}</h3>
                      <StatusBadge status={selectedSack.status} showIcon={true} />
                    </div>
                    
                    {/* IoT data for selected sack */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-blue-50 rounded p-2 text-center">
                        <div className="text-xs text-blue-600">Suhu</div>
                        <div className="text-lg font-semibold">26°C</div>
                      </div>
                      <div className="bg-green-50 rounded p-2 text-center">
                        <div className="text-xs text-green-600">Kelembaban</div>
                        <div className="text-lg font-semibold">67%</div>
                      </div>
                      <div className="bg-purple-50 rounded p-2 text-center">
                        <div className="text-xs text-purple-600">Baterai IoT</div>
                        <div className="text-lg font-semibold">92%</div>
                      </div>
                    </div>
                    
                    <SackFlow sack={selectedSack} />
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Riwayat Pemindaian</h4>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Update Terakhir: {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                      <ScanLogTable events={getFilteredEvents(selectedSack.id)} />
                    </div>
                    
                    {/* AR verification */}
                    {selectedSack.status === 'with-farmer' && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Bukti Penerimaan (AR Verified)</h4>
                        <div className="bg-gray-100 rounded p-4 flex items-center justify-center">
                          <div className="text-center">
                            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                              <Camera className="h-5 w-5 text-green-600" />
                            </div>
                            <p className="text-xs">Foto diverifikasi AR</p>
                            <div className="mt-1 flex items-center justify-center text-xs text-green-600">
                              <Check className="h-3 w-3 mr-1" />
                              Terverifikasi
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Estimated arrival */}
                    {selectedSack.status === 'in-transit' && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Estimasi Kedatangan</h4>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                            <Truck className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Tiba dalam 45 menit</div>
                            <div className="text-xs text-muted-foreground">
                              Berdasarkan rute &amp; kondisi cuaca
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Cari karung untuk melihat informasi pelacakan detail</p>
                    <p className="text-sm mt-1">Atau klik pada penanda peta untuk info cepat</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tracking;
