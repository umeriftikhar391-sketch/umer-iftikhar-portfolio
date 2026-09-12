"use client";

import { motion } from "framer-motion";
import { useRef } from "react";


export default function MagneticButton({

children,
href

}:{

children:React.ReactNode;
href:string;

}){


const ref = useRef<HTMLAnchorElement>(null);



const move=(e:React.MouseEvent)=>{


const button = ref.current;

if(!button) return;


const rect = button.getBoundingClientRect();


const x =
e.clientX - rect.left - rect.width / 2;


const y =
e.clientY - rect.top - rect.height / 2;



button.style.transform =
`translate(${x * 0.15}px, ${y * 0.15}px)`;

};



const leave=()=>{

if(ref.current){

ref.current.style.transform =
"translate(0px,0px)";

}

};



return(

<motion.a

ref={ref}

href={href}

onMouseMove={move}

onMouseLeave={leave}

whileHover={{
scale:1.05
}}

transition={{
type:"spring",
stiffness:300
}}

className="
bg-red-600
text-white
rounded-full
px-6
py-3
text-sm
font-semibold
inline-flex
items-center
justify-center
transition
hover:bg-red-700
"

>

{children}

</motion.a>

)

}