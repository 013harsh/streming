import React from 'react'
import { useForm } from 'react-hook-form'
import { ShipWheel, User, Mail, Lock } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../lib/api';

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const queryClient = useQueryClient()

    const {mutate:signUpMutation, isPending, error} = useMutation({
        mutationFn: signUp,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]})
    })

    const registerformhandler = (data) => {
        console.log(data);
        signUpMutation(data);
    };
    return (
        <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
            <div className='border border-primary/25 flex flex-col md:flex-row w-full max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
                {/* Illustration - hidden on mobile */}
                <div className='hidden md:flex w-1/2 items-center justify-center bg-base-200'>
                    <img src='/video-call-bro.svg' alt="Sign up illustration" className='max-w-xs w-full'/>
                </div>
                {/* Form Section */}
                <div className='w-full md:w-1/2 p-8 flex flex-col'>
                    {/* logo */}
                    <div className='mb-4 flex items-center justify-start gap-2'>
                        <ShipWheel className='size-9 text-primary' />
                        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamify</span>
                    </div>
                    {/* heading */}
                    <h2 className='text-2xl font-bold text-primary mb-1'>Create an Account</h2>
                    <p className='text-base-content/70 mb-6'>Join LangConnect and start your language learning journey</p>
                    {/* signup form */}
                    <form onSubmit={handleSubmit(registerformhandler)} className='space-y-4'>
                        {/* Full Name */}
                        <div>
                            <label className='block mb-1 font-medium'>Full Name</label>
                            <div className='relative'>
                                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10'><User size={18}/></span>
                                <input
                                    type='text'
                                    placeholder='John Doe'
                                    className={`input input-bordered w-full bg-base-200 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/70 ${errors.fullName ? 'input-error' : ''}`}
                                    style={{position: 'relative', zIndex: 1}}
                                    {...register('fullName', { required: 'Full Name is required' })}
                                />
                            </div>
                            {errors.fullName && <span className='text-error text-xs'>{errors.fullName.message}</span>}
                        </div>
                        {/* Email */}
                        <div>
                            <label className='block mb-1 font-medium'>Email</label>
                            <div className='relative'>
                                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10'><Mail size={18}/></span>
                                <input
                                    type='email'
                                    placeholder='hello@example.com'
                                    className={`input input-bordered w-full bg-base-200 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/70 ${errors.email ? 'input-error' : ''}`}
                                    style={{position: 'relative', zIndex: 1}}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Enter a valid email',
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && <span className='text-error text-xs'>{errors.email.message}</span>}
                        </div>
                        {/* Password */}
                        <div>
                            <label className='block mb-1 font-medium'>Password</label>
                            <div className='relative'>
                                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10'><Lock size={18}/></span>
                                <input
                                    type='password'
                                    placeholder='•••••••'
                                    className={`input input-bordered w-full bg-base-200 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/70 ${errors.password ? 'input-error' : ''}`}
                                    style={{position: 'relative', zIndex: 1}}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters long',
                                        },
                                    })}
                                />
                            </div>
                            <span className='text-xs text-base-content/60'>Password must be at least 6 characters long</span>
                            {errors.password && <span className='text-error text-xs block'>{errors.password.message}</span>}
                        </div>
                        {/* Terms Checkbox */}
                        <div className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                className='checkbox checkbox-sm'
                                {...register('terms', { required: 'You must agree to the terms' })}
                            />
                            <span className='text-xs'>I agree to the <a href='#' className='link link-primary'>terms of service</a> and <a href='#' className='link link-primary'>privacy policy</a></span>
                        </div>
                        {errors.terms && <span className='text-error text-xs'>{errors.terms.message}</span>}
                        {/* Submit Button */}
                        <button type='submit' className='btn btn-primary w-full mt-2'> {isPending ? 'Signing Up...' : 'Create Account'} </button>
                    </form>
                    {/* Sign in link */}
                    <div className='mt-4 text-center text-sm'>
                        Already have an account? <Link to={'/login'} className='link link-success'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage