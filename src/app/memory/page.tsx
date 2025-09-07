"use client";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Memory } from "@/lib/models/memory";
import { getData } from "@/lib/services/firestore";
import { MEMORY_PAGE } from "@/lib/constants/target";
import { collectVisitorInfo } from "@/lib/services/visitor";

export default function MemoryPage() {
  const [memories, SetMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemories() {
      setLoading(true);
      const data = await getData<Memory>("memories");

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

      SetMemories(sortedData);
      setLoading(false);
    }
    fetchMemories();
    collectVisitorInfo(MEMORY_PAGE);
  }, []);

  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-blue-900 to-black h-64 md:h-80">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Memories
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Adventures and journeys that shaped my perspective
            </p>
          </div>
        </div>
      </div>

      {/* World Map Stats */}
      <div className="bg-white py-8 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-gray-600">Countries Visited</div>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">Cities Explored</div>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Photos Taken</div>
            </div>
            <div className="p-6 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600">Adventures</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trips */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Recent Adventures</h2>

        <div className="space-y-12">
          {memories.map((trip) => (
            <Card
              key={trip.id}
              className="overflow-hidden border-0 shadow-lg rounded-2xl"
              onClick={() => {
                router.push(trip.link);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Cover Image */}
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={trip.thumbnail || "/placeholder.svg"}
                    alt={trip.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:bg-gradient-to-t" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600">{trip.duration}</Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-2">{trip.name}</h3>

                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{trip.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{trip.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 line-clamp-3">
                    {trip.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm text-gray-500">
                      HIGHLIGHTS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trip.highlights.map((highlight, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      View Journey
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
