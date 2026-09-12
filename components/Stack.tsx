"use client";

import { motion } from "framer-motion";

import {
  Target,
  BarChart3,
  Database,
  Activity,
  Search,
  Sparkles,
  Globe,
  ShoppingCart,
  Code2,
  Mail,
  Bot,
} from "lucide-react";


const stack = [

{
name:"Meta Ads",
icon:Target,
description:
"Performance campaigns built to generate qualified leads, increase sales and scale businesses."
},

{
name:"Google Ads",
icon:BarChart3,
description:
"Search and conversion campaigns focused on measurable growth and customer acquisition."
},

{
name:"GA4 Analytics",
icon:Database,
description:
"Advanced analytics setup to track users, conversions and marketing performance."
},

{
name:"Google Tag Manager",
icon:Activity,
description:
"Accurate tracking systems for better campaign measurement and optimization."
},

{
name:"SEO",
icon:Search,
description:
"Organic growth strategies improving visibility, rankings and long-term traffic."
},

{
name:"AEO",
icon:Sparkles,
description:
"Optimizing content for answer engines and AI-powered search experiences."
},

{
name:"AIO",
icon:Globe,
description:
"AI optimization strategies helping brands get discovered across modern platforms."
},

{
name:"Shopify",
icon:ShoppingCart,
description:
"High-converting ecommerce stores designed for better customer experience."
},

{
name:"WordPress",
icon:Code2,
description:
"Fast and scalable websites built around business objectives."
},

{
name:"Next.js",
icon:Code2,
description:
"Modern high-performance websites and applications with better speed."
},

{
name:"Email Marketing",
icon:Mail,
description:
"Automated email systems that nurture leads and improve retention."
},

{
name:"AI Automation",
icon:Bot,
description:
"Smart workflows that reduce manual work and improve business efficiency."
}

];



export default function Stack(){


return (

<section
className="
bg-black
px-6
py-32
relative
overflow-hidden
"
>


{/* Background Glow */}

<div
className="
absolute
top-0
right-0
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
relative
z-10
"
>


{/* Heading */}

<div
className="
text-center
mb-20
"
>


<p
className="
text-red-500
uppercase
tracking-[6px]
text-sm
"
>

Tools & Technology

</p>



<h2
className="
text-white
text-5xl
md:text-6xl
font-bold
mt-5
"
>

My Growth

<span className="text-red-500">
 Stack
</span>

</h2>



<p
className="
text-gray-400
max-w-2xl
mx-auto
mt-6
text-lg
"
>

The platforms, technologies and systems I use to build, track and scale digital growth.

</p>


</div>





{/* Cards */}


<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8
"
>


{
stack.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div

key={item.name}


initial={{
opacity:0,
y:40
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}


transition={{
duration:0.5,
delay:index*0.05
}}


whileHover={{
y:-12
}}



className="
group
relative
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
min-h-[240px]
overflow-hidden
transition-all
duration-500
hover:border-red-500/50
"

>


{/* Hover Glow */}

<div
className="
absolute
inset-0
bg-gradient-to-br
from-red-500/0
via-red-500/0
to-red-500/20
opacity-0
group-hover:opacity-100
transition
duration-500
"
/>



<div
className="
relative
z-10
"
>


<div
className="
w-14
h-14
rounded-2xl
bg-red-500/10
flex
items-center
justify-center
mb-7
group-hover:bg-red-500/20
transition
"
>


<Icon

className="
text-red-500
w-7
h-7
"

/>


</div>





<h3
className="
text-white
font-bold
text-xl
"
>

{item.name}

</h3>




<p
className="
text-gray-400
text-sm
mt-4
leading-7
"
>

{item.description}

</p>



</div>



</motion.div>


)


})

}


</div>



</div>


</section>


)

}