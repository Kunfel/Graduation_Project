import React from "react";
import { Navbar } from "../_components/Navbar";
import { Sidebar } from "../_components/Sidebar";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <section className="flex min-h-screen">
                    <Sidebar />
                <main className="flex-grow p-6"> {children}</main>
            </section>

        </>
    );
}
