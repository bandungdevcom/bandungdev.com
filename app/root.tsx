import { useEffect } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "@remix-run/react";
import sansFontStyles from "@fontsource-variable/inter/index.css";
import displayFontStyles from "@fontsource/space-grotesk/700.css";
import { Analytics } from "@vercel/analytics/react";
import NProgress from "nprogress";

import { Layout } from "~/components/shared/layout";
import tailwindStyles from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "shortcut icon", href: "/favicons/favicon.ico" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon-precomposed.png",
  },
  { rel: "stylesheet", href: displayFontStyles },
  { rel: "stylesheet", href: sansFontStyles },
  { rel: "stylesheet", href: tailwindStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const navigation = useNavigation();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    if (navigation.state === "idle") NProgress.done();
    else NProgress.start();
  }, [navigation.state]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {isDashboard ? (
          <Outlet />
        ) : (
          <Layout>
            <Outlet />
          </Layout>
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
