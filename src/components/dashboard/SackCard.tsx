
import { SackData } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";

interface SackCardProps {
  sack: SackData;
}

const SackCard = ({ sack }: SackCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "PPP p");
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">Sack {sack.id}</CardTitle>
          <StatusBadge status={sack.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">RFID Tag:</span>
            <span className="font-mono">{sack.rfidTag}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Batch:</span>
            <span>{sack.batch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>{sack.location?.name || "Unknown"}</span>
          </div>
          {sack.farmer && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Farmer:</span>
              <span>{sack.farmer}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Last Updated: {formatDate(getLatestTimestamp(sack))}
      </CardFooter>
    </Card>
  );
};

// Helper function to get the latest timestamp from a sack
const getLatestTimestamp = (sack: SackData): string | undefined => {
  const timestamps = sack.timestamps;
  return timestamps.returned || 
         timestamps.farmer || 
         timestamps.fieldSite || 
         timestamps.inTransit || 
         timestamps.warehouse || 
         timestamps.created;
};

export default SackCard;
