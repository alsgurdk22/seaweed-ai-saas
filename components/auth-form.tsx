'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

const formSchema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
  password: z
    .string()
    .nonempty('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.'),
    // .regex(
    //   /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    //   '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.'
    // ),
});

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/home');
      console.log('인증완료');
    }
  }, [session?.status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitDisabled(true);

    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      console.log(callback);
      if (callback?.error) {
        toast.error('로그인 실패! 이메일과 비밀번호를 확인해주세요.');
      }

      if (callback?.ok) {
        toast.success('로그인 성공!');
        router.push('/home');
      }
    })
    .finally(() => setSubmitDisabled(false));
  };

  return (
    <div className='p-8 bg-background'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder='seaweed@hunet.co.kr' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input type={showPassword ? 'text' : 'password'} placeholder='********' {...field} />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                      <button
                        type='button'
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff className='text-gray-300' /> : <Eye className='text-gray-500' />}
                      </button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Eye className='w-6 h-6 text-violet-500' /> */}
          <Button className='w-full' type='submit' disabled={submitDisabled}>
            로그인
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AuthForm;