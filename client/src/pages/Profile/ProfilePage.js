import React, { useEffect, useState } from 'react';
import { TbUserSquare } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';

import MainLayout from '../../components/MainLayout';
import {getUserProfile} from '../../services/userServices';

const ProfilePage = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.userInfo);
    const { data: userInfo, isLoading: profileIsLoading, error: profileError } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: user.token });
        },
        queryKey: ['profile']
    })

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    return (
        <MainLayout>
            <section className='container p-5 pb-12'>
                <div className='flex flex-col items-center max-w-sm gap-5 mx-auto'>
                        <div className='flex gap-5'>
                        {userInfo?.avatar ? (
                            <img src={userInfo?.avatar} alt="user image" className='h-auto w-28' />
                        ) : (
                            <TbUserSquare className='h-auto w-28 text-zinc-800' />
                        )}

                        <div className='flex flex-col justify-center gap-1 text-zinc-800'>
                            <p className='flex items-center justify-between gap-3 text-3xl font-semibold'>
                                {userInfo?.name.toUpperCase()}
                                <FaRegEdit onClick={() => navigate('/profile/edit')} className='w-6 h-auto' />
                            </p>
                            <p className='text-lg'>{userInfo?.email}</p>
                        </div>
                    </div>
                </div> 
                <Outlet />
            </section>
        </MainLayout>
    );
}

export default ProfilePage;
