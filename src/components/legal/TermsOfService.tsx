import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TermsOfServiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsOfService = ({ open, onOpenChange }: TermsOfServiceProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-roofing-cream via-white to-roofing-beige">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-roofing-charcoal">Terms of Service</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-roofing-charcoal/80">
          <p className="font-semibold text-roofing-orange">Last Updated: March 2024</p>
          
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-roofing-charcoal">1. Services</h3>
            <p>We provide residential and commercial roofing services, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Roof installation and replacement</li>
              <li>Roof repair and maintenance</li>
              <li>Insurance claim assistance</li>
              <li>Emergency roofing services</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-roofing-charcoal">2. Warranties</h3>
            <p>Our services come with the following warranties:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Workmanship warranty on all installations</li>
              <li>Manufacturer warranties on materials</li>
              <li>Satisfaction guarantee on all services</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-roofing-charcoal">3. Payment Terms</h3>
            <p>Payment terms and conditions include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Deposit requirements for large projects</li>
              <li>Payment schedule for ongoing work</li>
              <li>Accepted payment methods</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};