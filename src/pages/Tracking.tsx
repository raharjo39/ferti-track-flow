
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
import { Search } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import SackCard from "@/components/dashboard/SackCard";
import ScanLogTable from "@/components/dashboard/ScanLogTable";

const Tracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSack, setSelectedSack] = useState<SackData | null>(null);
  
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
          <h1 className="text-3xl font-bold tracking-tight">Peta Tracking</h1>
          <p className="text-muted-foreground">
            Pelacakan lokasi karung pupuk secara real-time dan riwayat perjalanan
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
            <CardHeader>
              <CardTitle>Peta Lokasi</CardTitle>
              <CardDescription>
                Pelacakan real-time untuk semua karung pupuk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SackMap sacks={mockSacks} />
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
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
                    <h3 className="text-lg font-medium">Perjalanan Karung {selectedSack.id}</h3>
                    <SackFlow sack={selectedSack} />
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Riwayat Pemindaian</h4>
                      <ScanLogTable events={getFilteredEvents(selectedSack.id)} />
                    </div>
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
