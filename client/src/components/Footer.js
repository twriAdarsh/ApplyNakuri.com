import React from 'react'
import logoURL from '../assets/img/logo.jpeg'

export const Footer = () => {

    const footerNav = ["Jobs","Login","Signup","Post Job"]

    return (
        <footer className="bg-gray-900 text-gray-300 -mx-4 xl:-mx-24 mt-8">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
                        <img src={logoURL} className="rounded-full h-12" alt="ApplyNaukri Logo" />
                        <span className="text-2xl font-semibold text-white">ApplyNaukri™</span>
                    </a>
                    <ul className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium">
                        {
                            footerNav.map((menu, key) => {
                                return (
                                    <li key={key}>
                                        <a href="#" className="hover:text-white transition-colors">{menu}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <hr className="my-6 border-gray-700" />
                <span className="block text-sm text-gray-500 sm:text-center">© 2026 <a href="/" className="hover:text-white transition-colors">ApplyNaukri™</a>. All Rights Reserved.</span>
            </div>
        </footer>

    )
}
