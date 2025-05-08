
import { cn } from "@/lib/utils";
import { Check, Package, Truck, MapPin, Smartphone, RotateCw } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

const StatusBadge = ({ status, label, className, showIcon = true }: StatusBadgeProps) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'at-warehouse':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'at-field-site':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'with-farmer':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'empty-returned':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'at-warehouse':
        return 'Di Gudang';
      case 'in-transit':
        return 'Dalam Perjalanan';
      case 'at-field-site':
        return 'Di Pusat Lapangan';
      case 'with-farmer':
        return 'Dengan Petani';
      case 'empty-returned':
        return 'Karung Dikembalikan';
      default:
        return status;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'at-warehouse':
        return <Package className="h-3 w-3" />;
      case 'in-transit':
        return <Truck className="h-3 w-3" />;
      case 'at-field-site':
        return <MapPin className="h-3 w-3" />;
      case 'with-farmer':
        return <Smartphone className="h-3 w-3" />;
      case 'empty-returned':
        return <RotateCw className="h-3 w-3" />;
      default:
        return <Check className="h-3 w-3" />;
    }
  };

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1",
      getStatusColor(status),
      className
    )}>
      {showIcon && getStatusIcon(status)}
      {label || getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
