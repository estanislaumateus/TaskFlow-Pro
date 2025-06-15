"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, BellOff, Check, X, Settings, MessageSquare, CheckSquare, Calendar, Users } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface NotificationItem {
  id: string
  type: "task" | "message" | "meeting" | "project"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

export default function NotificationsPage() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      type: "task",
      title: "Nova tarefa atribuída",
      message: 'Você foi designado para "Revisar proposta do cliente"',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: "high",
    },
    {
      id: "2",
      type: "message",
      title: "Nova mensagem",
      message: "Ana Silva: A reunião foi reagendada para 15h",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "meeting",
      title: "Reunião em 30 minutos",
      message: "Sprint Planning - Sala de Reuniões Virtual",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      priority: "high",
    },
    {
      id: "4",
      type: "project",
      title: "Projeto atualizado",
      message: "App Mobile E-commerce atingiu 80% de conclusão",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: "low",
    },
  ])

  const [settings, setSettings] = useState({
    tasks: true,
    messages: true,
    meetings: true,
    projects: true,
    email: true,
    desktop: true,
    mobile: true,
    sound: true,
  })

  useEffect(() => {
    checkSubscriptionStatus()
  }, [])

  const checkSubscriptionStatus = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration) {
          const subscription = await registration.pushManager.getSubscription()
          setIsSubscribed(!!subscription)
        }
      } catch (error) {
        console.error("Erro ao verificar status da inscrição:", error)
      }
    }
  }

  const subscribeToNotifications = async () => {
    setIsLoading(true)
    try {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        throw new Error("Push notifications não são suportadas neste navegador")
      }

      // Registrar service worker
      const registration = await navigator.serviceWorker.register("/sw.js")
      await navigator.serviceWorker.ready

      // Solicitar permissão
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        throw new Error("Permissão para notificações negada")
      }

      // Criar inscrição
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
            "BEl62iUYgUivxIkv69yViEuiBIa40HI6YrrfQAsxaq0_JlCyOw7tJbuA4-Ew6Ec-7RuGRxe6VujKz9-VQHB4ehE",
        ),
      })

      // Enviar inscrição para o servidor
      await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })

      setIsSubscribed(true)
      toast({
        title: "Notificações ativadas!",
        description: "Você receberá notificações sobre tarefas e mensagens.",
      })
    } catch (error) {
      console.error("Erro ao ativar notificações:", error)
      toast({
        title: "Erro ao ativar notificações",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const unsubscribeFromNotifications = async () => {
    setIsLoading(true)
    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        const subscription = await registration.pushManager.getSubscription()
        if (subscription) {
          await subscription.unsubscribe()

          await fetch("/api/notifications/unsubscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          })
        }
      }

      setIsSubscribed(false)
      toast({
        title: "Notificações desativadas",
        description: "Você não receberá mais notificações push.",
      })
    } catch (error) {
      console.error("Erro ao desativar notificações:", error)
      toast({
        title: "Erro ao desativar notificações",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sendTestNotification = async () => {
    try {
      await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Notificação de Teste",
          message: "Esta é uma notificação de teste do TaskFlow Pro!",
          type: "test",
        }),
      })

      toast({
        title: "Notificação de teste enviada!",
        description: "Verifique se recebeu a notificação.",
      })
    } catch (error) {
      console.error("Erro ao enviar notificação de teste:", error)
      toast({
        title: "Erro ao enviar notificação",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckSquare className="w-4 h-4" />
      case "message":
        return <MessageSquare className="w-4 h-4" />
      case "meeting":
        return <Calendar className="w-4 h-4" />
      case "project":
        return <Users className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Agora"
    if (minutes < 60) return `${minutes}m atrás`
    if (hours < 24) return `${hours}h atrás`
    return `${days}d atrás`
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
            <p className="text-gray-600">
              Gerencie suas notificações e preferências
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} não lidas
                </Badge>
              )}
            </p>
          </div>

          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Marcar todas como lidas
              </Button>
            )}
            <Button variant="outline" onClick={sendTestNotification} disabled={!isSubscribed}>
              <Bell className="w-4 h-4 mr-2" />
              Teste
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configurações de Notificação */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações
                </CardTitle>
                <CardDescription>Configure suas preferências de notificação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status das Notificações Push */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isSubscribed ? (
                        <Bell className="w-5 h-5 text-green-500" />
                      ) : (
                        <BellOff className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="font-medium">Notificações Push</span>
                    </div>
                    <Badge variant={isSubscribed ? "default" : "secondary"}>
                      {isSubscribed ? "Ativas" : "Inativas"}
                    </Badge>
                  </div>

                  {!isSubscribed ? (
                    <Button onClick={subscribeToNotifications} disabled={isLoading} className="w-full">
                      {isLoading ? "Ativando..." : "Ativar Notificações"}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={unsubscribeFromNotifications}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Desativando..." : "Desativar Notificações"}
                    </Button>
                  )}
                </div>

                {/* Tipos de Notificação */}
                <div className="space-y-4">
                  <h4 className="font-medium">Tipos de Notificação</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckSquare className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Tarefas</span>
                      </div>
                      <Switch
                        checked={settings.tasks}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, tasks: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Mensagens</span>
                      </div>
                      <Switch
                        checked={settings.messages}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, messages: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Reuniões</span>
                      </div>
                      <Switch
                        checked={settings.meetings}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, meetings: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Projetos</span>
                      </div>
                      <Switch
                        checked={settings.projects}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, projects: checked }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Canais de Notificação */}
                <div className="space-y-4">
                  <h4 className="font-medium">Canais</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email</span>
                      <Switch
                        checked={settings.email}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, email: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Desktop</span>
                      <Switch
                        checked={settings.desktop}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, desktop: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mobile</span>
                      <Switch
                        checked={settings.mobile}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, mobile: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Som</span>
                      <Switch
                        checked={settings.sound}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, sound: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Notificações */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Notificações Recentes</CardTitle>
                <CardDescription>Suas notificações mais recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhuma notificação</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          notification.read ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div
                              className={`p-2 rounded-full ${
                                notification.type === "task"
                                  ? "bg-blue-100 text-blue-600"
                                  : notification.type === "message"
                                    ? "bg-green-100 text-green-600"
                                    : notification.type === "meeting"
                                      ? "bg-purple-100 text-purple-600"
                                      : "bg-orange-100 text-orange-600"
                              }`}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-400">{formatTimestamp(notification.timestamp)}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 ml-4">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Função utilitária para converter VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
