import { useEffect } from 'react';

const ContactForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'white',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/unAzbiFaCUx7eFxc6SVX"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '0px'
        }}
        id="popup-unAzbiFaCUx7eFxc6SVX"
        data-layout="{'id':'POPUP'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Roofing Services Registration"
        data-height="1145"
        data-layout-iframe-id="popup-unAzbiFaCUx7eFxc6SVX"
        data-form-id="unAzbiFaCUx7eFxc6SVX"
        title="Roofing Services Registration"
      />
    </div>
  );
};

export default ContactForm;