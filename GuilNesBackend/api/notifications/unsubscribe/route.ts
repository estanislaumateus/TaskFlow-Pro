import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados em memória (mesmo array do subscribe)
let subscriptions: PushSubscription[] = []

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json()

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Inscrição inválida" }, { status: 400 })
    }

    // Remover inscrição
    const initialLength = subscriptions.length
    subscriptions = subscriptions.filter((sub) => sub.endpoint !== subscription.endpoint)

    const removed = initialLength > subscriptions.length

    console.log("Inscrição removida:", subscription.endpoint)

    return NextResponse.json({
      success: true,
      removed,
      message: removed ? "Inscrição removida com sucesso" : "Inscrição não encontrada",
    })
  } catch (error) {
    console.error("Erro ao remover inscrição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
