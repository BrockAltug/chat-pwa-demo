"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input, Textarea } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Hash,
  Crown,
  Settings,
  UserPlus,
  Send,
  Lock,
  Paperclip,
  Smile,
  Mic,
  ImageIcon,
  MoreHorizontal,
  Reply,
  Search,
  Users,
} from "lucide-react"
import { mockServers, mockUsers, mockMessages, type Message } from "@/lib/mock-data"

interface ChatViewProps {
  serverId: string
  channelId: string
  onChannelSelect: (channelId: string) => void
  onUserClick: (userId: string) => void
  onPremiumSubscribe: (type: "user" | "server" | "channel", targetId?: string, targetName?: string) => void
}

interface ExtendedMessage extends Message {
  reactions?: { emoji: string; users: string[]; count: number }[]
  replyTo?: string
  attachments?: { type: "image" | "file" | "voice"; url: string; name?: string }[]
  isEdited?: boolean
}

export function ChatView({ serverId, channelId, onChannelSelect, onUserClick, onPremiumSubscribe }: ChatViewProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ExtendedMessage[]>(mockMessages as ExtendedMessage[])
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showMembersList, setShowMembersList] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const server = mockServers.find((s) => s.id === serverId)
  const currentChannel = server?.channels.find((c) => c.id === channelId)
  const channelMessages = messages.filter((m) => m.channelId === channelId)
  const serverMembers = mockUsers.filter((user) => server?.members.includes(user.id))

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [channelMessages])

  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (!server || !currentChannel) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Select a server and channel to start chatting</p>
      </div>
    )
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ExtendedMessage = {
        id: Date.now().toString(),
        userId: "1",
        content: message,
        timestamp: new Date().toISOString(),
        channelId: channelId,
        replyTo: replyingTo || undefined,
        reactions: [],
      }

      setMessages((prev) => [...prev, newMessage])
      setMessage("")
      setReplyingTo(null)
    }
  }

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || []
          const existingReaction = reactions.find((r) => r.emoji === emoji)

          if (existingReaction) {
            if (existingReaction.users.includes("1")) {
              existingReaction.users = existingReaction.users.filter((u) => u !== "1")
              existingReaction.count = existingReaction.users.length
            } else {
              existingReaction.users.push("1")
              existingReaction.count = existingReaction.users.length
            }
          } else {
            reactions.push({ emoji, users: ["1"], count: 1 })
          }

          return { ...msg, reactions: reactions.filter((r) => r.count > 0) }
        }
        return msg
      }),
    )
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const filteredMessages = searchQuery
    ? channelMessages.filter((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : channelMessages

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Channel Header */}
      <div className="p-2 sm:p-4 border-b border-border bg-card/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {currentChannel.isPremium ? (
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            ) : (
              <Hash className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
            )}
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              <h1 className="font-semibold text-sm sm:text-lg truncate">{currentChannel.name}</h1>
              {currentChannel.isPremium && (
                <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                  Premium - ${currentChannel.price}/month
                </Badge>
              )}
            </div>
            <div className="hidden md:block text-sm text-muted-foreground flex-shrink-0">
              {server.memberCount} members
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => setShowSearch(!showSearch)} className="h-8 w-8 p-0">
              <Search className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMembersList(!showMembersList)}
              className="h-8 w-8 sm:w-auto sm:px-3 p-0 sm:p-2"
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline ml-2">Members</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {showSearch && (
          <div className="mt-2 sm:mt-3">
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:max-w-md"
            />
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 m-2 sm:m-4 bg-card border border-border rounded-lg flex flex-col min-h-0 shadow-sm overflow-hidden">
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-2 sm:p-4">
                {currentChannel.isPremium ? (
                  <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto px-4">
                    <Lock className="h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4" />
                    <h3 className="font-semibold text-lg sm:text-xl mb-3">Premium Channel</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
                      This channel requires a premium subscription to access. Join now to participate in exclusive
                      discussions and content.
                    </p>
                    <Button
                      size="lg"
                      onClick={() => onPremiumSubscribe("channel", currentChannel.id, currentChannel.name)}
                      className="w-full sm:w-auto"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Subscribe for ${currentChannel.price}/month
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
                    {filteredMessages.map((msg) => {
                      const user = mockUsers.find((u) => u.id === msg.userId)
                      const replyToMessage = msg.replyTo ? messages.find((m) => m.id === msg.replyTo) : null
                      const replyToUser = replyToMessage ? mockUsers.find((u) => u.id === replyToMessage.userId) : null

                      return (
                        <div key={msg.id} className="group">
                          {replyToMessage && replyToUser && (
                            <div className="ml-8 sm:ml-12 mb-2 text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                              <Reply className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="flex-shrink-0">Replying to</span>
                              <span className="font-medium flex-shrink-0">{replyToUser.displayName}</span>:
                              <span className="truncate">{replyToMessage.content}</span>
                            </div>
                          )}

                          <div className="flex gap-2 sm:gap-3 hover:bg-accent/30 p-2 sm:p-3 rounded-lg transition-colors">
                            <Avatar
                              className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer flex-shrink-0"
                              onClick={() => user && onUserClick(user.id)}
                            >
                              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{user?.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <span
                                  className="font-semibold text-sm cursor-pointer hover:underline truncate"
                                  onClick={() => user && onUserClick(user.id)}
                                >
                                  {user?.displayName}
                                </span>
                                {user?.isPremium && (
                                  <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                                )}
                                <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                                  {new Date(msg.timestamp).toLocaleTimeString()}
                                </span>
                                {msg.isEdited && (
                                  <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                                    (edited)
                                  </span>
                                )}
                              </div>

                              <p className="text-sm mb-2 sm:mb-3 leading-relaxed break-words">{msg.content}</p>

                              {/* Attachments */}
                              {msg.attachments && msg.attachments.length > 0 && (
                                <div className="space-y-2 mb-2 sm:mb-3">
                                  {msg.attachments.map((attachment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted rounded-lg"
                                    >
                                      {attachment.type === "image" && (
                                        <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                      )}
                                      {attachment.type === "voice" && (
                                        <Mic className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                      )}
                                      {attachment.type === "file" && (
                                        <Paperclip className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                      )}
                                      <span className="text-xs sm:text-sm truncate">
                                        {attachment.name || "Attachment"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Reactions */}
                              {msg.reactions && msg.reactions.length > 0 && (
                                <div className="flex gap-1 sm:gap-2 mb-2 flex-wrap">
                                  {msg.reactions.map((reaction, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleReaction(msg.id, reaction.emoji)}
                                      className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-colors ${
                                        reaction.users.includes("1")
                                          ? "bg-primary/20 text-primary border border-primary/30"
                                          : "bg-muted hover:bg-muted/80"
                                      }`}
                                    >
                                      <span>{reaction.emoji}</span>
                                      <span>{reaction.count}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Message actions */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1 flex-shrink-0">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                                    <Smile className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-3">
                                  <div className="flex gap-2">
                                    {["👍", "❤️", "😂", "😮", "😢", "😡"].map((emoji) => (
                                      <button
                                        key={emoji}
                                        onClick={() => handleReaction(msg.id, emoji)}
                                        className="p-2 hover:bg-accent rounded text-xl transition-colors"
                                      >
                                        {emoji}
                                      </button>
                                    ))}
                                  </div>
                                </PopoverContent>
                              </Popover>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setReplyingTo(msg.id)}
                                className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                              >
                                <Reply className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>

                              <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {typingUsers.length > 0 && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground ml-12">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                        <span>
                          {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
                        </span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {!currentChannel.isPremium && (
            <div className="p-2 sm:p-4 border-t border-border bg-card/50 flex-shrink-0">
              {replyingTo && (
                <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Reply className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-sm truncate">Replying to message</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                    className="h-6 w-6 p-0 flex-shrink-0"
                  >
                    ×
                  </Button>
                </div>
              )}

              <div className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">
                <div className="flex-1 relative min-w-0">
                  <Textarea
                    placeholder={`Message #${currentChannel.name}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[40px] sm:min-h-[44px] max-h-32 resize-none pr-16 sm:pr-20 text-sm"
                    rows={1}
                  />

                  <div className="absolute right-2 sm:right-3 top-2 sm:top-3 flex gap-1">
                    <Button variant="ghost" size="sm" onClick={handleFileUpload} className="h-6 w-6 p-0">
                      <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Smile className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3">
                        <div className="grid grid-cols-6 gap-2">
                          {[
                            "😀",
                            "😃",
                            "😄",
                            "😁",
                            "😆",
                            "😅",
                            "😂",
                            "🤣",
                            "😊",
                            "😇",
                            "🙂",
                            "🙃",
                            "😉",
                            "😌",
                            "😍",
                            "🥰",
                            "😘",
                            "😗",
                            "😙",
                            "😚",
                            "😋",
                            "😛",
                            "😝",
                            "😜",
                            "🤪",
                            "🤨",
                            "🧐",
                            "🤓",
                            "😎",
                            "🤩",
                          ].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => setMessage((prev) => prev + emoji)}
                              className="p-2 hover:bg-accent rounded text-lg transition-colors"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="h-10 w-10 sm:h-11 sm:w-11 p-0 flex-shrink-0">
                  <Mic className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>

                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="h-10 px-4 sm:h-11 sm:px-6 flex-shrink-0"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  console.log("Files selected:", e.target.files)
                }}
              />
            </div>
          )}
        </div>

        {/* Members Panel - Only show when toggled */}
        {showMembersList && (
          <div className="w-48 sm:w-64 bg-card border-l border-border flex flex-col flex-shrink-0 overflow-hidden">
            <div className="p-2 sm:p-4 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Members ({serverMembers.length})</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 min-h-0">
              <div className="p-2 sm:p-3">
                <div className="space-y-1 sm:space-y-2">
                  {serverMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => onUserClick(member.id)}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{member.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-card ${
                            member.isOnline ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <p className="font-medium text-xs sm:text-sm truncate">{member.displayName}</p>
                          {member.isPremium && <Crown className="h-3 w-3 text-primary flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">@{member.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}
