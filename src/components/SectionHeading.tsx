type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
}: Props) {
  const centered = align === "center";
  const onDark = tone === "light";

  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`eyebrow ${onDark ? "eyebrow-on-dark" : ""} ${
          centered ? "justify-center" : ""
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem] ${
          onDark ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            onDark ? "text-ivory/70" : "text-ink-soft/85"
          }`}
        >
          {lead}
        </p>
      ) : null}
      <div className={`rule mt-7 ${centered ? "mx-auto max-w-xs" : "max-w-sm"}`} />
    </div>
  );
}
