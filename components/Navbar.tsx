"use client";

import { useEffect, useState } from "react";
import MagneticButton from "@/components/MagneticButton";


export default function Navbar(){

const [scrolled,setScrolled] = useState(false);

const [open,setOpen] = useState(false);



useEffect(()=>{


const handleScroll=()=>{

setScrolled(window.scrollY > 50);

};


window.addEventListener(
"scroll",
handleScroll
);



if(open){

document.body.style.overflow="hidden";

}else{

document.body.style.overflow="auto";

}



return()=>{

window.removeEventListener(
"scroll",
handleScroll
);


document.body.style.overflow="auto";

};


},[open]);





const links=[

{
name:"Home",
href:"#home"
},

{
name:"Services",
href:"#services"
},

{
name:"Case Studies",
href:"#projects"
},

{
name:"About",
href:"#about"
},

{
name:"Contact",
href:"#contact"
}

];




return(

<>

<nav

className={`
fixed
top-5
left-1/2
-translate-x-1/2
z-50

w-[92%]
max-w-6xl

rounded-full

px-5
sm:px-8
py-4

transition-all
duration-500

${
scrolled

?

"bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl"

:

"bg-white/5 backdrop-blur-md border border-white/10"

}

`}

>


<div

className="
flex
items-center
justify-between
"

>


<a

href="#home"

className="
text-white
text-2xl
font-bold
"

>

Umer

<span className="text-red-500">
.
</span>


</a>







{/* Desktop Menu */}


<div

className="
hidden
md:flex

items-center

gap-10

text-sm

text-gray-400

"

>


{

links.map(link=>(

<a

key={link.name}

href={link.href}

className="
hover:text-white
transition
"

>

{link.name}

</a>

))

}


</div>







{/* Desktop Button */}


<div className="hidden md:block">


<MagneticButton

href="https://wa.me/923140209996?text=Hi%20Umer,%20I%20want%20to%20discuss%20a%20project."

>

Let's Talk ↗

</MagneticButton>


</div>







{/* Mobile Toggle */}


<button

onClick={()=>setOpen(!open)}

className="
md:hidden

text-white

text-2xl

"

>

{

open

?

"✕"

:

"☰"

}


</button>



</div>



</nav>








{/* Mobile Menu Outside Navbar */}


{

open &&

<div

className="
fixed
inset-0
z-40
bg-black/95
backdrop-blur-xl

pt-28
px-6

md:hidden

"

>


<div

className="
space-y-6
"

>


{

links.map(link=>(

<a

key={link.name}

href={link.href}

onClick={()=>setOpen(false)}

className="
block

text-white

text-2xl

font-semibold

"

>

{link.name}

</a>


))

}



<a

href="https://wa.me/923140209996?text=Hi%20Umer,%20I%20want%20to%20discuss%20a%20project."

target="_blank"

className="
inline-flex

mt-5

bg-red-600

px-8

py-4

rounded-full

text-white

font-semibold

"

>

WhatsApp Me ↗

</a>



</div>



</div>


}



</>

)

}