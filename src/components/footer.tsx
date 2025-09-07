"use client";
import Link from "next/link";
import { Camera, Mail, Instagram, Twitter, Github, Facebook } from "lucide-react";
import { collectVisitorInfo } from "@/lib/services/visitor";
import { EMAIL, FACEBOOK, GITHUB, INSTAGRAM } from "@/lib/constants/target";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl mb-4"
            >
              <Camera className="w-6 h-6 text-blue-400" />
              <span>DucKhiem</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              This website is my personal website. It is made by me. I want to
              keep and share my memories here. There will be times when I want
              to look back my journey. Thanks for visiting!
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/_hqz.khim_/"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => collectVisitorInfo(INSTAGRAM)}
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://fb.com/hqz.khim"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => collectVisitorInfo(FACEBOOK)}
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/HaiquanZ"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => collectVisitorInfo(GITHUB)}
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => collectVisitorInfo(EMAIL)}
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/photography"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Photography
                </Link>
              </li>
              <li>
                <Link
                  href="/memory"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Memory
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Ha Noi, Viet Nam</li>
              <li>nn764562@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DucKhiem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
