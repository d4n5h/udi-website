import { socials } from "@/data/site-content";

const paths: Record<(typeof socials)[number]["label"], string> = {
  Facebook:
    "M15 3.5h-2.2C10.1 3.5 9 4.7 9 7.1V8.8H7.2v2.7H9V20h2.8v-8.5h2.3l.4-2.7h-2.7V7.4c0-.8.2-1.3 1.4-1.3H15V3.5Z",
  Instagram:
    "M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm8 1.6H8A2.9 2.9 0 0 0 5.1 8v8A2.9 2.9 0 0 0 8 18.9h8a2.9 2.9 0 0 0 2.9-2.9V8A2.9 2.9 0 0 0 16 5.1ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.35-2.55a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z",
  YouTube:
    "M21.6 8.2a2.7 2.7 0 0 0-1.9-1.9C18 5.8 12 5.8 12 5.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 3.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-3.8ZM10.4 15.1V8.9L15.6 12l-5.2 3.1Z",
  Spotify:
    "M12 3.2a8.8 8.8 0 1 0 8.8 8.8A8.8 8.8 0 0 0 12 3.2Zm4 12.7a.55.55 0 0 1-.76.18c-2.08-1.27-4.7-1.56-7.78-.85a.55.55 0 1 1-.25-1.07c3.37-.77 6.27-.44 8.6 1a.55.55 0 0 1 .19.74Zm1.08-2.4a.69.69 0 0 1-.95.23c-2.38-1.46-6-1.89-8.82-1.03a.69.69 0 0 1-.4-1.32c3.22-.98 7.22-.5 9.94 1.17a.69.69 0 0 1 .23.95Zm.1-2.5c-2.86-1.7-7.58-1.85-10.3-1.02a.83.83 0 0 1-.48-1.59c3.12-.95 8.3-.76 11.58 1.18a.83.83 0 0 1-.8 1.43Z",
  Bandcamp:
    "M4 16.8 9.2 7.2h10.8L14.8 16.8H4Z",
  "Apple Music":
    "M16.4 4.2c-.9.1-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.5 1 .1 2-.5 2.6-1.2.6-.6 1-1.6.9-2.6ZM16.7 8.6c-1.4-.1-2.6.8-3.3.8s-1.7-.7-2.9-.7c-1.5 0-2.8.9-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1.1 2.6-2.2c.8-1.2 1.2-2.4 1.2-2.4s-2.3-.9-2.3-3.5c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.7-1.7-3.2-1.7h.2Z",
};

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1 ${className}`}>
      {socials.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex size-10 items-center justify-center text-foreground transition-[transform,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-primary active:scale-[0.97]"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path fill="currentColor" d={paths[item.label]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
