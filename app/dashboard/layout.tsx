import React from "react";
import { Navbar } from "../_components/Navbar";
import { Sidebar } from "../_components/Sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let data = await auth()
    if (!data) redirect('/')
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
