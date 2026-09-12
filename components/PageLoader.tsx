"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function PageLoader(){

const [loading,setLoading]=useState(true);


useEffect(()=>{


const timer=setTimeout(()=>{

setLoading(false);

},1500);


return()=>clearTimeout(timer);


},[]);



if(!loading) return null;



return(

<motion.div

initial={{
opacity:1
}}

animate={{
opacity:0
}}

transition={{
delay:1.2,
duration:.5
}}

className="
fixed
inset-0
z-[9999]
bg-black
flex
items-center
justify-center
"

>


<div
className="
text-center
"
>


<motion.h1

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.7
}}

className="
text-white
text-6xl
font-bold
"

>

UMER<span className="text-red-500">.</span>

</motion.h1>



<motion.div

initial={{
width:0
}}

animate={{
width:"100%"
}}

transition={{
duration:1
}}

className="
h-[3px]
bg-red-500
mt-6
mx-auto
"

style={{
maxWidth:"120px"
}}

/>


</div>



</motion.div>

)

}