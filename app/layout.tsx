import type { Metadata } from "next";
import "./globals.css";

import Script from "next/script";

import SmoothScroll from "@/components/SmoothScroll";
import Background from "@/components/Background";


export const metadata: Metadata = {

title: "Umer Iftikhar | Performance Marketing Specialist",

description:
"Performance marketing specialist helping businesses grow through Meta Ads, Google Ads, SEO, analytics, and conversion-focused websites."

};



export default function RootLayout({

children,

}: Readonly<{

children: React.ReactNode;

}>) {


return (

<html lang="en">


<body className="bg-black text-white">


{/* Google Tag Manager */}

<noscript>

<iframe

src="https://www.googletagmanager.com/ns.html?id=GTM-59B6S87"

height="0"

width="0"

style={{

display:"none",

visibility:"hidden"

}}

/>

</noscript>



<Script

id="google-tag-manager"

strategy="afterInteractive"

>

{`

(function(w,d,s,l,i){

w[l]=w[l]||[];

w[l].push({

'gtm.start':

new Date().getTime(),

event:'gtm.js'

});

var f=d.getElementsByTagName(s)[0],

j=d.createElement(s),

dl=l!='dataLayer'?'&l='+l:'';

j.async=true;

j.src=

'https://www.googletagmanager.com/gtm.js?id='+i+dl;

f.parentNode.insertBefore(j,f);

})(window,document,'script','dataLayer','GTM-59B6S87');

`}

</Script>



{/* Animated Background */}

<Background />





{/* Smooth Scroll */}

<SmoothScroll />





{/* Website Content */}

<div className="relative z-10">

{children}

</div>



</body>


</html>

)

}
