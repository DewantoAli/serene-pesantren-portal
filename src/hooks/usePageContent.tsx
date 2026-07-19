import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

type ContentMap = Record<string, string>;

interface Ctx {
  content: ContentMap;
  loading: boolean;
  t: (key: string, fallback: string) => string;
  refresh: () => Promise<void>;
}

const PageContentContext = createContext<Ctx | null>(null);

export const PageContentProvider = ({ pageKey, children }: { pageKey: string; children: ReactNode }) => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('page_content')
      .select('content_key, value')
      .eq('page_key', pageKey);
    if (!error && data) {
      const map: ContentMap = {};
      data.forEach((r: any) => { map[r.content_key] = r.value; });
      setContent(map);
    }
    setLoading(false);
  }, [pageKey]);

  useEffect(() => { load(); }, [load]);

  const t = useCallback(
    (key: string, fallback: string) => (content[key] && content[key].length > 0 ? content[key] : fallback),
    [content]
  );

  return (
    <PageContentContext.Provider value={{ content, loading, t, refresh: load }}>
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent = () => {
  const ctx = useContext(PageContentContext);
  if (!ctx) {
    // Fallback no-op so components stay safe if provider is missing.
    return {
      content: {} as ContentMap,
      loading: false,
      t: (_k: string, fallback: string) => fallback,
      refresh: async () => {},
    } as Ctx;
  }
  return ctx;
};
