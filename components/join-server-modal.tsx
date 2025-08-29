"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Crown, Users, Hash } from "lucide-react"
import { mockServers } from "@/lib/mock-data"

interface JoinServerModalProps {
  onClose: () => void
}

export function JoinServerModal({ onClose }: JoinServerModalProps) {
  const [inviteCode, setInviteCode] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const publicServers = mockServers.filter((server) => !server.isPremium)
  const premiumServers = mockServers.filter((server) => server.isPremium)

  const filteredPublicServers = publicServers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleJoinByCode = () => {
    console.log("Joining server with code:", inviteCode)
    onClose()
  }

  const handleJoinServer = (serverId: string, isPremium: boolean, price?: number) => {
    if (isPremium && price) {
      console.log(`Joining premium server ${serverId} for $${price}`)
      // Mock payment flow
    } else {
      console.log(`Joining server ${serverId}`)
    }
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Join a Server</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Servers</TabsTrigger>
            <TabsTrigger value="invite">Join by Invite</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search servers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Server List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Public Servers */}
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Public Servers
                </h3>
                <div className="space-y-3">
                  {filteredPublicServers.map((server) => (
                    <div key={server.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={server.icon || "/placeholder.svg"} />
                        <AvatarFallback>{server.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold truncate">{server.name}</h4>
                          {server.isPremium && <Crown className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{server.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {server.memberCount} members
                          </div>
                          <div className="flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            {server.channels.length} channels
                          </div>
                        </div>
                      </div>

                      <Button onClick={() => handleJoinServer(server.id, false)}>Join</Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Servers */}
              {premiumServers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                    Premium Servers
                  </h3>
                  <div className="space-y-3">
                    {premiumServers.map((server) => (
                      <div
                        key={server.id}
                        className="flex items-center gap-4 p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-transparent"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={server.icon || "/placeholder.svg"} />
                          <AvatarFallback>{server.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold truncate">{server.name}</h4>
                            <Crown className="h-4 w-4 text-primary" />
                            <Badge variant="secondary">${server.price}/month</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{server.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {server.memberCount} members
                            </div>
                            <div className="flex items-center gap-1">
                              <Hash className="h-3 w-3" />
                              {server.channels.length} channels
                            </div>
                          </div>
                        </div>

                        <Button onClick={() => handleJoinServer(server.id, true, server.price)}>Subscribe</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="invite" className="space-y-4">
            <div className="text-center py-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="invite-code">Invite Code</Label>
                  <Input
                    id="invite-code"
                    placeholder="Enter invite code or link"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>

                <Button onClick={handleJoinByCode} disabled={!inviteCode.trim()} className="w-full">
                  Join Server
                </Button>

                <p className="text-sm text-muted-foreground">
                  Invite codes look like: abc123 or https://chatflow.app/invite/abc123
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
