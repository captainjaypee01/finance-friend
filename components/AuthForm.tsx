'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        try {
            console.log(data)
            // Sign up withg Appwrite & create plaid token
            if (type === 'sign-up') {
                // const newUser = await SignUp(data);
                // setUser(newUser);
                // const userData = {
                //     firstName: data?.firstName,
                //     lastName: data?.lastName,
                //     address1: data?.address1,
                //     city: data?.city,
                //     state: data?.state,
                //     postalCode: data?.postalCode,
                //     dateOfBirth: data?.dateOfBirth,
                //     ssn: data?.ssn,
                // }
            }
            if (type === 'sign-in') {
                // const response = await signIn({
                //     email: data.email,
                //     password: data.password,
                // });

                // if(response) router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>

                <Link href={"/"} className='cursor-pointer flex items-center gap-1'>
                    <Image src={"/icons/logo.svg"} width={34} height={34} alt='Finance Logo' />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Finance</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "sign-up" && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            key={'firstName'}
                                            control={form.control}
                                            name={'firstName'}
                                            label={'First name'}
                                            placeholder={'Enter your first name'}
                                        />
                                        <CustomInput
                                            key={'lastName'}
                                            control={form.control}
                                            name={'lastName'}
                                            label={'Last name'}
                                            placeholder={'Enter your last name'}
                                        />
                                    </div>
                                    <CustomInput
                                        key={'address'}
                                        control={form.control}
                                        name={'address1'}
                                        label={'Address'}
                                        placeholder={'Enter your specific address'}
                                    />
                                    <CustomInput
                                        key={'city'}
                                        control={form.control}
                                        name={'city'}
                                        label={'City'}
                                        placeholder={'Enter your city'}
                                    />
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            key={'state'}
                                            control={form.control}
                                            name={'state'}
                                            label={'State'}
                                            placeholder={'Example: NY'}
                                        />
                                        <CustomInput
                                            key={'postalCode'}
                                            control={form.control}
                                            name={'postalCode'}
                                            label={'Postal Code'}
                                            placeholder={'Example: 11101'}
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            key={'dateOfBirth'}
                                            control={form.control}
                                            name={'dateOfBirth'}
                                            label={'Date of Birth'}
                                            placeholder={'YYYY-MM-DD'}
                                        />
                                        <CustomInput
                                            key={'ssn'}
                                            control={form.control}
                                            name={'ssn'}
                                            label={'SSN'}
                                            placeholder={'Example: 1234'}
                                        />
                                    </div>
                                </>
                            )}
                            <CustomInput
                                key={'email'}
                                control={form.control}
                                name={'email'}
                                label={'Email'}
                                placeholder={'Enter your email'}
                            />
                            <CustomInput
                                key={'password'}
                                control={form.control}
                                name={'password'}
                                label={'Password'}
                                placeholder={'Enter your password'}
                            />
                            <div className='flex flex-col gap-4'>
                                <Button type="submit" disabled={isLoading} className='form-btn'>
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                className='animate-spin'
                                            /> &nbsp; Loading...
                                        </>
                                    ) : type === 'sign-in' ?
                                        'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>{type === 'sign-in'
                            ? "Don't have an account?"
                            : "Already have an account"}
                        </p>
                        <Link
                            href={type === "sign-in" ? '/sign-up' : '/sign-in'}
                            className='form-link'
                        >
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm