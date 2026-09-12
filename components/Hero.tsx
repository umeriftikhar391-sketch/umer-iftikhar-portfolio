"use client";

import { motion, Variants } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";


const textReveal: Variants = {

hidden:{
opacity:0,
y:60
},

show:{
opacity:1,
y:0,

transition:{
duration:0.8,
ease:"easeOut"
}

}

};



export default function Hero(){


return(

<section

id="home"

className="
relative
min-h-screen
flex
items-center
px-5
sm:px-6
overflow-hidden
"

>


<div

className="
max-w-7xl
mx-auto
w-full

grid
grid-cols-1
lg:grid-cols-2

gap-12
lg:gap-16

items-center

pt-32
lg:pt-0
"

>





{/* LEFT SIDE */}


<div>



<motion.p

variants={textReveal}

initial="hidden"

animate="show"

className="
text-red-500
uppercase
tracking-[5px]
sm:tracking-[8px]
text-xs
sm:text-sm
mb-6
sm:mb-8
"

>

Performance Marketing Specialist

</motion.p>







<motion.h1

variants={textReveal}

initial="hidden"

animate="show"

className="
text-white

text-6xl
sm:text-7xl
md:text-[110px]

font-bold

leading-[0.85]

tracking-tight

"

>

Umer

<br/>


<span className="text-red-500">

Iftikhar

</span>


</motion.h1>









<motion.p

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.8,
delay:0.4
}}

className="
mt-8

max-w-xl

text-gray-400

text-base
sm:text-lg

leading-7
sm:leading-8

"

>

I help businesses generate leads and sales through
data-driven advertising, SEO, analytics and
conversion-focused websites.

</motion.p>









<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.8,
delay:0.6
}}

className="
flex

flex-col
sm:flex-row

gap-4

mt-10

"

>



<MagneticButton

href="#contact"

>

Let's Work Together

</MagneticButton>







<a

href="https://wa.me/923140209996?text=Hi%20Umer,%20I%20want%20to%20discuss%20a%20project."

target="_blank"

rel="noopener noreferrer"

className="
px-8
py-4

rounded-[14px]

border
border-white/30

text-white

font-semibold

text-center

hover:bg-white
hover:text-black

transition

"

>

WhatsApp Me

</a>



</motion.div>









{/* STATS */}


<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
duration:0.8,
delay:0.9
}}

className="
flex

flex-wrap

gap-8
sm:gap-12

mt-12
sm:mt-14

"

>


<div>

<h3

className="
text-3xl
font-bold
text-white
"

>

5+

</h3>


<p

className="
text-gray-500
text-sm
"

>

Years Experience

</p>


</div>







<div>

<h3

className="
text-3xl
font-bold
text-white
"

>

25+

</h3>


<p

className="
text-gray-500
text-sm
"

>

Projects Completed

</p>


</div>







<div>

<h3

className="
text-3xl
font-bold
text-white
"

>

3K+

</h3>


<p

className="
text-gray-500
text-sm
"

>

Leads Generated

</p>


</div>




</motion.div>




</div>









{/* RIGHT SIDE */}


<motion.div

initial={{
opacity:0,
scale:0.8
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:1
}}

className="
hidden

lg:flex

justify-center

relative

"

>





<div

className="
w-[350px]

rounded-3xl

border
border-white/10

bg-white/[0.04]

backdrop-blur-xl

p-10

"

>


<p

className="
text-gray-400
text-sm
"

>

Digital Growth System

</p>





<h2

className="
text-white

text-5xl

font-bold

mt-6

leading-tight

"

>

Convert

<br/>

Visitors

<br/>

Into

<br/>

Customers

</h2>



</div>








<div

className="
absolute

top-[-20px]

left-10

bg-white/10

border
border-white/20

rounded-full

px-5
py-2

text-white

text-sm

"

>

Paid Ads

</div>







<div

className="
absolute

right-0

top-40

bg-white/10

border
border-white/20

rounded-full

px-5
py-2

text-white

text-sm

"

>

SEO

</div>








<div

className="
absolute

bottom-10

left-10

bg-white/10

border
border-white/20

rounded-full

px-5
py-2

text-white

text-sm

"

>

Web Strategy

</div>





</motion.div>







</div>


</section>


)

}