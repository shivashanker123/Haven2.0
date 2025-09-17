import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookText, PlusCircle, Sparkles } from 'lucide-react';

// Define the structure for a journal entry
interface JournalEntry {
  id: number;
  content: string;
  timestamp: string;
  mood?: string; // Optional: for future mood tracking
}

export const JournalPage: React.FC = () => {
  const [newEntry, setNewEntry] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([
    // Sample entry to show how it looks
    {
      id: 1,
      content: "Felt a bit anxious about the upcoming exams today, but I managed to study for a few hours. Practicing the 4-7-8 breathing technique helped me focus.",
      timestamp: new Date(Date.now() - 86400000).toLocaleString(), // Yesterday
      mood: 'Anxious'
    }
  ]);

  const handleSaveEntry = () => {
    if (!newEntry.trim()) return; // Don't save empty entries

    const newJournalEntry: JournalEntry = {
      id: Date.now(),
      content: newEntry,
      timestamp: new Date().toLocaleString(),
    };

    setEntries([newJournalEntry, ...entries]); // Add new entry to the top of the list
    setNewEntry(''); // Clear the textarea
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">My Wellness Journal</h1>
          <p className="text-muted-foreground mt-2">
            A private space to reflect, process your thoughts, and track your journey.
          </p>
        </div>

        {/* New Entry Card */}
        <Card className="glass-card border-0 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="text-wellness-serene" />
              Create a New Entry
            </CardTitle>
            <CardDescription>What's on your mind today?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write about your day, your feelings, or anything that comes to mind..."
              className="min-h-[150px] bg-background/50 text-base"
            />
            <Button onClick={handleSaveEntry} className="w-full sm:w-auto">
              Save Entry
            </Button>
          </CardContent>
        </Card>

        {/* Past Entries */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookText />
            Past Entries
          </h2>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <Card key={entry.id} className="glass-card border-0">
                <CardContent className="pt-6">
                  <p className="text-foreground/90 whitespace-pre-wrap">{entry.content}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    {entry.timestamp}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="mx-auto h-12 w-12 mb-4" />
              <p>Your journal is empty.</p>
              <p>Write your first entry above to get started!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};