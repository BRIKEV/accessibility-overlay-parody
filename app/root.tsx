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
        {/* Basic SEO */}
        <title>Accessibility Overlay Parody – Why Widgets Are Not Accessibility</title>
        <meta name="description" content="A parody demo showing how frustrating accessibility overlay widgets can be. Real accessibility is built with WCAG and semantic HTML, not forced plugins." />
        <meta name="keywords" content="accessibility, a11y, accessibility overlay, accessibility widgets, WCAG, web accessibility, semantic HTML, assistive technology, overlays critique, parody" />

        {/* Open Graph / Social */}
        <meta property="og:title" content="Accessibility Overlay Parody – Why Widgets Are Not Accessibility" />
        <meta property="og:description" content="Try filling out a form using a fake accessibility widget, then learn why overlays are not the solution. A parody demo about real accessibility." />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://yourdomain.com/" /> */}
        {/* <meta property="og:image" content="https://yourdomain.com/social-preview.png" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accessibility Overlay Parody – Why Widgets Are Not Accessibility" />
        <meta name="twitter:description" content="Experience a parody demo that shows why accessibility overlays frustrate users. Real accessibility comes from WCAG, not widgets." />
        {/* <meta name="twitter:image" content="https://yourdomain.com/social-preview.png" /> */}
        {/* Favicons */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="accessibility overlay parody" />
        <link rel="manifest" href="/site.webmanifest" />
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
