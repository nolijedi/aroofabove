import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const Estimate = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-roofing-charcoal mb-4">Get a Free Estimate</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fill out the form below to request a free estimate for your roofing project.
          We'll get back to you within 24 hours.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <Input placeholder="First Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <Input placeholder="Last Name" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" placeholder="Email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input type="tel" placeholder="Phone" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Input placeholder="Street Address" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <Input placeholder="City" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <Input placeholder="State" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
              <Input placeholder="ZIP Code" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option value="">Select Project Type</option>
              <option value="repair">Roof Repair</option>
              <option value="replacement">Roof Replacement</option>
              <option value="new">New Roof Installation</option>
              <option value="maintenance">Maintenance</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
            <Textarea 
              placeholder="Please describe your roofing needs in detail"
              className="min-h-[150px]"
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-roofing-orange text-white hover:bg-roofing-orange-dark"
          >
            Request Estimate
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Estimate;