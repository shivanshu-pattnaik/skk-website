type Props = { className?: string };

export default function Ornament({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 240 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
    >
      <path
        d="M0 12h86M154 12h86"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M96.5 12c5.5-7.5 13.5-10 23.5-10s18 2.5 23.5 10c-5.5 7.5-13.5 10-23.5 10s-18-2.5-23.5-10Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="120" cy="12" r="3" fill="currentColor" />
      <circle cx="88" cy="12" r="1.6" fill="currentColor" opacity="0.75" />
      <circle cx="152" cy="12" r="1.6" fill="currentColor" opacity="0.75" />
    </svg>
  );
}
