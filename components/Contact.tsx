"use client";

import { useState } from "react";
import { motion } from "framer-motion";


export default function Contact(){


const [loading,setLoading] = useState(false);

const [status,setStatus] = useState("");



async function handleSubmit(e:any){

e.preventDefault();


const form = e.currentTarget;

const formData = new FormData(form);


setLoading(true);
setStatus("");



try{


const response = await fetch("/api/contact",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:formData.get("name"),

email:formData.get("email"),

phone:formData.get("phone"),

company:formData.get("company"),

service:formData.get("service"),

message:formData.get("message")

})

});



if(response.ok){

setStatus("✓ Thank you! Your message has been sent.");

form.reset();

}

else{

setStatus("Something went wrong. Please try again.");

}



}

catch(error){

setStatus("Something went wrong. Please try again.");

}


setLoading(false);


}





return(

<section

id="contact"

className="
bg-black
px-6
py-32
"

>


<div className="
max-w-6xl
mx-auto
">


<div className="
text-center
mb-16
">


<p className="
text-red-500
uppercase
tracking-[6px]
text-sm
">

Contact

</p>


<h2 className="
text-white
text-5xl
md:text-6xl
font-bold
mt-5
">

Let's Build Something

<span className="text-red-500">
 Powerful
</span>

</h2>


<p className="
text-gray-400
mt-6
max-w-2xl
mx-auto
">

Have a project, campaign or business idea?
Let's create a digital system that generates measurable growth.

</p>


</div>





<div className="
grid
lg:grid-cols-2
gap-10
">





{/* FORM */}


<motion.form

onSubmit={handleSubmit}

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

className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
space-y-5
"

>


<input

name="name"

required

placeholder="Your Name"

className="
w-full
bg-black
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-red-500
"

/>



<input

name="email"

required

type="email"

placeholder="Email Address"

className="
w-full
bg-black
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-red-500
"

/>



<input

name="phone"

required

type="tel"

placeholder="Phone Number"

className="
w-full
bg-black
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-red-500
"

/>



<input

name="company"

placeholder="Company / Brand Name"

className="
w-full
bg-black
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-red-500
"

/>





<select

name="service"

required

className="
w-full
bg-black
border
border-white/10
rounded-xl
px-5
py-4
text-gray-400
outline-none
focus:border-red-500
"

>


<option value="">
Select Service Needed
</option>


<option>
Meta Ads
</option>


<option>
Google Ads
</option>


<option>
SEO
</option>


<option>
Website Development
</option>


<option>
Shopify Store
</option>


<option>
AI Automation
</option>


<option>
Analytics & Tracking
</option>


</select>





<textarea

name="message"

required

placeholder="Tell me about your project"

rows={5}

className="
w-full
bg-black
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-red-500
"

/>





<button

type="submit"

disabled={loading}

className="
w-full
bg-red-600
hover:bg-red-700
disabled:opacity-50
text-white
py-4
rounded-xl
font-semibold
transition
"

>

{loading ? "Sending..." : "Send Message"}

</button>




{
status && (

<p className="
text-center
text-green-400
text-sm
">

{status}

</p>

)

}



</motion.form>









{/* CONTACT INFO */}



<motion.div

initial={{
opacity:0,
x:40
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

className="
space-y-6
"

>



<div className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
">


<h3 className="
text-white
text-2xl
font-bold
">

Let's Connect

</h3>


<p className="
text-gray-400
mt-4
">

Discuss your next marketing campaign,
website or growth project.

</p>


<a

href="https://wa.me/923140209996?text=Hi%20Umer,%20I%20want%20to%20discuss%20a%20project."

target="_blank"

rel="noopener noreferrer"

className="
inline-block
mt-6
bg-green-600
text-white
px-7
py-3
rounded-full
font-semibold
"

>

WhatsApp Me

</a>


</div>





<div className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
">


<h3 className="
text-white
text-xl
font-bold
">

Email

</h3>


<a

href="mailto:umer.iftikhar391@gmail.com"

className="
text-gray-400
mt-3
block
hover:text-white
transition
"

>

umer.iftikhar391@gmail.com

</a>


</div>



</motion.div>





</div>


</div>


</section>


)

}