import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { login } from '../lib/api';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const queryClient = useQueryClient();
    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: login,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] })
    });

    const loginHandler = (data) => {
        loginMutation(data);
        reset();
    }

    return (
        <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
            <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
            rounded-xl shadow-lg overflow-hidden'>
                {/* Login Form Section (Right) */}
                <div className='w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col'>
                    {/* Logo */}
                    <div className='mb-4 flex items-center justify-start gap-2'>
                        <ShipWheelIcon className='size-9 text-primary' />
                        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r
                        from-primary to-secondary tracking-wider'>
                            Streamify
                        </span>
                    </div>
                    <div className='w-full'>
                        <form onSubmit={handleSubmit(loginHandler)}>
                            <div className='space-y-4'>
                                <div>
                                    <h2 className='text-xl font-semibold'>Welcome Back</h2>
                                    <p className='text-sm opacity-70'>
                                        Sign in to your account to continue your language journey
                                    </p>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    {/* Email */}
                                    <div className='form-control w-full space-y-2'>
                                        <label className='label'>
                                            <span className='label-text'>Email</span>
                                        </label>
                                        <input type="email"
                                            placeholder='hello@example.com'
                                            className='input input-bordered w-full'
                                            {...register('email', { required: "Email is required" })} />
                                        {errors.email && <span className='text-error text-xs'>{errors.email.message}</span>}
                                    </div>

                                    {/* Password */}
                                    <div className='form-control w-full space-y-2'>
                                        <label className='label'><span className='label-text'>Password</span></label>
                                        <input type="password"
                                            placeholder='•••••••'
                                            className='input input-bordered w-full'
                                            {...register('password', { required: "Password is required" })} />
                                        {errors.password && <span className='text-error text-xs'>{errors.password.message}</span>}
                                    </div>
                                    {/* SIgnIn button */}
                                    <button className='btn btn-primary w-full' disabled={isPending}>
                                        {isPending ? (
                                            <><span className='loading loading-spinner loading-xs'>Signing in...</span></>
                                        ): ("Sign In")}
                                    </button>

                                    <div className='text-center mt-4'>
                                        <p className='text-sm'>
                                            Don't have an account? {"  "}<Link to='/signup' className='text-primary underline'>Create One</Link>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Image (left) */}
                <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
                    <div className='max-w-md p-8'>
                        <div className='relative aspect-square max-w-sm mx-auto'>
                            <img className='w-full h-full' src="/video-call-bro.svg" alt="" />
                        </div>
                        <div className='text-center space-y-3 mt-6'>
                            <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
                            <p className='opacity-70'>
                                Practice converstaions, make friend, and improve your language skills together
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage