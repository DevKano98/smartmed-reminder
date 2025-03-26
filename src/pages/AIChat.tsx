
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Send, Bot, User, Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      text: "Hello! I'm your medical assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock responses for demonstration
  const aiResponses = [
    "Based on your symptoms, I recommend scheduling an appointment with your doctor.",
    "Remember to take your medication regularly as prescribed by your doctor.",
    "It's important to stay hydrated and get enough rest while recovering.",
    "Your symptoms might be related to your recent medication change. Please consult your doctor.",
    "Have you been taking your prescribed medication on schedule?",
    "How long have you been experiencing these symptoms?",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        setIsListening(true);
        toast.info("Listening...");
        
        // Simulate voice recognition
        setTimeout(() => {
          setInputText("I've been having headaches for the past two days");
          setIsListening(false);
          toast.success("Voice input captured");
        }, 2000);
      } else {
        toast.error("Speech recognition is not supported in your browser");
      }
    } else {
      setIsListening(false);
      toast.info("Stopped listening");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatedTransition className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Health Assistant</h1>
        <p className="text-muted-foreground">
          Get answers to your health questions from our AI assistant
        </p>
      </div>
      
      <Card className="p-4 h-[70vh] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start max-w-[80%] ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                } rounded-lg px-4 py-2`}
              >
                <div className="mr-2 mt-1">
                  {message.type === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {message.type === "user" ? "You" : "AI Assistant"}
                  </div>
                  <div>{message.text}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Bot size={16} />
                  <div className="flex space-x-1">
                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce delay-100">•</span>
                    <span className="animate-bounce delay-200">•</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${isListening ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={toggleVoiceInput}
          >
            {isListening ? <MicOff /> : <Mic />}
          </Button>
          
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-1"
          />
          
          <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
            <Send size={16} className="mr-2" /> Send
          </Button>
        </div>
      </Card>
      
      <div className="text-xs text-muted-foreground text-center mt-8">
        Made by codeblooded
      </div>
    </AnimatedTransition>
  );
};

export default AIChat;
