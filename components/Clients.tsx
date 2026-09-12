"use client";

import { motion } from "framer-motion";


const brands = [

{
name:"Sputnik",
icon:"👟",
industry:"Footwear Brand",
work:"Built a Shopify ecommerce website for a Pakistani footwear brand and created a strong online shopping experience.",
services:[
"Shopify",
"Ecommerce Development"
],
},


{
name:"PetsInn",
icon:"🐾",
industry:"Pet Food Brand",
work:"Built Shopify store, managed Meta Ads campaigns and SEO strategy to strengthen online presence and generate growth.",
services:[
"Shopify",
"Meta Ads",
"SEO"
],
},


{
name:"Khatkaar",
icon:"✒️",
industry:"Urdu Calligraphy Brand",
work:"Created Shopify store and helped the brand sell products through performance-driven Meta advertising campaigns.",
services:[
"Shopify",
"Meta Ads",
"Ecommerce"
],
},


{
name:"Gul Khan Truck Art Corporate",
icon:"🎁",
industry:"Corporate Gifting",
featured:true,
work:"Managed Meta Ads, Google Ads, SEO and email marketing campaigns to generate high-value business growth.",
services:[
"Meta Ads",
"Google Ads",
"SEO",
"Email Marketing"
],
},


{
name:"GulKhan.pk",
icon:"🛒",
industry:"Truck Art Ecommerce",
work:"Migrated the website from WordPress to Shopify while maintaining SEO rankings and improving ecommerce performance.",
services:[
"Shopify Migration",
"SEO",
"Ecommerce"
],
},


{
name:"Decordreams",
icon:"🛋️",
industry:"Furniture & Interior",
work:"Created a WordPress website and managed digital advertising campaigns to attract furniture buyers.",
services:[
"WordPress",
"Meta Ads",
"Lead Generation"
],
},


{
name:"Building Block Junior & High",
icon:"🎓",
industry:"Education",
work:"Managed Meta Ads campaigns to generate admission leads from targeted audiences in nearby areas.",
services:[
"Meta Ads",
"Lead Generation",
"Local Marketing"
],
},


];



export default function Brands(){


return(

<section
className="
py-32
bg-black
px-6
"
>


<div
className="
max-w-7xl
mx-auto
"
>


<p
className="
text-red-500
uppercase
tracking-[6px]
text-sm
text-center
"
>
Business Growth
</p>



<h2
className="
text-white
text-5xl
md:text-7xl
font-bold
text-center
mt-5
"
>

Brands I Helped

<span className="text-red-500">
 Grow
</span>

</h2>



<p
className="
text-gray-400
max-w-xl
text-center
mx-auto
mt-6
"
>

Businesses I helped through digital marketing,
ecommerce development and performance campaigns.

</p>



<div
className="
grid
md:grid-cols-3
gap-6
mt-16
"
>


{
brands.map((brand)=>(


<motion.div

key={brand.name}

whileHover={{
y:-12,
scale:1.02
}}

transition={{
duration:.3
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
flex
justify-between
items-start
"
>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
w-14
h-14
rounded-2xl
bg-white/5
border
border-white/10
flex
items-center
justify-center
text-3xl
"
>

{brand.icon}

</div>



<h3
className="
text-white
text-xl
font-bold
"
>

{brand.name}

</h3>


</div>



{
brand.featured &&

<span
className="
bg-red-600
text-white
text-xs
px-3
py-1
rounded-full
"
>
Featured
</span>

}


</div>



<p
className="
text-red-500
mt-5
"
>

{brand.industry}

</p>




<p
className="
text-gray-400
mt-5
leading-relaxed
"
>

{brand.work}

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
brand.services.map((service)=>(

<span
key={service}
className="
text-xs
text-gray-300
border
border-white/20
rounded-full
px-3
py-2
"
>

{service}

</span>

))

}


</div>


</div>


</motion.div>


))

}


</div>



</div>


</section>


)

}