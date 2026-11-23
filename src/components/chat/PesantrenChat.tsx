import { useEffect, useMemo, useRef, useState } from 'react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { BookOpen, Loader2, MessageCircle, RotateCcw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInputController,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const CHAT_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/pesantren-chat`;

function isStoredMessageArray(value: Json | null | undefined): value is UIMessage[] {
  if (!Array.isArray(value)) return false;
  return value.every((entry) => {
    if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) return false;
    const candidate = entry as Record<string, Json | undefined>;
    return typeof candidate.id === 'string' &&
      (candidate.role === 'user' || candidate.role === 'assistant') &&
      Array.isArray(candidate.parts);
  });
}

const suggestedQuestions = [
  'Bagaimana cara mendaftar santri baru?',
  'Program apa saja yang tersedia?',
  'Kegiatan santri terbaru apa saja?',
];

const PesantrenChat: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!user) {
      setIsLoadingHistory(false);
      return;
    }

    let cancelled = false;
    const loadHistory = async () => {
      setIsLoadingHistory(true);
      setHistoryError(false);
      const { data, error } = await supabase
        .from('assistant_conversations')
        .select('messages')
        .eq('user_id', user.id)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        setHistoryError(true);
        setInitialMessages([]);
      } else {
        setInitialMessages(isStoredMessageArray(data?.messages) ? data.messages : []);
      }
      setIsLoadingHistory(false);
    };

    void loadHistory();
    return () => {
      cancelled = true;
    };
  }, [user, reloadKey]);

  if (authLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-border bg-card">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Memuat akun" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageCircle size={26} aria-hidden="true" />
        </div>
        <h2 className="mt-5 font-serif text-2xl text-foreground">Masuk atau buat akun calon santri</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Akun diperlukan agar percakapan Anda dapat disimpan dan dibuka kembali. Akun calon santri tidak mendapat peran admin atau editor.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/admin?next=/tanya-pesantren">Masuk</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin?next=/tanya-pesantren&tab=register">Buat Akun Calon Santri</Link>
          </Button>
        </div>
      </Card>
    );
  }

  if (isLoadingHistory) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-border bg-card">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Memuat percakapan" />
      </div>
    );
  }

  if (historyError) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-center sm:p-10">
        <h2 className="font-serif text-2xl text-foreground">Riwayat belum dapat dibuka</h2>
        <p className="mt-3 text-sm text-muted-foreground">Silakan coba kembali sebentar lagi.</p>
        <Button className="mt-5" onClick={() => setReloadKey((value) => value + 1)}>
          Coba Kembali
        </Button>
      </Card>
    );
  }

  return <AssistantConversation key={user.id} userId={user.id} initialMessages={initialMessages} />;
};

const AssistantConversation: React.FC<{
  userId: string;
  initialMessages: UIMessage[];
}> = ({ userId, initialMessages }) => {
  const { textInput } = usePromptInputController();
  const lastSubmittedText = useRef('');
  const transport = useMemo(
    () => new DefaultChatTransport<UIMessage>({
      api: CHAT_FUNCTION_URL,
      headers: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const headers: Record<string, string> = {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        };
        if (session?.access_token) {
          headers.Authorization = `Bearer ${session.access_token}`;
        }
        return headers;
      },
    }),
    [],
  );

  const { messages, sendMessage, setMessages, status, stop, clearError } = useChat<UIMessage>({
    id: `pesantren-${userId}`,
    messages: initialMessages,
    transport,
    onError: (error) => {
      textInput.setInput(lastSubmittedText.current);
      toast.error('Pertanyaan belum terjawab', { description: error.message });
    },
    onFinish: async ({ messages: completedMessages }) => {
      if (completedMessages.length === 0) return;
      const { error } = await supabase
        .from('assistant_conversations')
        .upsert({
          user_id: userId,
          messages: completedMessages as unknown as Json,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) {
        toast.error('Jawaban diterima, tetapi riwayat belum tersimpan.');
      } else {
        lastSubmittedText.current = '';
      }
    },
  });

  const isBusy = status === 'submitted' || status === 'streaming';

  const handleSubmit = ({ text }: { text: string }) => {
    const question = text.trim();
    if (!question || isBusy) return;
    lastSubmittedText.current = question;
    clearError();
    void sendMessage({ text: question });
  };

  const clearConversation = async () => {
    const { error } = await supabase
      .from('assistant_conversations')
      .delete()
      .eq('user_id', userId);
    if (error) {
      toast.error('Riwayat belum berhasil dihapus.');
      return;
    }
    lastSubmittedText.current = '';
    setMessages([]);
    toast.success('Riwayat percakapan dihapus.');
  };

  return (
    <PromptInputProvider>
      <Card className="overflow-hidden border-border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="/lovable-uploads/db67760e-c635-4e65-9a39-90c4444d9ea7.png"
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-contain"
            />
            <div className="min-w-0">
              <h2 className="truncate font-serif text-lg text-foreground">Asisten Irsyadul Haq</h2>
              <p className="text-xs text-muted-foreground">Informasi pendaftaran dan kegiatan</p>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={clearConversation}
                disabled={messages.length === 0 || isBusy}
                aria-label="Hapus riwayat percakapan"
              >
                <Trash2 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Hapus riwayat</p></TooltipContent>
          </Tooltip>
        </div>
        <Separator />

        <Conversation className="h-[min(68vh,720px)] min-h-[360px] bg-background">
          <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-6">
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<BookOpen className="h-8 w-8 text-primary" aria-hidden="true" />}
                title="Assalamu’alaikum, ada yang ingin ditanyakan?"
                description="Tanyakan tentang pendaftaran, program belajar, atau kegiatan santri."
                className="gap-4"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <BookOpen className="h-8 w-8 text-primary" aria-hidden="true" />
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground">Assalamu’alaikum, ada yang ingin ditanyakan?</h3>
                    <p className="text-sm text-muted-foreground">Tanyakan tentang pendaftaran, program belajar, atau kegiatan santri.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedQuestions.map((question) => (
                      <Button
                        key={question}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          lastSubmittedText.current = question;
                          void sendMessage({ text: question });
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </ConversationEmptyState>
            ) : messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts.map((part, index) =>
                    part.type === 'text' && part.text ? (
                      <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))}
            {status === 'submitted' && (
              <div className="px-2 py-1" aria-live="polite">
                <Shimmer className="text-sm">Menyiapkan jawaban…</Shimmer>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton aria-label="Gulir ke pesan terbaru" />
        </Conversation>

        <div className="border-t border-border bg-card p-3 sm:p-4">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea
              aria-label="Tulis pertanyaan Anda"
              autoFocus
              maxLength={4000}
              placeholder="Tulis pertanyaan tentang pesantren…"
              className="min-h-16 max-h-32 px-3"
            />
            <PromptInputFooter className="border-t border-border px-3 py-2">
              <span className="text-xs text-muted-foreground">Enter untuk mengirim, Shift+Enter untuk baris baru</span>
              <PromptInputSubmit
                aria-label={isBusy ? 'Hentikan jawaban' : 'Kirim pertanyaan'}
                status={status}
                disabled={!isBusy && !textInput.value.trim()}
                onStop={stop}
                className="shrink-0"
              />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Riwayat percakapan ini tersimpan di akun Anda.
          </p>
        </div>
      </Card>
    </PromptInputProvider>
  );
};

export default PesantrenChat;