
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SackCard from "@/components/dashboard/SackCard";
import ScanLogTable from "@/components/dashboard/ScanLogTable";
import { mockSacks, mockScanEvents } from "@/data/mockData";
import { Scan, Database, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Warehouse = () => {
  const [tagInput, setTagInput] = useState("");
  const [batchInput, setBatchInput] = useState("BT-" + new Date().getFullYear() + "-");
  
  const warehouseSacks = mockSacks.filter(s => s.status === 'at-warehouse');
  const warehouseScans = mockScanEvents.filter(e => e.location.includes("Warehouse"));
  
  const handleTagGeneration = () => {
    const newTag = "RFID-" + Math.floor(1000 + Math.random() * 9000) + "-2025-XYZ";
    setTagInput(newTag);
    toast.info("Generated new RFID tag", {
      description: newTag,
    });
  };
  
  const handleTagPrint = () => {
    if (!tagInput || !batchInput) {
      toast.error("Please enter both RFID tag and batch number");
      return;
    }
    
    toast.success("RFID tag printed successfully", {
      description: `Tag ${tagInput} from batch ${batchInput}`,
    });
  };
  
  const handleSacksDispatch = () => {
    toast.success("Fertilizer sacks dispatched", {
      description: "2 sacks have been dispatched to the field site",
    });
  };
  
  const handleScanRfid = () => {
    toast.success("RFID scanned successfully", {
      description: "Gate scan registered sack exit",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouse Operations</h1>
          <p className="text-muted-foreground">
            Tag, track and dispatch fertilizer sacks from the warehouse
          </p>
        </div>
        
        <Tabs defaultValue="tagging" className="w-full">
          <TabsList>
            <TabsTrigger value="tagging">RFID Tagging</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tagging" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Print RFID Tags</CardTitle>
                <CardDescription>
                  Generate and print RFID tags for new fertilizer sacks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="rfid-tag">RFID Tag Number</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="rfid-tag" 
                          value={tagInput} 
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="RFID-XXXX-XXXX-XXX" 
                        />
                        <Button 
                          variant="outline"
                          onClick={handleTagGeneration}
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="batch-number">Batch Number</Label>
                      <Input 
                        id="batch-number" 
                        value={batchInput}
                        onChange={(e) => setBatchInput(e.target.value)}
                        placeholder="BT-2025-XXX" 
                      />
                    </div>
                    
                    <Button onClick={handleTagPrint} className="mt-4">
                      <Database className="mr-2 h-4 w-4" />
                      Print RFID Tag
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-center space-y-3">
                      <h3 className="font-medium">RFID Tag Preview</h3>
                      <div className="bg-gray-100 p-6 rounded-md">
                        <div className="text-xs text-gray-500">TAG ID:</div>
                        <div className="text-lg font-mono font-bold">{tagInput || "RFID-XXXX-XXXX-XXX"}</div>
                        <div className="mt-2 text-xs text-gray-500">BATCH:</div>
                        <div className="font-medium">{batchInput || "BT-2025-XXX"}</div>
                        
                        <div className="mt-4 border-t pt-2">
                          <div className="text-xs text-center text-gray-500">Scan to track</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Inventory</CardTitle>
                <CardDescription>
                  Current stock of fertilizer sacks in the warehouse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {warehouseSacks.map((sack) => (
                    <SackCard key={sack.id} sack={sack} />
                  ))}
                  
                  {warehouseSacks.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No sacks currently in warehouse inventory
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Scan Logs</CardTitle>
                <CardDescription>
                  Recent RFID scans in the warehouse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScanLogTable events={warehouseScans} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dispatch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dispatch Fertilizer Sacks</CardTitle>
                <CardDescription>
                  Send tagged sacks to field sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="field-site">Destination Field Site</Label>
                      <Input 
                        id="field-site" 
                        value="Eastern Field Distribution Center"
                        placeholder="Select field site" 
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="sack-quantity">Number of Sacks</Label>
                      <Input 
                        id="sack-quantity" 
                        type="number"
                        value="2"
                        placeholder="Enter quantity" 
                      />
                    </div>
                    
                    <div className="flex space-x-3 mt-6">
                      <Button onClick={handleSacksDispatch} className="flex-1">
                        Dispatch Sacks
                      </Button>
                      <Button onClick={handleScanRfid} variant="outline" className="flex-1">
                        <Scan className="mr-2 h-4 w-4" />
                        Gate Scan
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-center mb-3">Dispatch Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Origin:</span>
                        <span>Central Warehouse</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Destination:</span>
                        <span>Eastern Field Distribution Center</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span>2 sacks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dispatch Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="flex items-center">
                          <Check className="h-4 w-4 mr-1 text-green-500" />
                          Ready for dispatch
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Warehouse;
