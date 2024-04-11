import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactForm {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    hello: "World",
  });
}

export async function POST(request: any): Promise<NextResponse> {
  try {
    const { lastName, firstName, email, phone, message }: ContactForm =
      await request.json();
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_EMAIL_SERVER,
      port: Number(process.env.NEXT_PUBLIC_EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_INFORMATION_ADDRESS,
        pass: process.env.NEXT_PUBLIC_EMAIL_INFORMATION_PWD,
      },
    });

    let emailContent = `
    <h1>Nouveau message de contact</h1>
    <p>Nom : ${lastName}</p>
    <p>Prénom : ${firstName}</p>
    <p>Email : ${email}</p>
    <p>Téléphone : ${phone}</p>
    <p>Message : <br/>${message.replace(/\n/g, "<br>")}</p>
  `;

    transporter.sendMail({
      from: '"Dylan GIL AMARO" <dylan@dga-dev.fr>',
      to: "dylan@dga-dev.fr",
      subject: "Nouveau message de contact",
      html: emailContent,
    });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}
