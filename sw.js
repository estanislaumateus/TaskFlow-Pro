// Service Worker para notificações push
const CACHE_NAME = "taskflow-pro-v1"
const urlsToCache = ["/", "/static/js/bundle.js", "/static/css/main.css", "/icon-192x192.png", "/icon-512x512.png"]

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Cache aberto")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Ativação do Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Ativando...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Removendo cache antigo", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Interceptar requisições de rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna cache se disponível, senão busca na rede
      return response || fetch(event.request)
    }),
  )
})

// Receber notificações push
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push recebido", event)

  let notificationData = {}

  if (event.data) {
    try {
      notificationData = event.data.json()
    } catch (error) {
      console.error("Erro ao parsear dados da notificação:", error)
      notificationData = {
        title: "TaskFlow Pro",
        body: "Você tem uma nova notificação",
        icon: "/icon-192x192.png",
      }
    }
  }

  const options = {
    body: notificationData.body || "Nova notificação",
    icon: notificationData.icon || "/icon-192x192.png",
    badge: notificationData.badge || "/badge-72x72.png",
    image: notificationData.image,
    data: notificationData.data || {},
    actions: notificationData.actions || [
      {
        action: "view",
        title: "Ver",
        icon: "/action-view.png",
      },
      {
        action: "dismiss",
        title: "Dispensar",
        icon: "/action-dismiss.png",
      },
    ],
    requireInteraction: notificationData.requireInteraction || false,
    silent: notificationData.silent || false,
    vibrate: notificationData.vibrate || [200, 100, 200],
    tag: notificationData.data?.type || "general",
    renotify: true,
    timestamp: Date.now(),
  }

  event.waitUntil(self.registration.showNotification(notificationData.title || "TaskFlow Pro", options))
})

// Clique na notificação
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Clique na notificação", event)

  event.notification.close()

  const action = event.action
  const data = event.notification.data || {}

  if (action === "dismiss") {
    // Apenas fechar a notificação
    return
  }

  // Determinar URL baseada no tipo de notificação
  let url = "/"

  if (data.type) {
    switch (data.type) {
      case "task_assigned":
      case "task_due":
        url = "/tasks"
        break
      case "message_received":
        url = "/messages"
        break
      case "meeting_reminder":
        url = "/calendar"
        break
      case "project_update":
        url = "/projects"
        break
      default:
        url = data.url || "/"
    }
  }

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Verificar se já existe uma janela aberta
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus()
        }
      }

      // Abrir nova janela se não existir
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    }),
  )
})

// Fechar notificação
self.addEventListener("notificationclose", (event) => {
  console.log("Service Worker: Notificação fechada", event)

  // Opcional: enviar analytics sobre notificações fechadas
  const data = event.notification.data || {}

  if (data.type) {
    // Aqui você pode enviar dados para analytics
    console.log("Notificação fechada:", data.type)
  }
})

// Sincronização em background
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Sync em background", event)

  if (event.tag === "background-sync") {
    event.waitUntil(
      // Aqui você pode sincronizar dados offline
      console.log("Executando sincronização em background"),
    )
  }
})

// Mensagens do cliente
self.addEventListener("message", (event) => {
  console.log("Service Worker: Mensagem recebida", event.data)

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
