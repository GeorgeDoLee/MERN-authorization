import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import MainLayout from '../components/MainLayout'
import { useMutation } from '@tanstack/react-query';
import { signin } from '../services/authServices';
import { setUserInfo } from '../store/reducers/userReducers'

const formItems = [
    {
        id: 'email',
        text: 'Email',
        type: 'email',
        minLength: 0,
        pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            message: 'Enter correct email address'
        }
    },
    {
        id: 'password',
        text: 'Password',
        type: 'password',
        minLength: 8,
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_-]+$/,
            message: 'Password should contain at least one: [a-z] [A-Z] [0-9]'
        }
    },
]

const FormItemsRenderer = ({item, register, errors}) => {
    return (  
        <div className='flex flex-col mt-2'>
            <label htmlFor={item.id} className='text-lg text-zinc-800'>{item.text}</label>
            <input 
                type={item.type} 
                {...register(item.id, {
                    pattern: {
                        value: item.pattern.value,
                        message: item.pattern.message,
                    },
                    minLength: {
                        value: item.minLength,
                        message: `${item.text} length must be at least ${item.minLength} characters`
                    },
                    required: {
                        value: true,
                        message: `${item.text} is required`
                    },
                })}
                placeholder={`Enter ${item.text.toLowerCase()}`} 
                className='border mt-2 rounded-md border-zinc-800 p-2 outline-none'
            />
            {errors[item.id]?.message && (
                <p className=' text-md text-red-500'>{errors[item.id].message}</p>
            )}
        </div>
    );
}
const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange'
    })

    const {mutate, isLoading} = useMutation({
        mutationFn: ({email, password}) => {
            return signin({email, password});
        },
        onSuccess: (data) => {
            dispatch(setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    
    useEffect(() => {
        if(userInfo){
            navigate('/');
        }
    })

    const submitHandler = (data) => {
        const {name, email, password} = data;
        mutate({name, email, password});
    }

  return (
    <MainLayout>
        <section className='container'>
            <div className='flex flex-col w-full max-w-sm mx-auto mt-10'>
                <h1 className='self-center text-xl font-semibold text-zinc-800'>Sign In</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {formItems.map((item, index) => (
                        <FormItemsRenderer key={index} item={item} register={register} errors={errors} />
                    ))}
                    <button disabled={!isValid || isLoading} className='disabled:opacity-70 disabled:cursor-not-allowed text-center w-full border-2 border-zinc-800 rounded-md py-2 mt-5 text-lg font-semibold'>SIGN IN</button>
                </form>
                <div className='flex gap-2 mt-2 text-md'>
                    <span>Don't have an account?</span><Link to='/sign-up' className='text-blue-900'>Sign Up</Link>
                </div>
            </div>
        </section>
    </MainLayout>
  )
}

export default SignInPage
