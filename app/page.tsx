'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const criteria = [
    { icon: '🏛️', label: 'Kredibilitas Organisasi' },
    { icon: '📊', label: 'Track Record Kampanye' },
    { icon: '✍️', label: 'Narasi & Konten' },
    { icon: '👥', label: 'Kapabilitas Tim' },
    { icon: '💻', label: 'Kesiapan Digital' },
    { icon: '📡', label: 'Jangkauan Donatur' },
  ];

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #120c1a 0%, #1a1025 50%, #0d1a1a 100%)',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(138,89,179,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(42,158,153,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50px', padding: '8px 20px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #2A9E99, #8A59B3)' }} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#f0ebe8' }}>KawanBantu</span>
          </div>
        </div>

        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="animate-fade-in-up" style={{ display: 'inline-block', background: 'rgba(42,158,153,0.1)', border: '1px solid rgba(42,158,153,0.3)', borderRadius: '50px', padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: '#2A9E99', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Fundraising Readiness Assessment
          </div>

          <h1 className="animate-fade-in-up stagger-1" style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: '800', lineHeight: '1.15', margin: '0 0 20px', color: '#f0ebe8' }}>
            Seberapa siap kamu{' '}
            <span style={{ background: 'linear-gradient(135deg, #2A9E99, #8A59B3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              fundraising?
            </span>
          </h1>

          <p className="animate-fade-in-up stagger-2" style={{ fontSize: '17px', color: '#9e98a8', lineHeight: '1.7', margin: '0 auto 36px', maxWidth: '520px' }}>
            Jawab 28 pertanyaan singkat dan dapatkan analisis mendalam tentang kekuatan dan gap fundraising organisasi kamu, lengkap dengan rekomendasi langkah konkret.
          </p>

          <button className="btn-primary animate-fade-in-up stagger-3" onClick={() => router.push('/assessment')} style={{ fontSize: '16px', padding: '16px 40px' }}>
            Mulai Assessment Gratis
          </button>

          <p className="animate-fade-in-up stagger-4" style={{ fontSize: '13px', color: '#6b6478', marginTop: '16px' }}>
            28 pertanyaan · Sekitar 5–7 menit · 100% gratis
          </p>
        </div>

        {/* What you get */}
        <div className="kb-card animate-fade-in-up stagger-3" style={{ padding: '28px', marginBottom: '24px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A59B3', fontWeight: '700', marginBottom: '20px', margin: '0 0 20px' }}>
            Yang kamu dapat dari assessment ini
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Skor kesiapan fundraising dari 6 dimensi yang berbeda',
              'Diagnosis spesifik per area: apa yang kurang dan kenapa itu menghambat kamu',
              'Roadmap perbaikan yang diprioritaskan berdasarkan kondisi kamu',
              'Rekomendasi produk dan layanan yang sesuai dengan situasi dan anggaran kamu',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(42,158,153,0.15)', border: '1px solid rgba(42,158,153,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#2A9E99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', color: '#c8c2d0', lineHeight: '1.5' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 dimensions */}
        <div className="animate-fade-in-up stagger-4">
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6b6478', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>
            6 Dimensi yang Diukur
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
            {criteria.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{c.icon}</span>
                <span style={{ fontSize: '13px', color: '#c8c2d0', fontWeight: '500' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="animate-fade-in-up stagger-5" style={{ textAlign: 'center', marginTop: '48px' }}>
          <button className="btn-primary" onClick={() => router.push('/assessment')} style={{ fontSize: '16px', padding: '16px 40px' }}>
            Mulai Sekarang
          </button>
          <p style={{ fontSize: '12px', color: '#4a4458', marginTop: '12px' }}>
            Hasil tersedia setelah semua pertanyaan dijawab
          </p>
        </div>
      </div>
    </main>
  );
}
