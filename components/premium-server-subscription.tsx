"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Crown, Users, Star, Zap } from "lucide-react"
import { mockServers } from "@/lib/mock-data"

interface PremiumServerSubscriptionProps {
  serverId: string
  onSubscribe: (serverId: string) => void
  onClose: () => void
}

export function PremiumServerSubscription({ serverId, onSubscribe, onClose }: PremiumServerSubscriptionProps) {
  const server = mockServers.find((s) => s.id === serverId)

  if (!server || !server.isPremium) return null

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={server.icon || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{server.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            {server.name}
          </CardTitle>
          <CardDescription>{server.description}</CardDescription>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {server.memberCount} members
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              {server.subscriptionCount} subscribers
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">${server.price}</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Premium Features
            </h4>
            <div className="space-y-2">
              {server.premiumFeatures?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={() => onSubscribe(serverId)} className="w-full" size="lg">
              <Crown className="h-4 w-4 mr-2" />
              Subscribe Now
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Maybe Later
            </Button>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              Cancel anytime • 7-day free trial
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
