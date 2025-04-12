import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { SendHorizonal, MapPin, Mic, MapPinned, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm RestStop's virtual assistant. I can help you find clean restrooms nearby, give you directions, or answer questions about amenities. How can I help you today?",
    sender: "assistant",
    timestamp: new Date(),
  },
];

// API key (in a real application, this should be stored securely)
const API_KEY = "bXhUUupJtut2FD7yhru2";

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Get context from previous messages (last 5 messages)
      const recentMessages = messages.slice(-5).map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content
      }));

      // Add current user message
      const messageContext = [
        ...recentMessages,
        { role: "user", content: input }
      ];
      
      // Call the assistant API
      const response = await fetchAssistantResponse(messageContext);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the RestStop assistant. Using offline mode.",
        variant: "destructive"
      });
      
      // Fallback to offline mode with predefined responses
      const fallbackResponse = getFallbackResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const fetchAssistantResponse = async (messageContext: any[]) => {
    try {
      // Simulate API call - in a real app, this would be a fetch to your backend
      console.log("Calling assistant API with key:", API_KEY);
      console.log("Message context:", messageContext);
      
      // For now, we'll simulate a network delay and return a fallback response
      // In a real app, this would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      return getFallbackResponse(messageContext[messageContext.length - 1].content);
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  const getFallbackResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    
    // Enhanced response matching
    if (lowercaseMsg.includes("hello") || lowercaseMsg.includes("hi")) {
      return "Hello! How can I help you find a restroom today?";
    }
    
    if (lowercaseMsg.includes("find") || lowercaseMsg.includes("nearby") || lowercaseMsg.includes("close")) {
      return "I found several restrooms near you in Coimbatore. The closest is Brookefields Mall Restroom (1.2 km away) with a cleanliness score of 4.2/5. Would you like directions?";
    }
    
    if (lowercaseMsg.includes("clean")) {
      return "The cleanest restroom near you in Coimbatore is Café Coffee Day - RS Puram with a cleanliness score of 4.5/5, located 1.8 km from your current location.";
    }
    
    if (lowercaseMsg.includes("direction") || lowercaseMsg.includes("navigate") || lowercaseMsg.includes("go to")) {
      return "I've sent directions to Brookefields Mall Restroom to the map. It's approximately 15 minutes away by walking from your location in Coimbatore.";
    }
    
    if (lowercaseMsg.includes("accessible") || lowercaseMsg.includes("wheelchair")) {
      return "I found 4 wheelchair accessible restrooms near you in Coimbatore. The closest is Brookefields Mall Restroom (1.2 km away).";
    }
    
    if (lowercaseMsg.includes("baby") || lowercaseMsg.includes("changing")) {
      return "I found 3 restrooms with baby changing tables near you in Coimbatore. The closest is Brookefields Mall Restroom (1.2 km away).";
    }
    
    if (lowercaseMsg.includes("thanks") || lowercaseMsg.includes("thank")) {
      return "You're welcome! Happy to help you find restrooms in Coimbatore. Safe travels!";
    }
    
    if (lowercaseMsg.includes("coimbatore") || lowercaseMsg.includes("india")) {
      return "I can help you find restrooms in Coimbatore. There are several options in the city center and near popular tourist spots. Would you like me to show you the closest ones?";
    }

    // Default response
    return "I understand you're looking for a restroom in Coimbatore. I can help you find clean restrooms nearby. Would you like me to show you the closest options?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages(initialMessages);
    toast({
      title: "Chat Cleared",
      description: "Started a new conversation."
    });
  };

  const activateVoice = () => {
    toast({
      title: "Voice Assistant",
      description: "Voice recognition is being initialized...",
    });
    
    // In a real app, this would activate speech recognition
    setTimeout(() => {
      toast({
        title: "Voice Assistant Active",
        description: "Speak now to ask about restrooms in Coimbatore.",
      });
    }, 1500);
  };

  const shareLocation = () => {
    toast({
      title: "Location Shared",
      description: "Using your location in Coimbatore to find nearby restrooms.",
    });
    
    // In a real app, this would update the user's location
  };

  return (
    <div className="container flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center justify-between py-4 border-b">
        <h1 className="text-xl font-bold">RestStop Assistant</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={shareLocation}
          >
            <MapPinned className="h-4 w-4 mr-1.5" />
            Share Location
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={clearChat}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={chatWindowRef}
        className="flex-1 overflow-y-auto py-4 px-1 chat-window"
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} max-w-[80%]`}>
                <div className="flex-shrink-0 mt-1">
                  {message.sender === "assistant" ? (
                    <Avatar className="h-8 w-8 border bg-restroom-blue text-white">
                      <div className="flex h-full w-full items-center justify-center">
                        <MapPin className="h-4 w-4" />
                      </div>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 border bg-muted">
                      <div className="flex h-full w-full items-center justify-center font-semibold">
                        U
                      </div>
                    </Avatar>
                  )}
                </div>
                <div 
                  className={`mx-2 px-4 py-2 rounded-lg ${
                    message.sender === "user" 
                      ? "bg-restroom-blue text-white rounded-tr-none" 
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <div 
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex flex-row max-w-[80%]">
                <div className="flex-shrink-0 mt-1">
                  <Avatar className="h-8 w-8 border bg-restroom-blue text-white">
                    <div className="flex h-full w-full items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </div>
                  </Avatar>
                </div>
                <div className="mx-2 px-4 py-2 rounded-lg bg-muted rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="flex-shrink-0"
            onClick={activateVoice}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Ask anything about restrooms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            variant="default" 
            size="icon" 
            className="flex-shrink-0"
            onClick={handleSendMessage}
            disabled={input.trim() === ""}
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-xs text-center mt-2 text-muted-foreground">
          Try asking: "Find clean restrooms nearby" or "Where's the closest accessible restroom?"
        </div>
      </div>
    </div>
  );
};

export default Chat;
