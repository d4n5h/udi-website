import { facebookPage } from "@/data/site-content";

function postSrc(href: string) {
  const params = new URLSearchParams({
    href,
    show_text: "true",
    width: "500",
  });
  return `https://www.facebook.com/plugins/post.php?${params.toString()}`;
}

export function FacebookPageEmbed() {
  return (
    <div className="bg-card p-4 sm:p-6">
      <div className="flex max-h-[34rem] flex-col gap-4 overflow-y-auto">
        {facebookPage.posts.map((href) => (
          <iframe
            key={href}
            title="Post from Udi Shlomo Music on Facebook"
            src={postSrc(href)}
            className="h-[520px] w-full shrink-0 border-0 bg-white"
            allow="encrypted-media"
          />
        ))}
      </div>
      <a
        href={facebookPage.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-primary hover:underline"
      >
        facebook.com/udishlomomusic
      </a>
    </div>
  );
}
