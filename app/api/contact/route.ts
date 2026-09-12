import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(request: Request){

try{


const data = await request.json();


const {
name,
email,
company,
service,
message

}=data;



const transporter = nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASSWORD

}

});



await transporter.sendMail({

from:process.env.EMAIL_USER,

to:"umer.iftikhar391@gmail.com",

subject:`New Portfolio Lead From ${name}`,

html:`

<h2>New Contact Form Submission</h2>

<p><b>Name:</b> ${name}</p>

<p><b>Email:</b> ${email}</p>

<p><b>Company:</b> ${company}</p>

<p><b>Service:</b> ${service}</p>

<p><b>Message:</b> ${message}</p>

`

});



return NextResponse.json({

success:true

});


}

catch(error){

console.log(error);


return NextResponse.json(

{
success:false
},

{
status:500
}

);


}

}