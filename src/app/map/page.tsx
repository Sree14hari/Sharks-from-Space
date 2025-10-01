
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
            gradient: { 0.4: 'blue', 0.6: 'cyan', 0.8: '#AAA', 1.0: '#FFF' },
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
              '<div style="display: flex; align-items: center;"><div style="width: 20px; height: 10px; background: #FFF;"></div><span style="margin-left: 5px;">High</span></div>' +
              '<div style="display: flex; align-items: center;"><div style="width: 20px; height: 10px; background: #AAA;"></div><span style="margin-left: 5px;">Medium</span></div>' +
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
            
            <p className="mb-4 text-slate-300 max-w-prose text-sm sm:text-base">
                This interactive map visualizes the predicted foraging hotspots for blue sharks in the North Atlantic. The heatmap indicates the probability of foraging behavior, with red areas representing the highest likelihood. Markers indicate zones of intense activity.
            </p>
            
            <div id="map" className="flex-grow w-full h-[60vh] sm:h-[70vh] rounded-lg border-2 border-primary/50 shadow-2xl neon-glow" />
            
            <div className="relative z-10 w-full max-w-4xl mx-auto py-16 text-slate-200">
                <h2 className="font-headline text-3xl text-center font-bold text-white mb-10 animate-glow">The Hunt for the Ocean's Dining Rooms</h2>
                
                <div className="space-y-8 text-sm sm:text-base text-slate-300">
                    <div>
                        <p>Our mission began with a simple but profound problem: we can track sharks from space, but we don't know where they eat. We had thousands of satellite pings—just dots on a map showing where sharks have been. To protect them, we needed to find their dining rooms: the hidden foraging hotspots where they hunt and feed.</p>
                    </div>
                    
                    <div>
                        <p>Initially, our attempts to use AI were met with failure. We fed the models basic information like the time and location of each ping, but the results were no better than a coin flip. The models were blind; they were looking at individual moments in time, unable to see the story of the shark's movement.</p>
                    </div>

                    <div>
                        <h3 className="font-headline text-xl text-primary mb-2">The breakthrough came when we decided to teach our AI to think like a biologist. Instead of just giving it a single location, we engineered over 20 new features to give it context. We taught it to ask questions like:</h3>
                        <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                            <li>How has the shark's speed changed in the last 30 minutes?</li>
                            <li>Has its turning become more erratic recently?</li>
                            <li>Is this a time of day when hunting is common?</li>
                        </ul>
                        <p className="mt-2">By feeding our model this much richer, more dynamic picture of the shark's recent behavior, it finally began to learn. We used a powerful Light Gradient Boosting Machine that, after extensive tuning, achieved 77.4% accuracy.</p>
                    </div>

                    <div>
                        <p>With this intelligent "brain," we could finally create the map. We generated a grid across the North Atlantic and asked our model to predict the probability of foraging for every single point in the ocean. The result is the heatmap you see: a predictive map that turns simple dots into a clear, actionable picture of the secret life of sharks.</p>
                    </div>
                </div>
            </div>

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
