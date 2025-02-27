import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const TermsContent = () => {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-roofing-cream to-roofing-beige border-2 border-roofing-orange/20">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-roofing-charcoal mb-4 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
          Terms of Service
        </DialogTitle>
      </DialogHeader>
      <div className="prose prose-sm max-w-none prose-headings:text-roofing-charcoal prose-p:text-roofing-charcoal/90">
        <p className="mb-4 text-roofing-charcoal/70">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">2. Services</h2>
        <p className="mb-4">We provide roofing services including:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>Roof installation and replacement</li>
          <li>Roof repair and maintenance</li>
          <li>Emergency roofing services</li>
          <li>Roof inspections</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">3. Warranties and Guarantees</h2>
        <p className="mb-4">Our work comes with the following guarantees:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>Workmanship warranty</li>
          <li>Material warranty (as provided by manufacturers)</li>
          <li>Satisfaction guarantee</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">4. Payment Terms</h2>
        <p className="mb-4">Payment terms include:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>Deposit requirements</li>
          <li>Progress payments</li>
          <li>Final payment upon completion</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">5. Cancellation Policy</h2>
        <p className="mb-4">Our cancellation policy includes:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>48-hour notice required for cancellation</li>
          <li>Rescheduling options</li>
          <li>Refund policy for deposits</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">6. Contact Information</h2>
        <p className="mb-4">For questions about these Terms of Service, contact us at:</p>
        <p className="mb-4">
          Email: legal@aroofabove.com<br />
          Phone: (555) 123-4567<br />
          Address: 123 Roofing Way, Anytown, USA 12345
        </p>
      </div>
    </DialogContent>
  );
};

export default TermsContent;