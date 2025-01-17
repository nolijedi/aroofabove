import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PrivacyPolicyContent = () => {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-roofing-charcoal mb-4">Privacy Policy</DialogTitle>
      </DialogHeader>
      <div className="prose prose-sm max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us, including when you:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Request a quote or estimate</li>
          <li>Contact us for service</li>
          <li>Sign up for our newsletter</li>
          <li>Communicate with us via phone, email, or forms</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and improve our services</li>
          <li>Communicate with you about our services</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
        <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Service providers who assist in our operations</li>
          <li>Professional advisors</li>
          <li>Law enforcement when required by law</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">4. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">5. Contact Us</h2>
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