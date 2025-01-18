import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface IframeMessage {
  app?: string;
  event?: string;
  redirectUrl?: string;
}

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export const useIframeMessage = () => {
  const { toast } = useToast();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        // Validate origin
        const expectedOrigin = "https://book.instantroofer.com";
        if (event.origin !== expectedOrigin) {
          console.log("Invalid origin:", event.origin);
          return;
        }

        // Parse message data safely
        let parsedData: IframeMessage | null = null;
        if (typeof event.data === 'string') {
          try {
            parsedData = JSON.parse(event.data);
          } catch (parseError) {
            console.error('Error parsing message data:', parseError);
            return;
          }
        } else if (typeof event.data === 'object') {
          parsedData = event.data;
        }

        if (!parsedData) {
          console.log('No valid data in message');
          return;
        }

        // Handle Google Analytics tracking
        if (parsedData.app === 'booking' && window.dataLayer) {
          window.dataLayer.push({
            'event': 'iframe_event',
            'iframe_app': parsedData.app,
            'iframe_event_name': parsedData.event
          });
        }

        // Handle redirect if URL is valid
        if (parsedData.redirectUrl && isValidURL(parsedData.redirectUrl)) {
          window.location.href = parsedData.redirectUrl;
        }
      } catch (e) {
        console.error('Error handling message:', e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [toast]);
};

const isValidURL = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};