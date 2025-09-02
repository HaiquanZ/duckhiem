"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
  title?: string
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onIndexChange, title }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          e.preventDefault()
          goToPrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          goToNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    onIndexChange(newIndex)
    setIsLoading(true)
  }

  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    onIndexChange(newIndex)
    setIsLoading(true)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleBackdropClick}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Image Container */}
        <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${title || "Image"} ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onLoad={() => setIsLoading(false)}
            priority
          />
        </div>

        {/* Image Info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-4">
            <span className="text-sm">
              {currentIndex + 1} / {images.length}
            </span>
            {title && <span className="text-sm font-medium">{title}</span>}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2 h-auto"
                onClick={() => {
                  // Copy image URL to clipboard
                  navigator.clipboard.writeText(images[currentIndex])
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2 h-auto"
                onClick={() => {
                  // Download image
                  const link = document.createElement("a")
                  link.href = images[currentIndex]
                  link.download = `${title || "image"}-${currentIndex + 1}.jpg`
                  link.click()
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
            <div className="flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg max-w-[80vw] overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onIndexChange(index)
                    setIsLoading(true)
                  }}
                  className={`relative w-12 h-12 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                    index === currentIndex ? "border-white" : "border-transparent hover:border-white/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
