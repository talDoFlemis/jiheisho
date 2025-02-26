"use client";

import type React from "react";
import { classify, type PrimateClass } from "./actions";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brain, Upload, X, ArrowLeft, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ClassifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState<{
    class: PrimateClass;
    confidence: number;
    allClasses: { name: PrimateClass; confidence: number }[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const monkeyClasses = [
    "Bald Uakari",
    "Emperor Tamarin",
    "Golden Monkey",
    "Gray Langur",
    "Hamadryas Baboon",
    "Mandril",
    "Proboscis Monkey",
    "Red Howler",
    "Vervet Monkey",
    "White Faced Saki",
  ] as const;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile?: File) => {
    setError(null);

    if (!selectedFile) {
      return;
    }

    // Check file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }

    // Check file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    // Reset result
    setResult(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const classifyImage = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const classificationResult = await classify({ file });

      // Convert predictions object to sorted array
      const allClassesResult = Object.entries(classificationResult.predictions)
        .map(([name, confidence]) => ({
          name: name as PrimateClass,
          confidence,
        }))
        .sort((a, b) => b.confidence - a.confidence);

      setResult({
        class: classificationResult.highest_confidence_class,
        confidence:
          classificationResult.predictions[
          classificationResult.highest_confidence_class
          ],
        allClasses: allClassesResult,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to classify image");
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return "text-green-600";
    if (confidence >= 0.3) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Brain className="h-6 w-6 text-primary" />
            <span>Sarumnesia</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                <ArrowLeft className="mr-1 inline h-4 w-4" />
                Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Monkey Classification
            </h1>
            <p className="text-muted-foreground">
              Upload an image of a monkey and our AI will classify it into one
              of 10 species with a confidence score.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div
                className={`rounded-lg border-2 border-dashed p-6 text-center ${isDragging
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/25"
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!preview ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-1 text-lg font-medium">
                      Drag and drop your image here
                    </p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      or click to browse (max 10MB)
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Select Image
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 z-10"
                      onClick={clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="relative aspect-square max-h-[400px] overflow-hidden rounded-md">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    {file ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB)
                      </p>
                    ) : null}
                  </div>
                )}
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!file || isLoading}
                onClick={classifyImage}
              >
                {isLoading ? "Classifying..." : "Classify Image"}
              </Button>
            </div>

            <div>
              {isLoading ? (
                <Card className="flex h-full flex-col items-center justify-center p-8">
                  <div className="space-y-4 text-center">
                    <p className="text-lg font-medium">Analyzing image...</p>
                    <Progress value={45} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Our AI is processing your image to identify the monkey
                      species
                    </p>
                  </div>
                </Card>
              ) : result ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold">
                            Classification Result
                          </h3>
                          <Badge
                            variant={
                              result.confidence > 0.8 ? "default" : "outline"
                            }
                            className="ml-2"
                          >
                            {result.confidence > 0.8
                              ? "High Confidence"
                              : "Moderate Confidence"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-5 w-5 text-primary" />
                          <span className="text-lg font-medium">
                            {result.class}
                          </span>
                          <span
                            className={`font-bold ${getConfidenceColor(result.confidence)}`}
                          >
                            {Math.round(result.confidence * 100)}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-3 font-medium">
                          Confidence by Species
                        </h4>
                        <div className="space-y-3">
                          {result.allClasses.slice(0, 5).map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span
                                  className={getConfidenceColor(
                                    item.confidence,
                                  )}
                                >
                                  {Math.round(item.confidence * 100)}%
                                </span>
                              </div>
                              <Progress
                                value={item.confidence * 100}
                                className="h-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <h4 className="mb-2 font-medium">
                          About {result.class} Monkeys
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {getMonkeyDescription(result.class)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex h-full flex-col items-center justify-center border-dashed p-8">
                  <div className="space-y-2 text-center">
                    <p className="text-lg font-medium">No Image Selected</p>
                    <p className="text-sm text-muted-foreground">
                      Upload an image to see classification results here
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-primary" />
            <span>Sarumnesia</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Sarumnesia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function getMonkeyDescription(monkeyType: string): string {
  const descriptions: Record<string, string> = {
    "Bald Uakari":
      "The Bald Uakari is known for its striking bright red face and bald head. These primates are found in the Amazon rainforest and are excellent indicators of forest health.",
    "Emperor Tamarin":
      "The Emperor Tamarin is famous for its long, white mustache that resembles that of German emperor Wilhelm II. These small monkeys are found in the southwest Amazon Basin.",
    "Golden Monkey":
      "The Golden Monkey is known for its bright golden-orange patch on its upper flanks and back. These Old World monkeys are found in the bamboo forests of the Virunga Mountains.",
    "Gray Langur":
      "The Gray Langur, also known as Hanuman Langur, is revered in Hinduism. These monkeys have distinctive black faces and long tails, living in both forests and urban areas across South Asia.",
    "Hamadryas Baboon":
      "The Hamadryas Baboon is characterized by its silver-gray coat and pink face. Males have large manes, giving them a lion-like appearance. They live in complex social structures.",
    Mandril:
      "The Mandrill is the largest monkey species and is known for its vibrant blue and red face. Males display particularly colorful faces and rump markings.",
    "Proboscis Monkey":
      "The Proboscis Monkey is recognized by its distinctive large nose, particularly in males. These endangered primates are endemic to Borneo and are excellent swimmers.",
    "Red Howler":
      "The Red Howler is famous for its loud howling calls that can be heard for miles. These monkeys have reddish-brown fur and are found in South American rainforests.",
    "Vervet Monkey":
      "The Vervet Monkey has distinctive black faces and white brows. These adaptable primates are known for their complex social behaviors and communication systems.",
    "White Faced Saki":
      "The White-Faced Saki is known for its sexual dimorphism - males have white faces while females are brownish-gray. They are excellent leapers in the rainforest canopy.",
  };

  return (
    descriptions[monkeyType] ||
    "This species of monkey is one of the 10 categories recognized by our classification system."
  );
}
