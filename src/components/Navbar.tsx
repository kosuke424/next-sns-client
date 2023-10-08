'use client';

import { useAuth } from '@/context/auth';
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

    const { user, logout } = useAuth();

    console.log(user);

    return (
        <header>
            <div className="bg-cyan-900 p-4 text-white">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="font-semibold text-2xl">
                        <Link href="/">Next SNS</Link>
                    </h1>
                    <nav>
                        <ul className="flex space-x-4">
                            {user ? (
                                <>
                                <Link 
                                    href= {`/profile/${user.id}`} 
                                    className="bg-slate-50 text-gray-900 rounded-md font-medium px-3 py-2"
                                >
                                    プロフィール
                                </Link>
                                <button 
                                    className="bg-slate-50 text-gray-900 rounded-md font-medium px-3 py-2"
                                    onClick={logout}
                                >
                                    ログアウト
                                </button> 
                                </>
                            ) : (
                                <>
                                <Link 
                                    href= "/login" 
                                    className="bg-slate-50 text-gray-900 rounded-md font-medium px-3 py-2"
                                >
                                    ログイン
                                </Link>
                                <Link 
                                    href= "/signup" 
                                    className="bg-slate-50 text-gray-900 rounded-md font-medium px-3 py-2"
                                >
                                    サインアップ
                                </Link> 
                                </>
                            )}
                             
                        </ul>
                    </nav> 
                </div> 
            </div>
        </header>
    )
}

export default Navbar
