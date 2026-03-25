import { Resend } from 'resend';
import { SubmitPayload } from '@/types';
import { budgetLabels } from './questions';

const STATUS_EMOJI: Record<string, string> = {
  kritis: '🔴',
  berkembang: '🟡',
  kuat: '🟢',
};

const TIER_EMOJI: Record<string, string> = {
  pemula: '🔴',
  berkembang: '🟡',
  siap: '🟢',
  mahir: '🔵',
};

const TRACK_LABEL: Record<string, string> = {
  fix: 'Fix Track — Ada gap kritis yang perlu diselesaikan',
  optimize: 'Optimize Track — Fondasi bagus, butuh optimasi',
  scale: 'Scale Track — Siap untuk scaling',
};

export async function sendLeadNotification(payload: SubmitPayload): Promise<void> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!notificationEmail) throw new Error('NOTIFICATION_EMAIL not set');

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { contact, result, budgetAnswer } = payload;
  const budgetLabel = budgetLabels[budgetAnswer] ?? budgetAnswer;

  const dimensionRows = result.dimensions
    .map(
      (d) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2e2040;">${d.label}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2e2040;text-align:center;font-weight:700;">${d.score}/100</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2e2040;text-align:center;">${STATUS_EMOJI[d.status]} ${d.status.charAt(0).toUpperCase() + d.status.slice(1)}</td>
        </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Lead Baru — KawanBantu Assessment</title>
</head>
<body style="margin:0;padding:0;background:#1a1025;font-family:'Helvetica Neue',Arial,sans-serif;color:#f0ebe8;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2A9E99,#8A59B3);border-radius:16px;padding:32px;margin-bottom:24px;text-align:center;">
      <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:0.8;margin-bottom:8px;">KawanBantu Assessment</div>
      <div style="font-size:28px;font-weight:800;margin-bottom:4px;">Lead Baru Masuk 🎯</div>
      <div style="font-size:14px;opacity:0.85;">${payload.timestamp}</div>
    </div>

    <!-- Contact Info -->
    <div style="background:#231934;border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid #2e2040;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8A59B3;margin-bottom:16px;font-weight:700;">Info Kontak</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#9e98a8;width:120px;">Nama</td><td style="padding:6px 0;font-weight:600;">${contact.name}</td></tr>
        <tr><td style="padding:6px 0;color:#9e98a8;">Organisasi</td><td style="padding:6px 0;font-weight:600;">${contact.ngo}</td></tr>
        <tr><td style="padding:6px 0;color:#9e98a8;">Email</td><td style="padding:6px 0;"><a href="mailto:${contact.email}" style="color:#2A9E99;text-decoration:none;">${contact.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#9e98a8;">Phone</td><td style="padding:6px 0;"><a href="tel:${contact.phone}" style="color:#2A9E99;text-decoration:none;">${contact.phone}</a></td></tr>
        <tr><td style="padding:6px 0;color:#9e98a8;">Anggaran</td><td style="padding:6px 0;">${budgetLabel}</td></tr>
      </table>
    </div>

    <!-- Score Summary -->
    <div style="background:#231934;border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid #2e2040;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8A59B3;margin-bottom:16px;font-weight:700;">Hasil Assessment</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div>
          <div style="font-size:48px;font-weight:800;color:#2A9E99;line-height:1;">${result.overallScore}</div>
          <div style="font-size:13px;color:#9e98a8;">dari 100</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:22px;font-weight:700;">${TIER_EMOJI[result.overallTier]} ${result.overallTier.charAt(0).toUpperCase() + result.overallTier.slice(1)}</div>
          <div style="font-size:13px;color:#9e98a8;margin-top:4px;">${TRACK_LABEL[result.profileTrack]}</div>
        </div>
      </div>
      ${result.rootBottleneck ? `<div style="background:#992C1A22;border:1px solid #992C1A55;border-radius:8px;padding:12px;margin-bottom:8px;font-size:13px;">🔴 <strong>Root Bottleneck:</strong> ${result.rootBottleneck.replace('_', ' ')}</div>` : ''}
      ${result.leveragePoint ? `<div style="background:#2A9E9922;border:1px solid #2A9E9955;border-radius:8px;padding:12px;font-size:13px;">🟢 <strong>Leverage Point:</strong> ${result.leveragePoint.replace('_', ' ')}</div>` : ''}
    </div>

    <!-- Dimension Breakdown -->
    <div style="background:#231934;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #2e2040;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8A59B3;margin-bottom:16px;font-weight:700;">Breakdown per Dimensi</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#2e2040;">
            <th style="padding:10px 12px;text-align:left;color:#9e98a8;font-weight:600;border-radius:6px 0 0 6px;">Dimensi</th>
            <th style="padding:10px 12px;text-align:center;color:#9e98a8;font-weight:600;">Skor</th>
            <th style="padding:10px 12px;text-align:center;color:#9e98a8;font-weight:600;border-radius:0 6px 6px 0;">Status</th>
          </tr>
        </thead>
        <tbody>${dimensionRows}</tbody>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="mailto:${contact.email}" style="display:inline-block;background:linear-gradient(135deg,#2A9E99,#8A59B3);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;">Hubungi ${contact.name} Sekarang</a>
      <div style="margin-top:12px;font-size:12px;color:#6b6478;">Lead ini sudah tersimpan di Google Sheets</div>
    </div>

  </div>
</body>
</html>
  `;

  await resend.emails.send({
    from: 'KawanBantu Assessment <noreply@kawanbantu.com>',
    to: [notificationEmail],
    subject: `🎯 Lead Baru: ${contact.name} — ${contact.ngo} (Skor: ${result.overallScore}/100)`,
    html,
  });
}
