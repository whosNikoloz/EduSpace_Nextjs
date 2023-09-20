"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import { Key, useState, useEffect } from "react";
import PostCard from "@/components/social/PostCard";
import CreatePost from "@/components/social/CreatePost";
import SearchSubject from "@/components/social/SearchSubject";
import Social from "../api/Social/Post";
import { useQuery } from "react-query";
import PostCardSkeleton from "@/components/social/PostCardSkeleton"
import { CustomTitle } from "@/components/CustomTitle";

export default function SocialPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState<
    Array<{ postId: Key | null | undefined; subject: string }>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    const post = Social();
    const response = await post.GetPosts(pageNumber, 10);
    return response;
  };

  // UseQuery hook for fetching posts
  const { data, isLoading, isError, isFetching } = useQuery(
    ["posts", pageNumber],
    fetchPosts,
    {
      staleTime: 60000,
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
    }
  );

  // Update posts state when data changes or searchQuery changes
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data, searchQuery]);

  // Filter posts based on searchQuery
  const filteredPosts = searchQuery
    ? posts.filter((post) =>
        post.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const loadMorePosts = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

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
          {searchQuery && <CustomTitle title1={"გაიფილტრა"} title2={searchQuery} />}
          {filteredPosts.map((post: { postId: Key | null | undefined }) => (
            <PostCard key={post.postId} postData={post} />
          ))}
          {isFetching ? (
            <p>Loading more...</p>
          ) : (
            <button onClick={loadMorePosts}>Load More</button>
          )}
        </>
      )}
    </MainLayout>
  );
}
