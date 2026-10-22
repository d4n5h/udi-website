import type { Review } from "@/data/site-content";

function quoted(quote: string) {
  return quote.startsWith("“") ? quote : `“${quote}”`;
}

const compactSpans = [
  "md:col-span-2 lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

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
            <p className="text-quote max-w-3xl">{quoted(review.quote)}</p>
            <footer className="mt-4 flex flex-wrap items-baseline gap-x-3 text-muted-foreground">
              <span>
                {review.author}
                {review.author !== review.publication ? `, ${review.publication}` : ""}
              </span>
              {review.href ? (
                <a href={review.href} target="_blank" rel="noopener noreferrer" className="text-primary">
                  Read the review
                </a>
              ) : null}
            </footer>
          </blockquote>
        ))}
      </div>
    );
  }

  const ordered = [...reviews].sort((a, b) => b.quote.length - a.quote.length);

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
      {ordered.map((review, index) => (
        <blockquote
          key={review.id}
          className={`flex flex-col justify-between bg-background p-6 ${
            compactSpans[index] ?? "lg:col-span-2"
          }`}
        >
          <p className="text-sm leading-relaxed text-foreground">
            {quoted(review.quote)}
          </p>
          <footer className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>
              <strong className="font-medium text-primary">{review.publication}</strong>
              {review.author !== review.publication ? ` · ${review.author}` : ""}
            </span>
            {review.href ? (
              <a
                href={review.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                Read the review
              </a>
            ) : null}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
