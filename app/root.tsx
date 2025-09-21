import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Accessibility Overlay Parody – Why Widgets Are Not Accessibility" },
    {
      name: "description",
      content:
        "A parody demo showing how frustrating accessibility overlay widgets can be. Real accessibility is built with WCAG and semantic HTML, not forced plugins.",
    },
    {
      name: "keywords",
      content:
        "accessibility, a11y, accessibility overlay, accessibility widgets, WCAG, web accessibility, semantic HTML, assistive technology, overlays critique, parody",
    },
    // Open Graph
    {
      property: "og:title",
      content:
        "Accessibility Overlay Parody – Why Widgets Are Not Accessibility",
    },
    {
      property: "og:description",
      content:
        "Try filling out a form using a fake accessibility widget, then learn why overlays are not the solution. A parody demo about real accessibility.",
    },
    { property: "og:type", content: "website" },
    // { property: "og:url", content: "https://yourdomain.com/" },
    // { property: "og:image", content: "https://yourdomain.com/social-preview.png" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Accessibility Overlay Parody – Why Widgets Are Not Accessibility",
    },
    {
      name: "twitter:description",
      content:
        "Experience a parody demo that shows why accessibility overlays frustrate users. Real accessibility comes from WCAG, not widgets.",
    },
    {
      name: "twitter:image",
      // content: "https://yourdomain.com/social-preview.png",
    },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
