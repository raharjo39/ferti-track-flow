
import { SackData } from "@/types";
import { Check } from "lucide-react";

interface SackFlowProps {
  sack: SackData;
}

const SackFlow = ({ sack }: SackFlowProps) => {
  const steps = [
    { key: 'warehouse', label: 'Gudang', date: sack.timestamps.warehouse },
    { key: 'inTransit', label: 'Dalam Perjalanan', date: sack.timestamps.inTransit },
    { key: 'fieldSite', label: 'Pusat Lapangan', date: sack.timestamps.fieldSite },
    { key: 'farmer', label: 'Petani', date: sack.timestamps.farmer },
    { key: 'returned', label: 'Dikembalikan', date: sack.timestamps.returned },
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
    <div className="px-4 py-6">
      <div className="relative rfid-flow-line">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${index <= activeStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'} 
                  ${index === activeStep ? 'rfid-scan-animation' : ''}`}
              >
                {index < activeStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-xs font-medium text-center">
                {step.label}
              </div>
              {step.date && (
                <div className="mt-1 text-[10px] text-gray-500">
                  {new Date(step.date).toLocaleDateString('id-ID')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SackFlow;
