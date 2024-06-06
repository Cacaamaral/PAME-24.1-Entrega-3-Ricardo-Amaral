"use client"
import React from 'react'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import Link from 'next/link'

const signUpSchema = z.object({
    name: z.string().min(2, "O nome precisa ter no máximo.").max(50, "O nome pode ter no máximo 50 caracteres.").refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'O nome só pode conter letras.'),
    email: z.string().email("Email precisa ser válido."),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirmPassword: z.string().min(8, "A senha deve ter no mínimo 8 caracteres.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não batem.",
    path: ["confirmPassword"],
});

const Page = () => {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
    })

    function onSubmit(values: z.infer<typeof signUpSchema>) {
        console.log(values)
    }
  return (
    <>
        <div className="bg-[#efaa3d] signUpWrapper">
            <div className="formWrapper">
                <div className="left">
                    <h3 className="title">Bem vindo!</h3>
                    <p>Cadastre-se com as suas informações</p>
                    <Link href={"/signin"}>
                        <Button className='bg-[#9536bd] border-zinc-500 text-zinc-300 hover:border-zinc-200 hover:text-zinc-100 transition-colors border rounded-full px-8'>Login</Button>
                    </Link>
                </div>
                <div className="right">
                    <h3 className='text-center text-2xl font-semibold'>Registre-se aqui</h3>
                    <div className="socialSignUpOptions">
                        <Button variant={"outline"} className='socialFormBtn'><FaGoogle className="h-5 w-5"/></Button>
                        <Button variant={"outline"} className='socialFormBtn'><FaFacebook className="h-5 w-5"/></Button>
                    </div>
                    <p className='text-center'>ou use essa opção</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Afonso Rodrigues" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="afonsor@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Confirme a senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='bg-[#011a38] w-full'>Enviar</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Page