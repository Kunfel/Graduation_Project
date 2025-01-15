import React from "react";
import { Navbar } from "../_components/Navbar";
import { Sidebar } from "../_components/Sidebar";
import { guardRoute } from "@/lib/guard";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await guardRoute()
    return (
        <>
            <div className="">
                <Navbar />
                <section className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-grow p-6"> {children}</main>
                </section>
            </div>
        </>
    );
}
