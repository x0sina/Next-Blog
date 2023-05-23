import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useReducerAsync } from "use-reducer-async";
import Router from "next/router";
import http from "@/services/httpService";

const AuthContext = createContext()
const AuthContextDispatcher = createContext()
const asyncActionsHandler = {
    SIGNIN: ({ dispatch }) => async (action) => {
        try {
            dispatch({ type: 'SIGNIN_PENDING' })
            const { data } = await http.post('/user/signin', action.payload, { withCredentials: true })
            toast.success('خوش آمدید')
            dispatch({ type: 'SIGNIN_SUCCESS', payload: data })
            Router.push('/')
        } catch (error) {
            toast.error(error?.response?.data?.message)
            dispatch({ type: 'SIGNIN_REJECT', error: error?.response?.data?.message })
        }
    },
    SIGNUP: ({ dispatch }) => async (action) => {
        try {
            dispatch({ type: 'SIGNUP_PENDING' })
            const { data } = await http.post('/user/signup', action.payload, { withCredentials: true })
            toast.success('با موفقیت ساخته شد.')
            dispatch({ type: 'SIGNUP_SUCCESS', payload: data })
            Router.push('/')
        } catch (error) {
            toast.error(error?.response?.data?.message)
            dispatch({ type: 'SIGNUP_REJECT', error: error?.response?.data?.message })
        }
    },
    LOAD_USER: ({ dispatch }) => async (action) => {
        dispatch({ type: 'SIGNIN_PENDING' })
        try {
            const { data } = await http.get('/user/load', { withCredentials: true })
            dispatch({ type: 'SIGNIN_SUCCESS', payload: data })
        } catch (error) {
            dispatch({ type: 'SIGNIN_REJECT', error: error?.response?.data?.message })
        }
    },
    SIGNOUT: ({ dispatch }) => async (action) => {
        dispatch({ type: 'SIGNOUT_PENDING' })
        try {
            const { data } = await http.get('/user/logout', { withCredentials: true })
            window.location.href = '/'

        } catch (error) {
            toast.error(error?.response?.data?.message)
            dispatch({ type: 'SIGNOUT_REJECT', error: error?.response?.data?.message })
        }
    },
}

const initialState = { user: null, loading: true, error: null }

const reducer = async (state, action) => {
    switch (action.type) {
        case 'SIGNIN_PENDING': return { user: null, error: null, loading: true }
        case 'SIGNIN_SUCCESS': return { user: action.payload, error: null, loading: false }
        case 'SIGNIN_REJECT': return { user: null, error: action.error, loading: false }
        case 'SIGNUP_PENDING': return { user: null, error: null, loading: true }
        case 'SIGNUP_SUCCESS': return { user: action.payload, error: null, loading: false }
        case 'SIGNUP_REJECT': return { user: null, error: action.error, loading: false }
        default: return { ...state }
    }
}

const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducerAsync(reducer, initialState, asyncActionsHandler)
    const [syncUser, setSyncUser] = useState(initialState)

    useEffect(() => {
        dispatch({ type: 'LOAD_USER' })
    }, [])
    useEffect(() => {
        Promise.resolve(user).then((data) => setSyncUser(data))
    }, [user])

    return (
        <AuthContext.Provider value={syncUser}>
            <AuthContextDispatcher.Provider value={dispatch}>
                {children}
            </AuthContextDispatcher.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)
export const useAuthActions = () => useContext(AuthContextDispatcher)