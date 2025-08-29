"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Crown, Check, Star, Zap, CreditCard } from "lucide-react"

interface PremiumSubscriptionModalProps {
  onClose: () => void
  type?: "user" | "server" | "channel"
  targetId?: string
  targetName?: string
}

export function PremiumSubscriptionModal({
  onClose,
  type = "user",
  targetId,
  targetName,
}: PremiumSubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly")
  const [isProcessing, setIsProcessing] = useState(false)

  const userPlans = [
    {
      id: "basic",
      name: "ChatFlow Basic",
      price: { monthly: 0, yearly: 0 },
      features: [
        "Join public servers",
        "Basic messaging",
        "Standard profile",
        "5 server limit",
        "Basic emoji reactions",
      ],
      current: true,
    },
    {
      id: "premium",
      name: "ChatFlow Premium",
      price: { monthly: 9.99, yearly: 99.99 },
      popular: true,
      features: [
        "Unlimited servers",
        "Premium content access",
        "Custom profile themes",
        "Priority support",
        "Advanced emoji pack",
        "File uploads up to 100MB",
        "HD video calls",
        "Custom status messages",
      ],
    },
    {
      id: "pro",
      name: "ChatFlow Pro",
      price: { monthly: 19.99, yearly: 199.99 },
      features: [
        "Everything in Premium",
        "Create premium servers",
        "Advanced moderation tools",
        "Custom server branding",
        "Analytics dashboard",
        "API access",
        "White-label options",
        "Dedicated support",
      ],
    },
  ]

  const serverFeatures = [
    "Premium server badge",
    "Custom server themes",
    "Advanced moderation",
    "Member analytics",
    "Custom roles & permissions",
    "Priority server listing",
    "Exclusive channels",
    "Server monetization tools",
  ]

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true)
    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(`Subscribing to ${planId} plan (${selectedPlan})`)
    setIsProcessing(false)
    onClose()
  }

  const getTitle = () => {
    switch (type) {
      case "server":
        return `Subscribe to ${targetName}`
      case "channel":
        return `Access Premium Channel`
      default:
        return "Upgrade to Premium"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "server":
        return "Get access to exclusive content and premium features in this server"
      case "channel":
        return "Unlock premium content and participate in exclusive discussions"
      default:
        return "Unlock premium features and enhance your ChatFlow experience"
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-primary" />
            {getTitle()}
          </DialogTitle>
          <p className="text-muted-foreground">{getDescription()}</p>
        </DialogHeader>

        {type === "user" ? (
          <div className="space-y-6">
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="billing-toggle" className={selectedPlan === "monthly" ? "font-semibold" : ""}>
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={selectedPlan === "yearly"}
                onCheckedChange={(checked) => setSelectedPlan(checked ? "yearly" : "monthly")}
              />
              <Label htmlFor="billing-toggle" className={selectedPlan === "yearly" ? "font-semibold" : ""}>
                Yearly
                <Badge variant="secondary" className="ml-2">
                  Save 17%
                </Badge>
              </Label>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative transition-all duration-300 ${
                    plan.popular
                      ? "border-primary shadow-lg scale-105"
                      : plan.current
                        ? "border-accent"
                        : "hover:shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {plan.current && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="secondary">Current Plan</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      {plan.id === "premium" && <Crown className="h-5 w-5 text-primary" />}
                      {plan.id === "pro" && <Zap className="h-5 w-5 text-primary" />}
                      {plan.name}
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">
                        ${plan.price[selectedPlan]}
                        {plan.price[selectedPlan] > 0 && (
                          <span className="text-sm font-normal text-muted-foreground">
                            /{selectedPlan === "monthly" ? "month" : "year"}
                          </span>
                        )}
                      </div>
                      {selectedPlan === "yearly" && plan.price.yearly > 0 && (
                        <p className="text-sm text-muted-foreground">
                          ${(plan.price.yearly / 12).toFixed(2)}/month billed annually
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : plan.current ? "secondary" : "outline"}
                      disabled={plan.current || isProcessing}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {isProcessing
                        ? "Processing..."
                        : plan.current
                          ? "Current Plan"
                          : plan.price[selectedPlan] === 0
                            ? "Downgrade"
                            : `Subscribe for $${plan.price[selectedPlan]}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Server/Channel Subscription */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Premium Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">
                    ${type === "server" ? "19.99" : "9.99"}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">
                    Get access to {type === "server" ? "all premium channels" : "this premium channel"} and exclusive
                    content
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">What you'll get:</h4>
                  <ul className="space-y-2">
                    {serverFeatures.slice(0, type === "server" ? 8 : 4).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" onClick={() => handleSubscribe("server")} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : `Subscribe for $${type === "server" ? "19.99" : "9.99"}/month`}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                <div
                  key={method}
                  className="flex items-center justify-center p-3 border rounded-lg hover:bg-accent/50 cursor-pointer"
                >
                  <span className="text-sm font-medium">{method}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Secure payments powered by Stripe. Cancel anytime.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
