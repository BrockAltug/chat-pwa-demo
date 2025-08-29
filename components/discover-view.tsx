"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MapPin,
  TrendingUp,
  Radio,
  Users,
  Crown,
  Search,
  Calendar,
  Eye,
  MessageSquare,
  Play,
  Globe,
  Zap,
} from "lucide-react"
import { mockUsers, mockServers, mockPosts } from "@/lib/mock-data"

interface DiscoverViewProps {
  onUserClick: (userId: string) => void
}

export function DiscoverView({ onUserClick }: DiscoverViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)
  const [mapView, setMapView] = useState<"world" | "local">("world")

  const onlineFriends = mockUsers.filter((user) => user.isOnline && user.location)
  const trendingServers = mockServers.slice(0, 6)
  const liveUsers = mockUsers.filter((user) => user.isOnline)
  const trendingPosts = mockPosts.slice(0, 4)

  const filteredContent = {
    servers: trendingServers.filter(
      (server) =>
        searchQuery === "" ||
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    users: liveUsers.filter(
      (user) =>
        searchQuery === "" ||
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    posts: trendingPosts.filter(
      (post) => searchQuery === "" || post.content.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }

  const handleFriendClick = (friendId: string) => {
    setSelectedFriend(selectedFriend === friendId ? null : friendId)
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header with Search */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Discover
          </h1>
          <p className="text-muted-foreground text-lg">
            Find friends, trending servers, and live content around the world
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search servers, users, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Interactive World Map */}
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Friends Around the World
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={mapView === "world" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("world")}
                >
                  World
                </Button>
                <Button
                  variant={mapView === "local" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("local")}
                >
                  Local
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-xl h-80 overflow-hidden">
              {/* Enhanced world map background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1000 400" className="w-full h-full">
                  {/* Simplified world map paths */}
                  <path
                    d="M150,100 Q200,80 250,100 L300,120 Q350,100 400,120 L450,100 Q500,80 550,100"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary"
                  />
                  <path
                    d="M100,200 Q150,180 200,200 L250,220 Q300,200 350,220 L400,200 Q450,180 500,200"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-accent"
                  />
                  <path
                    d="M200,300 Q250,280 300,300 L350,320 Q400,300 450,320 L500,300 Q550,280 600,300"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary"
                  />
                </svg>
              </div>

              {/* Friend locations with enhanced interactivity */}
              {onlineFriends.map((friend, index) => {
                const isSelected = selectedFriend === friend.id
                return (
                  <div
                    key={friend.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                    style={{
                      left: `${15 + index * 20}%`,
                      top: `${25 + (index % 3) * 20}%`,
                    }}
                    onClick={() => handleFriendClick(friend.id)}
                  >
                    <div className="relative">
                      {/* Pulsing ring for online status */}
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />

                      <Avatar
                        className={`h-12 w-12 border-3 transition-all duration-300 ${
                          isSelected ? "border-primary shadow-lg scale-110" : "border-primary/50"
                        }`}
                      >
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{friend.displayName[0]}</AvatarFallback>
                      </Avatar>

                      {/* Enhanced tooltip */}
                      <div
                        className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                        }`}
                      >
                        <div className="bg-popover border rounded-lg p-3 shadow-lg min-w-48">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{friend.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">{friend.displayName}</p>
                              <p className="text-xs text-muted-foreground">@{friend.username}</p>
                            </div>
                            {friend.isPremium && <Crown className="h-3 w-3 text-primary" />}
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{friend.location?.city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span>Online now</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              onUserClick(friend.id)
                            }}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Map statistics */}
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{onlineFriends.length} friends online</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span>{new Set(onlineFriends.map((f) => f.location?.city)).size} cities</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Content Tabs */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Live
            </TabsTrigger>
            <TabsTrigger value="servers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Servers
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trending Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Trending Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {filteredContent.posts.map((post, index) => {
                        const user = mockUsers.find((u) => u.id === post.userId)
                        return (
                          <div key={post.id} className="flex gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                              #{index + 1}
                            </div>
                            <Avatar className="h-10 w-10" onClick={() => user && onUserClick(user.id)}>
                              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{user?.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{user?.displayName}</span>
                                {user?.isPremium && <Crown className="h-3 w-3 text-primary" />}
                                {post.isPremium && (
                                  <Badge variant="secondary" className="text-xs">
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {post.likes * 10}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {post.comments}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Trending Servers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Hot Servers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-3">
                      {filteredContent.servers.map((server, index) => (
                        <div
                          key={server.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent-foreground font-bold text-sm">
                            #{index + 1}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={server.icon || "/placeholder.svg"} />
                            <AvatarFallback>{server.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm truncate">{server.name}</p>
                              {server.isPremium && <Crown className="h-3 w-3 text-primary" />}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {server.memberCount}
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />+{Math.floor(Math.random() * 100)} today
                              </div>
                              {server.isPremium && (
                                <Badge variant="secondary" className="text-xs">
                                  ${server.price}/mo
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContent.users.map((user) => (
                <Card
                  key={user.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onUserClick(user.id)}
                >
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        LIVE
                      </Badge>
                    </div>
                    <Avatar className="absolute -bottom-6 left-4 h-12 w-12 border-4 border-background">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardContent className="pt-8">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold truncate">{user.displayName}</h3>
                      {user.isPremium && <Crown className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{user.bio}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {Math.floor(Math.random() * 1000)} watching
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        Live
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="servers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredContent.servers.map((server) => (
                <Card key={server.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={server.icon || "/placeholder.svg"} />
                        <AvatarFallback className="text-xl">{server.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg truncate">{server.name}</h3>
                          {server.isPremium && <Crown className="h-5 w-5 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{server.description}</p>
                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{server.memberCount} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>{Math.floor(Math.random() * 100)} online</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {server.isPremium ? (
                            <Badge variant="secondary" className="text-sm">
                              ${server.price}/month
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-sm">
                              Free
                            </Badge>
                          )}
                          <Button size="sm">{server.isPremium ? "Subscribe" : "Join"}</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((event) => (
                <Card key={event} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {event % 2 === 0 ? "Today" : "Tomorrow"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">
                      {event % 3 === 0
                        ? "Design Workshop"
                        : event % 2 === 0
                          ? "Code Review Session"
                          : "Community Meetup"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join us for an exciting {event % 3 === 0 ? "design" : event % 2 === 0 ? "coding" : "networking"}{" "}
                      session
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{event % 2 === 0 ? "2:00 PM" : "7:00 PM"} UTC</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {Math.floor(Math.random() * 50) + 10} attending
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
