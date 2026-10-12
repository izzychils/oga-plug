import type { ComponentProps } from "react";
import { Link } from "react-router-dom";

/**
 * A link that behaves correctly from any page.
 *
 * The marketing sections are only mounted on the home route, so an anchor such
 * as `#pricing` inside them is always resolved on the right page and they are
 * left as plain anchors. The shared chrome: the header, the mega-menu and the
 * footer: is different: from `/about` a bare `#pricing` would do nothing, and a
 * plain `href` would trigger a full document load and throw the single-page app
 * away. This wrapper routes the navigation instead and hands the hash to
 * `ScrollManager`, which is the one place that owns scrolling.
 *
 * Anchors that already start with `/` are passed through untouched, and anything
 * that is not a same-site path (mailto:, tel:, https:) is rendered as a normal
 * anchor so external links keep their own semantics.
 */
export function SectionLink({
  to,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const target =
    typeof to === "string" && to.startsWith("#") ? `/${to}` : to;

  return (
    <Link to={target} {...rest}>
      {children}
    </Link>
  );
}

export default SectionLink;
