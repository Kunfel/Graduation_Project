import React from 'react';
import { ArrowRight, HeartPulse } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/app/_components/Footer';

const WebsitePage = () => {
  return (
    <div className="min-h-screen flex flex-col relative ">
      {/* Background Image */}
      <div className="">
        <Image
          alt="Background image"
          src="/images/CodeBlue.png"
          fill={true}
          className="w-full h-full object-cover opacity-100 dark:opacity-10"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Hero Section */}
        <main className="flex-1 max-w-6xl mx-auto px-4 py-20 text-center flex justify-center flex-col">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-6xl font-bold text-blue-700">Code</span>
            <HeartPulse className="text-red-600 w-40 h-40 animate-pulse slow" />
            <span className="text-6xl font-bold text-blue-700">Blue</span>
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Your Life-Saving Connection
          </h1>
          <p className="text-xl text-blue-900 mb-8 max-w-2xl mx-auto">
            In moments of emergency, every second counts. We ensure your critical medical information is instantly accessible to those who need it most.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 flex items-center">
              <Link href="/signup">Join Now</Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-white bg-opacity-90 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50">
              <Link href="/about">
                More about us
              </Link>
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default WebsitePage;