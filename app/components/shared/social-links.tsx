import { Icon } from "@iconify/react";

import { configSocialLinks } from "~/configs/social-links";
import { Anchor } from "~/components/ui/anchor";

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-4">
      {configSocialLinks.map(socialLink => (
        <li key={socialLink.text}>
          <Anchor
            href={socialLink.href}
            className="block rounded-md bg-blue-950 p-2 text-2xl text-blue-300 transition-opacity hover:opacity-70"
          >
            <Icon icon={socialLink.icon} />
          </Anchor>
        </li>
      ))}
    </ul>
  );
}
