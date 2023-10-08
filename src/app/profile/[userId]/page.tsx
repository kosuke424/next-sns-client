import apiClient from '@/lib/apiClient'
import { PostType, Profile } from '@/types';
import React, { useState } from 'react'

type Props = {
    profile: Profile;
    posts: PostType[];
}

const getData = async (userId: string) => {
    try {
        const { data: profile } = await apiClient.get(`/users/profile/${userId}`);
        const { data: posts } = await apiClient.get(`/posts/${userId}`);
        console.log(profile);
        return {profile, posts};

    } catch (err) {
        console.log(err)
    }
}

const UserProfile = async ({ params }: { params: { userId: string } }) => {

    console.log(params.userId);
    const data = await getData(params.userId);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-full max-w-xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                <div className="flex items-center">
                    <img 
                        className="w-20 h-20 rounded-full mr-4"
                        alt="User Avatar"
                        src={data?.profile.profileImageUrl}
                    />
                    <div>
                    <h2 className="text-2xl font-semibold mb-1">
                        {data?.profile.user.username}
                    </h2>
                    <p className="text-gray-600">
                        {data?.profile.bio}
                    </p>
                    </div>
                </div>
                </div>
                {data?.posts.map((post: PostType) => (
                    <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                        <img
                        className="w-10 h-10 rounded-full mr-2" 
                        alt="User Avatar" 
                        src={data?.profile.profileImageUrl}
                        />
                        <div>
                            <h2 className="font-semibold text-md">
                                {post.author.username}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {new Date(post.createdAt).toLocaleString()}
                            </p>
                        </div>
                        </div>
                        <p className="text-gray-700">
                            {post.content}
                        </p>
                    </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default UserProfile
