import React, { useState, useEffect } from 'react';

const InstallPWA = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Hide the popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Function to handle the install button click
  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the installation prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the installation');
        } else {
          console.log('User dismissed the installation');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className={`popup ${showPopup ? 'show' : 'hide'}`}>
      <p>Install our app for a better experience!</p>
      <button onClick={handleInstallClick}>Install</button>
    </div>
  );
};

export default InstallPWA;
