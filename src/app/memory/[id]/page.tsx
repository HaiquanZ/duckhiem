import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Camera, Utensils, Landmark, Plane } from "lucide-react"
import { trips } from "@/lib/data"

export default function MemoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const tripId = Number.parseInt(unwrappedParams.id)
  const trip = trips.find((t) => t.id === tripId)

  if (!trip) {
    notFound()
  }

  const tripIndex = trips.findIndex((t) => t.id === tripId)
  const prevTrip = tripIndex > 0 ? trips[tripIndex - 1] : null
  const nextTrip = tripIndex < trips.length - 1 ? trips[tripIndex + 1] : null

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <Image src={trip.coverImage || "/placeholder.svg"} alt={trip.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Navigation */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="bg-black/20 backdrop-blur-md text-white hover:bg-black/40 rounded-full"
          >
            <Link href="/memory">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-3 bg-blue-600">{trip.duration}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{trip.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-200 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{trip.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{trip.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Tabs defaultValue="story" className="mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="places">Places</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="space-y-8">
            <div className="prose max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed">{trip.description}</p>
              <p className="text-gray-700">{trip.story}</p>
            </div>

            {/* Trip Highlights */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Trip Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trip.highlights.map((highlight, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                      {index % 3 === 0 && <Landmark className="h-5 w-5" />}
                      {index % 3 === 1 && <Utensils className="h-5 w-5" />}
                      {index % 3 === 2 && <Camera className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{highlight}</h3>
                      <p className="text-sm text-gray-500">
                        {trip.highlightDescriptions?.[index] || "An unforgettable experience from this journey."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {trip.images.map((image, index) => (
                <div key={index} className="relative aspect-square group overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${trip.title} photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="places">
            <div className="space-y-6">
              {trip.places?.map((place, index) => (
                <Card key={index}>
                  <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-1/3 aspect-video md:aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={place.image || trip.images[index % trip.images.length]}
                        alt={place.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                      <p className="text-gray-500 mb-4">{place.type}</p>
                      <p className="text-gray-700">{place.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-gray-500">Map showing the journey through {trip.location}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Trip Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Trip Duration
              </h3>
              <p className="text-gray-700">{trip.duration}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Plane className="h-4 w-4 text-blue-600" />
                Transportation
              </h3>
              <p className="text-gray-700">{trip.transportation || "Flight, Train, and Local Transport"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Utensils className="h-4 w-4 text-blue-600" />
                Cuisine Experienced
              </h3>
              <p className="text-gray-700">{trip.cuisine || "Local delicacies and international cuisine"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Between Trips */}
        <div className="mt-12 border-t pt-8">
          <div className="flex justify-between">
            {prevTrip ? (
              <Link href={`/memory/${prevTrip.id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous Journey
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            {nextTrip ? (
              <Link href={`/memory/${nextTrip.id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  Next Journey
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
