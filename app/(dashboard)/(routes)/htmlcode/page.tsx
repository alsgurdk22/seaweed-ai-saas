'use client';

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const HtmlcodePage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    if (!uploadedImage) return;
    // 이미지 객체 생성
      const img = new window.Image();

      // 이미지 로드 완료 시 호출될 콜백 함수
      img.onload = () => {
        setImageWidth(img.width); // 이미지의 너비
        setImageHeight(img.height); // 이미지의 높이
      };

      img.src = uploadedImage;
  }, [uploadedImage]);

  const onDrop = (file: File[]) => {
    setUploadedImage(URL.createObjectURL(file[0]));
    // const imageFile = file[0];
    // const reader = new FileReader();

    // reader.onload = () => {
    //   setUploadedImage(reader.result as string);
    // }
    
    // reader.readAsDataURL(imageFile);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h2 className='mb-5'>이미지 업로드 페이지</h2>

      {/* 드래그 앤 드랍 영역 */}
      <div
        {...getRootProps()}
        className='p-5 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer mb-5'
      >
        <Input {...getInputProps()} />
        <p>이미지를 드래그 앤 드랍 하세요.</p>
      </div>

      {/* 업로드된 이미지 미리보기 */}
      {uploadedImage && (
        <div className='relative w-9/12 mb-5'>
          <Image
            src={uploadedImage}
            alt='업로드된 이미지 미리보기'
            width={imageWidth}
            height={imageHeight}
          />
        </div>
      )}

      {/* 이미지 업로드 버튼 */}
      <button
        onClick={() => {
          toast.success('이미지 업로드 성공!');
        }}
        className='py-3 px-5 bg-blue-500 text-white rounded-lg mb-5'
      >
        이미지 업로드
      </button>
    </div>
  );
}

export default HtmlcodePage;
