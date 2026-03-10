import BaseHero from '../shared/BaseHero';
import CarCleaningStepWizard from '../specialty-wizards/CarCleaningStepWizard';

interface CarCleaningHeroProps {
  location?: string;
}

export default function CarCleaningHero({ location = "Brooklyn, NY" }: CarCleaningHeroProps) {
  return (
    <BaseHero
      title="Mobile Car Cleaning & Detailing in Brooklyn & NYC"
      description="Mobile detailing and car cleaning services. Interior, exterior, and full detail packages. We come to you."
      location={location}
      showWizard={true}
      CustomWizard={CarCleaningStepWizard}
    />
  );
}
