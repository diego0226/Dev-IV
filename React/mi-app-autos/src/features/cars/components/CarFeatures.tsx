import "./CarFeatures.css";

interface CarFeaturesProps {
  features: string[];
}

const CarFeatures = ({features}:CarFeaturesProps) => {
  return (
    <>
      <h2>Características</h2>

      <ul className="car-features">
        {features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>
    </>
  );
};

export default CarFeatures;
