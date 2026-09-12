"use client";

import { useEffect } from "react";
import Lenis from "lenis";


export default function SmoothScroll(){

useEffect(()=>{


const isMobile = window.innerWidth < 768;


if(isMobile){
  return;
}


const lenis = new Lenis({

duration:1.1,

smoothWheel:true,

});


function raf(time:number){

lenis.raf(time);

requestAnimationFrame(raf);

}


requestAnimationFrame(raf);



return()=>{

lenis.destroy();

};


},[]);



return null;

}