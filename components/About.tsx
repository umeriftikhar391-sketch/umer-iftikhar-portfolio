"use client";

import { motion } from "framer-motion";


export default function About(){


return(

<section

id="about"

className="
bg-black
px-6
py-32
relative
overflow-hidden
"

>


<div
className="
absolute
right-0
top-0
w-[500px]
h-[500px]
bg-red-600/10
blur-[150px]
rounded-full
"
/>




<div

className="
max-w-7xl
mx-auto
grid
lg:grid-cols-2
gap-16
items-center
"

>



{/* LEFT */}


<motion.div


initial={{
opacity:0,
x:-50
}}


whileInView={{
opacity:1,
x:0
}}


viewport={{
once:true
}}


transition={{
duration:.8
}}


>



<p

className="
text-red-500
uppercase
tracking-[6px]
text-sm
mb-6
"

>

About Me

</p>





<h2

className="
text-white
text-5xl
md:text-6xl
font-bold
leading-tight
"

>

Building Digital Systems That Create

<span className="text-red-500">
 Real Growth
</span>

</h2>





<p

className="
text-gray-400
text-lg
leading-8
mt-8
"

>

I help businesses grow through performance marketing,
paid advertising, SEO, analytics and conversion-focused
websites.

</p>





<p

className="
text-gray-400
text-lg
leading-8
mt-5
"

>

My approach goes beyond generating clicks. I focus on
building complete digital systems that attract visitors,
understand customer behaviour and convert traffic into
business results.

</p>





<a

href="#contact"

className="
inline-block
mt-10
bg-red-600
text-white
px-8
py-4
rounded-[14px]
font-semibold
hover:bg-red-700
transition
"

>

View My Experience

</a>



</motion.div>








{/* RIGHT CARD */}



<motion.div


initial={{
opacity:0,
x:50
}}


whileInView={{
opacity:1,
x:0
}}


viewport={{
once:true
}}


transition={{
duration:.8
}}


className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
"

>




<div

className="
space-y-6
"

>




<Card

number="5+"

text="Years Experience"

/>



<Card

number="25+"

text="Projects Completed"

/>



<Card

number="3K+"

text="Leads Generated"

/>



<Card

number="8x"

text="ROAS Growth"

/>



</div>





</motion.div>






</div>


</section>


)

}





function Card({

number,

text

}:{

number:string,

text:string

}){


return(

<div

className="
border
border-white/10
rounded-2xl
p-6
hover:border-red-500/40
transition
"

>


<h3

className="
text-red-500
text-4xl
font-bold
"

>

{number}

</h3>


<p

className="
text-gray-400
mt-2
"

>

{text}

</p>



</div>

)

}