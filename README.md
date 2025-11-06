# 🦈 Shark Foraging Prediction

This project predicts **foraging hotspots of sharks** in the North Atlantic using machine learning and geospatial analysis.

## 📌 Overview

* Preprocessed satellite and environmental data (SST, chlorophyll, depth, etc.).
* Trained a **LightGBM model** to predict shark foraging probability.
* Generated a geographic grid and filtered out land points using **GeoPandas**.
* Created an interactive **Leaflet.js heatmap** to visualize predicted foraging hotspots.

## 🚀 Features

* Machine learning model for probability estimation
* GeoJSON export (`hotspots.geojson`)
* Interactive heatmap visualization

## ⚙️ Tech Stack

* **Python** (pandas, geopandas, lightgbm)
* **Leaflet.js** for visualization
* **Natural Earth shapefiles** for coastline filtering

## 📂 Outputs

* `hotspots.geojson` – model predictions as geospatial data
* Interactive heatmap of predicted foraging areas
