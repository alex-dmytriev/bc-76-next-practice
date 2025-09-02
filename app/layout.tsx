import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from " @/components/Footer/Footer";
import Header from " @/components/Header/Header";
import TanStackProvider from " @/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "TaskHub",
  description: "An application for note-taking and organization",
  openGraph: {
    title: "TaskHub",
    description: "An application for note-taking and organization",
    url: "https://bc-76-next-practice.vercel.app/",
    images: [
      {
        url: "https://images.pexels.com/photos/7376/startup-photos.jpg",
        width: 1200,
        height: 630,
        alt: "An application for note-taking and organization",
      },
    ],
  },
};

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
