"use client";

import { motion } from "framer-motion";


const projects = [

{
category:"Corporate Growth",
title:"Gul Khan Truck Art Corporate",

challenge:
"Build a digital acquisition system to attract corporate buyers looking for customized gifting solutions.",

strategy:
"Managed Meta Ads, Google Ads, SEO and email marketing campaigns focused on B2B lead generation.",

impact:
"Improved brand visibility and created a scalable corporate marketing system.",

tags:[
"Meta Ads",
"Google Ads",
"SEO",
"Email Marketing"
]

},


{
category:"E-commerce Growth",
title:"GulKhan.pk",

challenge:
"Migrate from WordPress to Shopify while protecting SEO rankings and ecommerce performance.",

strategy:
"Executed Shopify migration and optimized the customer shopping experience.",

impact:
"Created a stronger ecommerce foundation for future growth.",

tags:[
"Shopify",
"SEO",
"Ecommerce"
]

},


{
category:"Pet Ecommerce Growth",
title:"PetsInn",

challenge:
"Build online presence and create a scalable customer acquisition system.",

strategy:
"Developed Shopify store, managed Meta Ads and implemented SEO strategy.",

impact:
"Established a complete ecommerce growth system.",

tags:[
"Shopify",
"Meta Ads",
"SEO"
]

},


{
category:"Education Lead Generation",
title:"Building Block Junior & High",

challenge:
"Generate quality admission inquiries from nearby audiences.",

strategy:
"Created targeted Meta Ads campaigns focused on local lead generation.",

impact:
"Generated targeted admission leads through performance marketing.",

tags:[
"Meta Ads",
"Lead Generation"
]

}

];



export default function CaseStudies(){


return(

<section
id="projects"
className="
bg-black
px-6
py-32
"
>


<div
className="
max-w-6xl
mx-auto
"
>



<div className="text-center">


<p
className="
text-red-500
uppercase
tracking-[6px]
text-sm
"
>

Case Studies

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

Selected Growth

<span className="text-red-500">
 Projects
</span>

</h2>



</div>






<div
className="
mt-16
space-y-8
"
>



{
projects.map((project,index)=>(


<motion.div


key={project.title}


initial={{
opacity:0,
y:80
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true,
amount:.2
}}


transition={{
duration:.7,
delay:index*.15
}}


whileHover={{
scale:1.02,
y:-10
}}


className="
group
relative
rounded-3xl
border
border-white/10
bg-white/[0.03]
backdrop-blur-xl
p-10
overflow-hidden
"

>



{/* Hover Glow */}

<div
className="
absolute
inset-0
bg-gradient-to-r
from-red-600/0
via-red-600/10
to-red-600/0
opacity-0
group-hover:opacity-100
transition
duration-700
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
flex
justify-between
items-start
"
>


<div>


<p
className="
text-red-500
text-sm
"
>

{project.category}

</p>



<h3
className="
text-white
text-3xl
font-bold
mt-3
"
>

{project.title}

</h3>


</div>



<motion.span

whileHover={{
rotate:45
}}

className="
text-red-500
text-3xl
"

>

↗

</motion.span>



</div>





<div
className="
grid
md:grid-cols-3
gap-8
mt-10
"
>


<div>

<p className="
text-gray-500
text-sm
">

Challenge

</p>

<p className="
text-gray-300
mt-3
leading-7
">

{project.challenge}

</p>


</div>




<div>

<p className="
text-gray-500
text-sm
">

Strategy

</p>

<p className="
text-gray-300
mt-3
leading-7
">

{project.strategy}

</p>


</div>





<div>

<p className="
text-gray-500
text-sm
">

Impact

</p>

<p className="
text-gray-300
mt-3
leading-7
">

{project.impact}

</p>


</div>



</div>





<div
className="
flex
flex-wrap
gap-3
mt-8
"
>


{
project.tags.map(tag=>(

<span

key={tag}

className="
border
border-white/20
rounded-full
px-4
py-2
text-sm
text-gray-300
"

>

{tag}

</span>

))

}


</div>




<button
className="
mt-8
text-white
border
border-white/20
rounded-full
px-6
py-3
hover:bg-white
hover:text-black
transition
"

>

View Case Study →

</button>




</div>


</motion.div>


))

}



</div>



</div>


</section>


)

}