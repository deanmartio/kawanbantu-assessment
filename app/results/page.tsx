'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { tierConfig, statusConfig, dimensionIcons } from '@/lib/scoring';
import { generateRecommendationCards, generatePrioritySummary, generateProductStack, ProductItem } from '@/lib/recommendations';
import { AssessmentResult, ContactInfo, RecommendationCard } from '@/types';

interface StoredPayload {
  contact: ContactInfo;
  result: AssessmentResult;
  budgetAnswer: string;
}

const TRACK_LABEL: Record<string, { label: string; color: string }> = {
  fix: { label: 'Fix Track', color: '#992C1A' },
  optimize: { label: 'Optimize Track', color: '#F59E0B' },
  scale: { label: 'Scale Track', color: '#2A9E99' },
};

export default function ResultsPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<StoredPayload | null>(null);
  const [cards, setCards] = useState<RecommendationCard[]>([]);
  const [summary, setSummary] = useState('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [productStack, setProductStack] = useState<ProductItem[]>([]);
  const [scoreAnimated, setScoreAnimated] = useState(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    const raw = sessionStorage.getItem('kb_assessment_result');
    if (!raw) {
      router.push('/');
      return;
    }
    const data: StoredPayload = JSON.parse(raw);
    setPayload(data);
    setCards(generateRecommendationCards(data.result));
    setSummary(generatePrioritySummary(data.result));
    setProductStack(generateProductStack(data.result));

    // Animate score counter
    const target = data.result.overallScore;
    const duration = 1500;
    const start = performance.now();
    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setScoreAnimated(current);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, []);

  if (!payload) {
    return (
      <div style={{ minHeight: '100vh', background: '#120c1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(42,158,153,0.2)', borderTopColor: '#2A9E99', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const { result, contact } = payload;
  const tier = tierConfig[result.overallTier];
  const track = TRACK_LABEL[result.profileTrack];

  const radarData = result.dimensions.map((d) => ({
    subject: d.shortLabel,
    value: d.score,
    fullMark: 100,
  }));

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (scoreAnimated / 100) * circumference;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #120c1a 0%, #1a1025 60%, #0d1a1a 100%)', fontFamily: "'Poppins', sans-serif" }}>

      {/* Header */}
      <div style={{ background: 'rgba(18,12,26,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#f0ebe8' }}>KawanBantu</span>
          <span style={{ fontSize: '13px', color: '#6b6478' }}>Hasil Assessment</span>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Hero Score Section */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '14px', color: '#9e98a8', marginBottom: '8px' }}>
            Hasil untuk <strong style={{ color: '#f0ebe8' }}>{contact.name}</strong> · {contact.ngo}
          </p>

          {/* Score ring */}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle
                cx="70" cy="70" r="54"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.05s linear' }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A9E99" />
                  <stop offset="100%" stopColor="#8A59B3" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#f0ebe8', lineHeight: '1' }}>{scoreAnimated}</div>
              <div style={{ fontSize: '12px', color: '#6b6478', marginTop: '2px' }}>dari 100</div>
            </div>
          </div>

          {/* Tier badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: tier.color }}>{tier.label}</span>
            <span style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${track.color}44`, borderRadius: '50px', padding: '4px 12px', fontSize: '12px', fontWeight: '600', color: track.color }}>
              {track.label}
            </span>
          </div>

          <p style={{ fontSize: '15px', color: '#9e98a8', lineHeight: '1.7', maxWidth: '520px', margin: '0 auto' }}>
            {tier.description}
          </p>
        </div>

        {/* Radar Chart */}
        <div className="kb-card animate-fade-in-up stagger-1" style={{ padding: '28px', marginBottom: '24px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A59B3', fontWeight: '700', marginBottom: '20px' }}>
            Peta Kesiapan Fundraising
          </p>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#9e98a8', fontSize: 12, fontFamily: 'Poppins' }}
                />
                <Tooltip
                  contentStyle={{ background: '#231934', border: '1px solid #2e2040', borderRadius: '8px', fontFamily: 'Poppins', fontSize: '13px', color: '#f0ebe8' }}
                  formatter={(value) => [`${value}/100`, 'Skor']}
                />
                <Radar
                  name="Skor"
                  dataKey="value"
                  stroke="#2A9E99"
                  fill="#2A9E99"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Dimension score pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', marginTop: '16px' }}>
            {result.dimensions.map((d) => {
              const sc = statusConfig[d.status];
              return (
                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px 12px' }}>
                  <span style={{ fontSize: '16px' }}>{dimensionIcons[d.id]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', color: '#9e98a8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.shortLabel}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#f0ebe8' }}>{d.score}</span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: sc.dotColor, flexShrink: 0 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Summary */}
        <div className="animate-fade-in-up stagger-2" style={{ background: 'linear-gradient(135deg, rgba(42,158,153,0.1), rgba(138,89,179,0.1))', border: '1px solid rgba(42,158,153,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9E99', fontWeight: '700', marginBottom: '12px' }}>
            Prioritas Utama Kamu
          </p>
          <p style={{ fontSize: '15px', color: '#e0dbe8', lineHeight: '1.75' }}>{summary}</p>
        </div>

        {/* Dimension Cards */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6b6478', fontWeight: '600', marginBottom: '20px' }}>
            Analisis Per Dimensi
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cards.map((card, i) => {
              const sc = statusConfig[card.status];
              const isExpanded = expandedCard === card.dimensionId;

              return (
                <div
                  key={card.dimensionId}
                  className={`kb-card animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Card header */}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : card.dimensionId)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '20px', cursor: 'pointer', textAlign: 'left', fontFamily: "'Poppins', sans-serif" }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <span style={{ fontSize: '22px', flexShrink: 0 }}>{dimensionIcons[card.dimensionId]}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', color: '#9e98a8' }}>
                            {card.label.toUpperCase()}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: `${sc.dotColor.replace('bg-', '')}22`, border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '50px', padding: '2px 8px', fontSize: '11px', fontWeight: '600' }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: sc.dotColor === 'bg-red-500' ? '#ef4444' : sc.dotColor === 'bg-yellow-400' ? '#facc15' : '#2dd4bf', flexShrink: 0 }} />
                            <span style={{ color: sc.dotColor === 'bg-red-500' ? '#ef4444' : sc.dotColor === 'bg-yellow-400' ? '#facc15' : '#2dd4bf' }}>
                              {sc.label}
                            </span>
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#f0ebe8', marginLeft: 'auto' }}>
                            {card.score}/100
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#f0ebe8', lineHeight: '1.4', margin: 0 }}>
                          {card.headline}
                        </p>
                      </div>
                      <span style={{ fontSize: '18px', color: '#6b6478', flexShrink: 0, transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>
                        ↓
                      </span>
                    </div>

                    {/* Score bar */}
                    <div style={{ marginTop: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${card.score}%`, background: card.status === 'kritis' ? '#992C1A' : card.status === 'berkembang' ? '#F59E0B' : '#2A9E99', borderRadius: '4px', transition: 'width 1s ease' }} />
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="animate-fade-in" style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Insight */}
                        <div>
                          <p style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#6b6478', fontWeight: '600', marginBottom: '8px' }}>
                            Kenapa ini penting
                          </p>
                          <p style={{ fontSize: '14px', color: '#c8c2d0', lineHeight: '1.7' }}>{card.insight}</p>
                        </div>

                        {/* Action */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '16px' }}>
                          <p style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#6b6478', fontWeight: '600', marginBottom: '8px' }}>
                            Yang perlu dilakukan
                          </p>
                          <p style={{ fontSize: '14px', color: '#c8c2d0', lineHeight: '1.7' }}>{card.action}</p>
                        </div>

                        {/* Prerequisite note */}
                        {card.prerequisiteNote && (
                          <div style={{ background: 'rgba(153,44,26,0.1)', border: '1px solid rgba(153,44,26,0.3)', borderRadius: '10px', padding: '14px' }}>
                            <p style={{ fontSize: '13px', color: '#ff8070', lineHeight: '1.6' }}>
                              ⚠️ {card.prerequisiteNote}
                            </p>
                          </div>
                        )}

                        {/* KB Recommendation */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(42,158,153,0.08), rgba(138,89,179,0.08))', border: '1px solid rgba(42,158,153,0.2)', borderRadius: '10px', padding: '16px' }}>
                          <p style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#2A9E99', fontWeight: '700', marginBottom: '8px' }}>
                            Rekomendasi KawanBantu
                          </p>
                          <p style={{ fontSize: '14px', color: '#c8c2d0', lineHeight: '1.7' }}>{card.kbRecommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>


        {/* Product Summary */}
        {productStack.length > 0 && (
          <div className="animate-fade-in-up" style={{ marginTop: '40px' }}>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6b6478', fontWeight: '600', marginBottom: '6px' }}>
                Rekomendasi untuk Kamu
              </p>
              <p style={{ fontSize: '14px', color: '#9e98a8', lineHeight: '1.6' }}>
                Berdasarkan profil kamu, ini adalah produk dan layanan yang paling relevan dengan situasi kamu saat ini.
              </p>
            </div>
            {(['platform', 'ads', 'consulting'] as const).map((cat) => {
              const items = productStack.filter((p) => p.category === cat);
              if (items.length === 0) return null;
              const catLabel: Record<string, string> = { platform: '🖥️ Platform', ads: '📣 Iklan & Konten', consulting: '🤝 Konsultasi' };
              return (
                <div key={cat} style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#4a4458', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {catLabel[cat]}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {items.map((product) => (
                      <div key={product.name} style={{ background: product.priority === 'utama' ? 'linear-gradient(135deg, rgba(42,158,153,0.08), rgba(138,89,179,0.06))' : 'rgba(255,255,255,0.02)', border: product.priority === 'utama' ? '1px solid rgba(42,158,153,0.25)' : '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ marginTop: '4px', flexShrink: 0 }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: product.priority === 'utama' ? 'linear-gradient(135deg, #2A9E99, #8A59B3)' : '#3e2f55' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#f0ebe8' }}>{product.name}</span>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: product.priority === 'utama' ? '#2A9E99' : '#6b6478', background: product.priority === 'utama' ? 'rgba(42,158,153,0.1)' : 'rgba(255,255,255,0.04)', border: product.priority === 'utama' ? '1px solid rgba(42,158,153,0.25)' : '1px solid rgba(255,255,255,0.07)', borderRadius: '50px', padding: '2px 8px', whiteSpace: 'nowrap' as const }}>
                              {product.priority === 'utama' ? '★ Utama' : 'Disarankan'}
                            </span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#2A9E99', fontWeight: '600', marginBottom: '4px' }}>{product.price}</p>
                          <p style={{ fontSize: '13px', color: '#9e98a8', lineHeight: '1.55' }}>{product.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="animate-fade-in-up" style={{ background: 'linear-gradient(135deg, #1a1025, #0d1a1a)', border: '1px solid rgba(42,158,153,0.2)', borderRadius: '20px', padding: '36px 28px', textAlign: 'center', marginTop: '40px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>👋</div>
          <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#f0ebe8', marginBottom: '12px' }}>
            Mau bicara langsung dengan tim kami?
          </h3>
          <p style={{ fontSize: '14px', color: '#9e98a8', lineHeight: '1.7', maxWidth: '420px', margin: '0 auto 28px' }}>
            Tim KawanBantu bisa membantu kamu memahami hasil ini lebih dalam dan menemukan langkah pertama yang paling tepat untuk situasi kamu.
          </p>
          {/* Primary CTA - Book Demo */}
          <a
            href="https://kawanbantu.fillout.com/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-block', fontSize: '15px', padding: '14px 36px', textDecoration: 'none', marginBottom: '12px' }}
          >
            Book Demo Gratis
          </a>
          <p style={{ fontSize: '12px', color: '#4a4458', marginBottom: '24px' }}>
            Kami review hasil assessment kamu sebelum sesi dimulai
          </p>

          {/* Secondary CTAs */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://kbt-product-deck.s3.ap-southeast-1.amazonaws.com/KBT+Products.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50px', padding: '12px 24px', color: '#c8c2d0', fontSize: '14px', fontWeight: '600', textDecoration: 'none', fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(138,89,179,0.4)'; (e.currentTarget as HTMLAnchorElement).style.color = '#f0ebe8'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLAnchorElement).style.color = '#c8c2d0'; }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2h7l3 3v7H2V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M9 2v3h3M4 7h6M4 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Pelajari KawanBantu Lebih Lanjut
            </a>
            <a
              href="https://kawanbantu.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50px', padding: '12px 24px', color: '#c8c2d0', fontSize: '14px', fontWeight: '600', textDecoration: 'none', fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(42,158,153,0.4)'; (e.currentTarget as HTMLAnchorElement).style.color = '#f0ebe8'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLAnchorElement).style.color = '#c8c2d0'; }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Daftar di KawanBantu
            </a>
          </div>
        </div>

        {/* Restart */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={() => { sessionStorage.removeItem('kb_assessment_result'); router.push('/'); }}
            style={{ background: 'none', border: 'none', color: '#6b6478', fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", textDecoration: 'underline' }}
          >
            Mulai assessment baru
          </button>
        </div>
      </div>
    </div>
  );
}
