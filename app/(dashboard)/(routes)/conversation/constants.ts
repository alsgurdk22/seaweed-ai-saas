import * as z from 'zod';

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: '메시지는 1자 이상 입력해주세요.',
  }),
});
