import { notFound } from "next/navigation";
import { getCompanyBySlug } from "@/lib/companies";
import { SnapshotHeader } from "@/components/company-module/snapshot-header";
import { ProblemSection } from "@/components/company-module/problem-section";
import { SolutionDiagram } from "@/components/company-module/solution-diagram";
import { BusinessModelSection } from "@/components/company-module/business-model-section";
import { TractionMetricsSection } from "@/components/company-module/traction-metrics-section";
import { InsightsSection } from "@/components/company-module/insights-section";
import { DidYouKnowCard } from "@/components/company-module/did-you-know-card";
import { InteractionSection } from "@/components/company-module/interaction-section";
import { QuizPlaceholderCard } from "@/components/company-module/quiz-placeholder-card";
import { ModuleNav } from "@/components/company-module/module-nav";

interface CompanyPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CompanyPageProps) {
  const { company } = await getCompanyBySlug(params.slug);
  if (!company) return { title: "Company Not Found" };

  return {
    title: `${company.name} Case Study | AI Company Case Library`,
    description: company.valueProposition,
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { company, prevCompany, nextCompany } = await getCompanyBySlug(
    params.slug
  );

  if (!company) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* 1. Snapshot Header */}
      <SnapshotHeader company={company} />

      {/* 2. The Problem They Solve */}
      <ProblemSection problemText={company.problemDescription} />

      {/* 3. AI-Powered Solution + Animated Workflow Diagram */}
      <SolutionDiagram company={company} />

      {/* 4. Business Model & Monetization */}
      <BusinessModelSection
        businessModelDescription={company.businessModelDescription}
        tags={company.tags}
      />

      {/* 5. Traction & Metrics */}
      <TractionMetricsSection metrics={company.tractionMetrics} />

      {/* 6. Key Insights & Learnings */}
      <InsightsSection keyInsights={company.keyInsights} />

      {/* 7. Did You Know? (Amber highlight card) */}
      <DidYouKnowCard funFact={company.funFact} />

      {/* 8. Interaction section (Poll, Challenge, Tradeoff, Peer Insight) */}
      <InteractionSection
        interaction={company.interaction}
        companySlug={company.slug}
      />

      {/* 9. Module Quiz Section */}
      <QuizPlaceholderCard companyName={company.name} />

      {/* Bottom Navigation */}
      <ModuleNav prevCompany={prevCompany} nextCompany={nextCompany} />
    </div>
  );
}
