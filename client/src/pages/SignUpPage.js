import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import MainLayout from '../components/MainLayout'
import { useMutation } from '@tanstack/react-query';
import { signup } from '../services/authServices';
import { setUserInfo } from '../store/reducers/userReducers'

const formItems = [
    {
        id: 'name',
        text: 'Name',
        type: 'text',
        minLength: '1',
        pattern: {
            value: /^[a-z0-9_.-]+$/i,
            message: 'You can only use letters, digits and symbols: _ - .',
        }
    },
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
    {
        id: 'confirmPassword',
        text: 'Confirm Password',
        type: 'password',
        minLength: 8,
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_-]+$/,
            message: 'Password should contain at least one: [a-z] [A-Z] [0-9]'
        }
    }
]

const FormItemsRenderer = ({item, register, errors, password}) => {
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
                    validate: item.id === 'confirmPassword' ? (value) => {
                        if(value !== password){
                            return 'Passwords do not match'
                        }
                    } : null,
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
 
const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { register, handleSubmit, formState: {errors, isValid}, watch} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange'
    })

    const {mutate, isLoading} = useMutation({
        mutationFn: ({name, email, password}) => {
            return signup({name, email, password});
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

    const password = watch('password');

    const submitHandler = (data) => {
        const {name, email, password} = data;
        mutate({name, email, password});
    }

  return (
    <MainLayout>
        <section className='container'>
            <div className='flex flex-col w-full max-w-sm mx-auto mt-10'>
                <h1 className='self-center text-xl font-semibold text-zinc-800'>Sign Up</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {formItems.map((item, index) => (
                        <FormItemsRenderer key={index} item={item} register={register} errors={errors} password={password} />
                    ))}
                    <button disabled={!isValid || isLoading} className='disabled:opacity-70 disabled:cursor-not-allowed text-center w-full border-2 border-zinc-800 rounded-md py-2 mt-5 text-lg font-semibold'>REGISTER</button>
                </form>
                <div className='flex gap-2 mt-2 text-md'>
                    <span>Already have an account?</span><Link to='/sign-in' className='text-blue-900'>Sign In</Link>
                </div>
            </div>
        </section>
    </MainLayout>
  )
}

export default SignUpPage
