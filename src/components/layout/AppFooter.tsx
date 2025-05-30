
import { cn } from "@/lib/utils";

interface AppFooterProps {
  className?: string;
}

const AppFooter = ({ className }: AppFooterProps) => {
  return (
    <footer className={cn("py-4 px-6 border-t text-sm text-muted-foreground", className)}>
      <div className="container flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p>
            © {new Date().getFullYear()} RFID Fertilizer Tracking System
          </p>
          <p className="text-xs">
            Built by PT Galactic Indonesia Perkasa (gip.co.id)
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span>Jakarta, Indonesia</span>
          <span className="text-muted-foreground mx-1">•</span>
          <span>{new Date().toLocaleDateString("id-ID")}</span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
