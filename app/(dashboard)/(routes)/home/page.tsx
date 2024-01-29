'use client';

import { FileCode2, MessageSquare, ArrowRight, ImageIcon, VideoIcon, Music, Code, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const tools = [
  {
    label: 'HTML 생성',
    icon: FileCode2,
    href: '/htmlcode',
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'CHAT GPT',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: '이미지 생성',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  // {
  //   label: 'Video Generation',
  //   icon: VideoIcon,
  //   color: 'text-orange-700',
  //   bgColor: 'bg-orange-700/10',
  //   href: '/video',
  // },
  // {
  //   label: 'Music Generation',
  //   icon: Music,
  //   color: 'text-emerald-500',
  //   bgColor: 'bg-emerald-500/10',
  //   href: '/music',
  // },
  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: 'text-green-700',
  //   bgColor: 'bg-green-700/10',
  //   href: '/code',
  // },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          AI 비서 JARVIS
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          JARVIS와 함께 업무를 더욱 효율적으로 진행해보세요.
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className='p-4 border-black/5 flex items-center justifi-between hover:shadow-md transition cursor-pointer'
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('h-8 w-8', tool.color)} />
              </div>
              <div className='font-semibold'>
                {tool.label}
              </div>
            </div>
            <ArrowRight className='w-5 h-5' />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
