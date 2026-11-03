import type { ReactNode } from "react";

function Icon({
  className = "size-6",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        {children}
      </g>
    </svg>
  );
}

export function QuoteIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
      <path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
    </Icon>
  );
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M6 19.25v-1.5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1.5" />
    </Icon>
  );
}

export function MusicIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="16" r="2" />
    </Icon>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M10 9.5v5l4.5-2.5-4.5-2.5z" />
    </Icon>
  );
}

export function TicketIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M2.75 7.75a2 2 0 0 1 2-2h14.5a2 2 0 0 1 2 2V9.5a2.5 2.5 0 0 0 0 5v1.75a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2V14.5a2.5 2.5 0 0 0 0-5Zm13.5 0v.75m0 3v1m0 3v.75" />
      <circle cx="9" cy="14.25" r="1.5" />
      <path d="M10.5 14.25v-5.5l2.5 1" />
    </Icon>
  );
}

export function MicIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <rect x="9" y="3.5" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v3.5" />
      <path d="M8.5 20.5h7" />
    </Icon>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M3.5 7.5 12 13l8.5-5.5" />
    </Icon>
  );
}

export function CameraIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M5 8h2.2L9 6h6l1.8 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
      <circle cx="12" cy="13.5" r="3" />
    </Icon>
  );
}

export function BookIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M5 19.5A2.5 2.5 0 0 1 7.5 17H20" />
      <path d="M7.5 4.5H20v15H7.5A2.5 2.5 0 0 1 5 17V7a2.5 2.5 0 0 1 2.5-2.5z" />
    </Icon>
  );
}

export function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <path d="M4 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M15 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2z" />
    </Icon>
  );
}

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4" />
      <path d="M16 3.5v4" />
      <path d="M4 10.5h16" />
    </Icon>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-3.5-3.5" />
    </Icon>
  );
}
