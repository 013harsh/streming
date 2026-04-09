import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useForm, } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';

const OnboardingPage = () => {
    const { authUser } = useAuthUser();
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            fullName: authUser?.fullName || "",
            profilePic: authUser?.profilePic || "",
            bio: authUser?.bio || "",
            nativeLanguage: authUser?.nativeLanguage || "",
            learningLanguage: authUser?.learningLanguage || "",
            location: authUser?.location || "",

        }
    });

    const queryClient = useQueryClient()

    const { mutate: onboardingMutation, isPending } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success("Profile onboarded successfully!");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });
    const onBoardingHandler = (data) => {
        onboardingMutation(data)
        reset();
    }

    const handleRandomAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
        setValue('profilePic', randomAvatar)
    }

    return (
        <div className='min-h-screen w-full bg-base-100 flex items-center justify-center p-4'>
            <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
                <div className='card-body p-6 sm:p-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
                    <form onSubmit={handleSubmit(onBoardingHandler)} className='space-y-6'>
                        <div className='flex flex-col items-center justify-center space-y-4'>
                            {/* profile pic review */}
                            <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                                {authUser?.profilePic ? (
                                    <img src={watch('profilePic')}
                                        alt="Profile Pic"
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <div className='flex items-center justify-center h-full'>
                                        <CameraIcon className='size-12 text-base-content opacity-40' />
                                    </div>
                                )}
                            </div>
                            {/* Generate Random Avatar Button */}
                            <div className='flex items-center gap-2'>
                                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                                    <ShuffleIcon className='size-4 mr-2' />
                                    Generate Random Avatar
                                </button>
                            </div>
                        </div>
                        {/* FullName */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Full Name</span>
                            </label>
                            <input type="text"
                                name='fullName'
                                className='input input-bordered w-full'
                                placeholder='Your full name'
                                {...register('fullName', { required: 'FullName is required' })} />
                            {errors.fullName && <span className="text-error text-xs">{errors.fullName.message}</span>}
                        </div>
                        {/* Bio */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Bio</span>
                            </label>
                            <textarea name="bio"
                                className='textarea textarea-bordered w-full h-24'
                                placeholder='Tell others about yourself and your language learning goal'
                                {...register('bio', { required: 'Bio is Required' })}
                            />
                            {errors.bio && <span className='text-error text-xs'>{errors.bio.message}</span>}
                        </div>
                        {/* Languages */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* Native Language */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Native Language</span>
                                </label>
                                <select name="nativeLanguage"
                                    className='select select-bordered w-full'
                                    {...register('nativeLanguage', { required: "NativeLanguage is required" })}>
                                    <option value="">Select your native language</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`native-${lang}`} value={lang.toLocaleLowerCase()}> {lang} </option>
                                    ))}
                                </select>
                                {errors.nativeLanguage && <span className='text-error text-xs'>{errors.nativeLanguage.message}</span>}
                            </div>

                            {/* Learning Language */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Learning Language</span>
                                </label>
                                <select name="nativeLanguage"
                                    className='select select-bordered w-full'
                                    {...register('learningLanguage', { required: "learningLanguage is required" })}>
                                    <option value="">Select language you're learning</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`native-${lang}`} value={lang.toLocaleLowerCase()}> {lang} </option>
                                    ))}
                                </select>
                                {errors.learningLanguage && <span className='text-error text-xs'>{errors.learningLanguage.message}</span>}
                            </div>
                        </div>
                        {/* location */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Location</span>
                            </label>
                            <div className='relative'>
                                <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70 z-10' />
                                <input type="text"
                                    name='location'
                                    {...register('location', { required: "Location is required" })}
                                    className='input input-bordered w-full pl-10'
                                    placeholder='City, Country' />
                                    {errors.location && <span className='text-error text-xs'>{errors.location.message}</span>}
                            </div>
                        </div>
                        {/* complete onboarding Button*/}
                        <button className='btn btn-primary w-full' disabled={isPending}>
                            {!isPending ? (
                                <>
                                    <ShipWheelIcon className='size-5 mr-2'/>
                                    Complete Onboarding
                                </>
                            ) : (
                                <>
                                    <LoaderIcon className='animate-spin size-5 mr-2'/>
                                    Onboarding...
                                </>
                            )}

                        </button>


                    </form>
                </div>
            </div>

        </div>
    )
}

export default OnboardingPage