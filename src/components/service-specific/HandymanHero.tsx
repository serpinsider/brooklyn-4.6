import BaseHero from '../shared/BaseHero';

interface HandymanHeroProps {
  location?: string;
}

export default function HandymanHero({ location = "Brooklyn, NY" }: HandymanHeroProps) {
  return (
    <BaseHero
      title="Professional Handyman Services in Brooklyn & NYC"
      description="Furniture assembly, TV mounting, repairs, and home improvement services."
      location={location}
      showWizard={true}
    />
  );
}
