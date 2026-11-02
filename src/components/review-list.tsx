import type { Review } from "@/data/site-content";

function quoted(quote: string) {
  return quote.startsWith("“") ? quote : `“${quote}”`;
}

const link =
  "text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:decoration-foreground";

function ReadLink({ href }: { href?: string }) {
  return href ? (
    <>
      {" · "}
      <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
        Read the review
      </a>
    </>
  ) : null;
}

export function ReviewList({
  reviews,
  compact = false,
}: {
  reviews: Review[];
  compact?: boolean;
}) {
  if (!compact) {
    return (
      <div className="flex flex-col gap-14">
        {reviews.map((review) => (
          <blockquote key={review.id}>
            <p className="text-quote">{quoted(review.quote)}</p>
            <footer className="mt-5 text-muted-foreground">
              {review.author}
              {review.author !== review.publication ? `, ${review.publication}` : ""}
              <ReadLink href={review.href} />
            </footer>
          </blockquote>
        ))}
      </div>
    );
  }

  return (
    <div className="gap-x-10 sm:columns-2 lg:columns-3">
      {reviews.map((review) => (
        <blockquote key={review.id} className="mb-12 break-inside-avoid border-t border-border pt-6">
          <p
            className={
              review.quote.length < 160
                ? "font-display text-2xl leading-snug tracking-[-0.02em]"
                : "leading-relaxed"
            }
          >
            {quoted(review.quote)}
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{review.publication}</span>
            {review.author !== review.publication ? `, ${review.author}` : ""}
            <ReadLink href={review.href} />
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
