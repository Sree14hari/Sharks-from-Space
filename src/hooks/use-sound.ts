
'use client';

import { useEffect, useRef } from 'react';

const useSound = () => {
  const isBgMusicPlaying = useRef(false);

  useEffect(() => {
    // --- Sound Effects ---
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

    // --- Background Music ---
    const bgMusic = new Audio('/sounds/background.mp3'); // Dummy path
    bgMusic.loop = true;
    bgMusic.volume = 0.3; // Lower volume for background music

    const playBgMusic = () => {
      if (!isBgMusicPlaying.current) {
        bgMusic.play().then(() => {
          isBgMusicPlaying.current = true;
        }).catch(e => {
          // Autoplay was prevented, wait for user interaction
        });
      }
    };

    // Try to play initially
    playBgMusic();

    const handleFirstInteraction = () => {
      playBgMusic();
      // Remove the listener after the first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    // Add listeners to play on first user interaction as a fallback
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);


    // --- Event Listener Management ---
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
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      bgMusic.pause();
    };
  }, []);
};

export default useSound;
