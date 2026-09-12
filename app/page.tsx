import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Stack from "@/components/Stack";
import Results from "@/components/Results";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import SectionReveal from "@/components/SectionReveal";
import CustomCursor from "@/components/CustomCursor";
import MagneticButton from "@/components/MagneticButton";

export default function Home(){

return(

<main
className="
relative
min-h-screen
text-white
"
>

<PageLoader />

<CustomCursor />

<Navbar />



<Hero />



<Clients />



<Services />



<CaseStudies />

<Stack />


<Results />


<About />


<Contact />


<Footer />



</main>

)

}