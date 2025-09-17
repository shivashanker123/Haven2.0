
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Heart, 
  ArrowBigUp, 
  ArrowBigDown, 
  Users, 
  Send,
  UserPlus,
  Loader2
} from 'lucide-react';

// --- Sample Data ---

const communityPosts = [
  { id: 1, author: 'Alex P.', time: '8h ago', title: 'Felt overwhelmed before my exams, but I got through it!', content: 'Just wanted to share that the breathing exercises in the resources section really helped me calm down during a panic attack last week. It gets better!', comments: 12, votes: 45, tag: 'Success Story', tagColor: 'bg-green-500/20 text-green-400' },
  { id: 2, author: 'Jamie L.', time: '1d ago', title: 'How do you all deal with social anxiety at gatherings?', content: 'I have a big family event coming up and I\'m already feeling anxious about it. Any tips on how to manage conversations without feeling drained?', comments: 28, votes: 62, tag: 'Seeking Advice', tagColor: 'bg-blue-500/20 text-blue-400' },
];

const matchedPeers = [
  { name: 'Casey B.', avatar: '/avatars/01.png', issue: 'Exam Stress' },
  { name: 'Riley T.', avatar: '/avatars/02.png', issue: 'Social Anxiety' },
  { name: 'Jordan M.', avatar: '/avatars/03.png', issue: 'Feeling Down' },
];

// --- Main Component ---

export const CommunityPage = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [peers, setPeers] = useState([]);

  const handleFindPeers = () => {
    setIsMatching(true);
    // Simulate a backend matching process
    setTimeout(() => {
      setPeers(matchedPeers);
      setIsMatching(false);
    }, 2000);
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Community & Connections</h1>
        <p className="text-muted-foreground mt-2">
          Share stories in the public forum or connect with a peer privately.
        </p>
      </div>

      <Tabs defaultValue="forum" className="w-full max-w-5xl mx-auto">
        {/* Slider Menu (Tabs Trigger) */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="forum">
            <Users className="w-4 h-4 mr-2" /> Community Forum
          </TabsTrigger>
          <TabsTrigger value="dms">
            <MessageSquare className="w-4 h-4 mr-2" /> Private DMs
          </TabsTrigger>
        </TabsList>

        {/* Reddit-style Community Window */}
        <TabsContent value="forum" className="mt-6">
          <div className="space-y-4">
            {communityPosts.map(post => (
              <Card key={post.id} className="glass-card border-0 flex gap-4 p-4">
                <div className="flex flex-col items-center gap-1 pt-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowBigUp className="w-5 h-5" /></Button>
                  <span className="font-bold text-sm">{post.votes}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowBigDown className="w-5 h-5" /></Button>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    Posted by {post.author} • {post.time}
                  </p>
                  <h3 className="text-lg font-semibold mt-1">{post.title}</h3>
                  <p className="text-sm text-foreground/80 mt-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground">
                      <MessageSquare className="w-4 h-4" /> {post.comments} Comments
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Private DMs Window */}
        <TabsContent value="dms" className="mt-6">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Peer Matching System</CardTitle>
              <CardDescription>
                We can help you connect with another student who has faced similar challenges. This is a safe, private space to chat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!peers.length && (
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                  <p className="mb-4">Click below to find a peer to talk to.</p>
                  <Button onClick={handleFindPeers} disabled={isMatching}>
                    {isMatching ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Matching...</>
                    ) : (
                      <><UserPlus className="w-4 h-4 mr-2" /> Find a Peer</>
                    )}
                  </Button>
                </div>
              )}
              {peers.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-4">We found some peers for you:</h4>
                  <div className="space-y-3">
                    {peers.map(peer => (
                      <div key={peer.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={peer.avatar} />
                            <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{peer.name}</p>
                            <p className="text-xs text-muted-foreground">Shared Experience: {peer.issue}</p>
                          </div>
                        </div>
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-2"/> Chat
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};