/**
 * Supabase API Wrapper
 * 
 * Types:
 * - Post: { id: number, title: string, body: string, created_at: string, author_id: string }
 * - Reaction: { id: number, post_id: number, user_id: string, emoji: string }
 * 
 * Relations:
 * - Reaction.post_id -> Post.id
 */

import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// Queries
export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*, reactions(*)')),
});

export const useReactions = () => useQuery({
    queryKey: ['reactions'],
    queryFn: () => fromSupabase(supabase.from('reactions').select('*')),
});

// Mutations
export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useAddReaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newReaction) => fromSupabase(supabase.from('reactions').insert([newReaction])),
        onSuccess: () => {
            queryClient.invalidateQueries('reactions');
        },
    });
};

// Query Client
export const queryClient = new QueryClient();