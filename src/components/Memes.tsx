import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import MemeUpload from "./MemeUpload";

interface Meme {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes?: number;
  downvotes?: number;
}

const Memes = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [memes, setMemes] = useState<Meme[]>([]);

  const handleVote = async (memeId: string, voteType: boolean) => {
    try {
      const { error } = await supabase
        .from('meme_votes')
        .insert({
          meme_id: memeId,
          vote_type: voteType
        });

      if (error) throw error;

      // Update local state
      setMemes(prevMemes => 
        prevMemes.map(meme => {
          if (meme.id === memeId) {
            return {
              ...meme,
              upvotes: voteType ? (meme.upvotes || 0) + 1 : meme.upvotes,
              downvotes: !voteType ? (meme.downvotes || 0) + 1 : meme.downvotes
            };
          }
          return meme;
        })
      );

      toast({
        title: "Success!",
        description: `Vote ${voteType ? 'up' : 'down'} recorded`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchMemes = async () => {
    const { data, error } = await supabase
      .from("memes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const formattedMemes = data.map(meme => ({
        id: meme.id,
        image: meme.image_url,
        title: meme.title,
        description: meme.description,
        upvotes: meme.upvotes,
        downvotes: meme.downvotes
      }));
      
      setMemes(formattedMemes);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-cuba-blue/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-patua text-cuba-blue sm:text-4xl md:text-5xl">
            {t('memes.title')}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {t('memes.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {memes.map((meme) => (
            <Card key={meme.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={meme.image}
                    alt={meme.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                    <h3 className="text-white font-patua text-lg">{meme.title}</h3>
                    <p className="text-white/80 text-sm">{meme.description}</p>
                    <div className="flex justify-between mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:text-cuba-blue"
                        onClick={() => handleVote(meme.id, true)}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {meme.upvotes || 0}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:text-cuba-blue"
                        onClick={() => handleVote(meme.id, false)}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {meme.downvotes || 0}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-patua text-cuba-blue text-center mb-8">
            Upload Your Meme
          </h3>
          <MemeUpload onUploadSuccess={fetchMemes} />
        </div>
      </div>
    </section>
  );
};

export default Memes;