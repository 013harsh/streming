import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import OnboardingPage from '../pages/OnboardingPage'
import ChatPage from '../pages/ChatPage'
import CallPage from '../pages/CallPage'
import PageLoader from '../components/PageLoader'
import useAuthUser from '../hooks/useAuthUser'
import Layout from '../components/Layout'

const Mainroute = () => {

    const { isLoading, authUser } = useAuthUser();
    const isAuthenticated = Boolean(authUser)
    const isOnboarded = authUser?.isOnboarded

    if (isLoading) return <PageLoader />
    return (
        <>
            <Routes>
                <Route path='/' element={isAuthenticated && isOnboarded ? (
                    <Layout showSidebar>
                        <HomePage />
                    </Layout>
                ) : (
                    <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )} />

                <Route path='login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={
                    isOnboarded ? '/' : '/onboarding'} />} />

                <Route path='signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={
                    isOnboarded ? '/' : '/onboarding'}
                />} />

                <Route path='notification' element={isAuthenticated && isOnboarded ? (
                    <Layout showSidebar={true} >
                        <NotificationPage />
                    </Layout>
                ) : (
                    <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )} />

                <Route path='onboarding' element={isAuthenticated ? (
                    !isOnboarded ? (
                        <OnboardingPage />
                    ) : (
                        <Navigate to='/' />
                    )
                ) : (<Navigate to='/login' />)} />

                <Route path='chat/:id' element={isAuthenticated && isOnboarded ? (
                    <Layout showSidebar={false} >
                        <ChatPage />
                    </Layout>
                ):(
                    <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )} />

                <Route path='call/:id' element={isAuthenticated && isOnboarded ? (
                    <CallPage />
                ) : (<Navigate to={!isAuthenticated? "/login" : "/onboarding"}/>
                )} />
            </Routes>
        </>
    )
}

export default Mainroute

// showSiddebar = showSidebar = {true}