"use client"
import { Button } from "@/components/ui/button"
import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Plus, Compass, Hash, Settings, ChevronDown, Volume2, Lock } from "lucide-react"
import { mockServers, mockUsers, hasUserAccess } from "@/lib/mock-data"
import { PremiumBadge } from "@/components/premium-badge"
import { useState, useRef } from "react"

interface SidebarProps {
  currentView: "chat" | "discover"
  onViewChange: (view: "chat" | "discover") => void
  selectedServer: string
  selectedChannel: string
  onServerSelect: (serverId: string) => void
  onChannelSelect: (channelId: string) => void
  onCreateServer: () => void
  onJoinServer: () => void
  onPremiumSettings?: () => void
  onUserClick: (userId: string) => void
}

export function Sidebar({
  currentView,
  onViewChange,
  selectedServer,
  selectedChannel,
  onServerSelect,
  onChannelSelect,
  onCreateServer,
  onJoinServer,
  onPremiumSettings,
  onUserClick,
}: SidebarProps) {
  const currentUser = mockUsers[0]
  const [expandedServers, setExpandedServers] = useState<string[]>([selectedServer])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const serverRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleServerClick = (serverId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const server = mockServers.find((s) => s.id === serverId)

    if (server?.isPremium && !hasUserAccess(currentUser.id, serverId)) {
      onServerSelect(serverId)
      return
    }

    const isCurrentlyExpanded = expandedServers.includes(serverId)

    if (isCurrentlyExpanded) {
      onServerSelect("")
      onChannelSelect("")
      setExpandedServers([])
    } else {
      onServerSelect(serverId)
      setExpandedServers([serverId])

      setTimeout(() => {
        const serverElement = serverRefs.current[serverId]
        const scrollContainer = scrollContainerRef.current

        if (serverElement && scrollContainer) {
          const serverOffsetTop = serverElement.offsetTop

          scrollContainer.scrollTo({
            top: serverOffsetTop,
            behavior: "smooth",
          })
        }
      }, 50)
    }
  }

  const isChannelAccessible = (channel: any, serverId: string): boolean => {
    if (!channel.isPremium) return true
    return hasUserAccess(currentUser.id, serverId, channel.id)
  }

  return (
    <div className="w-64 sm:w-64 md:w-64 lg:w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full overflow-hidden">
      <div className="p-2 sm:p-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">{currentUser.displayName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="font-medium text-xs truncate">{currentUser.displayName}</p>
              {currentUser.isPremium && <PremiumBadge size="sm" />}
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">@{currentUser.username}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${currentUser.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
            {currentUser.isPremium && onPremiumSettings && (
              <Button variant="ghost" size="sm" onClick={onPremiumSettings} className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-1 sm:p-2 border-b border-sidebar-border">
        <div className="flex gap-1">
          <Button
            variant={currentView === "chat" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("chat")}
            className="flex-1 h-7 sm:h-8 text-xs"
          >
            <Hash className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Chat</span>
          </Button>
          <Button
            variant={currentView === "discover" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("discover")}
            className="flex-1 h-7 sm:h-8 text-xs"
          >
            <Compass className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Discover</span>
          </Button>
        </div>
      </div>

      {currentView === "chat" && (
        <div className="flex-1 overflow-y-auto min-h-0" ref={scrollContainerRef}>
          <div className="p-1 sm:p-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Servers</h3>
              <Button variant="ghost" size="sm" onClick={onCreateServer} className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-1">
              {mockServers.map((server) => {
                const hasServerAccess = !server.isPremium || hasUserAccess(currentUser.id, server.id)
                const isExpanded = expandedServers.includes(server.id) && hasServerAccess

                return (
                  <Collapsible key={server.id} open={isExpanded}>
                    <div
                      ref={(el) => (serverRefs.current[server.id] = el)}
                      className={`rounded-md transition-colors ${
                        selectedServer === server.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <div
                        className="flex items-center gap-2 p-1.5 sm:p-2 cursor-pointer w-full"
                        onClick={(e) => handleServerClick(server.id, e)}
                      >
                        {hasServerAccess ? (
                          <ChevronDown
                            className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                          />
                        ) : (
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        )}
                        <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                          <AvatarImage src={server.icon || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{server.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <p
                              className={`font-medium text-xs truncate ${!hasServerAccess ? "text-muted-foreground" : ""}`}
                            >
                              {server.name}
                            </p>
                            {server.isPremium && <PremiumBadge type="server" size="sm" />}
                          </div>
                          <p className="text-xs text-muted-foreground hidden sm:block">{server.memberCount} members</p>
                        </div>
                      </div>

                      {hasServerAccess && (
                        <CollapsibleContent className="pl-3 sm:pl-4 pb-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1 px-2">CHANNELS</p>
                            <div className="space-y-0.5">
                              {server.channels.map((channel) => {
                                const hasChannelAccess = isChannelAccessible(channel, server.id)

                                return (
                                  <div
                                    key={channel.id}
                                    className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors ${
                                      hasChannelAccess
                                        ? `cursor-pointer ${
                                            selectedChannel === channel.id
                                              ? "bg-primary/20 text-primary font-medium border-l-2 border-primary"
                                              : "hover:bg-sidebar-accent/30"
                                          }`
                                        : "cursor-not-allowed opacity-60"
                                    }`}
                                    onClick={() => hasChannelAccess && onChannelSelect(channel.id)}
                                  >
                                    {hasChannelAccess ? (
                                      channel.type === "voice" ? (
                                        <Volume2 className="h-3 w-3" />
                                      ) : (
                                        <Hash className="h-3 w-3" />
                                      )
                                    ) : (
                                      <Lock className="h-3 w-3 text-muted-foreground" />
                                    )}
                                    <span
                                      className={`flex-1 truncate ${!hasChannelAccess ? "text-muted-foreground" : ""}`}
                                    >
                                      {channel.name}
                                    </span>
                                    {channel.isPremium && <PremiumBadge type="channel" size="sm" />}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </CollapsibleContent>
                      )}
                    </div>
                  </Collapsible>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 h-7 sm:h-8 text-xs bg-transparent"
              onClick={onJoinServer}
            >
              <Plus className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Join Server</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
