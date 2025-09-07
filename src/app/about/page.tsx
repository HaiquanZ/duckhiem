"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Camera, Mail, MapPin, Heart, Banknote } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { collectVisitorInfo } from "@/lib/services/visitor";
import { ABOUT_PAGE, SAY_HI } from "@/lib/constants/target";
import { SKILLS } from "@/lib/constants/skills";

export default function AboutPage() {
  

  useEffect(() => {
    collectVisitorInfo(ABOUT_PAGE);
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
            <Image
              src="https://avatars.githubusercontent.com/u/97653810?v=4"
              alt="Profile"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I'm just an ordinary person and bla...bla...
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
              In this part, I want to tell the story of my life and my
              achievements. But because I have not achieved anything and have
              not contributed anything to society, I do not know what to write.
              I will add it later.
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
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">Do Duc Khiem</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Personal email:</span>
                <span className="font-medium">nn764562@gmail</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Description:</span>
                <span className="font-medium">
                  Khiêm ngoan ngoãn, hiền lành :V
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-green-500" />
                Donate me if u want
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bank:</span>
                <span className="font-medium">Vietcombank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account number:</span>
                <span className="font-medium">1014943459</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Owner:</span>
                <span className="font-medium">Do Duc Khiem</span>
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
              {SKILLS.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              Talk with me. Don't be shy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Let's Connect! I look forward to hearing from you! If you are
              interested or would like to chat with me, feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => collectVisitorInfo(SAY_HI)}>
                <Link href="https://m.me/hqz.khim">Say "hi"</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
