
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSacks, mockScanEvents } from "@/data/mockData";
import SackCard from "@/components/dashboard/SackCard";
import ScanLogTable from "@/components/dashboard/ScanLogTable";
import { Scan, MapPin, X, Check } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FieldSite = () => {
  const [searchRfid, setSearchRfid] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState("");
  
  const fieldSiteSacks = mockSacks.filter(s => s.status === 'at-field-site');
  const fieldSiteScans = mockScanEvents.filter(e => e.location.includes("Field"));
  
  const handleGateScan = () => {
    toast.success("Gate scan completed", {
      description: "RFID tags detected upon arrival",
    });
  };
  
  const handleGunScan = () => {
    if (!selectedFarmer) {
      toast.error("Please select a farmer");
      return;
    }
    
    toast.success("RFID Gun scan completed", {
      description: `Sack assigned to ${selectedFarmer}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Field Site Operations</h1>
          <p className="text-muted-foreground">
            Manage sack reception and distribution to farmers
          </p>
        </div>
        
        <Tabs defaultValue="receive" className="w-full">
          <TabsList>
            <TabsTrigger value="receive">Receive Shipment</TabsTrigger>
            <TabsTrigger value="distribute">Distribute to Farmers</TabsTrigger>
            <TabsTrigger value="inventory">Site Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="receive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>RFID Gate Scanner</CardTitle>
                <CardDescription>
                  Scan incoming fertilizer sacks at the gate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Scan Status</Label>
                      <div className="flex items-center h-10 text-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Scanner Ready</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin Warehouse</Label>
                      <Input 
                        id="origin" 
                        value="Central Warehouse"
                        readOnly
                      />
                    </div>
                    
                    <Button onClick={handleGateScan} className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      Simulate Gate Scan
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Recent Gate Scans</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>RFID</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fieldSiteScans.slice(0, 3).map((scan, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(scan.timestamp).toLocaleTimeString()}</TableCell>
                            <TableCell className="font-mono text-xs">{scan.rfidTag}</TableCell>
                            <TableCell>
                              <span className="flex items-center">
                                <Check className="h-3 w-3 mr-1 text-green-500" />
                                Detected
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-4 bg-muted rounded-md p-3">
                      <div className="flex items-center">
                        <div className="mr-2 text-green-500">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Shipment Verified</h4>
                          <p className="text-xs text-muted-foreground">All expected sacks received</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribute" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>RFID Gun Scanner</CardTitle>
                <CardDescription>
                  Scan sacks to assign them to farmers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rfid-search">Scan RFID Tag</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="rfid-search" 
                          value={searchRfid}
                          onChange={(e) => setSearchRfid(e.target.value)}
                          placeholder="RFID-XXXX-XXXX-XXX" 
                        />
                        <Button variant="outline" onClick={() => setSearchRfid("RFID-003-2025-XYZ")}>
                          Simulate
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="farmer-select">Assign to Farmer</Label>
                      <Select onValueChange={setSelectedFarmer}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select farmer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">Farmer John</SelectItem>
                          <SelectItem value="lisa">Farmer Lisa</SelectItem>
                          <SelectItem value="mike">Farmer Mike</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleGunScan}>
                      <Scan className="mr-2 h-4 w-4" />
                      Confirm Assignment
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">RFID Gun Status</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Device:</span>
                        <span>ATID ATS100 #1122</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Battery:</span>
                        <span>85%</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Connection:</span>
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Connected
                        </span>
                      </div>
                      
                      {searchRfid && (
                        <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3">
                          <div className="text-center">
                            <h4 className="font-medium text-sm text-green-800">RFID Tag Detected</h4>
                            <p className="font-mono text-xs">{searchRfid}</p>
                            <p className="mt-2 text-xs text-green-700">
                              Ready to assign to {selectedFarmer || "selected farmer"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Field Site Inventory</CardTitle>
                <CardDescription>
                  Fertilizer sacks currently at this field site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fieldSiteSacks.map((sack) => (
                    <SackCard key={sack.id} sack={sack} />
                  ))}
                  
                  {fieldSiteSacks.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No sacks currently in field site inventory
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Field Site Scan History</CardTitle>
                <CardDescription>
                  Recent RFID scanning activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScanLogTable events={fieldSiteScans} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FieldSite;
