
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Camera, MapPin, Scan, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { mockSacks } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SackFlow from "@/components/dashboard/SackFlow";

const FarmerApp = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTag, setScannedTag] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [locationCaptured, setLocationCaptured] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [returnMode, setReturnMode] = useState(false);
  
  // This is the sack that would be with the farmer (for demo purposes)
  const farmerSack = mockSacks.find(s => s.status === 'with-farmer');
  
  const handleScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      if (returnMode) {
        setScannedTag("RFID-004-2025-XYZ"); // For return demo
      } else {
        setScannedTag("RFID-003-2025-XYZ"); // For delivery demo
      }
      toast.success("RFID tag scanned", {
        description: returnMode ? "Empty sack detected" : "Fertilizer sack detected",
      });
    }, 2000);
  };
  
  const handleCapture = () => {
    setCapturedPhoto(true);
    toast.success("Photo captured", {
      description: "Proof of delivery image saved",
    });
  };
  
  const handleLocation = () => {
    setLocationCaptured(true);
    toast.success("Location captured", {
      description: "GPS coordinates recorded",
    });
  };
  
  const handleConfirm = () => {
    if (!capturedPhoto || !locationCaptured) {
      toast.error("Missing information", {
        description: "Please capture both photo and location",
      });
      return;
    }
    
    if (isOffline) {
      toast.info("Saved for sync", {
        description: "Data will be uploaded when online",
      });
    } else {
      toast.success(returnMode ? "Empty sack return confirmed" : "Delivery confirmed", {
        description: returnMode ? "Return has been recorded in the system" : "Proof of delivery has been recorded",
      });
    }
    
    // Reset the form
    setScannedTag("");
    setCapturedPhoto(false);
    setLocationCaptured(false);
  };
  
  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
    toast(isOffline ? "Online mode activated" : "Offline mode activated", {
      description: isOffline ? "Data will sync automatically" : "Data will be saved locally",
    });
  };
  
  const toggleMode = () => {
    setReturnMode(!returnMode);
    setScannedTag("");
    setCapturedPhoto(false);
    setLocationCaptured(false);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmer Mobile App</h1>
          <p className="text-muted-foreground">
            Delivery confirmation and empty sack return
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mobile App Simulation */}
          <div>
            <Card className="border-4 border-gray-300 rounded-3xl overflow-hidden max-w-[350px] mx-auto">
              <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                <div className="text-xs">12:30</div>
                <div className="h-4 w-20 bg-gray-900 rounded-full mx-auto"></div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="bg-green-500 text-white p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Smartphone className="h-5 w-5 mr-2" />
                    <h3 className="font-bold">FertiTrack App</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="h-7 text-xs text-white"
                    onClick={toggleOfflineMode}
                  >
                    {isOffline ? "Offline" : "Online"}
                  </Button>
                </div>
              </div>
              
              <div className="p-4 space-y-4 bg-white">
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="flex items-center text-xs px-2 py-1 h-7"
                    onClick={toggleMode}
                  >
                    {returnMode ? "Empty Sack Return" : "Fertilizer Delivery"}
                    <span className="ml-1 text-xs">▼</span>
                  </Button>
                </div>
                
                {returnMode ? (
                  // Empty sack return UI
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-medium text-sm">Return Empty Sack</h3>
                      <p className="text-xs text-gray-500">Scan RFID tag on empty sack</p>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center justify-center"
                      onClick={handleScan}
                      disabled={isScanning}
                    >
                      {isScanning ? (
                        <span className="flex items-center">
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></div>
                          Scanning...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Scan className="h-4 w-4 mr-2" />
                          Scan Empty Sack
                        </span>
                      )}
                    </Button>
                    
                    {scannedTag && (
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs font-medium">RFID Tag:</div>
                            <div className="text-xs font-mono">{scannedTag}</div>
                          </div>
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <Button size="sm" onClick={handleConfirm}>
                            Confirm Return
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Fertilizer delivery UI
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-medium text-sm">Confirm Fertilizer Delivery</h3>
                      <p className="text-xs text-gray-500">Scan, capture photo and location</p>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center justify-center"
                      onClick={handleScan}
                      disabled={isScanning}
                    >
                      {isScanning ? (
                        <span className="flex items-center">
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></div>
                          Scanning...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Scan className="h-4 w-4 mr-2" />
                          Scan RFID Tag
                        </span>
                      )}
                    </Button>
                    
                    {scannedTag && (
                      <div className="space-y-3">
                        <div className="border rounded-md p-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs font-medium">RFID Tag:</div>
                              <div className="text-xs font-mono">{scannedTag}</div>
                            </div>
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant={capturedPhoto ? "default" : "outline"}
                            className="text-xs h-16"
                            onClick={handleCapture}
                          >
                            <div className="flex flex-col items-center">
                              <Camera className="h-5 w-5 mb-1" />
                              <span>{capturedPhoto ? "Photo Added" : "Capture Photo"}</span>
                            </div>
                          </Button>
                          
                          <Button 
                            variant={locationCaptured ? "default" : "outline"}
                            className="text-xs h-16"
                            onClick={handleLocation}
                          >
                            <div className="flex flex-col items-center">
                              <MapPin className="h-5 w-5 mb-1" />
                              <span>{locationCaptured ? "Location Added" : "Add Location"}</span>
                            </div>
                          </Button>
                        </div>
                        
                        <Button 
                          className="w-full"
                          disabled={!capturedPhoto || !locationCaptured}
                          onClick={handleConfirm}
                        >
                          Confirm Delivery
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {isOffline && (
                <div className="bg-yellow-50 border-t border-yellow-200 p-2">
                  <div className="flex items-center justify-center text-xs text-yellow-800">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mr-1"></div>
                    Offline Mode - Data will sync when online
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          {/* Sack Details */}
          <div>
            {farmerSack && (
              <Card>
                <CardHeader>
                  <CardTitle>Sack Details</CardTitle>
                  <CardDescription>
                    View details of fertilizer sack assigned to farmer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Sack ID: {farmerSack.id}</h3>
                      <p className="text-sm text-muted-foreground">RFID: {farmerSack.rfidTag}</p>
                    </div>
                    <StatusBadge status={farmerSack.status} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Location:</div>
                      <div>{farmerSack.location?.name}</div>
                      
                      <div className="text-muted-foreground">Batch:</div>
                      <div>{farmerSack.batch}</div>
                      
                      <div className="text-muted-foreground">Assigned to:</div>
                      <div>{farmerSack.farmer}</div>
                      
                      <div className="text-muted-foreground">Delivery Date:</div>
                      <div>{new Date(farmerSack.timestamps.farmer || "").toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Sack Journey</h4>
                    <SackFlow sack={farmerSack} />
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Proof of Delivery</h4>
                    <div className="bg-gray-100 rounded-md p-2 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-1">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">Delivery Photo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Tabs defaultValue="online" className="mt-4">
              <TabsList className="w-full">
                <TabsTrigger value="online" className="flex-1">Online Mode</TabsTrigger>
                <TabsTrigger value="offline" className="flex-1">Offline Mode</TabsTrigger>
              </TabsList>
              
              <TabsContent value="online" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Online Mode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm list-disc pl-4">
                      <li>Real-time data synchronization</li>
                      <li>Instant proof of delivery confirmation</li>
                      <li>Live location tracking and updates</li>
                      <li>Immediate confirmation alerts</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="offline" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Offline Mode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm list-disc pl-4">
                      <li>Locally stored data for later sync</li>
                      <li>Works in remote areas without connectivity</li>
                      <li>Automatic synchronization when back online</li>
                      <li>All captured data is preserved</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerApp;
