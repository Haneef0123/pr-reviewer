import React from 'react';

interface FrameLayoutProps {
  children: React.ReactNode;
}

const CornerSVG = ({ className }: { className?: string }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* This path creates the inverted curve. 
        It fills the square 40x40 area with the frame color (dark),
        except for a circle segment that reveals the canvas color (light) underneath 
        OR we draw the frame color shape that has a "bite" taken out of it.
        
        Actually, to get the "inverted" look:
        We want the corner to be filled with the BACKGROUND color (Dark),
        but have a curve that matches the border radius of the inner container.
    */}
    <path
      d="M0 0H40V40C40 17.9086 22.0914 0 0 0Z"
      fill="#111111" 
    />
  </svg>
);

export default function FrameLayout({ children }: FrameLayoutProps) {
  return (
    <div className="relative w-screen h-screen bg-[#111111] p-4 md:p-8 flex flex-col overflow-hidden">
      {/* Top Navigation (Floating in the frame or inside canvas? 
          Design shows it inside the canvas usually, but let's put a header in the frame if needed.
          Actually, the reference has the header INSIDE the light area or floating on top.
          Let's make the main canvas.
      */}
      
      {/* The Light Canvas */}
      <div className="relative flex-1 bg-[#F9F8F4] rounded-[40px] w-full h-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* 
           The "Inverted Corner" trick:
           If we just use `rounded-[40px]`, we get normal rounded corners.
           The reference shows the frame "flowing" into the corners.
           Actually, standard border-radius on the white container against the black background 
           ALREADY gives the look of the black frame having inverted corners pointing INWARD to the content.
           
           Wait, looking at the reference "FYNSEC":
           The black frame surrounds the white content. 
           The white content has rounded corners.
           This NATURALLY creates the shape where the black frame has a "concave" corner relative to the white box.
           
           HOWEVER, sometimes "inverted corners" means the white box has corners that flare OUT.
           Let's re-examine the "FYNSEC" image mentally.
           The image shows a standard rounded rectangle white card on a black background.
           BUT, there is a specific detail: "The corners where the dark frame meets the light container should have smooth, deep inverted curves".
           
           If the user means the *Frame* itself has some shape, like a notch?
           The reference image shows a top-left "FYNSEC" logo in the BLACK area.
           The white area starts AFTER that.
           And there is a "Let's Connect" button in the top right BLACK area.
           So the White Area is a "Card" floating in the middle.
           
           BUT, looking closely at the top edge of the white card in the reference:
           It's not just a rectangle. It has a "Tab" shape or the black header "dips" down?
           Actually, looking at the generated mockups I made (which the user liked):
           I generated a "Frame & Canvas" look.
           The simplest and most premium version of this is a large card with large border-radius.
           
           Let's stick to a large `rounded-[40px]` or `rounded-[60px]` container.
           This is the cleanest implementation of "Inverted Corners" from the perspective of the *Frame* (the negative space).
        */}
        
        {children}
      </div>
    </div>
  );
}
