import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, User, MessageSquare, Check, X, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

const AdminMessagesView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error loading messages",
        description: "Failed to load contact messages. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) {
        throw error;
      }

      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );

      toast({
        title: "Message marked as read",
        description: "The message has been marked as read.",
      });
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: "Error updating message",
        description: "Failed to mark message as read.",
        variant: "destructive"
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) {
        throw error;
      }

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      setSelectedMessage(null);

      toast({
        title: "Message deleted",
        description: "The message has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error deleting message",
        description: "Failed to delete the message.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Contact Messages</h1>
              <p className="text-muted-foreground mt-2">
                Manage and respond to contact form submissions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                {unreadCount} unread
              </Badge>
              <Button
                onClick={fetchMessages}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">
                All Messages ({messages.length})
              </h2>
              
              {messages.length === 0 ? (
                <Card className="glass-effect">
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No messages yet</p>
                  </CardContent>
                </Card>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`glass-effect cursor-pointer transition-all duration-200 hover:border-primary/40 ${
                        selectedMessage?.id === message.id ? 'border-primary/60 bg-primary/5' : ''
                      } ${!message.read ? 'border-l-4 border-l-primary' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium">{message.name}</span>
                            {!message.read && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(message.created_at)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {message.email}
                        </p>
                        
                        <h3 className="font-medium mb-2 line-clamp-1">
                          {message.subject}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {message.message}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>

            {/* Message Detail */}
            <div className="lg:sticky lg:top-6">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="glass-effect">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Message Details</CardTitle>
                        <div className="flex gap-2">
                          {!selectedMessage.read && (
                            <Button
                              onClick={() => markAsRead(selectedMessage.id)}
                              size="sm"
                              variant="outline"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteMessage(selectedMessage.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          From
                        </label>
                        <p className="font-medium">{selectedMessage.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedMessage.email}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Subject
                        </label>
                        <p className="font-medium">{selectedMessage.subject}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Message
                        </label>
                        <div className="mt-2 p-4 bg-muted/20 rounded-lg">
                          <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Received
                        </label>
                        <p className="text-sm">{formatDate(selectedMessage.created_at)}</p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button
                          onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                          className="w-full"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Reply via Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card className="glass-effect">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select a message to view details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesView;