import Image from "next/image";
import { facebookPage } from "@/data/site-content";
import { loadFacebookPosts, type FacebookPost } from "@/lib/facebook";

const open = { target: "_blank", rel: "noopener noreferrer" } as const;

function PostCard({ post }: { post: FacebookPost }) {
  return (
    <a
      href={post.href}
      {...open}
      className={`post-card flex w-[85%] shrink-0 snap-start flex-col border border-border bg-card text-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:w-full ${post.image ? "" : "pb-4"}`}
    >
      <span className="flex items-center gap-3 px-4 pt-4">
        <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
          <path
            fill="currentColor"
            d="M15 3.5h-2.2C10.1 3.5 9 4.7 9 7.1V8.8H7.2v2.7H9V20h2.8v-8.5h2.3l.4-2.7h-2.7V7.4c0-.8.2-1.3 1.4-1.3H15V3.5Z"
          />
        </svg>
        <span className="min-w-0">
          <span className="block">{facebookPage.name}</span>
          <time dateTime={post.date} className="text-sm text-muted-foreground">
            {post.label}
          </time>
        </span>
      </span>
      {post.text ? (
        <span className="line-clamp-5 px-4 pt-3 whitespace-pre-line leading-relaxed">
          {post.text}
        </span>
      ) : null}
      {post.image ? (
        <span className="mt-auto block overflow-hidden pt-4">
          <Image
            src={post.image}
            alt=""
            width={post.width}
            height={post.height}
            sizes="(min-width: 1024px) 22vw, 85vw"
            className="h-auto w-full"
          />
        </span>
      ) : null}
    </a>
  );
}

export async function FacebookPageEmbed() {
  const posts = await loadFacebookPosts();

  return (
    <section className="shell py-16 sm:py-20">
      <h2 className="text-3xl">
        <a href={facebookPage.href} {...open} className="inline-flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15 3.5h-2.2C10.1 3.5 9 4.7 9 7.1V8.8H7.2v2.7H9V20h2.8v-8.5h2.3l.4-2.7h-2.7V7.4c0-.8.2-1.3 1.4-1.3H15V3.5Z"
            />
          </svg>
          Facebook
        </a>
      </h2>
      {posts.length ? (
        <div className="mt-8 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none [&::-webkit-scrollbar]:hidden">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted-foreground">The latest posts could not be loaded.</p>
      )}
    </section>
  );
}
