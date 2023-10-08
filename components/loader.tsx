import Image from 'next/image';

export const Loader = () => {
  return ( 
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='w-10 h-10 relative animate-spin'>
        <Image
          alt='logo'
          fill
          src='/logo.png'
        />
      </div>
      <p className='text-sm text-muted-foreground'>
        AI 챗봇이 답변을 만드는 중 입니다...
      </p>
    </div>
  );
};
