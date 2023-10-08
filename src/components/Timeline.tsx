'use client';

import apiClient from '@/lib/apiClient';
import { PostType } from '@/types';
import React, { useEffect, useState } from 'react';
import Post from './Post';

const Timeline = () => {
    const [postText, setPostText] = useState<string>("");
    const [latestPosts, setLatestPosts] = useState<PostType[]>([])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(postText);

        try {
            const newPost = await apiClient.post("/posts/post", {
                content: postText,
            });
            setLatestPosts((prevPosts) => [newPost.data, ...prevPosts])
            setPostText("");
        } catch (err) {
            alert("ログインしてください。");
        }
    }

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const response = await apiClient.get("posts/get_latest_post");
                setLatestPosts(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchLatestPosts();   
    }, []);

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-4">
                <div className="bg-white shadow-md rounded p-4 mb-4">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full h-24 p-2 border border-gry-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="What's on your mind?"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setPostText(e.target.value)
                            }
                        ></textarea>
                        <button className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold rounded py-2 px-4">
                            投稿
                        </button>
                    </form>
                </div>
                {latestPosts.map((post: PostType) => (
                    <Post key={post.id} post={post}/>
                ))}
            </div>
        </main>
    )
}

export default Timeline
