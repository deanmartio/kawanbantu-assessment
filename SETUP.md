# Setup Guide — KawanBantu Fundraising Assessment

Panduan ini menjelaskan cara mengaktifkan Google Sheets, email notifikasi, dan deployment.
Estimasi waktu: 20–30 menit.

---

## Daftar Isi

1. [Clone & Install](#1-clone--install)
2. [Setup Google Sheets](#2-setup-google-sheets)
3. [Setup Resend (Email)](#3-setup-resend-email)
4. [Konfigurasi Environment Variables](#4-konfigurasi-environment-variables)
5. [Update WhatsApp Link di Results Page](#5-update-whatsapp-link)
6. [Jalankan Secara Lokal](#6-jalankan-secara-lokal)
7. [Deploy ke Vercel](#7-deploy-ke-vercel)
8. [Embed ke Website KawanBantu](#8-embed-ke-website-kawanbantu)

---

## 1. Clone & Install

```bash
# Clone atau copy folder ini ke project kamu
cd kawanbantu-assessment

# Install dependencies
npm install
```

---

## 2. Setup Google Sheets

### Langkah 1: Buat Google Sheet baru

1. Buka [sheets.google.com](https://sheets.google.com)
2. Buat spreadsheet baru
3. Rename sheet pertama menjadi **`Leads`** (persis, huruf kapital L)
4. Salin ID spreadsheet dari URL:
   - URL contoh: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit`
   - ID-nya: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`
   - Simpan ID ini untuk langkah selanjutnya

### Langkah 2: Buat Google Cloud Project

1. Buka [console.cloud.google.com](https://console.cloud.google.com)
2. Klik dropdown project di pojok kiri atas → **New Project**
3. Beri nama project (contoh: `kawanbantu-assessment`)
4. Klik **Create**

### Langkah 3: Aktifkan Google Sheets API

1. Di Google Cloud Console, pastikan project yang baru dibuat sudah dipilih
2. Pergi ke **APIs & Services** → **Library**
3. Cari **"Google Sheets API"**
4. Klik dan klik **Enable**

### Langkah 4: Buat Service Account

1. Pergi ke **APIs & Services** → **Credentials**
2. Klik **+ Create Credentials** → **Service Account**
3. Isi:
   - Service account name: `kawanbantu-sheets`
   - Klik **Create and Continue**
   - Di bagian Role, pilih **Basic** → **Editor**
   - Klik **Continue** → **Done**

### Langkah 5: Download JSON Key

1. Di halaman Credentials, klik service account yang baru dibuat
2. Klik tab **Keys**
3. Klik **Add Key** → **Create new key**
4. Pilih **JSON** → **Create**
5. File JSON akan otomatis terdownload. Simpan file ini dengan aman.

### Langkah 6: Beri Akses Service Account ke Google Sheet

1. Buka file JSON yang baru didownload dengan text editor
2. Salin nilai field `client_email` (contoh: `kawanbantu-sheets@your-project.iam.gserviceaccount.com`)
3. Buka Google Sheet yang kamu buat di Langkah 1
4. Klik **Share** (tombol di pojok kanan atas)
5. Paste email service account, beri akses **Editor**
6. Klik **Send**

### Langkah 7: Siapkan nilai env var

Buka file JSON service account dengan text editor. Kamu perlu seluruh isi file ini sebagai satu baris JSON untuk env var.

```bash
# Di terminal, jalankan ini untuk mendapatkan isi file dalam satu baris:
cat /path/to/your-service-account-key.json | tr -d '\n'
```

Salin output-nya. Ini akan menjadi nilai `GOOGLE_SERVICE_ACCOUNT_JSON`.

---

## 3. Setup Resend (Email)

### Langkah 1: Daftar Resend

1. Buka [resend.com](https://resend.com) dan buat akun
2. Verifikasi email kamu

### Langkah 2: Tambahkan domain (opsional tapi direkomendasikan)

1. Di dashboard Resend, klik **Domains** → **Add Domain**
2. Masukkan `kawanbantu.com`
3. Ikuti instruksi untuk menambahkan DNS records
4. Setelah verified, email dari `noreply@kawanbantu.com` akan berfungsi

> Kalau belum mau setup domain, kamu bisa gunakan `onboarding@resend.dev` sebagai sender untuk testing. Update di `lib/email.ts` baris `from:`.

### Langkah 3: Buat API Key

1. Di dashboard Resend, klik **API Keys** → **Create API Key**
2. Beri nama: `kawanbantu-assessment`
3. Permission: **Sending access**
4. Klik **Add** dan salin API key yang muncul (hanya ditampilkan sekali)

---

## 4. Konfigurasi Environment Variables

Buat file `.env.local` di root project (di samping `package.json`):

```bash
cp .env.example .env.local
```

Buka `.env.local` dan isi semua nilai:

```env
# Isi dengan seluruh konten JSON service account dalam satu baris
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"kawanbantu-assessment",...}

# ID Google Sheet kamu (dari URL spreadsheet)
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms

# API key Resend kamu
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Email yang menerima notifikasi lead (email Syifa)
NOTIFICATION_EMAIL=syifa@kawanbantu.com
```

**Penting:** Jangan pernah commit file `.env.local` ke Git. File `.gitignore` yang dibuat Next.js sudah otomatis mengabaikan file ini.

---

## 5. Update WhatsApp Link

Di file `app/results/page.tsx`, cari baris ini:

```tsx
href={`https://wa.me/628xxxxxxxxxx?text=...`}
```

Ganti `628xxxxxxxxxx` dengan nomor WhatsApp KawanBantu yang aktif.
Format: `628` + nomor tanpa angka 0 di depan.
Contoh: `6281234567890`

---

## 6. Jalankan Secara Lokal

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

Untuk test end-to-end:
1. Isi seluruh assessment
2. Submit dengan data kontak nyata
3. Cek Google Sheet — baris baru harus muncul
4. Cek email notifikasi — harus masuk ke email Syifa

---

## 7. Deploy ke Vercel

### Langkah 1: Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/kawanbantu/assessment.git
git push -u origin main
```

### Langkah 2: Deploy di Vercel

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik **Add New Project**
3. Import repository GitHub kamu
4. Klik **Deploy** (biarkan semua setting default)

### Langkah 3: Tambahkan Environment Variables di Vercel

1. Setelah deploy pertama, buka project di Vercel dashboard
2. Pergi ke **Settings** → **Environment Variables**
3. Tambahkan keempat env vars yang sama seperti di `.env.local`:
   - `GOOGLE_SERVICE_ACCOUNT_JSON`
   - `GOOGLE_SHEET_ID`
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`
4. Klik **Save**
5. Pergi ke **Deployments** → klik deployment terbaru → **Redeploy**

Setelah redeploy, URL assessment kamu siap: `https://your-project.vercel.app`

---

## 8. Embed ke Website KawanBantu

### Opsi A: Iframe embed

Tambahkan ini di halaman kawanbantu.com di mana kamu ingin assessment muncul:

```html
<iframe
  src="https://your-assessment-url.vercel.app"
  width="100%"
  height="800px"
  frameborder="0"
  style="border-radius: 16px;"
  title="Fundraising Readiness Assessment"
></iframe>
```

### Opsi B: Link langsung

Tambahkan tombol CTA di website KawanBantu yang mengarah langsung ke URL assessment.

### Opsi C: Custom domain

Di Vercel dashboard, pergi ke **Settings** → **Domains** dan tambahkan subdomain seperti `assessment.kawanbantu.com`.

---

## Troubleshooting

### Google Sheets tidak menyimpan data
- Pastikan sheet di spreadsheet bernama persis `Leads`
- Pastikan service account sudah di-share ke spreadsheet dengan akses Editor
- Cek log di Vercel dashboard untuk error message

### Email notifikasi tidak masuk
- Cek spam folder
- Verifikasi domain di Resend sudah verified
- Pastikan `NOTIFICATION_EMAIL` diisi dengan benar

### Build gagal
- Pastikan semua env vars sudah diisi di Vercel sebelum deploy
- Cek log build di Vercel untuk error spesifik

---

## Struktur Data di Google Sheets

Setiap baris di sheet `Leads` berisi:

| Kolom | Isi |
|---|---|
| A | Timestamp |
| B | Nama |
| C | Nama NGO |
| D | Email |
| E | Phone |
| F | Skor Total (0–100) |
| G | Tier (pemula/berkembang/siap/mahir) |
| H | Profile Track (fix/optimize/scale) |
| I | Budget Tier (none/low/mid/high) |
| J | Budget Label (teks) |
| K | Skor Kredibilitas |
| L | Status Kredibilitas |
| M | Skor Track Record |
| N | Status Track Record |
| O | Skor Narasi |
| P | Status Narasi |
| Q | Skor Tim |
| R | Status Tim |
| S | Skor Digital |
| T | Status Digital |
| U | Skor Akses |
| V | Status Akses |
| W | Root Bottleneck |
| X | Leverage Point |

Syifa bisa sort sheet ini by Skor Total untuk memprioritaskan follow-up.
