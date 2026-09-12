export default function Footer(){

return(

<footer
className="
bg-black
border-t
border-white/10
px-6
py-16
"
>


<div
className="
max-w-6xl
mx-auto
grid
md:grid-cols-3
gap-12
"
>


{/* Brand */}

<div>


<h2
className="
text-white
text-3xl
font-bold
"
>

Umer
<span className="text-red-500">
.
</span>

</h2>



<p
className="
text-gray-400
mt-5
leading-7
"
>

Performance Marketing Specialist helping businesses grow through paid ads, SEO, analytics and conversion-focused digital systems.

</p>


</div>




{/* Navigation */}

<div>


<h3
className="
text-white
font-semibold
mb-5
"
>
Explore
</h3>


<div
className="
space-y-3
text-gray-400
"
>

<a href="#home" className="block hover:text-white">
Home
</a>

<a href="#about" className="block hover:text-white">
About
</a>

<a href="#services" className="block hover:text-white">
Services
</a>

<a href="#projects" className="block hover:text-white">
Case Studies
</a>


</div>


</div>





{/* Contact */}

<div>


<h3
className="
text-white
font-semibold
mb-5
"
>
Connect
</h3>



<div
className="
space-y-3
text-gray-400
"
>


<a
href="mailto:umer.iftikhar391@gmail.com"
className="block hover:text-white"
>
Email
</a>



<a
href="https://wa.me/923140209996"
className="block hover:text-white"
target="_blank"
>
WhatsApp
</a>



<a
href="#"
className="block hover:text-white"
>
LinkedIn
</a>


</div>


</div>



</div>





<div
className="
max-w-6xl
mx-auto
mt-12
pt-8
border-t
border-white/10
text-gray-500
text-sm
"
>

© {new Date().getFullYear()} Umer Iftikhar. All rights reserved.

</div>



</footer>


)

}