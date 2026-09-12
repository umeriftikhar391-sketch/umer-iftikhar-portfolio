"use client";

import { motion } from "framer-motion";
import {
Target,
Search,
Code2,
BarChart3,
Mail,
Bot
} from "lucide-react";


const services = [

{
title:"Performance Marketing",
icon:Target,
description:
"Data-driven Meta Ads and Google Ads campaigns designed to generate qualified leads and increase revenue.",
tags:[
"Meta Ads",
"Google Ads",
"Campaign Scaling"
]
},


{
title:"SEO & Search Growth",
icon:Search,
description:
"Building organic visibility through technical SEO, content strategy and search optimization.",
tags:[
"SEO",
"AEO",
"AIO"
]
},


{
title:"Conversion Websites",
icon:Code2,
description:
"Creating high-performance websites focused on user experience, conversions and business goals.",
tags:[
"Shopify",
"WordPress",
"Next.js"
]
},


{
title:"Analytics & Tracking",
icon:BarChart3,
description:
"Setting up accurate tracking systems to understand users and improve marketing decisions.",
tags:[
"GA4",
"GTM",
"Conversion Tracking"
]
},


{
title:"Email Marketing",
icon:Mail,
description:
"Building automated email systems that nurture leads and improve customer retention.",
tags:[
"Automation",
"Email Funnels"
]
},


{
title:"AI Automation",
icon:Bot,
description:
"Using AI-powered workflows to reduce manual tasks and improve business efficiency.",
tags:[
"AI Tools",
"Smart Workflows"
]
}

];



export default function Services(){


return(

<section
id="services"
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
max-w-7xl
mx-auto
"
>



{/* Heading */}

<div
className="
text-center
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

What I Do

</p>



<h2
className="
text-white
text-5xl
md:text-7xl
font-bold
mt-5
"
>

Digital Growth

<span className="text-red-500">
 Systems
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

From attracting visitors to converting them into customers,
I build and optimize complete digital growth systems.

</p>


</div>





{/* Cards */}


<div
className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
mt-16
"
>


{
services.map((service,index)=>{


const Icon = service.icon;


return(


<motion.div


key={service.title}


initial={{
opacity:0,
y:50
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}


transition={{
duration:.6,
delay:index*.1
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
overflow-hidden
"

>



<div
className="
absolute
inset-0
bg-red-600/0
group-hover:bg-red-600/10
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
mb-8
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
text-2xl
font-bold
"
>

{service.title}

</h3>



<p
className="
text-gray-400
mt-4
leading-7
"
>

{service.description}

</p>





<div
className="
flex
flex-wrap
gap-2
mt-6
"
>

{
service.tags.map(tag=>(

<span

key={tag}

className="
text-xs
border
border-white/20
rounded-full
px-3
py-2
text-gray-300
"

>

{tag}

</span>

))

}

</div>




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