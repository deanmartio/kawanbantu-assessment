import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet, ensureSheetHeaders } from '@/lib/sheets';
import { sendLeadNotification } from '@/lib/email';
import { SubmitPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const payload: SubmitPayload = await req.json();

    // Validate required fields
    if (
      !payload.contact?.name ||
      !payload.contact?.email ||
      !payload.contact?.ngo ||
      !payload.contact?.phone
    ) {
      return NextResponse.json(
        { error: 'Missing required contact fields' },
        { status: 400 }
      );
    }

    // Run both operations in parallel, don't fail the whole request if one fails
    const results = await Promise.allSettled([
      ensureSheetHeaders().then(() => appendToSheet(payload)),
      sendLeadNotification(payload),
    ]);

    const sheetResult = results[0];
    const emailResult = results[1];

    if (sheetResult.status === 'rejected') {
      console.error('Google Sheets error:', sheetResult.reason);
    }

    if (emailResult.status === 'rejected') {
      console.error('Email error:', emailResult.reason);
    }

    // Still return success to the user even if storage/email had issues
    return NextResponse.json({
      success: true,
      sheetSaved: sheetResult.status === 'fulfilled',
      emailSent: emailResult.status === 'fulfilled',
    });
  } catch (error) {
    console.error('Submit API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
