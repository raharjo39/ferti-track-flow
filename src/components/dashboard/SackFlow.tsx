
import { SackData } from "@/types";
import { Check, Package, Truck, MapPin, Smartphone, Camera, RotateCw } from "lucide-react";

interface SackFlowProps {
  sack: SackData;
}

const SackFlow = ({ sack }: SackFlowProps) => {
  const steps = [
    { key: 'warehouse', label: 'Gudang', icon: <Package className="w-4 h-4" />, date: sack.timestamps.warehouse },
    { key: 'inTransit', label: 'Perjalanan', icon: <Truck className="w-4 h-4" />, date: sack.timestamps.inTransit },
    { key: 'fieldSite', label: 'Pusat Lapangan', icon: <MapPin className="w-4 h-4" />, date: sack.timestamps.fieldSite },
    { key: 'farmer', label: 'Petani', icon: <Smartphone className="w-4 h-4" />, date: sack.timestamps.farmer },
    { key: 'returned', label: 'Dikembalikan', icon: <RotateCw className="w-4 h-4" />, date: sack.timestamps.returned },
  ];

  // Function to determine which step is active based on sack status
  const getActiveStep = (status: string): number => {
    switch (status) {
      case 'at-warehouse': return 0;
      case 'in-transit': return 1;
      case 'at-field-site': return 2;
      case 'with-farmer': return 3;
      case 'empty-returned': return 4;
      default: return 0;
    }
  };

  const activeStep = getActiveStep(sack.status);

  return (
    <div className="px-1 py-4">
      <div className="relative flow-track">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-7 h-1 bg-gray-200"></div>
        
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="z-10 flex flex-col items-center">
              {/* Icon Circle */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${index <= activeStep 
                    ? index === activeStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'} 
                  ${index === activeStep ? 'flow-active-step' : ''}`}
              >
                {index < activeStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.icon || <span>{index + 1}</span>
                )}
              </div>
              
              {/* Step info */}
              <div className="mt-2 text-xs font-medium text-center">
                {step.label}
              </div>
              {step.date && (
                <div className="mt-1 text-[10px] text-gray-500">
                  {new Date(step.date).toLocaleDateString('id-ID')}
                </div>
              )}
              
              {/* Add time indicator for active step */}
              {index === activeStep && step.date && (
                <div className="mt-1 text-[10px] bg-primary/10 rounded px-1 text-primary">
                  {new Date(step.date).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Add CSS for the active step animation */}
        <style>
          {`
          .flow-active-step {
            box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
            }
            70% {
              box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
          }
          `}
        </style>
      </div>
    </div>
  );
};

export default SackFlow;
