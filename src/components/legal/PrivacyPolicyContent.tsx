import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PrivacyPolicyContent = () => {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-roofing-cream to-roofing-beige border-2 border-roofing-orange/20">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-roofing-charcoal mb-4 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
          Privacy Policy
        </DialogTitle>
      </DialogHeader>
      <div className="prose prose-sm max-w-none prose-headings:text-roofing-charcoal prose-p:text-roofing-charcoal/90">
        <p className="mb-4 text-roofing-charcoal/70">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">1. Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us, including when you:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>Request a quote or estimate</li>
          <li>Contact us for service</li>
          <li>Sign up for our newsletter</li>
          <li>Communicate with us via phone, email, or forms</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>Provide and improve our services</li>
          <li>Communicate with you about our services</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">3. Information Sharing</h2>
        <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>Service providers who assist in our operations</li>
          <li>Professional advisors</li>
          <li>Law enforcement when required by law</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">4. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4 marker:text-roofing-orange">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-roofing-orange">5. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
        <p className="mb-4">
          Email: privacy@aroofabove.com<br />
          Phone: (555) 123-4567<br />
          Address: 123 Roofing Way, Anytown, USA 12345
        </p>
      </div>
    </DialogContent>
  );
};

export default PrivacyPolicyContent;