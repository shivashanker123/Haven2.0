
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShimmerCard } from '@/components/LoadingSpinner';
import { Bot, User, Send, Loader2 } from 'lucide-react';

// --- Live AI Chatbot Component ---
const LiveChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { sender: 'bot', text: "Hello! I'm your AI wellness assistant. Feel free to share what's on your mind. I'm here to listen and support you." }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    const newMessageHistory = [...messages, userMessage];
    setMessages(newMessageHistory);
    setInput('');
    setIsLoading(true);

    try {
      // ✅ **THIS IS THE UPDATED LINE**
      // Use the full URL for your backend server.
      const res = await axios.post('http://localhost:5000/api/chat', { 
        messageHistory: messages, 
        currentMessage: userMessage.text 
      });
      
      const botReply = { sender: 'bot', text: res.data.reply };
      setMessages([...newMessageHistory, botReply]);

    } catch (error) {
      const errorReply = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again in a moment." };
      setMessages([...newMessageHistory, errorReply]);
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto glass-card border-0 animate-fade-in flex flex-col h-[70vh]">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="text-wellness-serene" />
          AI Wellness Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pr-4 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-wellness-gentle flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'bot' ? 'bg-muted rounded-tl-none' : 'bg-primary text-primary-foreground rounded-br-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-wellness-gentle flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="p-3 rounded-2xl bg-muted">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </CardContent>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex-shrink-0 flex items-center gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
};

// --- Main Dashboard Component ---
// (This part remains unchanged)
export const StudentDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout userType="student">
        <ShimmerCard className="h-[70vh] max-w-3xl mx-auto" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="student">
      <div className="animate-fade-in">
        <LiveChatbot />
      </div>
    </DashboardLayout>
  );
};