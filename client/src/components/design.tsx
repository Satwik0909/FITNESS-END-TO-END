import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'
import { motion, useScroll, useTransform } from "framer-motion"
import { Camera, ChevronDown, ChevronUp, Clock, Dumbbell, MapPin, MessageCircle, Star } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"


declare module '../ui/input' {
    export const Input: any; 
}

interface GymPass {
  _id: string
  name: string
  price: number
  duration: string
}

interface ClassSchedule {
  name: string
  time: string
  instructor: string
}

interface ChatMessage {
  sender: "User" | "Gym Owner"
  message: string
}

export default function EnhancedFitnessListing3D() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedPass, setSelectedPass] = useState<GymPass | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [gymPasses, setGymPasses] = useState<GymPass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const gymPhotos = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  const classSchedule: ClassSchedule[] = [
    { name: "Yoga", time: "Mon, Wed, Fri 8:00 AM", instructor: "Jane Doe" },
    { name: "HIIT", time: "Tue, Thu 6:00 PM", instructor: "John Smith" },
    { name: "Zumba", time: "Sat 10:00 AM", instructor: "Maria Garcia" },
    { name: "Spin", time: "Mon, Wed, Fri 7:00 PM", instructor: "Mike Johnson" },
  ]

  useEffect(() => {
    const fetchGymPasses = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/gym-passes')
        setGymPasses(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching gym passes:', error)
        setError('Failed to fetch gym passes. Please try again later.')
        setLoading(false)
      }
    }

    fetchGymPasses()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim()) {
      setChatMessages([...chatMessages, { sender: "User", message: messageInput }])
      setMessageInput("")
      // Simulate gym owner response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: "Gym Owner", message: "Thank you for your message. How can I help you today?" }])
      }, 1000)
    }
  }

  useEffect(() => {
    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY
      window.scrollBy({
        top: delta,
        behavior: "smooth"
      })
    }

    window.addEventListener("wheel", smoothScroll, { passive: false })

    return () => window.removeEventListener("wheel", smoothScroll)
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <motion.div style={{ scale }} className="container mx-auto px-4 py-8">
        {}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 rounded-xl overflow-hidden mb-8 transform hover:scale-105 transition-transform duration-300"
        >
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Gym Interior"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-5xl font-bold mb-2 text-shadow">FitZone Gym</h1>
            <div className="flex items-center mb-4">
              <MapPin className="mr-2" />
              <span>123 Fitness Street, Healthyville, 12345</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2" />
              <span>Open 24/7</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Gym Details, Amenities, and Photo Gallery */}
          <div className="md:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">About FitZone Gym</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    FitZone Gym is a state-of-the-art fitness facility designed to help you achieve your health and fitness goals. 
                    Our gym offers a wide range of equipment, classes, and personalized training options to suit all fitness levels.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Amenities</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {[
                      "Cardio Area", 
                      "Weight Training", 
                      "Group Classes", 
                      "Personal Training", 
                      "Sauna", 
                      "Locker Rooms", 
                      "Smoothie Bar", 
                      "Free Parking",
                      "Swimming Pool",
                      "Basketball Court",
                      "Childcare Services",
                      "Massage Therapy"
                    ].map((amenity, index) => (
                      <li key={index} className="flex items-center">
                        <Dumbbell className="mr-2 h-4 w-4 text-blue-300" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {gymPhotos.map((photo, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-video rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                      >
                        <Image
                          src={photo}
                          alt={`Gym Photo ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Virtual Tour */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Virtual Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/placeholder.svg?height=480&width=640"
                      alt="Virtual Tour"
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Camera className="mr-2 h-4 w-4" />
                        Start Virtual Tour
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">4.8 out of 5 (256 reviews)</span>
                  </div>
                  {/* Sample review */}
                  <div className="border-t border-blue-600 pt-4">
                    <div className="flex items-center mb-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">
                      Great gym with excellent equipment and friendly staff. The classes are challenging and fun!
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full border-blue-400 text-blue-300 hover:bg-blue-700 hover:text-white transition-colors duration-300"
                  >
                    {isExpanded ? (
                      <>
                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read More Reviews <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Gym Passes, Chat, Class Schedule, and Map */}
          <div className="space-y-8">
            {/* Gym Passes */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Gym Passes</CardTitle>
                  <CardDescription>Choose a pass that fits your needs</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="day" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-blue-700">
                      <TabsTrigger value="day" className="data-[state=active]:bg-blue-500">Day</TabsTrigger>
                      <TabsTrigger value="week" className="data-[state=active]:bg-blue-500">Week</TabsTrigger>
                      <TabsTrigger value="month" className="data-[state=active]:bg-blue-500">Month</TabsTrigger>
                    </TabsList>
                    {gymPasses.map((pass) => (
                      <TabsContent key={pass._id} value={pass.name.toLowerCase().split(" ")[0]}>
                        <Card className="bg-blue-700 border-blue-500">
                          <CardHeader>
                            <CardTitle>{pass.name}</CardTitle>
                            <CardDescription>Valid for {pass.duration}</CardDescription>
                          </CardHeader>
                          <CardContent className="text-center">
                            <span className="text-4xl font-bold">${pass.price}</span>
                          </CardContent>
                          <CardFooter>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50">Buy Now</Button>
                              </DialogTrigger>
                              <DialogContent className="bg-blue-900 text-white">
                                <DialogHeader>
                                  <DialogTitle>Purchase {pass.name}</DialogTitle>
                                  <DialogDescription>
                                    {isLoggedIn ? (
                                      `Confirm your purchase of the ${pass.name} for $${pass.price}`
                                    ) : (
                                      "Please log in to purchase a pass"
                                    )}
                                  </DialogDescription>
                                </DialogHeader>
                                {isLoggedIn ? (
                                  <Button onClick={() => setSelectedPass(pass)} className="bg-blue-500 hover:bg-blue-600 text-white">Confirm Purchase</Button>
                                ) : (
                                  <form onSubmit={handleLogin}>
                                    <div className="grid w-full items-center gap-4">
                                      <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" required className="bg-blue-800 text-white" />
                                      </div>
                                      <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" required className="bg-blue-800 text-white" />
                                      </div>
                                    </div>
                                    <Button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">Log In</Button>
                                  </form>
                                )}
                              </DialogContent>
                            </Dialog>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chat with Gym Owner */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Chat with Gym Owner</CardTitle>
                  <CardDescription>Get your questions answered</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50">
                        <MessageCircle className="mr-2 h-4 w-4" /> Start Chat
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-blue-900 text-white">
                      <DialogHeader>
                        <DialogTitle>Chat with Gym Owner</DialogTitle>
                        <DialogDescription>
                          Ask any questions you have about our gym or memberships.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[300px] w-full rounded-md border border-blue-700 p-4">
                        {chatMessages.map((msg, index) => (
                          <div key={index} className={`mb-4 ${msg.sender === "User" ? "text-right" : "text-left"}`}>
                            <span className={`inline-block rounded-lg py-2 px-3 ${msg.sender === "User" ? "bg-blue-600" : "bg-blue-700"}`}>
                              {msg.message}
                            </span>
                          </div>
                        ))}
                      </ScrollArea>
                      <form onSubmit={handleSendMessage} className="flex items-center mt-4">
                        <Input
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-grow mr-2 bg-blue-800 text-white"
                        />
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Send</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>

            {/* Class Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Class Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {classSchedule.map((classItem, index) => (
                      <li key={index} className="border-b border-blue-600 pb-2">
                        <h4 className="font-semibold">{classItem.name}</h4>
                        <p className="text-sm text-blue-300">{classItem.time}</p>
                        <p className="text-sm text-blue-300">Instructor: {classItem.instructor}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Location Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-blue-800 bg-opacity-50 backdrop-blur-lg border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629828555183!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                    ></iframe>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-blue-400 text-blue-300 hover:bg-blue-700 hover:text-white transition-colors duration-300">
                    Get Directions
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}