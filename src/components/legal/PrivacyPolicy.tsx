import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicy = ({ open, onOpenChange }: PrivacyPolicyProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-roofing-cream via-white to-roofing-beige">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-roofing-charcoal">Privacy Policy</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-roofing-charcoal/80">
          <p className="font-semibold text-roofing-orange">Last Updated: March 2024</p>
          
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-roofing-charcoal">Information We Collect</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name and contact information</li>
              <li>Property details for estimates</li>
              <li>Communication preferences</li>
              <li>Service history and preferences</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-roofing-charcoal">How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Process your payments and transactions</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-roofing-charcoal">Information Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};