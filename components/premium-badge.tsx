"use client"

import { Crown, Star, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PremiumBadgeProps {
  type?: "user" | "server" | "channel" | "content"
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  className?: string
}

export function PremiumBadge({ type = "user", size = "md", showTooltip = true, className = "" }: PremiumBadgeProps) {
  const getIcon = () => {
    switch (type) {
      case "server":
        return <Star className={`${size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
      case "channel":
        return <Zap className={`${size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
      default:
        return <Crown className={`${size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
    }
  }

  const getTooltipText = () => {
    switch (type) {
      case "server":
        return "Premium Server - Exclusive content and features"
      case "channel":
        return "Premium Channel - Subscription required"
      case "content":
        return "Premium Content - Subscribers only"
      default:
        return "Premium User - Enhanced features and benefits"
    }
  }

  const badge = (
    <Badge
      variant="secondary"
      className={`bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 ${className}`}
    >
      {getIcon()}
      {size !== "sm" && <span className="ml-1">Premium</span>}
    </Badge>
  )

  if (!showTooltip) return badge

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
