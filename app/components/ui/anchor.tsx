import * as React from "react";

import { cn } from "~/utils";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  withColor?: boolean;
}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ href, withColor = false, className, children, ...props }, ref) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "focus hover-opacity",
          withColor && "text-emerald-700 dark:text-emerald-300",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  },
);
Anchor.displayName = "Anchor";

export { Anchor };
