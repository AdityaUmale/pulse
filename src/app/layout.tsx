import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Pulse",
    description: "Pulse Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <TRPCReactProvider>
                    <NuqsAdapter>
                        {children}
                        <Toaster/>
                    </NuqsAdapter>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
