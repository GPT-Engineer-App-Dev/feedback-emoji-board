import { useState } from "react";
import { Container, VStack, HStack, Text, Box, Button, Input, Textarea, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { content: newPost, reactions: { thumbsUp: 0, heart: 0, laugh: 0 } }]);
      setNewPost("");
    }
  };

  const addReaction = (index, reaction) => {
    const updatedPosts = [...posts];
    updatedPosts[index].reactions[reaction]++;
    setPosts(updatedPosts);
  };

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
                    onClick={() => addReaction(index, "thumbsUp")}
                  />
                  <Text>{post.reactions.thumbsUp}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Heart"
                    icon={<FaHeart />}
                    onClick={() => addReaction(index, "heart")}
                  />
                  <Text>{post.reactions.heart}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Laugh"
                    icon={<FaLaugh />}
                    onClick={() => addReaction(index, "laugh")}
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