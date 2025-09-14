import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your municipal assistant. I can help you navigate the complaint system, explain processes, or answer questions about your community services. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const botResponses = {
    "how to submit": "To submit a complaint: 1) Go to the 'Submit Complaint' tab, 2) Fill in the title and category, 3) Set priority level, 4) Add location details, 5) Provide a detailed description, 6) Optionally attach media, 7) Click 'Submit Complaint'. You'll receive a tracking ID to monitor progress.",
    "track complaint": "To track your complaint, you can use the 'My Complaints' tab in your citizen portal, or visit our tracking page and enter your complaint ID (format: C001, C002, etc.). You'll see real-time updates on status and progress.",
    "complaint status": "Complaint statuses include: 'Pending' (awaiting review), 'Under Review' (being evaluated), 'Assigned' (given to relevant department), 'In Progress' (being worked on), and 'Resolved' (completed). You'll receive notifications for each status change.",
    "contact": "For urgent issues, contact us directly: Municipal Office: (555) 123-4567, Emergency Services: 911, Non-emergency Police: (555) 123-4568, Public Works: (555) 123-4569. You can also email us at info@municipality.gov",
    "departments": "Our departments handle different issues: Public Works (streetlights, utilities), Roads & Traffic (potholes, traffic signals), Public Safety (noise, safety concerns), Environment (pollution, waste), Building & Safety (construction, permits).",
    "priority": "Priority levels: High (safety hazards, emergencies), Medium (moderate impact on daily life), Low (minor issues). High priority complaints are addressed within 24 hours, Medium within 3-5 days, Low within 1-2 weeks.",
    "default": "I'm here to help with questions about submitting complaints, tracking progress, understanding our processes, or connecting you with the right department. What would you like to know?"
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("submit") || lowerMessage.includes("file") || lowerMessage.includes("report")) {
      return botResponses["how to submit"];
    } else if (lowerMessage.includes("track") || lowerMessage.includes("status") || lowerMessage.includes("progress")) {
      return botResponses["track complaint"];
    } else if (lowerMessage.includes("status") || lowerMessage.includes("stages")) {
      return botResponses["complaint status"];
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email")) {
      return botResponses["contact"];
    } else if (lowerMessage.includes("department") || lowerMessage.includes("who handles")) {
      return botResponses["departments"];
    } else if (lowerMessage.includes("priority") || lowerMessage.includes("urgent") || lowerMessage.includes("emergency")) {
      return botResponses["priority"];
    } else {
      return botResponses["default"];
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary shadow-strong hover:shadow-strong hover:scale-110 transition-all duration-300 z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-strong z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Municipal Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-hover h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[280px] p-3 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about municipal services..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="gradient-primary"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;