import { google } from 'googleapis';
import { SubmitPayload } from '@/types';
import { budgetLabels } from './questions';

function getAuth() {
  const credentials = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}'
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
}

export async function appendToSheet(payload: SubmitPayload): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID not set');

  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const { contact, result, budgetAnswer, timestamp } = payload;

  // Build the row
  const row = [
    timestamp,
    contact.name,
    contact.ngo,
    contact.email,
    contact.phone,
    result.overallScore,
    result.overallTier,
    result.profileTrack,
    result.budgetTier,
    budgetLabels[budgetAnswer] ?? budgetAnswer,
    // Per dimension scores
    result.dimensions.find((d) => d.id === 'kredibilitas')?.score ?? 0,
    result.dimensions.find((d) => d.id === 'kredibilitas')?.status ?? '',
    result.dimensions.find((d) => d.id === 'track_record')?.score ?? 0,
    result.dimensions.find((d) => d.id === 'track_record')?.status ?? '',
    result.dimensions.find((d) => d.id === 'narasi')?.score ?? 0,
    result.dimensions.find((d) => d.id === 'narasi')?.status ?? '',
    result.dimensions.find((d) => d.id === 'tim')?.score ?? 0,
    result.dimensions.find((d) => d.id === 'tim')?.status ?? '',
    result.dimensions.find((d) => d.id === 'digital')?.score ?? 0,
    result.dimensions.find((d) => d.id === 'digital')?.status ?? '',
    result.dimensions.find((d) => d.id === 'akses')?.score ?? 0,
    result.dimensions.find((d) => d.id === 'akses')?.status ?? '',
    result.rootBottleneck ?? '-',
    result.leveragePoint ?? '-',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Leads!A:X',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });
}

// Call this once to set up headers in your sheet
export async function ensureSheetHeaders(): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) return;

  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const headers = [
    'Timestamp',
    'Nama',
    'Nama NGO',
    'Email',
    'Phone',
    'Skor Total',
    'Tier',
    'Profile Track',
    'Budget Tier',
    'Budget Label',
    'Kredibilitas Score',
    'Kredibilitas Status',
    'Track Record Score',
    'Track Record Status',
    'Narasi Score',
    'Narasi Status',
    'Tim Score',
    'Tim Status',
    'Digital Score',
    'Digital Status',
    'Akses Score',
    'Akses Status',
    'Root Bottleneck',
    'Leverage Point',
  ];

  // Check if headers already exist
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Leads!A1:X1',
  });

  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Leads!A1:X1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    });
  }
}
