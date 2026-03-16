import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Basic validation — 10-digit Indian mobile
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // ── Resend email notification ──
    // To enable: set RESEND_API_KEY + CONTACT_EMAIL in .env.local
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? 'hello@defendersfitness.in';

    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Defenders Fitness <noreply@defendersfitness.in>',
          to: [toEmail],
          subject: '🎯 New Free Trial Signup!',
          html: `
            <h2>New Free Trial Signup</h2>
            <p><strong>Mobile:</strong> +91${phone}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p>Please call them to schedule their first session.</p>
          `,
        }),
      });
    } else {
      // Development: just log
      console.log('[trial-signup] New signup:', { phone });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[trial-signup] Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
