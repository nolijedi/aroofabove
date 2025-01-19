import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useScriptLoader = () => {
  const { toast } = useToast();
  const SCRIPT_ID = 'instant-roofer-script';
  const isLoadingRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript || isLoadingRef.current) {
      return;
    }

    let timeoutId: number;

    const loadScript = () => {
      if (isLoadingRef.current) return;
      
      // Remove any existing script first
      const oldScript = document.getElementById(SCRIPT_ID);
      if (oldScript) {
        oldScript.remove();
      }

      isLoadingRef.current = true;

      scriptRef.current = document.createElement('script');
      scriptRef.current.id = SCRIPT_ID;
      scriptRef.current.type = 'text/javascript';
      scriptRef.current.async = true;
      scriptRef.current.crossOrigin = "anonymous";
      scriptRef.current.src = "https://book.instantroofer.com/js/instant-roofer-google-ads-integration.min.js";
      
      scriptRef.current.onerror = (error) => {
        console.error('Error loading InstantRoofer script:', error);
        isLoadingRef.current = false;
        toast({
          title: "Warning",
          description: "Some features might be limited. Please refresh the page.",
          variant: "destructive"
        });
      };

      scriptRef.current.onload = () => {
        isLoadingRef.current = false;
      };

      document.body.appendChild(scriptRef.current);
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
      isLoadingRef.current = false;
      
      // Clean up script on unmount
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [toast]); // Only re-run if toast changes
};