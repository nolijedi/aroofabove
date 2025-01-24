import React from "react";
import { Button } from "@/components/ui/button";

const ButtonTest = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Button
        variant="default"
        size="default"
        onClick={() => alert("Button clicked!")}
      >
        Click Me
      </Button>
    </div>
  );
};

export default ButtonTest;
