import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useScriptLoader = () => {
  const { toast } = useToast();
  const SCRIPT_ID = 'instant-roofer-script';
  const isLoadingRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if script is already loaded or loading
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      console.log('Script already exists, skipping load');
      return;
    }

    if (isLoadingRef.current) {
      console.log('Script is currently loading, skipping');
      return;
    }

    const loadScript = () => {
      if (isLoadingRef.current) {
        console.log('Script load already in progress');
        return;
      }
      
      // Remove any existing script first to prevent duplicates
      const oldScript = document.getElementById(SCRIPT_ID);
      if (oldScript) {
        console.log('Removing old script');
        oldScript.remove();
      }

      // Set loading flag
      isLoadingRef.current = true;
      console.log('Starting script load');

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
        console.log('Script loaded successfully');
        isLoadingRef.current = false;
      };

      document.body.appendChild(scriptRef.current);
    };

    // Delay script loading
    timeoutRef.current = window.setTimeout(loadScript, 2000);

    // Add scroll listener for earlier loading
    const scrollHandler = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      loadScript();
    };
    
    window.addEventListener('scroll', scrollHandler, { once: true });

    // Cleanup function
    return () => {
      console.log('Cleaning up script loader');
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('scroll', scrollHandler);
      isLoadingRef.current = false;
      
      // Only remove the script if we're unmounting
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        scriptRef.current.remove();
      }
    };
  }, [toast]); // Only re-run if toast changes
};