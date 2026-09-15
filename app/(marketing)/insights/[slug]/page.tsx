import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock, Calendar, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEEDED_ARTICLES } from "@/lib/insights-data";
import { prisma } from "@/lib/db";
import { getInitials } from "@/lib/utils";

interface ArticlePageProps {
  params: { slug: string };
}

async function getArticle(slug: string) {
  try {
    const dbInsight = await prisma.insight.findUnique({
      where: { slug },
    });

    if (dbInsight) {
      return {
        slug: dbInsight.slug,
        title: dbInsight.title,
        authorName: dbInsight.authorName,
        authorRole: "Case Study Contributor",
        readingTimeMin: dbInsight.readingTimeMin,
        publishedDate: dbInsight.publishedDate.toISOString().split("T")[0],
        summary: dbInsight.contentMd.slice(0, 160) + "...",
        contentMd: dbInsight.contentMd,
        tags: (dbInsight.tagsJson as string[]) || ["Industry Analysis", "Architecture"],
      };
    }
  } catch (err) {
    console.warn("Could not query DB for article:", err);
  }

  const seeded = SEEDED_ARTICLES.find((a) => a.slug === slug);
  return seeded || null;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | AI Company Case Library`,
    description: article.summary,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const initials = getInitials(article.authorName || "Editorial");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-24">
      {/* Top Navigation */}
      <div>
        <Link
          href="/insights"
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          <span>Back to Industry Insights</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2">
          {article.tags.map((t: string) => (
            <Badge key={t} variant="secondary" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-navy-800 to-electric-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {initials}
            </div>
            <div>
              <p className="font-bold text-foreground">{article.authorName}</p>
              <p className="text-xs text-muted-foreground">{article.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{article.publishedDate}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{article.readingTimeMin} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Markdown Content with Tailwind Typography */}
      <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none overflow-x-hidden break-words prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-electric-500 hover:prose-a:underline prose-pre:bg-navy-950 prose-pre:text-slate-100 prose-pre:rounded-2xl prose-pre:border prose-pre:border-border prose-pre:overflow-x-auto prose-blockquote:border-l-electric-500 prose-blockquote:bg-navy-50/50 dark:prose-blockquote:bg-navy-900/40 prose-blockquote:p-4 prose-blockquote:rounded-r-xl">
        <ReactMarkdown>{article.contentMd}</ReactMarkdown>
      </article>

      {/* Footer Navigation */}
      <div className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/insights">
          <Button variant="outline" className="rounded-xl space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>More Industry Articles</span>
          </Button>
        </Link>
        <Link href="/case-library">
          <Button variant="primary" className="rounded-xl space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Explore Case Studies</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
