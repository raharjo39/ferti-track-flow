
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
          <h1 className="text-3xl font-bold tracking-tight">Tracking Map</h1>
          <p className="text-muted-foreground">
            Real-time fertilizer sack location tracking and history
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Search Sack</CardTitle>
            <CardDescription>
              Find a specific sack by ID or RFID tag
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Enter sack ID or RFID tag..."
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            {selectedSack && (
              <div className="mt-4 border-t pt-4">
                <Label className="text-sm">Search Results:</Label>
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
              <CardTitle>Location Map</CardTitle>
              <CardDescription>
                Real-time tracking of all fertilizer sacks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SackMap sacks={mockSacks} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Status Overview</CardTitle>
              <CardDescription>
                Current status of all sacks in the system
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
                    <h3 className="text-lg font-medium">Sack {selectedSack.id} Journey</h3>
                    <SackFlow sack={selectedSack} />
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Scan History</h4>
                      <ScanLogTable events={getFilteredEvents(selectedSack.id)} />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Search for a sack to view detailed tracking information</p>
                    <p className="text-sm mt-1">Or click on a map marker for quick info</p>
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
