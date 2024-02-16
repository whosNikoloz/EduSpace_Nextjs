"use client";

import MainLayout from "@/app/[lang]/layouts/Mainlayout";
import React, { Key, useState, useEffect } from "react";
import Social from "@/app/api/Social/Post";
import { useInfiniteQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import Styles from "@/styles/loader.module.css";

import CreatePost from "@/components/social/CreatePost";

import SearchSubject from "@/components/social/SearchSubject";

import PostCardSkeleton from "@/components/social/PostCardSkeleton";

const PostCard = React.lazy(() => import("@/components/social/PostCard"));

import { CustomTitle } from "@/components/CustomTitle";
import { Locale } from "@/i18n.config";

export default function SocialPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
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
        <MainLayout lang={lang}>
          <div className="dark:bg-gradient-to-t dark:from-black dark:via-blue-900 dark:to-black ">
            <SearchSubject searchPostFunction={setSearchQuery} />
            <br />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        </MainLayout>
      ) : isError ? (
        <MainLayout lang={lang}>
          <div className="dark:bg-gradient-to-t dark:from-black dark:via-blue-900 dark:to-black">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
              <div className={Styles.Loader}>
                <h1>Failed To Load</h1>
              </div>
            </section>
          </div>
        </MainLayout>
      ) : (
        <MainLayout lang={lang}>
          <div className="dark:bg-gradient-to-t dark:from-black dark:via-blue-900 dark:to-black ">
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
          </div>
        </MainLayout>
      )}
    </>
  );
}
