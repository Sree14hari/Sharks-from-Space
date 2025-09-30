'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Map } from 'leaflet';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';

// Import Leaflet and MarkerCluster CSS
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export default function MapPage() {
  const mapRef = useRef<Map | null>(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    if (isMapInitialized.current) return;
    isMapInitialized.current = true;

    const initMap = async () => {
      // --- DYNAMIC IMPORTS for client-side rendering ---
      const L = (await import('leaflet')).default;
      // These plugins extend the 'L' object
      await import('leaflet.heat');
      await import('leaflet.markercluster');

      // --- UPDATED: Custom 'X' marker icon using DivIcon for better styling ---
      const createXIcon = (probability: number) => {
        return L.divIcon({
          html: `<b>X</b>`,
          className: 'x-marker',
          iconSize: [20, 20],
        });
      };
      
      // Initialize map
      if (document.getElementById('map') && !mapRef.current) {
        mapRef.current = L.map('map', {
          center: [40, -65],
          zoom: 4,
          scrollWheelZoom: false,
          maxBounds: [[-20, -120], [70, 20]] // Prevents panning too far away
        });
      }

      if (!mapRef.current) return;
      const map = mapRef.current;

      // --- NEW: Multiple Basemaps for user to choose ---
      const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      });
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
      });
      
      darkLayer.addTo(map); // Set the default basemap

      // Fetch and process GeoJSON data
      fetch('/hotspots.geojson')
        .then(response => response.json())
        .then(data => {
          if (!mapRef.current) return;

          // --- REFACTORED: Process data for both layers at once ---
          const heatPoints: [number, number, number][] = [];
          
          // --- NEW: Use MarkerClusterGroup for performance and better visuals ---
          const markerCluster = L.markerClusterGroup();

          data.features.forEach((feature: any) => {
            const { coordinates } = feature.geometry;
            const { probability } = feature.properties;
            const latlng: [number, number] = [coordinates[1], coordinates[0]];

            // Add point to heatmap data
            heatPoints.push([latlng[0], latlng[1], probability]);

            // Add markers only for the most intense hotspots to the cluster group
            if (probability > 0.75) {
              const marker = L.marker(latlng, { icon: createXIcon(probability) });
              marker.bindPopup(`<b>Foraging Hotspot</b><br>Probability: ${(probability * 100).toFixed(2)}%`);
              markerCluster.addLayer(marker);
            }
          });
          
          // --- Create Layers ---
          const heatLayer = (L as any).heatLayer(heatPoints, {
            radius: 20,
            blur: 20,
            maxZoom: 10,
            gradient: { 0.4: 'blue', 0.6: 'cyan', 0.8: 'yellow', 1.0: 'red' },
          });

          // --- NEW: Layer Control Logic ---
          const baseMaps = {
            "Dark Matter": darkLayer,
            "Satellite View": satelliteLayer
          };

          const overlayMaps = {
            "Heatmap": heatLayer,
            "Hotspot Markers": markerCluster
          };
          
          L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

          // Add default layers
          heatLayer.addTo(map);
          markerCluster.addTo(map);

          // --- NEW: Custom Legend Control ---
          const legend = new L.Control({ position: 'bottomright' });
          legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            div.innerHTML = 
              '<div style="background-color: rgba(0, 0, 0, 0.7); padding: 10px; border-radius: 5px; color: white;">' +
              '<h4>Probability</h4>' +
              '<div style="display: flex; align-items: center;"><div style="width: 20px; height: 10px; background: red;"></div><span style="margin-left: 5px;">High</span></div>' +
              '<div style="display: flex; align-items: center;"><div style="width: 20px; height: 10px; background: yellow;"></div><span style="margin-left: 5px;">Medium</span></div>' +
              '<div style="display: flex; align-items: center;"><div style="width: 20px; height: 10px; background: blue;"></div><span style="margin-left: 5px;">Low</span></div>' +
              '<div><b>X</b> &nbsp; Intense Hotspot</div>' +
              '</div>';
            return div;
          };
          legend.addTo(map);
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
        {/* You can keep your background styling here */}
        <div className="absolute inset-0 bg-black/80" />
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 text-slate-200 sm:px-6 lg:px-8 flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <Link href="/" className="inline-flex items-center text-primary transition-all hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <CyberpunkHover text="Back to Home" />
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
            
            {/* Simple CSS to make the marker cluster popups look better on a dark theme */}
            <style jsx global>{`
              .leaflet-popup-content-wrapper, .leaflet-popup-tip {
                background: #333;
                color: #fff;
              }
              .x-marker {
                  color: #ffcc00;
                  font-weight: bold;
                  font-size: 20px;
                  text-align: center;
                  line-height: 20px;
                  margin-left: -10px;
                  margin-top: -10px;
                  text-shadow: 0px 0px 4px #000;
              }
            `}</style>
        </div>
    </motion.div>
  );
}
