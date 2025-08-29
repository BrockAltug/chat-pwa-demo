"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown, Star } from "lucide-react"

interface PremiumContentGateProps {
  children: ReactNode
  isSubscribed: boolean
  type?: "user" | "server" | "channel"
  title?: string
  description?: string
  price?: number
  onSubscribe?: () => void
  showPreview?: boolean
}

export function PremiumContentGate({
  children,
  isSubscribed,
  type = "user",
  title,
  description,
  price,
  onSubscribe,
  showPreview = false,
}: PremiumContentGateProps) {
  if (isSubscribed) {
    return <>{children}</>
  }

  const getIcon = () => {
    switch (type) {
      case "server":
        return <Star className="h-12 w-12 text-primary" />
      case "channel":
        return <Lock className="h-12 w-12 text-primary" />
      default:
        return <Crown className="h-12 w-12 text-primary" />
    }
  }

  const getDefaultTitle = () => {
    switch (type) {
      case "server":
        return "Premium Server Content"
      case "channel":
        return "Premium Channel Access"
      default:
        return "Premium Content"
    }
  }

  const getDefaultDescription = () => {
    switch (type) {
      case "server":
        return "Subscribe to this server to access exclusive content and premium features"
      case "channel":
        return "This channel requires a premium subscription to access"
      default:
        return "Subscribe to unlock premium content and exclusive features"
    }
  }

  return (
    <div className="relative">
      {showPreview && (
        <div className="absolute inset-0 z-10">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        </div>
      )}

      {showPreview && <div className="filter blur-sm pointer-events-none">{children}</div>}

      <Card className={`${showPreview ? "absolute inset-0 z-20" : ""} border-primary/20`}>
        <CardContent className="flex flex-col items-center justify-center text-center p-8 space-y-4">
          {getIcon()}
          <h3 className="text-xl font-bold">{title || getDefaultTitle()}</h3>
          <p className="text-muted-foreground max-w-md">{description || getDefaultDescription()}</p>

          {price && (
            <div className="text-2xl font-bold text-primary">
              ${price}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          )}

          <Button onClick={onSubscribe} className="mt-4">
            <Crown className="h-4 w-4 mr-2" />
            {type === "server" ? "Subscribe to Server" : type === "channel" ? "Access Channel" : "Subscribe Now"}
          </Button>

          <p className="text-xs text-muted-foreground">Cancel anytime • Secure payments • Instant access</p>
        </CardContent>
      </Card>
    </div>
  )
}
