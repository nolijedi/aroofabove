import { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

const SCRIPT_ID = 'instant-roofer-google-ads-integration';
const SCRIPT_URL = 'https://book.instantroofer.com/js/instant-roofer-google-ads-integration.min.js';

export const useScriptLoader = () => {
  const { toast } = useToast();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const mountedRef = useRef(true);
  const timeoutRef = useRef<number>();
  const isLoadingRef = useRef(false);

  const cleanupExistingScripts = () => {
    // Remove any existing scripts with the same ID
    const existingScripts = document.querySelectorAll(`script[id="${SCRIPT_ID}"]`);
    existingScripts.forEach(script => script.remove());
    
    // Clear our script reference if it exists
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }
  };

  const handleScriptLoad = () => {
    console.log('Script loaded successfully');
    if (!mountedRef.current) return;
    
    isLoadingRef.current = false;
    toast({
      title: "Calculator loaded",
      description: "The estimate calculator is ready to use.",
    });
  };

  const handleScriptError = () => {
    console.error('Error loading script');
    if (!mountedRef.current) return;
    
    isLoadingRef.current = false;
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load the calculator. Please refresh the page.",
    });
  };

  const loadScript = () => {
    if (!mountedRef.current || isLoadingRef.current) {
      console.log('Script loading prevented - component unmounted or already loading');
      return;
    }

    // Clean up any existing scripts first
    cleanupExistingScripts();
    
    // Set loading state
    isLoadingRef.current = true;
    
    // Create and append new script
    console.log('Creating new script element');
    const scriptTag = document.createElement('script');
    scriptTag.id = SCRIPT_ID;
    scriptTag.src = SCRIPT_URL;
    scriptTag.async = true;
    scriptTag.onload = handleScriptLoad;
    scriptTag.onerror = handleScriptError;
    
    document.body.appendChild(scriptTag);
    scriptRef.current = scriptTag;
  };

  useEffect(() => {
    console.log('Script loader mounted');
    mountedRef.current = true;

    // Delay initial load to ensure proper cleanup and initialization
    timeoutRef.current = window.setTimeout(loadScript, 1000);

    return () => {
      console.log('Cleaning up script loader');
      mountedRef.current = false;
      
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      isLoadingRef.current = false;
      cleanupExistingScripts();
    };
  }, [toast]);

  return null;
};