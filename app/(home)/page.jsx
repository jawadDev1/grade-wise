import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="w-full max-w-[1400px] gap-x-12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 "
        id="hero"
      >
        <div className="md:w-1/2 text-center md:text-left animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Revolutionizing Assignment Checking with{" "}
            <span className="text-primary">AI</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            GradeWise leverages AI to streamline the grading process, ensuring
            accuracy and efficiency for educators.
          </p>
          <Button asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
          <Image
            src="/hero.png"
            alt="AI Grading Illustration"
            width={600}
            height={400}
          />
        </div>
      </section>

      {/* Why GradeWise */}
      <section id="why" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why GradeWise is Better
        </h2>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>AI Precision</CardTitle>
              <CardDescription>
                Advanced algorithms ensure consistent and objective grading
                every time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Time Savings</CardTitle>
              <CardDescription>
                Automate repetitive grading tasks and reclaim hours each week.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
              <CardDescription>
                Provide students with insightful, actionable feedback instantly.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Core Features
          </h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex items-start">
              <span className="text-3xl mr-4">🎯</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Custom Rubrics</h3>
                <p className="text-gray-700">
                  Teachers can define criteria and weightings for tailored
                  assessments.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-3xl mr-4">☁️</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
                <p className="text-gray-700">
                  Securely store assignments and results with unlimited access.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-3xl mr-4">🔔</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Notifications</h3>
                <p className="text-gray-700">
                  Real-time alerts for submission deadlines and feedback.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-3xl mr-4">📊</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-700">
                  Track student progress and performance insights at a glance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Section: Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-6">
            <CardContent>
              "GradeWise cut my grading time in half and provided students with
              feedback they truly understood."
            </CardContent>
            <div className="mt-4 text-sm font-semibold">
              — Dr. Emily Carter, Professor of Literature
            </div>
          </Card>
          <Card className="p-6">
            <CardContent>
              "A game-changer for my classroom. The analytics help me identify
              which areas my students struggle with most."
            </CardContent>
            <div className="mt-4 text-sm font-semibold">
              — Mr. David Kim, High School Math Teacher
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-gray-200 py-10">
        <div className="container mx-auto px-6 grid gap-6 lg:grid-cols-3">
          <div>
            <h4 className="font-bold text-xl mb-2">GradeWise</h4>
            <p>AI-driven grading for modern educators.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="#why" className="hover:underline">
                  Why GradeWise
                </a>
              </li>
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2">Contact Us</h4>
            <p>Email: support@gradewise.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          &copy; {new Date().getFullYear()} GradeWise. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
