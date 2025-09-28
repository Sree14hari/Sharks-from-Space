
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function InfoPage() {
  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://iili.io/K1iHzen.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-slate-200 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center text-primary transition-colors hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl">
          AI for Ocean Predators
        </h1>
        <h2 className="mt-2 font-headline text-xl text-primary sm:text-2xl">
          Predicting Shark Foraging Hotspots
        </h2>

        <div className="mt-12 space-y-10">
          <section>
            <h3 className="font-headline text-2xl font-semibold text-white">Project Mission</h3>
            <p className="mt-4 text-base leading-relaxed">
              To effectively protect vulnerable shark populations, we first need to understand their behavior. This project leverages machine learning to analyze raw satellite tracking data of blue sharks, aiming to identify and predict their elusive foraging hotspots in the North Atlantic. By transforming movement data into behavioral insights, we can provide a valuable tool for marine conservation, helping to identify key areas that may require protection.
            </p>
          </section>

          <section>
            <h3 className="font-headline text-2xl font-semibold text-white">Methodology</h3>
            <p className="mt-4 text-base leading-relaxed">
              This project followed a complete data science pipeline, transforming raw data points into an interactive, predictive map.
            </p>
          </section>

          <section>
            <h4 className="font-headline text-xl font-semibold text-white">1. Data Source & Preparation</h4>
            <p className="mt-3 text-base leading-relaxed">
              The foundation of this project is the publicly available "Movements of blue sharks in the North Atlantic Ocean using satellite telemetry, 2014-2017" dataset. Raw CSV files containing timestamped latitude and longitude pings were loaded, cleaned, and unified into a single dataset.
            </p>
          </section>

          <section>
            <h4 className="font-headline text-xl font-semibold text-white">2. Advanced Feature Engineering</h4>
            <p className="mt-3 text-base leading-relaxed">
              To allow a machine learning model to understand behavior, we engineered a rich set of features from the raw tracking data, including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
              <li>
                <strong>Movement Dynamics:</strong> Instantaneous speed and turning angles were calculated for each data point.
              </li>
              <li>
                <strong>Rolling Statistics:</strong> To capture behavioral context, we calculated the average speed, standard deviation of speed, and variability of turning angles over a moving time window.
              </li>
              <li>
                <strong>Cyclical Time Features:</strong> Month and hour were converted into sine/cosine pairs so the model could understand their cyclical nature (e.g., that December is next to January).
              </li>
              <li>
                <strong>Advanced Metrics:</strong> We created over a dozen additional features like speed_change, movement_efficiency, and turning_intensity to give the model the deepest possible insight into the shark's recent activity.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-headline text-xl font-semibold text-white">3. Machine Learning Model</h4>
            <p className="mt-3 text-base leading-relaxed">
              After experimenting with multiple architectures—including Random Forests, Artificial Neural Networks (ANNs), and sequential LSTMs—a LightGBM (Light Gradient Boosting Machine) model provided the best performance.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
              <li>
                <strong>Class Imbalance:</strong> The "Foraging" behavior is much rarer than "Traveling." We addressed this using advanced sampling techniques like SMOTE to create a balanced training set.
              </li>
              <li>
                <strong>Final Performance:</strong> After extensive tuning, the final model achieved 77.4% accuracy, with a well-balanced 62% precision and 63% recall on the crucial "Foraging" class.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-headline text-xl font-semibold text-white">4. Interactive Visualization</h4>
            <p className="mt-3 text-base leading-relaxed">
              The model's predictions were exported as a GeoJSON file containing the probability of foraging at thousands of points across the North Atlantic. This data is rendered on the website as a dynamic and interactive heatmap using the Leaflet.js library, with "X" markers highlighting the most intense hotspot zones.
            </p>
          </section>

          <section>
            <h3 className="font-headline text-2xl font-semibold text-white">Key Technologies Used</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-base sm:grid-cols-3">
              <li><strong>Programming Language:</strong> Python</li>
              <li><strong>Data Manipulation:</strong> Pandas, NumPy</li>
              <li><strong>Machine Learning:</strong> Scikit-learn, LightGBM, imblearn</li>
              <li><strong>Web Visualization:</strong> Leaflet.js, GeoJSON</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
