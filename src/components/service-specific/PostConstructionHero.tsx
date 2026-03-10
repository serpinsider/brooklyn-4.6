import BaseHero from '../shared/BaseHero';

interface PostConstructionHeroProps {
  location?: string;
}

export default function PostConstructionHero({ location = "Brooklyn, NY" }: PostConstructionHeroProps) {
  return (
    <BaseHero
      title="Post-Construction Cleaning in Brooklyn & NYC"
      description="Construction cleanup, debris removal, and detailed cleaning after renovations."
      location={location}
      showWizard={true}
    />
  );
}
