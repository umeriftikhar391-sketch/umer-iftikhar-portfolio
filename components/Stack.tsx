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
className="relative overflow-hidden px-5 py-24 sm:px-6 lg:py-32"
>





<div
className="max-w-7xl mx-auto relative z-10"
>


{/* Heading */}

<div
className="mx-auto mb-16 max-w-3xl text-center"
>


<p
className="eyebrow"
>

Tools & Technology

</p>



<h2
className="mt-5 text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink"
>

My Growth

<span className="ml-[0.25em] text-brand">
 Stack
</span>

</h2>



<p
className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-body"
>

The platforms, technologies and systems I use to build, track and scale digital growth.

</p>


</div>





{/* Cards */}


<div
className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
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



className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"

>





<div
className="relative z-10"
>


<div
className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-rose"
>


<Icon

className="h-6 w-6 text-brand-hover"

/>


</div>





<h3
className="text-lg font-bold tracking-tight text-ink"
>

{item.name}

</h3>




<p
className="mt-3 text-[0.9375rem] leading-7 text-body"
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