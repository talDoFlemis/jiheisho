import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Database,
  LineChart,
  Microscope,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center p-4 sm:justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Brain className="h-6 w-6 text-primary" />
            <span>Sarumnesia</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#demo"
                className="text-sm font-medium hover:text-primary"
              >
                Demo
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary"
              >
                Contact
              </Link>
              <Link
                href="/classify"
                className="text-sm font-medium hover:text-primary"
              >
                <Button size="sm">Try Now</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex" variant="outline">
                    AI-Powered Primate Classification
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Sarumnesia
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Advanced AI technology that accurately classifies monkeys
                    into 10 distinct categories with unprecedented precision.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/classify"
                    className="text-sm font-medium hover:text-primary"
                  >
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://www.adelaidezoo.com.au/wp-content/uploads/sites/2/animals/2017/05/EmperorTamarinSlider.jpg"
                    alt="Monkey classification visualization"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Innovative Technology
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Advanced Monkey Classification
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI model can identify and classify monkeys with over 98%
                  accuracy across 10 distinct primate categories.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Microscope className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle>High Precision</CardTitle>
                  <CardDescription>
                    98.7% accuracy in identifying monkey species from images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Our model has been trained on over 500,000 images to ensure
                  the highest level of classification accuracy.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle>Real-time Processing</CardTitle>
                  <CardDescription>
                    Classify monkeys in milliseconds with our optimized
                    algorithms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Sarumnesia processes images in real-time, making it perfect
                  for field research and conservation efforts.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Database className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle>Comprehensive Dataset</CardTitle>
                  <CardDescription>
                    Trained on the world&apos;s largest primate image database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Our model leverages a diverse dataset covering all major
                  monkey species across different environments.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <LineChart className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>
                    Get comprehensive insights about classification results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Receive detailed reports on confidence scores, feature
                  detection, and comparative analysis.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Share2 className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle>Easy Integration</CardTitle>
                  <CardDescription>
                    Simple API for seamless integration with existing systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Our RESTful API makes it easy to incorporate Sarumnesia into
                  your research tools and applications.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Sparkles className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle>Continuous Learning</CardTitle>
                  <CardDescription>
                    Self-improving model that gets better with each
                    classification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Sarumnesia continuously refines its classification abilities
                  through federated learning techniques.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Classification Categories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sarumnesia can accurately identify and classify monkeys into
                  these 10 distinct categories.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[
                {
                  name: "Bald Uakari",
                  image:
                    "https://media.sciencephoto.com/c0/09/14/54/c0091454-800px-wm.jpg",
                },
                {
                  name: "Emepero Tamarin",
                  image:
                    "https://www.adelaidezoo.com.au/wp-content/uploads/sites/2/animals/2017/05/EmperorTamarinSlider.jpg",
                },
                {
                  name: "Golden Monkey",
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvIOpONh67p7Bb8RK3TSiMsURQQy-HKh52g&s",
                },
                {
                  name: "Gray Langur",
                  image:
                    "https://media.istockphoto.com/id/937341658/photo/gray-langur-monkey-in-the-wild.jpg?s=612x612&w=0&k=20&c=zUmyLYctA2a_GK-CB_79PJELW7c6Ry_8rkGy9WK0M6s=",
                },
                {
                  name: "Hamadryias Baboon",
                  image:
                    "https://media.istockphoto.com/id/517482917/photo/male-hamadryas-baboon.jpg?s=612x612&w=0&k=20&c=quE-4c6qrQTy1KTOZVHllIeZgYRBRcNsp-5eJZbVZs0=",
                },
                {
                  name: "Mandrill",
                  image:
                    "https://cdn.pixabay.com/photo/2015/02/28/15/48/ape-653705_1280.jpg",
                },
                {
                  name: "Proboscis Monkey",
                  image:
                    "https://cdn.britannica.com/06/150806-050-6AE99C98/Proboscis-monkey.jpg",
                },
                {
                  name: "Red Howler",
                  image:
                    "https://www.dublinzoo.ie/wp-content/uploads/2022/04/PB22029_DZ_HOWLER_025-1600x1066.jpg",
                },
                {
                  name: "Vervet Monkey",
                  image:
                    "https://media.istockphoto.com/id/93214254/photo/vervet-monkey-chlorocebus-pygerythrus.jpg?s=612x612&w=0&k=20&c=p0Pxilywbzh0Jcsobjv3zCUaT5IQ93eTOtre8He4W9A=",
                },
                {
                  name: "White Faced Saki",
                  image:
                    "https://media.istockphoto.com/id/1369809221/photo/male-white-faced-saki-pithecia-pithecia-close-up-animal-portrait-looking-at-camera.jpg?s=612x612&w=0&k=20&c=G6igneZ4mo93qdR3QrV1uuc0m0RSWSasOa0hch058P8=",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="aspect-square object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="font-medium">{category.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  About Sarumnesia
                </h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sarumnesia was developed by a team of AI researchers and
                  primatologists to advance the field of primate conservation
                  and research.
                </p>
              </div>
            </div>

            <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/diego.jpeg"
                    alt="Dr. Diego Rabelo"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Dr. Diego Rabelo</CardTitle>
                  <CardDescription>Lead AI Researcher</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Specializes in computer vision and deep learning. Led the
                    development of Sarumnesia&apos;s core classification
                    algorithm.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/erik.jpg"
                    alt="Dr. Erik Bayerlein"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Dr. Erik Bayerlein</CardTitle>
                  <CardDescription>Senior Primatologist</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    20+ years experience in primate behavior research. Oversees
                    the validation of classification results.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/gabriel.jpeg"
                    alt="Dr. Antonio Gabriel"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Dr. Antonio Gabriel</CardTitle>
                  <CardDescription>Conservation Specialist</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Leads field implementation and coordinates with conservation
                    organizations worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/said.jpeg"
                    alt="Dr. Said Rodrigues"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Dr. Said Rodrigues</CardTitle>
                  <CardDescription>Data Science Director</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manages our extensive primate database and oversees the
                    continuous improvement of our models.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide researchers, conservationists, and wildlife
                    enthusiasts with cutting-edge tools for primate
                    identification and monitoring, contributing to global
                    conservation efforts.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">The Technology</h3>
                  <p className="text-muted-foreground">
                    Sarumnesia uses a custom-built convolutional neural network
                    trained on over 500,000 images of primates from around the
                    world. Our model can identify subtle differences between
                    species that even trained experts might miss.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to start classifying?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join researchers and conservationists worldwide who are using
                Sarumnesia to advance primate research and conservation.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-primary" />
            <span>Sarumnesia</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Sarumnesia. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
