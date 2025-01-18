import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ReferralSectionProps {
  referralSource: string;
  otherSource: string;
  setReferralSource: (value: string) => void;
  setOtherSource: (value: string) => void;
  onSubmit: () => void;
}

export const ReferralSection = ({
  referralSource,
  otherSource,
  setReferralSource,
  setOtherSource,
  onSubmit
}: ReferralSectionProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="space-y-4">
        <label className="text-lg font-semibold text-roofing-charcoal block">
          How did you hear about us?
        </label>
        <Select value={referralSource} onValueChange={setReferralSource}>
          <SelectTrigger className="w-full bg-white/70">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google Search</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="friend">Friend or Family</SelectItem>
            <SelectItem value="neighbor">Neighbor</SelectItem>
            <SelectItem value="drive_by">Saw our work in the neighborhood</SelectItem>
            <SelectItem value="yelp">Yelp</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        {referralSource === "other" && (
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Please specify"
              value={otherSource}
              onChange={(e) => setOtherSource(e.target.value)}
              className="w-full bg-white/70"
            />
          </div>
        )}
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="pt-4"
      >
        <Button
          type="submit"
          size="lg"
          onClick={onSubmit}
          className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:opacity-90 group h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Estimate Now
          <Calculator className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
        </Button>
      </motion.div>
    </motion.div>
  );
};