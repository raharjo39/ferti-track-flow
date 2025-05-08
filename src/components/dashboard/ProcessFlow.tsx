
import { Package, Truck, MapPin, Smartphone, Camera, RotateCw, Check } from "lucide-react";

const ProcessFlow = () => {
  const steps = [
    {
      icon: <Package className="h-5 w-5" />,
      title: "Persiapan",
      description: "Pemesanan & tagging RFID"
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Pengiriman",
      description: "Rute optimal & tracking live"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Checkpoint",
      description: "Gate RFID & monitoring IoT"
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Penerimaan",
      description: "Konfirmasi petani & scan"
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Aplikasi",
      description: "Bukti penggunaan & AR tag"
    },
    {
      icon: <RotateCw className="h-5 w-5" />,
      title: "Pengembalian",
      description: "Tracking karung kosong"
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Selesai",
      description: "Siklus lengkap + rewards"
    }
  ];
  
  return (
    <div className="py-2">
      <div className="relative flex items-center justify-between w-full">
        {/* Connecting Line */}
        <div className="absolute left-0 right-0 h-1 bg-gray-200" style={{ top: '36px' }}></div>
        
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center text-center">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground`}>
              {step.icon}
            </div>
            <div className="mt-2 space-y-1">
              <div className="text-xs font-medium">{step.title}</div>
              <div className="text-[10px] text-muted-foreground">{step.description}</div>
            </div>
          </div>
        ))}
        
        {/* Animated Dot */}
        <div 
          className="absolute w-3 h-3 bg-green-500 rounded-full animate-pulse"
          style={{ top: '35px', left: '30%' }}
        ></div>
      </div>
    </div>
  );
};

export default ProcessFlow;
