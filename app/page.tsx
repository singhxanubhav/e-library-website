import { AnimatedMeshBackground } from "@/components/landing/animated-mesh-background";
import { HeroSection } from "@/components/landing/hero-section";
import { ProjectOverview } from "@/components/landing/project-overview";
import { CreatorSection } from "@/components/landing/creator-section";
import { FeaturedCompanies } from "@/components/landing/featured-companies";
import { BrowseThemes } from "@/components/landing/browse-themes";
import { LearningOutcomes } from "@/components/landing/learning-outcomes";

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <AnimatedMeshBackground />
      <HeroSection />
      <ProjectOverview />
      <FeaturedCompanies />
      <BrowseThemes />
      <LearningOutcomes />
      <CreatorSection />
    </div>
  );
}
