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

export default function SocialPage() {
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
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setIsLoadingMore(false);
        setIsLoadingNewPosts(false);
      }
    }
  }, [data, searchQuery]);

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
    setIsLoadingNewPosts(true);

    try {
      const post = Social();
      const response = await post.GetPosts(pageNumber + 1, 10); // Fetch the next page
      if (response.length === 0) {
        setHasMorePages(false);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
        setPageNumber((prevPage) => prevPage + 1);
        // Restore the scroll position after loading new posts
        window.scrollTo(0, scrollPosition);
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsLoadingNewPosts(false);
    }
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
            <PostCard key={post.postId} postData={post} />
          ))}

          {isLoadingNewPosts && <PostCardSkeleton />}

          <div ref={endOfListRef}></div>
        </>
      )}
    </MainLayout>
  );
}
