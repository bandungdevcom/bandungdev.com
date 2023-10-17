import { NavLink } from "@remix-run/react";

export function NavLinks({
  items,
}: {
  items: {
    to: string;
    text: string;
    end?: boolean;
    isMetric?: boolean;
  }[];
}) {
  return (
    <ul className="hidden items-center gap-4 sm:flex sm:gap-8">
      {items.map(item => (
        <li key={item.to}>
          <NavLink
            prefetch="intent"
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
          >
            {item.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
