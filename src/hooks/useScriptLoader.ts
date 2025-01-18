import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useScriptLoader = () => {
  const { toast } = useToast();
  const SCRIPT_ID = 'instant-roofer-script';
  const isLoadingRef = useRef(false);

  useEffect(() => {
    // Check if script is already loaded or is currently loading
    if (document.getElementById(SCRIPT_ID) || isLoadingRef.current) {
      return;
    }

    let timeoutId: number;
    let scriptElement: HTMLScriptElement | null = null;

    const loadScript = () => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;

      scriptElement = document.createElement('script');
      scriptElement.id = SCRIPT_ID;
      scriptElement.type = 'text/javascript';
      scriptElement.async = true;
      scriptElement.crossOrigin = "anonymous";
      scriptElement.src = "https://book.instantroofer.com/js/instant-roofer-google-ads-integration.min.js";
      
      scriptElement.onerror = (error) => {
        console.error('Error loading InstantRoofer script:', error);
        isLoadingRef.current = false;
        toast({
          title: "Warning",
          description: "Some features might be limited. Please refresh the page.",
          variant: "destructive"
        });
      };

      scriptElement.onload = () => {
        isLoadingRef.current = false;
      };

      document.body.appendChild(scriptElement);
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
      
      // Remove script on unmount
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [toast]); // Only re-run if toast changes
};