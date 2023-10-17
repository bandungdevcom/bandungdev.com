import type { VariantProps } from "class-variance-authority";

import { cn } from "~/utils/cn";
import { buttonVariants } from "~/components";

interface ButtonAnchorProps
  extends React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    VariantProps<typeof buttonVariants> {}

const ButtonAnchor = ({
  href = "/",
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ButtonAnchorProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "flex cursor-pointer flex-wrap gap-2",
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    >
      {children}
    </a>
  );
};
ButtonAnchor.displayName = "ButtonAnchor";

export { ButtonAnchor };
