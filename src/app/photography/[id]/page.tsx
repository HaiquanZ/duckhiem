"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Camera, ChevronLeft, ChevronRight, MapPin, Share2, Grid3X3, ImageIcon } from "lucide-react"
import { photos } from "@/lib/data"

export default function PhotoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const photoId = Number.parseInt(unwrappedParams.id)
  const photoSeries = photos.find((p) => p.id === photoId)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!photoSeries) {
    notFound()
  }

  const photoIndex = photos.findIndex((p) => p.id === photoId)
  const prevPhoto = photoIndex > 0 ? photos[photoIndex - 1] : null
  const nextPhoto = photoIndex < photos.length - 1 ? photos[photoIndex + 1] : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <Image
          src={photoSeries.images[selectedImageIndex] || "/placeholder.svg"}
          alt={photoSeries.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Navigation */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-lg shadow-lg"
          >
            <Link href="/photography">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Image Navigation */}
        {photoSeries.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : photoSeries.images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-lg shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImageIndex((prev) => (prev < photoSeries.images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-lg shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm shadow-lg">
          {selectedImageIndex + 1} / {photoSeries.images.length}
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-3 bg-primary-600 text-white border-0 rounded-md">{photoSeries.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{photoSeries.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-200 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{photoSeries.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{photoSeries.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Camera className="h-4 w-4" />
                <span>{photoSeries.camera}</span>
              </div>
              <div className="flex items-center gap-1">
                <ImageIcon className="h-4 w-4" />
                <span>{photoSeries.imageCount} photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Tabs defaultValue="story" className="mb-12">
          <TabsList className="grid grid-cols-3 mb-8 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="story"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white rounded-md"
            >
              Story
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white rounded-md"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white rounded-md"
            >
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="space-y-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">The Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{photoSeries.description}</p>
              <p className="text-gray-700">{photoSeries.story}</p>
            </div>

            {/* Image Descriptions */}
            {photoSeries.imageDescriptions && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Photo Descriptions</h2>
                <div className="space-y-4">
                  {photoSeries.imageDescriptions.map((description, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={photoSeries.images[index] || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => setSelectedImageIndex(index)}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 text-gray-800">Photo {index + 1}</h3>
                        <p className="text-gray-600 text-sm">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photoSeries.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square group overflow-hidden rounded-lg cursor-pointer border-2 transition-colors ${
                    selectedImageIndex === index ? "border-primary-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${photoSeries.title} photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-8">
            {/* Technical Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Technical Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Camera</p>
                  <p className="font-medium text-gray-800">{photoSeries.camera}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Lens</p>
                  <p className="font-medium text-gray-800">{photoSeries.lens}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Aperture</p>
                  <p className="font-medium text-gray-800">{photoSeries.aperture}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Shutter Speed</p>
                  <p className="font-medium text-gray-800">{photoSeries.shutterSpeed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">ISO</p>
                  <p className="font-medium text-gray-800">{photoSeries.iso}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Focal Length</p>
                  <p className="font-medium text-gray-800">{photoSeries.focalLength}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            {/* Thumbnail Navigation */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                <Grid3X3 className="h-4 w-4 text-primary-600" />
                Quick Navigation
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photoSeries.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                      selectedImageIndex === index ? "border-primary-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Share */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <Share2 className="h-4 w-4 text-primary-600" />
                  Share This Series
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-gray-300">
                    Copy Link
                  </Button>
                  <Button size="sm" className="flex-1 shadow-sm">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Photos */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">More Like This</h3>
              <div className="grid grid-cols-2 gap-2">
                {photos
                  .filter((p) => p.category === photoSeries.category && p.id !== photoSeries.id)
                  .slice(0, 4)
                  .map((relatedPhoto) => (
                    <Link href={`/photography/${relatedPhoto.id}`} key={relatedPhoto.id}>
                      <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={relatedPhoto.coverImage || "/placeholder.svg"}
                          alt={relatedPhoto.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Between Photo Series */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex justify-between">
            {prevPhoto ? (
              <Link href={`/photography/${prevPhoto.id}`}>
                <Button variant="outline" className="flex items-center gap-2 border-gray-300">
                  <ChevronLeft className="h-4 w-4" />
                  Previous Series
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            {nextPhoto ? (
              <Link href={`/photography/${nextPhoto.id}`}>
                <Button variant="outline" className="flex items-center gap-2 border-gray-300">
                  Next Series
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
