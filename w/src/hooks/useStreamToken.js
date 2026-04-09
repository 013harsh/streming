import React from 'react'
import { getStreamToken } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

const useStreamToken = (authUser) => {
    return useQuery({
        queryKey:["streamToken"],
        queryFn: getStreamToken,
        enabled: !!authUser  //this will run only when authUser is available
    })
}

export default useStreamToken