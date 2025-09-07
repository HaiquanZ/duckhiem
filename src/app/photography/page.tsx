"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Camera, Filter, Images } from "lucide-react";
import { useEffect, useState } from "react";
import { Photography } from "@/lib/models/photography";
import { getData } from "@/lib/services/firestore";
import { collectVisitorInfo } from "@/lib/services/visitor";
import { PHOTOGRAPHY_PAGE } from "@/lib/constants/target";

export default function PhotographyPage() {
  const [photos, setPhotos] = useState<Photography[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemories() {
      setLoading(true);
      const data = await getData<Photography>("photos");

      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        const isValidA = !isNaN(dateA.getTime());
        const isValidB = !isNaN(dateB.getTime());

        if (!isValidA && !isValidB) return 0; // cả 2 đều invalid → giữ nguyên
        if (!isValidA) return -1; // a invalid → lên đầu
        if (!isValidB) return 1; // b invalid → lên đầu

        return dateB.getTime() - dateA.getTime();
      });

      setPhotos(sortedData);
      setLoading(false);
    }
    fetchMemories();
    collectVisitorInfo(PHOTOGRAPHY_PAGE);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-primary-700 to-primary-900 h-64 md:h-80">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Photography</h1>
            <p className="text-lg text-primary-100 max-w-2xl">
              Capturing moments that tell stories and evoke emotions
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-gray-700">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Landscape",
              "Urban",
              "Nature",
              "Street",
              "Seascape",
              "Portrait",
            ].map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`px-3 py-1 cursor-pointer transition-colors rounded-md ${
                  category === "All"
                    ? "bg-primary-600 hover:bg-primary-700 text-white border-primary-600"
                    : "border-gray-300 text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photoSeries) => (
            <Link href={`/photography/${photoSeries.id}`} key={photoSeries.id}>
              <Card className="group overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={photoSeries.coverImage || "/placeholder.svg"}
                      alt={photoSeries.title}
                      width={600}
                      height={450}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Image Count Badge */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-md px-3 py-1 flex items-center gap-1">
                      <Images className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {photoSeries.imageCount}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge className="mb-2 bg-primary-600 text-white border-0 rounded-md">
                        {photoSeries.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {photoSeries.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2">
                        {photoSeries.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
