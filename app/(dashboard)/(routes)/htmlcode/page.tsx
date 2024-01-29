'use client';

import { useEffect, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Stepper from '@/components/stepper';
import { cn } from '@/lib/utils';

const HtmlcodePage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const steps = [
    { label: '이미지 업로드' },
    { label: '링크 영역 추가' },
    { label: 'HTML 코드 생성' },
  ];

  const [linkArea, setLinkArea] = useState<rectangle[]>([]);
  const [rectangles, setRectangles] = useState<rectangle[]>([]);
  const [dragging, setDragging] = useState(null);

  interface rectangle {
    id: number;
    width: number;
    height: number;
    backgroundColor: string;
    margin: string;
    x: number;
    y: number;
  }

  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.addEventListener("mousedown", handleMouseDown);
      div.addEventListener("mousemove", handleMouseMove);
      div.addEventListener("mouseup", handleMouseUp);
    }
  }, []);

  const handleMouseDown = (event: any) => {
    console.log(2);
    console.log(event);
    setX(event.clientX);
    setY(event.clientY);
  };

  const handleMouseMove = (event: any) => {
    console.log(1);
    console.log(event);
    const offsetX = event.clientX - x;
    const offsetY = event.clientY - y;

    if (event.button === 0) {
      // 왼쪽 마우스 버튼으로 드래그하면 크기 조정
      setWidth(width + offsetX);
      setHeight(height + offsetY);
    } else if (event.button === 1) {
      // 가운데 마우스 버튼으로 드래그하면 이동
      setX(x + offsetX);
      setY(y + offsetY);
    }
  };

  const handleMouseUp = () => {
    console.log(3);
  };

  const addArea = () => {
    setLinkArea((prev) => [...prev, { x: 0, y: 0, width: 100, height: 100 } as rectangle]);

    const newRectangle = {
      id: rectangles.length + 1,
      width: 100,
      height: 100,
      backgroundColor: 'red', // 원하는 스타일을 지정하세요
      margin: '10px', // 여백을 원하는 만큼 지정하세요
      x: 100,
      y: 100,
    };

    // 현재의 사각형 목록에 새로운 사각형을 추가
    setRectangles([...rectangles, newRectangle]);
  };

  const handleDragStart = (e: any, id: any) => {
    setDragging(id);
    console.log(dragging);
  };

  // const handleDragOver = (e: any, id: any) => {
  //   if (!dragging) return;
  //   e.preventDefault();

  //   if (dragRect && dropRect) {
  //     const dragRect = rectangles.find((rect) => rect.id === dragging);
  //     const dropRect = rectangles.find((rect) => rect.id === id);
  //     const dragRectIndex = rectangles.indexOf(dragRect);
  //     const dropRectIndex = rectangles.indexOf(dropRect);
  //   }

  //   const newRectangles = [...rectangles];
  //   newRectangles.splice(dragRectIndex, 1);
  //   newRectangles.splice(dropRectIndex, 0, dragRect);
  //   setRectangles(newRectangles);
  // };

  const handleDragEnd = () => {
    setDragging(null);
  };

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
      {/* <Stepper steps={steps} /> */}

      {/* 드래그 앤 드랍 영역 */}
      <div
        {...getRootProps()}
        className='p-5 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer mb-5'
      >
        <Input {...getInputProps()} />
        <p>이미지를 드래그 앤 드랍 하세요.</p>
      </div>

      {/* 링크 영역 추가 버튼 */}
      <button
        className='py-3 px-5 bg-blue-500 text-white rounded-lg mb-5'
        onClick={() => {
          addArea();
        }}
      >
        링크 영역 추가
      </button>

      {/* 생성된 사각형들을 렌더링 */}
      {/* {rectangles.map((rectangle, index) => (
        <div
          key={index}
          style={{
            width: rectangle.width,
            height: rectangle.height,
            backgroundColor: rectangle.backgroundColor,
            margin: rectangle.margin,
          }}
          draggable={true}
            onDragStart={(e) => handleDragStart(e, rectangle.id)}
            onDragOver={(e) => handleDragOver(e, rectangle.id)}
            onDragEnd={handleDragEnd}
        ></div>
      ))} */}

      {/* 업로드된 이미지 미리보기 */}
      {uploadedImage && (
        <div className='relative flex justify-center w-full'>
          {/* <div className='absolute z-[1]'>
            {rectangles.map((rectangle, index) => (
              <div
                key={index}
                style={{
                  width: rectangle.width,
                  height: rectangle.height,
                  backgroundColor: rectangle.backgroundColor,
                  margin: rectangle.margin,
                }}
              ></div>
            ))}
          </div> */}
          <div ref={divRef} className='relative'>
            <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: "black",
          zIndex: 2,
        }}
      ></div>
            <Image
              src={uploadedImage}
              alt='업로드된 이미지 미리보기'
              width={imageWidth}
              height={imageHeight}
              draggable={false}
            />
          </div>
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
