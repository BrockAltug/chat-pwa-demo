"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Crown } from "lucide-react"

interface CreateServerModalProps {
  onClose: () => void
}

export function CreateServerModal({ onClose }: CreateServerModalProps) {
  const [serverName, setServerName] = useState("")
  const [description, setDescription] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [price, setPrice] = useState("")
  const [serverIcon, setServerIcon] = useState("")

  const handleCreate = () => {
    // Mock server creation
    console.log("Creating server:", {
      name: serverName,
      description,
      isPremium,
      price: isPremium ? Number.parseFloat(price) : undefined,
      icon: serverIcon,
    })
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Your Server</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Server Icon */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={serverIcon || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{serverName ? serverName[0].toUpperCase() : "S"}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Icon
            </Button>
          </div>

          {/* Server Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="server-name">Server Name</Label>
              <Input
                id="server-name"
                placeholder="My Awesome Server"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell people what your server is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Premium Settings */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-primary" />
                  <Label htmlFor="premium-server">Premium Server</Label>
                </div>
                <Switch id="premium-server" checked={isPremium} onCheckedChange={setIsPremium} />
              </div>

              {isPremium && (
                <div>
                  <Label htmlFor="price">Monthly Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="9.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Users will need to pay this amount monthly to join your server
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!serverName.trim()}>
              Create Server
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
