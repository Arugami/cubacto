import { useLanguage } from "@/contexts/LanguageContext";
import { useMemes, SortOption } from "@/hooks/memes/useMemes";
import { useChatMemeUpload } from "@/hooks/useChatMemeUpload";
import MemeUpload from "./upload/MemeUpload";
import MemeGrid from "./core/MemeGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoteHandler } from "@/hooks/memes/useVoteHandler";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Memes = () => {
  const { t } = useLanguage();
  const { memes, isLoading, fetchMemes, sortBy, setSortBy } = useMemes();
  const {
    handleVote,
    isVoting,
    userVote
  } = useVoteHandler();
  const { handleMemeCommand } = useChatMemeUpload({
    onUploadSuccess: fetchMemes
  });

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  useEffect(() => {
    // Subscribe to real-time updates for both memes and votes
    const channel = supabase
      .channel('memes-votes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'memes'
        },
        () => {
          fetchMemes();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'meme_votes'
        },
        () => {
          fetchMemes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMemes]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-cuba-blue/5 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-patua text-cuba-blue sm:text-4xl md:text-5xl">
            {t('memes.title')}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {t('memes.subtitle')}
          </p>
        </div>

        <div className="flex justify-end mb-4 px-8">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="most_upvoted">Most Upvoted</SelectItem>
              <SelectItem value="most_downvoted">Most Downvoted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8">
          {!isLoading && (
            <MemeGrid 
              memes={memes} 
              onVote={handleVote}
              userVote={userVote}
              isVoting={isVoting}
            />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <MemeUpload onUploadSuccess={fetchMemes} />
        </div>
      </div>
    </section>
  );
};

export default Memes;