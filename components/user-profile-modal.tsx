"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Crown,
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  Share,
  Lock,
  Play,
  ImageIcon,
  FileText,
  UserPlus,
  UserCheck,
} from "lucide-react"
import { mockUsers, mockPosts } from "@/lib/mock-data"

interface UserProfileModalProps {
  userId: string
  onClose: () => void
}

export function UserProfileModal({ userId, onClose }: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const user = mockUsers.find((u) => u.id === userId)
  const userPosts = mockPosts.filter((p) => p.userId === userId)

  if (!user) return null

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const formatPostDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-16 relative z-10">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{user.displayName[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 mt-16">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{user.displayName}</h1>
                    {user.isPremium && <Crown className="h-6 w-6 text-primary" />}
                    <div className={`w-3 h-3 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                  </div>
                  <p className="text-muted-foreground mb-3">@{user.username}</p>
                  <p className="text-sm mb-4">{user.bio}</p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {formatDate(user.joinDate)}
                    </div>
                    {user.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {user.location.city}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-16">
                  <Button variant={isFollowing ? "secondary" : "default"} onClick={handleFollow}>
                    {isFollowing ? (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>

                  {user.isPremium && (
                    <Button variant={isSubscribed ? "secondary" : "outline"} onClick={handleSubscribe}>
                      <Crown className="h-4 w-4 mr-2" />
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex-1 px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Posts
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Media
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  About
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-96 mt-4">
                <TabsContent value="posts" className="space-y-4">
                  {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                      <PostCard key={post.id} post={post} user={user} isSubscribed={isSubscribed} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No posts yet</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {userPosts
                      .filter((post) => post.media && post.media.length > 0)
                      .map((post) => (
                        <MediaCard key={post.id} post={post} isSubscribed={isSubscribed} />
                      ))}
                  </div>
                  {userPosts.filter((post) => post.media && post.media.length > 0).length === 0 && (
                    <div className="text-center py-12">
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No media posts yet</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="about" className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-sm text-muted-foreground">{user.bio}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Username:</span>
                          <span>@{user.username}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Joined:</span>
                          <span>{formatDate(user.joinDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className={user.isOnline ? "text-green-500" : "text-gray-500"}>
                            {user.isOnline ? "Online" : "Offline"}
                          </span>
                        </div>
                        {user.location && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span>{user.location.city}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Account Type:</span>
                          <div className="flex items-center gap-1">
                            {user.isPremium && <Crown className="h-3 w-3 text-primary" />}
                            <span>{user.isPremium ? "Premium" : "Free"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PostCardProps {
  post: any
  user: any
  isSubscribed: boolean
}

function PostCard({ post, user, isSubscribed }: PostCardProps) {
  const canViewContent = !post.isPremium || isSubscribed

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback>{user.displayName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{user.displayName}</span>
              {user.isPremium && <Crown className="h-3 w-3 text-primary" />}
              {post.isPremium && <Lock className="h-3 w-3 text-primary" />}
              <span className="text-xs text-muted-foreground">{formatPostDate(post.timestamp)}</span>
            </div>

            {canViewContent ? (
              <>
                <p className="text-sm mb-3">{post.content}</p>

                {post.media && post.media.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {post.media.map((media: any, index: number) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                        {media.type === "image" ? (
                          <img
                            src={media.url || "/placeholder.svg"}
                            alt="Post media"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Share className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-primary/20 rounded-lg">
                <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold mb-1">Premium Content</p>
                <p className="text-sm text-muted-foreground mb-3">Subscribe to {user.displayName} to view this post</p>
                <Button size="sm">
                  <Crown className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatPostDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

interface MediaCardProps {
  post: any
  isSubscribed: boolean
}

function MediaCard({ post, isSubscribed }: MediaCardProps) {
  const canViewContent = !post.isPremium || isSubscribed
  const media = post.media?.[0]

  return (
    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer group">
      {canViewContent && media ? (
        <>
          {media.type === "image" ? (
            <img
              src={media.url || "/placeholder.svg"}
              alt="Media post"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/80">
              <Play className="h-8 w-8 text-white" />
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 text-white text-sm">
              <Heart className="h-4 w-4" />
              {post.likes}
              <MessageCircle className="h-4 w-4 ml-2" />
              {post.comments}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Lock className="h-6 w-6 text-primary" />
        </div>
      )}

      {post.isPremium && (
        <div className="absolute top-2 right-2">
          <Crown className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  )
}
