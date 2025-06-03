import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Camera, Mail, MapPin, Heart, Plane } from "lucide-react"

export default function AboutPage() {
  const skills = [
    "Portrait Photography",
    "Landscape Photography",
    "Street Photography",
    "Photo Editing",
    "Lightroom",
    "Photoshop",
    "Travel Planning",
    "Storytelling",
  ]

  const equipment = [
    { name: "Canon EOS R5", type: "Camera Body" },
    { name: "Canon RF 24-70mm f/2.8L", type: "Lens" },
    { name: "Canon RF 70-200mm f/2.8L", type: "Lens" },
    { name: "Canon RF 16-35mm f/2.8L", type: "Lens" },
    { name: "DJI Mini 3 Pro", type: "Drone" },
    { name: "Peak Design Tripod", type: "Accessory" },
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Profile"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate photographer and travel enthusiast capturing life's beautiful moments
          </p>
        </div>

        {/* Bio Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              My Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Hello! I'm a passionate photographer who believes that every moment has a story worth telling. My journey
              with photography began over 8 years ago when I picked up my first camera during a college trip to the
              mountains.
            </p>
            <p>
              What started as a hobby quickly became my greatest passion. I love capturing the raw beauty of landscapes,
              the authentic emotions in portraits, and the vibrant energy of street life. Through my lens, I aim to
              freeze moments that might otherwise be forgotten.
            </p>
            <p>
              When I'm not behind the camera, you'll find me planning my next adventure, editing photos, or sharing
              stories from my travels. I believe that photography is not just about taking pictures—it's about
              connecting with people, places, and experiences that shape who we are.
            </p>
          </CardContent>
        </Card>

        {/* Quick Facts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                Quick Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Based in:</span>
                <span className="font-medium">San Francisco, CA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">8+ Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Favorite Genre:</span>
                <span className="font-medium">Landscape</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Countries Visited:</span>
                <span className="font-medium">15+</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-green-500" />
                Next Adventure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Destination:</span>
                <span className="font-medium">New Zealand</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">When:</span>
                <span className="font-medium">Spring 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Focus:</span>
                <span className="font-medium">Landscapes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">3 Weeks</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-500" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Equipment */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Photography Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {equipment.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              Let's Connect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              I'd love to hear from you! Whether you're interested in collaborating, have questions about photography,
              or just want to chat about travel, feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button variant="outline">View Resume</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
