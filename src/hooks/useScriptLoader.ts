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
    // First, remove all existing instances of the script
    const existingScripts = document.querySelectorAll(`script#${SCRIPT_ID}`);
    existingScripts.forEach(script => {
      script.remove();
      console.log('Removed existing script instance');
    });
    
    // Clear our script reference
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
      console.log('Cleared script reference');
    }

    // Reset loading state
    isLoadingRef.current = false;
  };

  const handleScriptLoad = () => {
    console.log('Script loaded successfully');
    if (!mountedRef.current) return;
    
    isLoadingRef.current = false;
  };

  const handleScriptError = () => {
    console.error('Error loading script');
    if (!mountedRef.current) return;
    
    isLoadingRef.current = false;
    cleanupExistingScripts();
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load the calculator. Please refresh the page.",
    });
  };

  const loadScript = () => {
    // Prevent loading if unmounted or already loading
    if (!mountedRef.current || isLoadingRef.current) {
      console.log('Script loading prevented - component unmounted or already loading');
      return;
    }

    // Clean up any existing scripts first
    cleanupExistingScripts();
    
    // Set loading state
    isLoadingRef.current = true;
    
    // Create and append new script with unique timestamp to prevent caching
    console.log('Creating new script element');
    const timestamp = new Date().getTime();
    const scriptTag = document.createElement('script');
    scriptTag.id = SCRIPT_ID;
    scriptTag.src = `${SCRIPT_URL}?v=${timestamp}`;
    scriptTag.async = true;
    scriptTag.onload = handleScriptLoad;
    scriptTag.onerror = handleScriptError;
    
    document.body.appendChild(scriptTag);
    scriptRef.current = scriptTag;
  };

  useEffect(() => {
    console.log('Script loader mounted');
    mountedRef.current = true;

    // Delay initial load slightly to ensure proper cleanup
    timeoutRef.current = window.setTimeout(loadScript, 500);

    return () => {
      console.log('Cleaning up script loader');
      mountedRef.current = false;
      
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      cleanupExistingScripts();
    };
  }, [toast]);

  return null;
};