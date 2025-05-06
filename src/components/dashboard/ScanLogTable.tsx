
import { ScanEvent } from "@/types";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Scan, MapPin } from "lucide-react";

interface ScanLogTableProps {
  events: ScanEvent[];
  limit?: number;
}

const ScanLogTable = ({ events, limit }: ScanLogTableProps) => {
  const displayEvents = limit ? events.slice(0, limit) : events;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>RFID Tag</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Operator</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.type === 'gate' ? (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Gate</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Scan className="h-4 w-4 mr-1" />
                    <span>Gun</span>
                  </div>
                )}
              </TableCell>
              <TableCell>{format(new Date(event.timestamp), "MM/dd/yyyy HH:mm")}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell className="font-mono text-xs">{event.rfidTag}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>{event.operator || "System"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScanLogTable;
