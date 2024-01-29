'use client';

import { useState, useRef, MouseEvent } from 'react';

interface Item {
  x: number;
  y: number;
}

const DrawPage: React.FC = () => {
  const [item, setItem] = useState<Item>({ x: 0, y: 0 });
  const [clickXY, setClickXY] = useState<Item>({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: MouseEvent) => {
    const initialX = event.clientX;
    const initialY = event.clientY;

    if (event.target === itemRef.current) {
      setActive(true);
      setItem({ x: initialX, y: initialY });
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    setActive(false);
    console.log(clickXY.x, clickXY.y);
    console.log(event.clientX, event.clientY);
    setItem({ x: event.clientX - 288 - clickXY.x , y: event.clientY - 70 - clickXY.y});
  };

  const handleMouseStart = (event: MouseEvent) => {
    setClickXY({ x: event.clientX - 288 - item.x, y: event.clientY - 70 - item.y });
    // if (active) {
    //   const currentX = event.clientX;
    //   const currentY = event.clientY;

    //   setItem({
    //     x: item.x + currentX - item.x,
    //     y: item.y + currentY - item.y,
    //   });
    // }
  };

  const handleMouseClick = (event: MouseEvent) => {
    console.log(event);
    console.log(event.clientX - 288, event.clientY - 70);
  };

  return (
    <div id="outerContainer">
      <div id="container" className='relative w-full h-[400px] bg-[#333]'>
        <div id="item" className='absolute w-[100px] h-[100px] bg-[#00ffff]'
          style={{ left: `${item.x}px`, top: `${item.y}px`, cursor: 'move' }}
          draggable={true}
          onDragEnd={handleMouseUp}
          onDragStart={handleMouseStart}
        >
          Drag me!
        </div>
      </div>
    </div>
  );
}

export default DrawPage;
