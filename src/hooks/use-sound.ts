
'use client';

import { useEffect, useRef } from 'react';
import { useSoundContext } from './use-sound-context';

const useSound = () => {
  const { setBgMusic, setClickSound, setHoverSound, volume, isMuted } = useSoundContext();
  const isBgMusicPlaying = useRef(false);

  useEffect(() => {
    // --- Sound Effects ---
    const clickAudio = new Audio('/sounds/click.mp3'); // Dummy path
    const hoverAudio = new Audio('/sounds/hover.mp3'); // Dummy path
    setClickSound(clickAudio);
    setHoverSound(hoverAudio);

    const playClickSound = () => {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(e => {}); // Catch errors if playback fails
    };

    const playHoverSound = () => {
      hoverAudio.currentTime = 0;
      hoverAudio.play().catch(e => {}); // Catch errors if playback fails
    };

    // --- Background Music ---
    const music = new Audio('/sounds/background.mp3'); // Dummy path
    music.loop = true;
    music.volume = volume;
    music.muted = isMuted;
    setBgMusic(music);

    const playBgMusic = () => {
      if (!isBgMusicPlaying.current) {
        music.play().then(() => {
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
      music.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const music = document.querySelector('audio');
    if (music) {
      music.volume = volume;
      music.muted = isMuted;
    }
  }, [volume, isMuted]);
};

export default useSound;
