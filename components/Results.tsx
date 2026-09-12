"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";


const results = [

{
number:25,
suffix:"+",
title:"Projects Completed",
description:
"Helping businesses across ecommerce, education, services and technology grow digitally."
},


{
number:3000,
suffix:"+",
title:"Leads Generated",
description:
"Generated through performance campaigns, targeting and conversion optimization."
},


{
number:8,
suffix:"x",
title:"ROAS Achieved",
description:
"Improving advertising efficiency through data-driven campaign optimization."
},


{
number:360,
suffix:"°",
title:"Growth Approach",
description:
"Combining marketing, technology and analytics to build complete digital systems."
}

];



export default function Results(){


return(

<section

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
left-0
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
relative
z-10
"
>



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

Performance Results

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

Numbers Behind

<span className="text-red-500">
 Growth
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

Results driven by strategy, optimization and data-backed marketing decisions.

</p>


</div>





<div
className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-8
mt-16
"
>


{
results.map((item,index)=>(

<ResultCard

key={item.title}

item={item}

index={index}

/>

))

}


</div>



</div>


</section>


)

}





function ResultCard({
item,
index
}:any){


const {ref,inView}=useInView({

triggerOnce:true,
threshold:.4

});


return(


<motion.div


ref={ref}


initial={{
opacity:0,
y:40
}}


animate={{

opacity:inView?1:0,

y:inView?0:40

}}


transition={{

duration:.6,

delay:index*.1

}}



whileHover={{

y:-10

}}


className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
hover:border-red-500/40
transition
"

>


<h3

className="
text-red-500
text-5xl
font-bold
"

>

{
inView &&

<CountUp

end={item.number}

duration={2}

/>

}

{item.suffix}


</h3>




<h4

className="
text-white
text-xl
font-bold
mt-6
"

>

{item.title}

</h4>




<p

className="
text-gray-400
mt-4
leading-7
"

>

{item.description}

</p>



</motion.div>


)

}