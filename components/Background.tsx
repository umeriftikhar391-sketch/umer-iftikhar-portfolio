"use client";

import { motion } from "framer-motion";


export default function Background(){

return (

<div
className="
fixed
inset-0
z-0
overflow-hidden
pointer-events-none
bg-black
"
>


{/* Technical Grid */}

<div

className="
absolute
inset-0

opacity-[0.08]

bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)]

bg-[size:80px_80px]

"

/>





{/* Right Red Glow */}

<motion.div

animate={{

x:[0,60,0],

y:[0,-40,0]

}}

transition={{

duration:12,

repeat:Infinity,

ease:"easeInOut"

}}

className="
absolute

top-[80px]
right-[-250px]

w-[700px]
h-[700px]

rounded-full

bg-red-600/30

blur-[180px]

"

/>






{/* Bottom Red Atmosphere */}

<div

className="
absolute

bottom-[-250px]
left-[20%]

w-[600px]
h-[400px]

rounded-full

bg-red-900/20

blur-[160px]

"

/>







{/* Soft Vignette */}

<div

className="
absolute
inset-0

bg-[radial-gradient(circle_at_center,transparent_20%,black_85%)]

"

/>





{/* Subtle Grain Using CSS */}

<div

className="
absolute
inset-0

opacity-[0.04]

bg-[radial-gradient(circle,rgba(255,255,255,.3)_1px,transparent_1px)]

bg-[size:4px_4px]

"

/>



</div>

)

}