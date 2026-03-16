import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // In a real production setup, we would use the Resend SDK here:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.contacts.create({
    //   email: email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    // });

    // Newsletter signup processed


    // Simulate success
    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
