"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function CustomCursor(){

const [position,setPosition] = useState({
x:0,
y:0
});


const [hover,setHover] = useState(false);



useEffect(()=>{


const moveCursor = (e:MouseEvent)=>{

setPosition({
x:e.clientX,
y:e.clientY
});

};



const hoverOn = ()=>setHover(true);

const hoverOff = ()=>setHover(false);



window.addEventListener(
"mousemove",
moveCursor
);


const elements = document.querySelectorAll(
"a,button"
);


elements.forEach((el)=>{

el.addEventListener(
"mouseenter",
hoverOn
);


el.addEventListener(
"mouseleave",
hoverOff
);


});



return()=>{


window.removeEventListener(
"mousemove",
moveCursor
);


};


},[]);



return(

<motion.div

animate={{
x:position.x,
y:position.y,
scale:hover ? 2.5 : 1
}}

transition={{
type:"spring",
stiffness:500,
damping:30
}}

className="
fixed
top-0
left-0
z-[9999]
pointer-events-none
hidden
md:block
"

>


<div
className="
w-5
h-5
rounded-full
bg-red-500
shadow-[0_0_30px_rgba(239,68,68,0.8)]
"
/>



</motion.div>

)

}