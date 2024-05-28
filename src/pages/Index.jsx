import { useState } from "react";
import { Container, VStack, HStack, Text, Box, Button, Textarea, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";
import { usePosts, useAddPost, useAddReaction } from '../integrations/supabase/api';

const Index = () => {
  const { data: posts = [], isLoading, isError } = usePosts();
  const [newPost, setNewPost] = useState("");

  const addPostMutation = useAddPost();
  const addPost = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost, author_id: 'user-id-placeholder' });
      setNewPost("");
    }
  };

  const addReactionMutation = useAddReaction();
  const addReaction = (postId, reaction) => {
    addReactionMutation.mutate({ post_id: postId, user_id: 'user-id-placeholder', emoji: reaction });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading posts.</Text>;

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Box width="100%">
          <Text fontSize="2xl" mb={4}>Public Post Board</Text>
          <Textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            mb={2}
          />
          <Button onClick={addPost} colorScheme="blue" width="100%">Post</Button>
        </Box>
        <VStack spacing={4} width="100%">
          {posts.map((post, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text mb={2}>{post.content}</Text>
              <HStack spacing={4}>
                <HStack>
                  <IconButton
                    aria-label="Thumbs Up"
                    icon={<FaThumbsUp />}
                    onClick={() => addReaction(post.id, "👍")}
                  />
                  <Text>{post.reactions.thumbsUp}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Heart"
                    icon={<FaHeart />}
                    onClick={() => addReaction(post.id, "❤️")}
                  />
                  <Text>{post.reactions.heart}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Laugh"
                    icon={<FaLaugh />}
                    onClick={() => addReaction(post.id, "😂")}
                  />
                  <Text>{post.reactions.laugh}</Text>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;