
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { SendHorizonal, MapPin, Mic, MapPinned, RefreshCw } from "lucide-react";

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

// Sample responses for demonstration
const sampleResponses: Record<string, string> = {
  "hello": "Hello! How can I help you find a restroom today?",
  "hi": "Hi there! Need help finding a clean restroom?",
  "find": "I found several restrooms near you. The closest is Central Park Public Restroom (0.3 miles away) with a cleanliness score of 4.2/5. Would you like directions?",
  "nearby": "I found several restrooms near you. The closest is Central Park Public Restroom (0.3 miles away) with a cleanliness score of 4.2/5. Would you like directions?",
  "clean": "The cleanest restroom near you is Bryant Park Public Restroom with a cleanliness score of 4.8/5, located 0.5 miles from your current location.",
  "help": "I can help you find restrooms, give directions, check if a restroom has specific amenities, or report a restroom's condition. What do you need?",
  "amenities": "Most restrooms in our database include information about toilet paper, soap, hand dryers, and accessibility. Is there a specific amenity you're looking for?",
  "accessible": "I found 3 wheelchair accessible restrooms near you. The closest is Grand Central Terminal (0.4 miles away).",
  "baby": "I found 2 restrooms with baby changing tables near you. The closest is Starbucks on 5th Avenue (0.2 miles away).",
  "direction": "I've sent directions to Central Park Public Restroom to the map. It's approximately 5 minutes away by walking.",
  "thanks": "You're welcome! Happy to help. Safe travels!",
  "thank": "You're welcome! Happy to help. Safe travels!",
};

const Chat = () => {
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

  const handleSendMessage = () => {
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

    // Simulate assistant typing
    setTimeout(() => {
      const response = getResponseForMessage(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getResponseForMessage = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    
    // Check for matches with sample responses
    for (const [key, response] of Object.entries(sampleResponses)) {
      if (lowercaseMsg.includes(key)) {
        return response;
      }
    }
    
    // Default fallback response
    return "I understand you're looking for a restroom. I can help you find clean restrooms nearby. Would you like me to show you the closest options?";
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  const activateVoice = () => {
    alert("Voice assistant would activate here. This feature is coming soon!");
  };

  const shareLocation = () => {
    alert("Location sharing would happen here. In a real app, this would update your location.");
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
