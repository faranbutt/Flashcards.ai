import React from 'react'
import { Cover } from '../ui/cover';

export default function Footer() {
const date = new Date().getFullYear();
  return (
    <footer className="bg-[#0F172A] rounded-lg shadow dark:bg-gray-900 m-1 flex justify-end items-end border-2 border-t-gray-200">
    <div className="w-full max-w-screen-xl mx-auto p-2">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/cards.png" className="h-8" alt="Flowbite Logo" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 text-white">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6 text-white">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">©{date }<a href="https://faranbuttt.vercel.app/" className="hover:underline"> Faran™</a>. All Rights Reserved.</span>
    </div>
</footer>
  )
}
