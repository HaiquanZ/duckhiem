"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Camera, MapPin, User } from "lucide-react";
import { addData } from "@/lib/services/firestore";
import { Memory } from "@/lib/models/memory";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary-800 to-gray-900">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src="https://avatars.githubusercontent.com/u/97653810?v=4"
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to My World
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            This is my personal website. I want to
            keep and share my memories here. There will be times when I want to
            look back my journey. Thanks for visiting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
            >
              <Link href="#explore-section">Explore</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 shadow-lg"
            >
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 px-4 bg-gray-50" id="explore-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Explore
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg">
              <Link href="/photography">
                <CardContent className="p-6 text-center">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Photography
                  </h3>
                  <p className="text-gray-600">
                    Discover my captured moments and visual stories
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg">
              <Link href="/memory">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Memory
                  </h3>
                  <p className="text-gray-600">
                    Journey through my travel adventures and experiences
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg">
              <Link href="/about">
                <CardContent className="p-6 text-center">
                  <User className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    About
                  </h3>
                  <p className="text-gray-600">
                    Get to know me and my passion for photography
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Latest Photography
              </h3>
              <p className="text-gray-600 mb-6">
                Explore my recent work capturing the beauty of everyday moments
                and extraordinary landscapes.
              </p>
              <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 shadow-md">
                <Link href="/photography" color="black">View Gallery</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Featured photo 1"
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Featured photo 2"
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
