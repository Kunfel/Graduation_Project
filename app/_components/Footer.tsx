import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center">
                    <div className="text-gray-600">© {currentYear} Code Blue</div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600">Terms</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
