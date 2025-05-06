
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Database, MapPin, Scan, Smartphone, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScanLogTable from "@/components/dashboard/ScanLogTable";
import { mockSacks, mockScanEvents } from "@/data/mockData";
import SackMap from "@/components/dashboard/SackMap";

const Index = () => {
  // Calculate stats
  const totalSacks = mockSacks.length;
  const inWarehouse = mockSacks.filter(s => s.status === 'at-warehouse').length;
  const inTransit = mockSacks.filter(s => s.status === 'in-transit').length;
  const withFarmers = mockSacks.filter(s => s.status === 'with-farmer').length;
  const returnRate = Math.round((mockSacks.filter(s => s.status === 'empty-returned').length / totalSacks) * 100);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-muted-foreground">
              Sistem Manajemen Rantai Pasok Pupuk Berbasis RFID
            </p>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Prepared by:</span> Galactic Indonesia Perkasa
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Sacks" 
            value={totalSacks} 
            icon={<Database className="h-6 w-6" />} 
            description="Total fertilizer sacks in the system"
          />
          <StatCard 
            title="In Warehouse" 
            value={inWarehouse} 
            icon={<MapPin className="h-6 w-6" />}
            description="Sacks currently in warehouse"
          />
          <StatCard 
            title="With Farmers" 
            value={withFarmers} 
            icon={<Smartphone className="h-6 w-6" />}
            description="Sacks delivered to farmers" 
          />
          <StatCard 
            title="Return Rate" 
            value={`${returnRate}%`} 
            icon={<Check className="h-6 w-6" />}
            description="Empty sacks returned percentage" 
          />
        </div>

        {/* Map and Recent Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sack Location Map</CardTitle>
                <CardDescription>
                  Real-time location tracking of fertilizer sacks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SackMap sacks={mockSacks} />
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Scans */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent RFID Scans</CardTitle>
                <CardDescription>
                  Latest activities in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScanLogTable events={mockScanEvents} limit={5} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
