"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatView } from "@/components/chat-view"
import { DiscoverView } from "@/components/discover-view"
import { UserProfileModal } from "@/components/user-profile-modal"
import { CreateServerModal } from "@/components/create-server-modal"
import { JoinServerModal } from "@/components/join-server-modal"
import { PremiumSubscriptionModal } from "@/components/premium-subscription-modal"
import { PremiumSettingsModal } from "@/components/premium-settings-modal"
import { PremiumServerSubscription } from "@/components/premium-server-subscription"
import { mockServers } from "@/lib/mock-data"


export default function Home() {
  const [currentView, setCurrentView] = useState<"chat" | "discover">("chat")
  const [selectedServer, setSelectedServer] = useState<string>("")
  const [selectedChannel, setSelectedChannel] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [showCreateServer, setShowCreateServer] = useState(false)
  const [showJoinServer, setShowJoinServer] = useState(false)
  const [showPremiumSubscription, setShowPremiumSubscription] = useState(false)
  const [showPremiumSettings, setShowPremiumSettings] = useState(false)
  const [premiumModalType, setPremiumModalType] = useState<"user" | "server" | "channel">("user")
  const [premiumTargetId, setPremiumTargetId] = useState<string>("")
  const [premiumTargetName, setPremiumTargetName] = useState<string>("")

  const handlePremiumSubscription = (type: "user" | "server" | "channel", targetId?: string, targetName?: string) => {
    setPremiumModalType(type)
    setPremiumTargetId(targetId || "")
    setPremiumTargetName(targetName || "")
    setShowPremiumSubscription(true)
  }

  const handleServerSelect = (serverId: string) => {
    const server = mockServers.find((s) => s.id === serverId)
    if (server?.isPremium) {
      setSelectedServer(serverId)
      setSelectedChannel("")
    } else {
      setSelectedServer(serverId)
      // Auto-select first channel if available
      const firstChannel = server?.channels[0]
      if (firstChannel) {
        setSelectedChannel(firstChannel.id)
      }
    }
  }

  const handlePremiumServerSubscribe = (serverId: string) => {
    // Mock subscription success
    console.log(`Subscribed to premium server: ${serverId}`)
    // After successful subscription, select the server normally
    const server = mockServers.find((s) => s.id === serverId)
    const firstChannel = server?.channels[0]
    if (firstChannel) {
      setSelectedChannel(firstChannel.id)
    }
  }

  const currentServer = mockServers.find((s) => s.id === selectedServer)
  const showPremiumServerPage = currentServer?.isPremium && !selectedChannel

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedServer={selectedServer}
        selectedChannel={selectedChannel}
        onServerSelect={handleServerSelect}
        onChannelSelect={setSelectedChannel}
        onCreateServer={() => setShowCreateServer(true)}
        onJoinServer={() => setShowJoinServer(true)}
        onPremiumSettings={() => setShowPremiumSettings(true)}
        onUserClick={setSelectedUser}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {currentView === "chat" ? (
          showPremiumServerPage ? (
            <PremiumServerSubscription
              serverId={selectedServer}
              onSubscribe={handlePremiumServerSubscribe}
              onClose={() => setSelectedServer("")}
            />
          ) : (
            <ChatView
              serverId={selectedServer}
              channelId={selectedChannel}
              onChannelSelect={setSelectedChannel}
              onUserClick={setSelectedUser}
              onPremiumSubscribe={handlePremiumSubscription}
            />
          )
        ) : (
          <DiscoverView onUserClick={setSelectedUser} onPremiumSubscribe={handlePremiumSubscription} />
        )}
      </main>

      {selectedUser && <UserProfileModal userId={selectedUser} onClose={() => setSelectedUser(null)} />}

      {showCreateServer && <CreateServerModal onClose={() => setShowCreateServer(false)} />}

      {showJoinServer && (
        <JoinServerModal onClose={() => setShowJoinServer(false)} onPremiumSubscribe={handlePremiumSubscription} />
      )}

      {showPremiumSubscription && (
        <PremiumSubscriptionModal
          onClose={() => setShowPremiumSubscription(false)}
          type={premiumModalType}
          targetId={premiumTargetId}
          targetName={premiumTargetName}
        />
      )}

      {showPremiumSettings && <PremiumSettingsModal onClose={() => setShowPremiumSettings(false)} />}
    </div>
  )
}
