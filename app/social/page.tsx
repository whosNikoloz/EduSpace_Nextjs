"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { Key, useState, useEffect, useRef } from "react";
import Social from "../api/Social/Post";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import Styles from "@/styles/loader.module.css";
import Image from "next/image";
import EduSpace from "@/public/EduSpaceLogo.png";

import CreatePost from "@/components/social/CreatePost";

import SearchSubject from "@/components/social/SearchSubject";

import PostCardSkeleton from "@/components/social/PostCardSkeleton";

const PostCard = React.lazy(() => import("@/components/social/PostCard"));

import { CustomTitle } from "@/components/CustomTitle";

export default function SocialPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [posts, setPosts] = useState<
    Array<{ postId: Key | null | undefined; subject: string }>
  >([]);

  const fetchPosts = async ({ pageParam = 1 }) => {
    const post = Social();
    const response = await post.GetPosts(pageParam, 5);
    return { posts: response, hasNextPage: response.length > 0 };
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery(["posts"], fetchPosts, {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasNextPage) return undefined;
        return pages.length + 1;
      },
    });

  useEffect(() => {
    if (data) {
      setPosts(data.pages.flatMap((page) => page.posts));
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  const handleDeletePost = (postId: any) => {
    setPosts((oldPosts) => oldPosts.filter((post) => post.postId !== postId));

    toast.success("წარმატებით წაიშალა");
  };

  const filteredPosts = searchQuery
    ? posts.filter((post) =>
        post.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <>
      {isLoading ? (
        <MainLayout>
          <SearchSubject searchPostFunction={setSearchQuery} />
          <br />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </MainLayout>
      ) : isError ? (
        <MainLayout>
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
            <div className={Styles.Loader}>
              <h1>Failed To Load</h1>
            </div>
          </section>
        </MainLayout>
      ) : (
        <MainLayout>
          <SearchSubject searchPostFunction={setSearchQuery} />
          <br />
          <CreatePost setPosts={setPosts} />
          <>
            {searchQuery && (
              <CustomTitle
                title1={"გაიფილტრა"}
                title2={searchQuery}
                margin={14}
                direct={"center"}
              />
            )}
            {filteredPosts.map((post: { postId: Key | null | undefined }) => (
              <PostCard
                key={post.postId}
                postData={post}
                onDelete={handleDeletePost}
              />
            ))}
            {!hasNextPage && (
              <CustomTitle
                title1={"ვსო"}
                title2={searchQuery}
                margin={14}
                direct={"center"}
              />
            )}
            <Toaster position="bottom-left" reverseOrder={false} />
            {isFetching && <PostCardSkeleton />}
          </>
        </MainLayout>
      )}
    </>
  );
}
