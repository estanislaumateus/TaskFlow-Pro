"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  MessageSquare,
  Users,
  CheckSquare,
  BarChart3,
  Settings,
  Search,
  Plus,
  Phone,
  Video,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tasks = [
    {
      id: 1,
      title: "Revisar proposta do cliente",
      priority: "Alta",
      dueDate: "2024-01-15",
      status: "Em andamento",
      assignee: "Ana Silva",
    },
    {
      id: 2,
      title: "Atualizar documentação",
      priority: "Média",
      dueDate: "2024-01-18",
      status: "Pendente",
      assignee: "João Santos",
    },
    {
      id: 3,
      title: "Reunião com equipe de design",
      priority: "Alta",
      dueDate: "2024-01-16",
      status: "Concluída",
      assignee: "Maria Costa",
    },
  ]

  const projects = [
    { id: 1, name: "App Mobile E-commerce", progress: 75, team: 8, deadline: "2024-02-28" },
    { id: 2, name: "Sistema CRM", progress: 45, team: 5, deadline: "2024-03-15" },
    { id: 3, name: "Website Corporativo", progress: 90, team: 3, deadline: "2024-01-30" },
  ]

  const teamMembers = [
    { name: "Ana Silva", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    { name: "João Santos", role: "Developer", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
    { name: "Maria Costa", role: "Designer", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    { name: "Pedro Lima", role: "QA Engineer", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
  ]

  const recentMessages = [
    { from: "Ana Silva", message: "A reunião foi reagendada para 15h", time: "10:30", unread: true },
    { from: "Equipe Design", message: "Novos mockups disponíveis", time: "09:45", unread: true },
    { from: "João Santos", message: "Deploy realizado com sucesso", time: "08:20", unread: false },
  ]

  const upcomingEvents = [
    { title: "Reunião de Sprint", time: "14:00", date: "Hoje" },
    { title: "Apresentação para Cliente", time: "10:00", date: "Amanhã" },
    { title: "Workshop de UX", time: "16:00", date: "18 Jan" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow Pro</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Buscar tarefas, projetos..." className="pl-10 w-64" />
            </div>

            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
          <nav className="space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="w-4 h-4 mr-3" />
              Dashboard
            </Button>

            <Button
              variant={activeTab === "tasks" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("tasks")}
            >
              <CheckSquare className="w-4 h-4 mr-3" />
              Tarefas
            </Button>

            <Button
              variant={activeTab === "projects" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("projects")}
            >
              <Users className="w-4 h-4 mr-3" />
              Projetos
            </Button>

            <Button
              variant={activeTab === "calendar" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("calendar")}
            >
              <Calendar className="w-4 h-4 mr-3" />
              Calendário
            </Button>

            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="w-4 h-4 mr-3" />
              Mensagens
              <Badge variant="destructive" className="ml-auto">
                3
              </Badge>
            </Button>

            <Button
              variant={activeTab === "team" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("team")}
            >
              <Users className="w-4 h-4 mr-3" />
              Equipe
            </Button>

            <Button
              variant={activeTab === "chatbot" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("chatbot")}
            >
              <Bot className="w-4 h-4 mr-3" />
              Assistente IA
            </Button>

            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-4 h-4 mr-3" />
              Configurações
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Chamada
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Videochamada
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Tarefas Ativas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <p className="text-xs text-gray-500">+12% desde ontem</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Projetos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <p className="text-xs text-gray-500">3 finalizando este mês</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Equipe Online</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">12/15</div>
                    <p className="text-xs text-gray-500">80% da equipe ativa</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Produtividade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">94%</div>
                    <p className="text-xs text-gray-500">+5% esta semana</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tarefas Recentes</CardTitle>
                    <CardDescription>Suas tarefas mais importantes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">Responsável: {task.assignee}</p>
                          </div>
                          <Badge variant={task.priority === "Alta" ? "destructive" : "secondary"}>
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Project Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progresso dos Projetos</CardTitle>
                    <CardDescription>Status atual dos projetos ativos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="space-y-2">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{project.name}</h4>
                            <span className="text-sm text-gray-500">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                          <p className="text-xs text-gray-500">
                            {project.team} membros • Prazo: {project.deadline}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Equipe Online</CardTitle>
                    <CardDescription>Status atual dos membros da equipe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                  member.status === "online"
                                    ? "bg-green-500"
                                    : member.status === "away"
                                      ? "bg-yellow-500"
                                      : "bg-gray-400"
                                }`}
                              ></div>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Próximos Eventos</CardTitle>
                    <CardDescription>Reuniões e eventos agendados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-500">
                              {event.date} às {event.time}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Participar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Tarefas</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Tarefa
                </Button>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="pending">Pendentes</TabsTrigger>
                  <TabsTrigger value="progress">Em Andamento</TabsTrigger>
                  <TabsTrigger value="completed">Concluídas</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {tasks.map((task) => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-gray-500">Responsável: {task.assignee}</p>
                            <p className="text-sm text-gray-500">Prazo: {task.dueDate}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={task.priority === "Alta" ? "destructive" : "secondary"}>
                              {task.priority}
                            </Badge>
                            <Badge variant={task.status === "Concluída" ? "default" : "outline"}>{task.status}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Projetos</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Projeto
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>{project.team} membros da equipe</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Progresso</span>
                            <span className="text-sm text-gray-500">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Prazo:</span>
                          <span className="font-medium">{project.deadline}</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Mensagens</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Novo Grupo
                  </Button>
                  <Button>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Nova Conversa
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Conversas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentMessages.map((msg, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {msg.from
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <p className="font-medium text-sm">{msg.from}</p>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                            {msg.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                      <p className="text-gray-500">Selecione uma conversa para começar</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Input placeholder="Digite sua mensagem..." className="flex-1" />
                      <Button>Enviar</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "chatbot" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Assistente IA</h2>
                <Badge variant="secondary">
                  <Bot className="w-4 h-4 mr-1" />
                  Online
                </Badge>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Chat com Assistente</CardTitle>
                  <CardDescription>Tire suas dúvidas sobre tarefas, projetos e produtividade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gray-50 rounded-lg p-4 space-y-4 overflow-y-auto">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm">
                          Olá! Sou seu assistente IA. Como posso ajudá-lo hoje? Posso responder dúvidas sobre:
                        </p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Gerenciamento de tarefas</li>
                          <li>• Organização de projetos</li>
                          <li>• Dicas de produtividade</li>
                          <li>• Coordenação de equipes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Input placeholder="Digite sua pergunta..." className="flex-1" />
                    <Button>
                      <Bot className="w-4 h-4 mr-2" />
                      Perguntar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Calendário</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Evento
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Janeiro 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                        <div key={day} className="p-2 font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <div key={day} className="p-2 hover:bg-blue-50 rounded cursor-pointer">
                          {day}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximos Eventos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-gray-500">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Equipe</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Convidar Membro
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="relative inline-block mb-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            member.status === "online"
                              ? "bg-green-500"
                              : member.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                      <div className="flex justify-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>Gerencie suas informações pessoais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <Input defaultValue="Seu Nome" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="seu.email@empresa.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Cargo</label>
                      <Input defaultValue="Seu Cargo" />
                    </div>
                    <Button>Salvar Alterações</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>Configure suas preferências de notificação</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Notificações por email</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Notificações push</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lembretes de tarefas</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Atualizações de projeto</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
