import { ThemeProvider } from "@/components/themeProvider";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

const Layout = ({ children }) => {
  return (
    <>
      <html suppressHydrationWarning>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <meta name="generator" content="Next.js" />
          <meta
            name="description"
            content="AgenceX - SEO Agency website landing page made with Next.js and TailwindCSS"
          />
          <title>GradeWise</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="overflow-hidden overflow-y-auto bg-body">
          <Toaster richColors expand position="top-right" />
          <NextTopLoader
            color="#3874FF"
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
          />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default Layout;
