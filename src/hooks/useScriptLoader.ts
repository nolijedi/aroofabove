import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useScriptLoader = () => {
  const { toast } = useToast();
  const SCRIPT_ID = 'instant-roofer-script';

  useEffect(() => {
    let timeoutId: number;

    const loadScript = () => {
      // Check if script already exists
      if (document.getElementById(SCRIPT_ID)) {
        return; // Script already loaded
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'text/javascript';
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = "https://book.instantroofer.com/js/instant-roofer-google-ads-integration.min.js";
      
      script.onerror = (error) => {
        console.error('Error loading InstantRoofer script:', error);
        toast({
          title: "Warning",
          description: "Some features might be limited. Please refresh the page.",
          variant: "destructive"
        });
      };

      document.body.appendChild(script);
    };

    // Delay script loading
    timeoutId = window.setTimeout(loadScript, 7000);

    // Add scroll listener for earlier loading
    const scrollHandler = () => {
      window.clearTimeout(timeoutId);
      loadScript();
    };
    
    window.addEventListener('scroll', scrollHandler, { once: true });

    // Cleanup function
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', scrollHandler);
      
      // Remove script on unmount if it exists
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [toast]);
};