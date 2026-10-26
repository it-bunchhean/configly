import { Article } from "@/types";

interface ArticleSectionProps {
    article: Article;
}

export default function ArticleSection({
    article
}:ArticleSectionProps ) {
    const Icon = article.icon 
    return (
      <article className="mb-8">
        <div className="flex items-center gap-3">
        <div>
            <Icon className="h-4 w-4 "/>
        </div>
        <div>
            <h3 className="text-lg font-medium">{article.title}</h3>
        </div>
        </div>
        <p className="mt-2 text-sm text-muted">
            {article.subtitle}
        </p>
      </article>
    );
}