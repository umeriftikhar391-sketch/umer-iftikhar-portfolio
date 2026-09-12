"use client";

import { useEffect } from "react";
import Lenis from "lenis";


export default function SmoothScroll() {


useEffect(() => {


const lenis = new Lenis();


function animation(time:number){

lenis.raf(time);

requestAnimationFrame(animation);

}


requestAnimationFrame(animation);



return () => {

lenis.destroy();

};


}, []);



return null;

}