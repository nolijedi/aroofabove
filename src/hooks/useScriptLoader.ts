import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useScriptLoader = () => {
  const { toast } = useToast();
  const SCRIPT_ID = 'instant-roofer-script';
  const isLoadingRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    console.log('Initializing script loader');

    // Check if script is already loaded
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      console.log('Script already exists, skipping load');
      return;
    }

    // Prevent multiple simultaneous loading attempts
    if (isLoadingRef.current) {
      console.log('Script is currently loading, skipping');
      return;
    }

    const loadScript = () => {
      if (!mountedRef.current) {
        console.log('Component unmounted, canceling script load');
        return;
      }

      // Remove any existing script to prevent duplicates
      if (scriptRef.current) {
        console.log('Removing existing script');
        scriptRef.current.remove();
        scriptRef.current = null;
      }

      isLoadingRef.current = true;
      console.log('Creating new script element');

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'text/javascript';
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = "https://book.instantroofer.com/js/instant-roofer-google-ads-integration.min.js";
      
      script.onerror = (error) => {
        console.error('Error loading script:', error);
        if (mountedRef.current) {
          isLoadingRef.current = false;
          toast({
            title: "Warning",
            description: "Some features might be limited. Please refresh the page.",
            variant: "destructive"
          });
        }
      };

      script.onload = () => {
        console.log('Script loaded successfully');
        if (mountedRef.current) {
          isLoadingRef.current = false;
        }
      };

      document.body.appendChild(script);
      scriptRef.current = script;
    };

    // Delay initial script loading
    timeoutRef.current = window.setTimeout(loadScript, 1000);

    // Cleanup function
    return () => {
      console.log('Cleaning up script loader');
      mountedRef.current = false;
      
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      isLoadingRef.current = false;

      // Remove script on unmount
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        scriptRef.current.remove();
      }

      // Remove any other instances that might exist
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [toast]);
};