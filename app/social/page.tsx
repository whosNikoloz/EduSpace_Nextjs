"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { Key, useState, useEffect, useRef } from "react";
const PostCard = React.lazy(() => import("@/components/social/PostCard"));
import CreatePost from "@/components/social/CreatePost";
import SearchSubject from "@/components/social/SearchSubject";
import Social from "../api/Social/Post";
import { useQuery } from "react-query";
import PostCardSkeleton from "@/components/social/PostCardSkeleton";
import { CustomTitle } from "@/components/CustomTitle";
import Alert from "@/components/social/Alert";

export default function SocialPage() {
  const [alert, setAlert] = useState<{
    message: string;
    type: string;
    onClose: () => void;
  } | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState<
    Array<{ postId: Key | null | undefined; subject: string }>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isLoadingNewPosts, setIsLoadingNewPosts] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0); // Store the scroll position

  const fetchPosts = async () => {
    const post = Social();
    const response = await post.GetPosts(pageNumber, 10);
    return response;
  };

  const { data, isLoading, isError } = useQuery(
    ["posts", pageNumber],
    fetchPosts,
    {
      staleTime: 60000,
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
    }
  );

  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setHasMorePages(false);
      } else {
        // Filter out duplicate posts based on their postId
        const uniqueData = data.filter(
          (newPost: { postId: React.Key | null | undefined }) => {
            return !posts.some((post) => post.postId === newPost.postId);
          }
        );

        // Prepend the new unique posts to the existing posts array
        setPosts((prevPosts) => [...uniqueData, ...prevPosts]);
        setIsLoadingMore(false);
        setIsLoadingNewPosts(false);
      }
    }

    // Update the filteredPosts array with the new post
    setSearchQuery(""); // Clear the search query to show all posts
  }, [data]);

  useEffect(() => {
    const pollingInterval = setInterval(async () => {
      const updatedPosts = await fetchPosts(); // Make an API call to get the latest posts
      setPosts(updatedPosts);
    }, 5000); // Polling interval, e.g., every 5 seconds

    return () => {
      clearInterval(pollingInterval); // Clear the interval when the component unmounts
    };
  }, []);

  const filteredPosts = searchQuery
    ? posts.filter((post) =>
        post.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const endOfListRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    setScrollPosition(window.scrollY); // Store the current scroll position

    if (
      endOfListRef.current &&
      window.innerHeight + window.scrollY >= endOfListRef.current.offsetTop &&
      !isLoadingNewPosts && // Only fetch new posts if not already loading
      !isLoadingMore && // Only fetch new posts if not already loading more
      hasMorePages
    ) {
      fetchNewPosts();
    }
  };

  const fetchNewPosts = async () => {
    setIsLoadingMore(true);
    setIsLoadingNewPosts(true);

    try {
      const post = Social();
      const response = await post.GetPosts(pageNumber + 1, 10); // Fetch the next page
      if (response.length === 0) {
        setHasMorePages(false);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
        // Update the posts state with the new posts
        setPosts((prevPosts) => [...prevPosts, ...response]);
        setPageNumber((prevPage) => prevPage + 1);
        // Restore the scroll position after loading new posts
        window.scrollTo(0, scrollPosition);
        console.log("New posts fetched:", response);
        console.log("posts fetched:", filteredPosts);
      }
    } catch (error) {
      // Handle error here and set isError state
      console.error("Error fetching new posts:", error);
    } finally {
      setIsLoadingMore(false);
      setIsLoadingNewPosts(false);
    }
  };

  const handleDeletePost = (postId: Key | null | undefined) => {
    // Remove the deleted post from the posts array
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));

    setAlert({
      message: "Post deleted successfully",
      type: "success",
      onClose: () => setAlert(null),
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoadingNewPosts, isLoadingMore, hasMorePages, scrollPosition]);

  return (
    <MainLayout>
      <SearchSubject searchPostFunction={setSearchQuery} />
      <br />
      <CreatePost setPosts={setPosts} />
      {isLoading ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <>
          {searchQuery && (
            <CustomTitle title1={"გაიფილტრა"} title2={searchQuery} />
          )}
          {filteredPosts.map((post: { postId: Key | null | undefined }) => (
            <PostCard
              key={post.postId}
              postData={post}
              onDelete={handleDeletePost}
            />
          ))}
          {alert && (
            <Alert
              message={"პოსტი წარმატებით წაიშალა"}
              type={"success"}
              onClose={alert.onClose}
            />
          )}
          {isLoadingNewPosts && <PostCardSkeleton />}

          <div ref={endOfListRef}></div>
        </>
      )}
    </MainLayout>
  );
}
