import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CropEye | Autonomous Computer Vision Crop Defense",
  description:
    "Sub-2-second autonomous computer vision crop pathology detection, live microclimate Wallin spore risk modeling, and deterministic EPA tank-mix work order dispatch for commercial family farms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
