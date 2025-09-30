
'use client';

import { useEffect } from 'react';

const useSound = () => {
  useEffect(() => {
    const clickSound = new Audio('/sounds/click.mp3'); // Dummy path
    const hoverSound = new Audio('/sounds/hover.mp3'); // Dummy path

    const playClickSound = () => {
      clickSound.currentTime = 0;
      clickSound.play().catch(e => {}); // Catch errors if playback fails
    };

    const playHoverSound = () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(e => {}); // Catch errors if playback fails
    };

    const addSoundListeners = (element: HTMLElement) => {
      element.addEventListener('click', playClickSound);
      element.addEventListener('mouseenter', playHoverSound);
    };

    const removeSoundListeners = (element: HTMLElement) => {
      element.removeEventListener('click', playClickSound);
      element.removeEventListener('mouseenter', playHoverSound);
    };

    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(el => addSoundListeners(el as HTMLElement));

    // Observer to catch dynamically added elements
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            const element = node as HTMLElement;
            if (element.matches('a, button')) {
              addSoundListeners(element);
            }
            element.querySelectorAll('a, button').forEach(child => addSoundListeners(child as HTMLElement));
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      interactiveElements.forEach(el => removeSoundListeners(el as HTMLElement));
      observer.disconnect();
    };
  }, []);
};

export default useSound;
