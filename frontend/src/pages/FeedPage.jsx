import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, CircularProgress, Alert, Box } from '@mui/material';
import postService from '../services/postService';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // New state for pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // We use a ref to attach the observer to the last element
  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      // If the last element is visible and we have more posts to load
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1); // Load the next page
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // useEffect to fetch posts whenever the page number changes
  useEffect(() => {
    setLoading(true);
    setError('');
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts(page);
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
        setHasMore(data.currentPage < data.totalPages);
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]); // This effect runs on initial load and whenever 'page' changes

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Container maxWidth="md">
      <CreatePost onPostCreated={handlePostCreated} />
      {error && <Alert severity="error">{error}</Alert>}
      {posts.map((post, index) => {
        // If this is the last post, attach the ref to it
        if (posts.length === index + 1) {
          return <div ref={lastPostElementRef} key={post._id}><Post post={post} /></div>;
        } else {
          return <Post key={post._id} post={post} />;
        }
      })}
      {/* Show a loading spinner at the bottom while fetching more posts */}
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>}
      {/* Show a message when all posts have been loaded */}
      {!hasMore && <Alert severity="info" sx={{ mt: 2 }}>You have reached the end of the feed.</Alert>}
    </Container>
  );
};

export default FeedPage;

