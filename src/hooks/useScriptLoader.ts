import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useScriptLoader = () => {
  const { toast } = useToast();

  useEffect(() => {
    let isScriptsLoaded = false;
    let timeoutId: number;

    const loadScripts = () => {
      if (!isScriptsLoaded) {
        const instantRooferScript = document.createElement('script');
        instantRooferScript.type = 'text/javascript';
        instantRooferScript.async = true;
        instantRooferScript.crossOrigin = "anonymous";
        instantRooferScript.onerror = (error) => {
          console.error('Error loading InstantRoofer script:', error);
          toast({
            title: "Warning",
            description: "Some features might be limited. Please refresh the page.",
            variant: "destructive"
          });
        };
        instantRooferScript.src = "https://book.instantroofer.com/js/instant-roofer-google-ads-integration.min.js";
        document.body.appendChild(instantRooferScript);
        isScriptsLoaded = true;
      }
    };

    timeoutId = window.setTimeout(loadScripts, 7000);

    const scrollHandler = () => loadScripts();
    window.addEventListener('scroll', scrollHandler, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [toast]);
};