import React from 'react';
import { Heart, QrCode, AlertCircle, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Footer from '@/app/_components/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Life-Saving Connection
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    In moments of emergency, every second counts. We ensure your critical medical information
                    is instantly accessible to those who need it most.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {/* Mission Statement */}
                <section className="mb-16">
                    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We've developed a comprehensive emergency contact solution that bridges the critical
                            information gap during emergencies. By providing instant access to vital medical data
                            through QR code technology, we help ensure that first responders and medical
                            professionals can provide the most effective care when every moment matters.
                        </p>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                        Essential Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<QrCode />}
                            title="Instant QR Access"
                            description="Your vital medical information is just one scan away, accessible even without internet connectivity."
                        />
                        <FeatureCard
                            icon={<AlertCircle />}
                            title="Critical Medical Data"
                            description="Store your blood type, allergies, conditions, and medications securely for emergency access."
                        />
                        <FeatureCard
                            icon={<Phone />}
                            title="Emergency Contacts"
                            description="Ensure your loved ones can be reached quickly in case of emergency."
                        />
                        <FeatureCard
                            icon={<Heart />}
                            title="AI First Aid Guide"
                            description="Receive AI-powered first aid suggestions based on specific emergency situations."
                        />
                        <FeatureCard
                            icon={<Users />}
                            title="Support Community"
                            description="Connect with others who share similar medical conditions through moderated forums."
                        />
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <div className="bg-blue-500 dark:bg-blue-700 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Be Prepared for Any Emergency
                        </h2>
                        <p className="text-white mb-6">
                            Join thousands of users who trust us with their emergency medical information.
                            Because when seconds count, having your medical information readily available
                            can make all the difference.
                        </p>
                        <Button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700">
                            <Link href="/signup">Join Now</Link>
                        </Button>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
                {description}
            </p>
        </div>
    );
};

export default AboutPage;