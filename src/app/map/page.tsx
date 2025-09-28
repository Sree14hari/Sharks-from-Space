
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPage() {
  const mapRef = useRef<Map | null>(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    if (isMapInitialized.current) return;
    isMapInitialized.current = true;

    // Dynamically import Leaflet and its plugins to ensure they only run on the client-side
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      // 'leaflet.heat' extends L, so it must be imported after leaflet
      await import('leaflet.heat');

      // Define custom icon for markers
      const markerIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25],
      });

      // Initialize map
      if (document.getElementById('map') && !mapRef.current) {
        mapRef.current = L.map('map', {
          center: [40, -45],
          zoom: 4,
          scrollWheelZoom: false,
        });
      }

      if (!mapRef.current) {
        // If map couldn't be initialized, do nothing.
        return;
      }

      // Add tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapRef.current!);

      // Fetch and process GeoJSON data
      fetch('/json/hotspots.geojson')
        .then(response => response.json())
        .then(data => {
          if (!mapRef.current) {
              // Map was unmounted before data loaded
              return;
          }

          const heatPoints: [number, number, number][] = [];
          let maxIntensity = 0;

          L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {
              const foragingProb = feature.properties.foraging_prob;
              if (foragingProb) {
                heatPoints.push([latlng.lat, latlng.lng, foragingProb]);
                if (foragingProb > maxIntensity) {
                  maxIntensity = foragingProb;
                }
              }

              // Add markers for the most intense hotspots
              if (foragingProb > 0.9) {
                  const marker = L.marker(latlng, { icon: markerIcon });
                  marker.bindPopup(`<b>Foraging Hotspot</b><br>Probability: ${(foragingProb * 100).toFixed(2)}%`);
                  return marker;
              }
              return L.circleMarker(latlng, { radius: 0, stroke: false }); // Render nothing for less intense points
            },
          }).addTo(mapRef.current!);

          // Add heatmap layer
          (L as any).heatLayer(heatPoints, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            max: maxIntensity,
            gradient: { 0.4: 'blue', 0.6: 'cyan', 0.8: 'yellow', 1.0: 'red' },
          }).addTo(mapRef.current!);
        });
    }

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.postimg.cc/mDdxvDCH/Screenshot-2025-09-28-130448.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 text-slate-200 sm:px-6 lg:px-8 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <Link href="/" className="inline-flex items-center text-primary transition-colors hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
            <MapIcon className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl animate-glow">
                Foraging Hotspot Map
            </h1>
        </div>
        
        <p className="mb-4 text-slate-300 max-w-prose">
            This interactive map visualizes the predicted foraging hotspots for blue sharks in the North Atlantic. The heatmap indicates the probability of foraging behavior, with red areas representing the highest likelihood. Markers indicate zones of intense activity.
        </p>
        
        <div id="map" className="flex-grow w-full h-[60vh] rounded-lg border-2 border-primary/50 shadow-2xl neon-glow" />
      </div>
    </motion.div>
  );
}
