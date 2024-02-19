"use client";

import LayoutNavbar from "@/app/[lang]/layouts/LayoutNavbar";
import React, { Key, useState, useEffect, useCallback, useMemo } from "react";
import Social from "@/app/api/Social/Post";
import { useInfiniteQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import Styles from "@/styles/loader.module.css";
import CreatePost from "@/components/social/CreatePost";
import SearchSubject from "@/components/social/SearchSubject";
import PostCardSkeleton from "@/components/social/PostCardSkeleton";
import { CustomTitle } from "@/components/CustomTitle";
import { Locale } from "@/i18n.config";

const PostCard = React.lazy(() => import("@/components/social/PostCard"));

const SSRPosts = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const fetchPosts = useCallback(async ({ pageParam = 1 }) => {
    const response = await Social().GetPosts(pageParam, 5);
    return {
      posts: response,
      nextPage: pageParam + 1,
      hasNextPage: response.length > 0,
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery(["posts"], fetchPosts, {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : undefined,
    });

  const [posts, setPosts] = useState<
    Array<{ postId: Key | null | undefined; subject: string }>
  >([]);

  useEffect(() => {
    if (data) {
      setPosts(data.pages.flatMap((page) => page.posts));
    }
  }, [data]);

  const handleDeletePost = (postId: any) => {
    setPosts((oldPosts) => oldPosts.filter((post) => post.postId !== postId));
    toast.success("Successfully deleted");
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    return posts.filter((post) =>
      post.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    const handleScrollMobile = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchmove", handleScrollMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScrollMobile);
    };
  }, [hasNextPage, fetchNextPage, handleScroll]);

  return (
    <>
      <div className="dark:bg-gradient-to-t dark:from-blue-900 dark:to-black ">
        <SearchSubject searchPostFunction={setSearchQuery} />
        <br />
        {isLoading ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : isError ? (
          <div className={Styles.Loader}>
            <h1>Failed To Load</h1>
          </div>
        ) : (
          <>
            <CreatePost setPosts={setPosts} />
            {filteredPosts.map((post: { postId: Key | null | undefined }) => (
              <PostCard
                key={post.postId}
                postData={post}
                onDelete={handleDeletePost}
              />
            ))}
            {!hasNextPage && (
              <CustomTitle
                title1={"End of Posts"}
                title2={searchQuery}
                margin={14}
                direct={"center"}
              />
            )}
            {isFetching && <PostCardSkeleton />}
          </>
        )}
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
};

export default SSRPosts;
