import type { Metadata } from "next";
import "./globals.css";

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


{/* Animated Background */}

<Background />







{/* Website Content */}

<div className="relative z-10">

{children}

</div>



</body>


</html>

)

}