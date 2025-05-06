
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
}

const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'at-warehouse':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'at-field-site':
        return 'bg-purple-100 text-purple-800';
      case 'with-farmer':
        return 'bg-green-100 text-green-800';
      case 'empty-returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'at-warehouse':
        return 'At Warehouse';
      case 'in-transit':
        return 'In Transit';
      case 'at-field-site':
        return 'At Field Site';
      case 'with-farmer':
        return 'With Farmer';
      case 'empty-returned':
        return 'Empty Returned';
      default:
        return status;
    }
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusColor(status),
      className
    )}>
      {label || getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
