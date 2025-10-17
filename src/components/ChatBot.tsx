import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: "Hi there! 👋 I'm your AI onboarding companion. I'm here to guide you through your first 30 days and answer any questions you have. How are you feeling about starting your new role?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/relevance-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            message: currentInput,
            conversationId: conversationId 
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`Failed to get response from AI: ${response.status}`);
      }

      const data = await response.json();
      console.log('AI Response:', data);

      // Update conversation ID if provided
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: data.answer || 'I received your message but had trouble generating a response. Please try again.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling Relevance AI:', error);
      const errorResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRefresh = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: "Hi there! 👋 I'm your AI onboarding companion. I'm here to guide you through your first 30 days and answer any questions you have. How are you feeling about starting your new role?",
        timestamp: new Date()
      }
    ]);
    setConversationId(null);
    setInputMessage('');
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <Bot className="chatbot-icon" size={24} />
          <div>
            <h3>AI Onboarding Companion</h3>
            <span className="chatbot-status">Online</span>
          </div>
        </div>
        <button 
          onClick={handleRefresh}
          className="refresh-button"
          title="Start new conversation"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className="message-content">
              <div className="message-text">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="message-avatar">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your onboarding..."
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          className="send-button"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
