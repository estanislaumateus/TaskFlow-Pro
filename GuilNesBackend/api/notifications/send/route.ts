import { type NextRequest, NextResponse } from "next/server"
import webpush from "web-push"

// Configurar VAPID (em produção, use variáveis de ambiente)
const vapidKeys = {
  publicKey:
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    "BEl62iUYgUivxIkv69yViEuiBIa40HI6YrrfQAsxaq0_JlCyOw7tJbuA4-Ew6Ec-7RuGRxe6VujKz9-VQHB4ehE",
  privateKey: process.env.VAPID_PRIVATE_KEY || "aUmMlehNVQRGSEGb4L07k6RjOmLUmnVrFO8eCNmBNdU",
}

webpush.setVapidDetails("mailto:admin@taskflowpro.com", vapidKeys.publicKey, vapidKeys.privateKey)

// Simulação de banco de dados em memória
let subscriptions: PushSubscription[] = []

export async function POST(request: NextRequest) {
  try {
    const { title, message, type, userId } = await request.json()

    if (!title || !message) {
      return NextResponse.json({ error: "Título e mensagem são obrigatórios" }, { status: 400 })
    }

    const payload = JSON.stringify({
      title,
      body: message,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      image: "/notification-image.png",
      data: {
        type,
        userId,
        url: "/",
        timestamp: Date.now(),
      },
      actions: [
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
      requireInteraction: type === "urgent",
      silent: false,
      vibrate: [200, 100, 200],
    })

    const results = []

    // Enviar para todas as inscrições (em produção, filtrar por usuário)
    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription, payload)
        results.push({ success: true, endpoint: subscription.endpoint })
      } catch (error) {
        console.error("Erro ao enviar notificação:", error)
        results.push({
          success: false,
          endpoint: subscription.endpoint,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        })

        // Remover inscrições inválidas
        if (error instanceof Error && (error.message.includes("410") || error.message.includes("invalid"))) {
          subscriptions = subscriptions.filter((sub) => sub.endpoint !== subscription.endpoint)
        }
      }
    }

    console.log(`Notificação enviada para ${results.filter((r) => r.success).length}/${results.length} inscrições`)

    return NextResponse.json({
      success: true,
      sent: results.filter((r) => r.success).length,
      total: results.length,
      results,
    })
  } catch (error) {
    console.error("Erro ao enviar notificações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

// Endpoint para enviar notificações específicas
export async function PUT(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    let title = ""
    let message = ""
    const notificationType = type

    switch (type) {
      case "task_assigned":
        title = "Nova tarefa atribuída"
        message = `Você foi designado para "${data.taskName}"`
        break
      case "task_due":
        title = "Tarefa vencendo"
        message = `A tarefa "${data.taskName}" vence em ${data.timeLeft}`
        break
      case "message_received":
        title = "Nova mensagem"
        message = `${data.senderName}: ${data.messagePreview}`
        break
      case "meeting_reminder":
        title = "Reunião em breve"
        message = `${data.meetingName} começa em ${data.timeLeft}`
        break
      case "project_update":
        title = "Projeto atualizado"
        message = `${data.projectName} - ${data.updateMessage}`
        break
      default:
        title = "Notificação"
        message = data.message || "Você tem uma nova notificação"
    }

    const payload = JSON.stringify({
      title,
      body: message,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      data: {
        type: notificationType,
        ...data,
        timestamp: Date.now(),
      },
      requireInteraction: ["task_due", "meeting_reminder"].includes(type),
      vibrate: [200, 100, 200],
    })

    const results = []
    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription, payload)
        results.push({ success: true })
      } catch (error) {
        results.push({ success: false, error })
      }
    }

    return NextResponse.json({
      success: true,
      sent: results.filter((r) => r.success).length,
      total: results.length,
    })
  } catch (error) {
    console.error("Erro ao enviar notificação específica:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
