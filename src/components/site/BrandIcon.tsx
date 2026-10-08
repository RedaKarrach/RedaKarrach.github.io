import { brandIcons } from "@/content/brand-icons.generated";
import { brands } from "@/content/brands";

/**
 * Brand logo for a tool name: a simple-icons path when one exists, otherwise a
 * monogram badge. Monochrome (currentColor) so it works on both themes.
 */
export function BrandIcon({
  tool,
  className = "h-4 w-4",
  title,
}: {
  tool: string;
  className?: string;
  /** Pass a title to make the icon meaningful; otherwise it is decorative. */
  title?: string;
}) {
  const brand = brands[tool];
  const icon = brand?.slug ? brandIcons[brand.slug] : undefined;
  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={title ? undefined : true}
        role={title ? "img" : undefined}
        focusable="false"
      >
        {title ? <title>{title}</title> : null}
        <path d={icon.path} fill="currentColor" />
      </svg>
    );
  }
  const badge = brand?.badge ?? tool.slice(0, 2);
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <text
        x="12"
        y="12.5"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontFamily="var(--font-plex-mono), ui-monospace, monospace"
        fontWeight="600"
        fontSize={badge.length > 2 ? 8 : 10}
      >
        {badge}
      </text>
    </svg>
  );
}
