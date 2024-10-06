'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, ChevronLeft, Sun, Cloud, Umbrella, Thermometer } from 'lucide-react'
import Image from 'next/image'
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ClimateLegacy() {
  const [currentYear, setCurrentYear] = useState(1900)
  const [showingFuture, setShowingFuture] = useState(false)

  const years = [1900, 1950, 2000, 2050]
  const maxYear = 2050

  const handleYearChange = (newYear: number[]) => {
    setCurrentYear(newYear[0])
    setShowingFuture(newYear[0] > 2023)
  }

  const temperatureData = [
    { year: 1900, temperature: 0 },
    { year: 1950, temperature: 0.7 },
    { year: 2000, temperature: 1.2 },
    { year: 2050, temperature: showingFuture ? 1.5 : 2.0 },
  ]

  const emissionsData = [
    { year: 1900, emissions: 2000 },
    { year: 1950, emissions: 6000 },
    { year: 2000, emissions: 25000 },
    { year: 2050, emissions: showingFuture ? 10000 : 40000 },
  ]

  const getStoryContent = () => {
    if (currentYear === 1900) {
      return {
        title: "1900: The Anderson Farm",
        content: (
          <>
            <p className="mb-4">
              In 1900, Emma Anderson tends to her family's sprawling farm. The seasons are predictable, 
              the harvests bountiful. Climate change is an unknown concept.
            </p>
            <p>
              "We've had this land for generations," Emma tells her children. "And with hard work, 
              it'll feed our family for generations to come."
            </p>
          </>
        ),
        image: "/public/assets/1900s_farm.jpg",
        imageAlt: "Emma Anderson on her farm in 1900",
        weather: <Sun className="h-8 w-8 text-yellow-500" />,
      }
    } else if (currentYear === 1950) {
      return {
        title: "1950: The Anderson Oil Company",
        content: (
          <>
            <p className="mb-4">
              By 1950, Emma's son, George, has transformed the family farm into an oil company. 
              Business is booming, but strange weather patterns are emerging.
            </p>
            <p>
              "Progress comes at a cost," George muses, watching smoke billow from his refineries. 
              "But surely the Earth is too big for us to truly impact?"
            </p>
          </>
        ),
        image: "/nasa/assets/1950s_refinery.jpg",
        imageAlt: "George Anderson overlooking his oil refineries in 1950",
        weather: <Cloud className="h-8 w-8 text-gray-500" />,
      }
    } else if (currentYear === 2000) {
      return {
        title: "2000: The Anderson Environmental Institute",
        content: (
          <>
            <p className="mb-4">
              In 2000, George's daughter, Sarah, establishes the Anderson Environmental Institute. 
              The family land, once lush, now shows signs of changing climate.
            </p>
            <p>
              "We've inherited both wealth and responsibility," Sarah declares. "It's time we 
              understand the true cost of our family's legacy."
            </p>
          </>
        ),
        image: "/nasa/assets/2000s_fading.jpg",
        imageAlt: "Sarah Anderson at the Anderson Environmental Institute in 2000",
        weather: <Umbrella className="h-8 w-8 text-blue-500" />,
      }
    } else {
      return {
        title: showingFuture ? "2050: A Sustainable Future" : "2050: The Point of No Return",
        content: showingFuture ? (
          <>
            <p className="mb-4">
              By 2050, the Andersons have helped transform their community into a model of sustainability. 
              While challenges remain, there's hope for the future.
            </p>
            <p>
              "Our family's story mirrors humanity's journey," Sarah's grandson, Alex, reflects. 
              "From ignorance to awareness, from harm to healing. There's still work to do, but we're on the right path."
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">
              In this version of 2050, climate change has dramatically altered the landscape. 
              Extreme weather is the norm, and the old Anderson lands are barely recognizable.
            </p>
            <p>
              "We knew, but we didn't act soon enough," Sarah's grandson, Alex, laments. 
              "Now we're fighting for survival. Can we still change our future?"
            </p>
          </>
        ),
        image: "/nasa/assets/2050s_green.jpg",
        imageAlt: showingFuture ? "Alex Anderson in a sustainable city in 2050" : "Alex Anderson in a climate-ravaged landscape in 2050",
        weather: <Thermometer className="h-8 w-8 text-red-500" />,
      }
    }
  }

  const storyContent = getStoryContent()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <header className="bg-green-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Climate Legacy: The Anderson Family Saga</h1>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{storyContent.title}</CardTitle>
            <CardDescription>Witness the changing world through generations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                {storyContent.content}
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-bold">Climate:</span>
                  {storyContent.weather}
                </div>
              </div>
              <div className="flex-1">
                <Image 
                  src={storyContent.image}
                  alt={storyContent.imageAlt}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Climate Data Through Time</CardTitle>
            <CardDescription>Explore how our climate has changed</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="temperature">
              <TabsList className="mb-4">
                <TabsTrigger value="temperature">Global Temperature</TabsTrigger>
                <TabsTrigger value="emissions">CO2 Emissions</TabsTrigger>
              </TabsList>
              <TabsContent value="temperature">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `${value.toFixed(1)}°C`} />
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}°C`, 'Temperature']} />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#ff7d85" name="Global Temperature" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="emissions">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [`${value.toFixed(0)} MtCO2`, 'Emissions']} />
                    <Legend />
                    <Bar dataKey="emissions" fill="#3b82f6" name="CO2 Emissions" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Journey Through Time</CardTitle>
            <CardDescription>Slide to explore different eras</CardDescription>
          </CardHeader>
          <CardContent>
            <Slider
              value={[currentYear]}
              min={1900}
              max={maxYear}
              step={1}
              onValueChange={handleYearChange}
              className="mb-4"
            />
            <div className="flex justify-between">
              {years.map((year) => (
                <span key={year} className="text-sm font-medium">
                  {year}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => handleYearChange([Math.max(1900, currentYear - 50)])}
              disabled={currentYear <= 1900}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Era
            </Button>
            <Button
              onClick={() => handleYearChange([Math.min(maxYear, currentYear + 50)])}
              disabled={currentYear >= maxYear}
            >
              Next Era <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {currentYear === 2050 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Shape the Future</CardTitle>
              <CardDescription>Your actions today determine tomorrow's reality</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The future isn't set in stone. Our choices today will shape the world of 2050 and beyond. 
                What future will you choose?
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setShowingFuture(true)} variant={showingFuture ? "default" : "outline"}>
                  Sustainable Path
                </Button>
                <Button onClick={() => setShowingFuture(false)} variant={showingFuture ? "outline" : "default"}>
                  Business as Usual
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-green-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>
            Inspired by real climate data and projections. Take action today for a better tomorrow.
          </p>
          <Button variant="link" className="text-white">
            Learn More About Climate Action
          </Button>
        </div>
      </footer>
    </div>
  )
}