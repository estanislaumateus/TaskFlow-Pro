import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados em memória
const subscriptions: PushSubscription[] = []

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json()

    // Validar a inscrição
    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Inscrição inválida" }, { status: 400 })
    }

    // Verificar se já existe
    const existingIndex = subscriptions.findIndex((sub) => sub.endpoint === subscription.endpoint)

    if (existingIndex >= 0) {
      // Atualizar inscrição existente
      subscriptions[existingIndex] = subscription
    } else {
      // Adicionar nova inscrição
      subscriptions.push(subscription)
    }

    console.log("Nova inscrição registrada:", subscription.endpoint)

    return NextResponse.json({
      success: true,
      message: "Inscrição registrada com sucesso",
    })
  } catch (error) {
    console.error("Erro ao registrar inscrição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    subscriptions: subscriptions.length,
    message: "Serviço de notificações ativo",
  })
}
