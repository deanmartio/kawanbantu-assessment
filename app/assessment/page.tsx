'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { questions, dimensions } from '@/lib/questions';
import { calculateResults } from '@/lib/scoring';
import { AnswerValue, ContactInfo } from '@/types';

type Stage = 'questions' | 'budget' | 'contact' | 'submitting';

const LETTER = ['A', 'B', 'C', 'D'];
const AUTO_ADVANCE_DELAY = 420; // ms after selection before moving forward

const scoredQuestions = questions.filter((q) => q.isScored);
const budgetQuestion = questions.find((q) => q.dimensionId === 'budget')!;
const TOTAL_STEPS = scoredQuestions.length + 1 + 1;

export default function AssessmentPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('questions');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [budgetAnswer, setBudgetAnswer] = useState<AnswerValue | null>(null);
  const [selectedOption, setSelectedOption] = useState<AnswerValue | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [contact, setContact] = useState<ContactInfo>({ name: '', ngo: '', email: '', phone: '' });
  const [contactErrors, setContactErrors] = useState<Partial<ContactInfo>>({});
  const [submitError, setSubmitError] = useState('');

  // Prevents auto-advance from firing when restoring a previous answer on back-navigation
  const isRestoring = useRef(false);
  // Holds the pending auto-advance timer so we can cancel it
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = scoredQuestions[currentIndex];

  // Restore selected option when navigating back
  useEffect(() => {
    if (stage === 'questions') {
      isRestoring.current = true;
      setSelectedOption(answers[currentQuestion?.id] ?? null);
    }
  }, [currentIndex, stage]);

  // Auto-advance when an option is selected
  useEffect(() => {
    // Clear any existing timer
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);

    // Don't auto-advance if restoring a previous answer
    if (isRestoring.current) {
      isRestoring.current = false;
      return;
    }

    if (!selectedOption) return;
    if (stage !== 'questions' && stage !== 'budget') return;

    autoAdvanceTimer.current = setTimeout(() => {
      handleNext(selectedOption);
    }, AUTO_ADVANCE_DELAY);

    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, [selectedOption]);

  const progressStep =
    stage === 'questions'
      ? currentIndex
      : stage === 'budget'
      ? scoredQuestions.length
      : scoredQuestions.length + 1;

  const progress = (progressStep / TOTAL_STEPS) * 100;

  const currentDim =
    stage === 'questions'
      ? dimensions.find((d) => d.id === currentQuestion?.dimensionId)
      : null;

  function getDimProgress() {
    if (!currentDim) return null;
    const dimQuestions = scoredQuestions.filter((q) => q.dimensionId === currentDim.id);
    const dimIndex = dimQuestions.findIndex((q) => q.id === currentQuestion.id) + 1;
    return `${currentDim.label} · ${dimIndex}/${dimQuestions.length}`;
  }

  function handleSelectOption(val: AnswerValue) {
    // Cancel any pending timer first (user changed their mind)
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setSelectedOption(val);
  }

  function handleNext(option?: AnswerValue) {
    const current = option ?? selectedOption;
    if (!current) return;

    if (stage === 'questions') {
      const newAnswers = { ...answers, [currentQuestion.id]: current };
      setAnswers(newAnswers);

      if (currentIndex < scoredQuestions.length - 1) {
        setDirection('forward');
        setAnimating(true);
        setTimeout(() => {
          setCurrentIndex((i) => i + 1);
          // Restore next question's answer if they've been here before (won't trigger auto-advance)
          isRestoring.current = true;
          setSelectedOption(newAnswers[scoredQuestions[currentIndex + 1]?.id] ?? null);
          setAnimating(false);
        }, 200);
      } else {
        setDirection('forward');
        setAnimating(true);
        setTimeout(() => {
          isRestoring.current = true;
          setStage('budget');
          setSelectedOption(budgetAnswer);
          setAnimating(false);
        }, 200);
      }
    } else if (stage === 'budget') {
      setBudgetAnswer(current);
      setDirection('forward');
      setAnimating(true);
      setTimeout(() => {
        setStage('contact');
        setAnimating(false);
      }, 200);
    }
  }

  function handleBack() {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);

    if (stage === 'questions' && currentIndex > 0) {
      setDirection('back');
      setAnimating(true);
      setTimeout(() => {
        isRestoring.current = true;
        setCurrentIndex((i) => i - 1);
        setSelectedOption(answers[scoredQuestions[currentIndex - 1]?.id] ?? null);
        setAnimating(false);
      }, 200);
    } else if (stage === 'budget') {
      setDirection('back');
      setAnimating(true);
      setTimeout(() => {
        isRestoring.current = true;
        setStage('questions');
        setCurrentIndex(scoredQuestions.length - 1);
        setSelectedOption(answers[scoredQuestions[scoredQuestions.length - 1]?.id] ?? null);
        setAnimating(false);
      }, 200);
    } else if (stage === 'contact') {
      isRestoring.current = true;
      setStage('budget');
      setSelectedOption(budgetAnswer);
    }
  }

  function validateContact(): boolean {
    const errors: Partial<ContactInfo> = {};
    if (!contact.name.trim()) errors.name = 'Nama wajib diisi';
    if (!contact.ngo.trim()) errors.ngo = 'Nama organisasi wajib diisi';
    if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      errors.email = 'Email tidak valid';
    }
    if (!contact.phone.trim() || contact.phone.replace(/\D/g, '').length < 9) {
      errors.phone = 'Nomor telepon tidak valid';
    }
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateContact()) return;
    if (!budgetAnswer) return;

    setStage('submitting');
    setSubmitError('');

    const result = calculateResults(answers, budgetAnswer);
    const payload = {
      contact,
      result,
      answers,
      budgetAnswer: String(budgetAnswer),
      timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
    };

    sessionStorage.setItem('kb_assessment_result', JSON.stringify(payload));

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      console.error('Submit failed');
    }

    router.push('/results');
  }

  const animStyle: React.CSSProperties = animating
    ? {
        opacity: 0,
        transform: direction === 'forward' ? 'translateX(20px)' : 'translateX(-20px)',
        transition: 'all 0.2s ease',
      }
    : { opacity: 1, transform: 'translateX(0)', transition: 'all 0.2s ease' };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #120c1a 0%, #1a1025 60%, #0d1a1a 100%)',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '3px',
          background: 'rgba(255,255,255,0.05)',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #2A9E99, #8A59B3)',
            width: `${progress}%`,
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(18,12,26,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 50,
          padding: '12px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#f0ebe8' }}>
            KawanBantu
          </span>
          <span style={{ fontSize: '13px', color: '#6b6478' }}>
            {stage === 'contact'
              ? 'Hampir selesai'
              : `${progressStep + 1} dari ${TOTAL_STEPS}`}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* QUESTIONS + BUDGET STAGE */}
        {(stage === 'questions' || stage === 'budget') && (
          <div style={animStyle}>
            {/* Dimension label */}
            {stage === 'questions' && (
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#8A59B3',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {getDimProgress()}
                </span>
              </div>
            )}
            {stage === 'budget' && (
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#2A9E99',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Pertanyaan Anggaran
                </span>
              </div>
            )}

            {/* Question */}
            <h2
              style={{
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: '700',
                lineHeight: '1.4',
                color: '#f0ebe8',
                marginBottom: '32px',
              }}
            >
              {stage === 'questions' ? currentQuestion.text : budgetQuestion.text}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              {(stage === 'questions' ? currentQuestion : budgetQuestion).options.map((opt, i) => {
                const isSelected = selectedOption === opt.value;
                return (
                  <button
                    key={opt.value}
                    className={`answer-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(opt.value)}
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    {/* Auto-advance fill indicator */}
                    {isSelected && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, #2A9E99, #8A59B3)',
                          animation: `fillBar ${AUTO_ADVANCE_DELAY}ms linear forwards`,
                          borderRadius: '0 0 0 10px',
                        }}
                      />
                    )}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: isSelected ? '#2A9E99' : '#6b6478',
                          minWidth: '18px',
                          marginTop: '1px',
                          flexShrink: 0,
                        }}
                      >
                        {LETTER[i]}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          lineHeight: '1.55',
                          color: isSelected ? '#f0ebe8' : '#c8c2d0',
                        }}
                      >
                        {opt.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back button only — no Lanjut needed */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={handleBack}
                disabled={stage === 'questions' && currentIndex === 0}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50px',
                  padding: '12px 24px',
                  color: '#9e98a8',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor:
                    stage === 'questions' && currentIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: stage === 'questions' && currentIndex === 0 ? 0.3 : 1,
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.2s ease',
                }}
              >
                ← Kembali
              </button>

              {!selectedOption && (
                <span style={{ fontSize: '12px', color: '#4a4458' }}>
                  Pilih salah satu jawaban
                </span>
              )}
            </div>
          </div>
        )}

        {/* CONTACT STAGE */}
        {stage === 'contact' && (
          <div className="animate-fade-in-up">
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2A9E99, #8A59B3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '16px',
                }}
              >
                🎯
              </div>
              <h2
                style={{ fontSize: '24px', fontWeight: '800', color: '#f0ebe8', marginBottom: '8px' }}
              >
                Hampir selesai!
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  color: '#9e98a8',
                  lineHeight: '1.6',
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
              >
                Isi data di bawah untuk melihat hasil assessment dan rekomendasimu.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              {[
                { key: 'name', label: 'Nama Lengkap', placeholder: 'Nama kamu', type: 'text' },
                { key: 'ngo', label: 'Nama Organisasi / NGO', placeholder: 'Nama organisasi kamu', type: 'text' },
                { key: 'email', label: 'Alamat Email', placeholder: 'email@organisasi.com', type: 'email' },
                { key: 'phone', label: 'Nomor WhatsApp', placeholder: '08xxxxxxxxxx', type: 'tel' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#c8c2d0',
                      marginBottom: '8px',
                    }}
                  >
                    {label}
                  </label>
                  <input
                    className="kb-input"
                    type={type}
                    placeholder={placeholder}
                    value={(contact as unknown as Record<string, string>)[key]}
                    onChange={(e) => {
                      setContact((prev) => ({ ...prev, [key]: e.target.value }));
                      setContactErrors((prev) => ({ ...prev, [key]: '' }));
                    }}
                  />
                  {(contactErrors as unknown as Record<string, string>)[key] && (
                    <p style={{ fontSize: '12px', color: '#992C1A', marginTop: '6px' }}>
                      {(contactErrors as unknown as Record<string, string>)[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p style={{ fontSize: '12px', color: '#6b6478', marginBottom: '20px', lineHeight: '1.6' }}>
              Data kamu aman dan tidak akan dibagikan ke pihak lain.
            </p>

            {submitError && (
              <div
                style={{
                  background: 'rgba(153,44,26,0.15)',
                  border: '1px solid rgba(153,44,26,0.4)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: '#ff6b5b',
                  marginBottom: '16px',
                }}
              >
                {submitError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleBack}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50px',
                  padding: '14px 24px',
                  color: '#9e98a8',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Kembali
              </button>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                style={{ fontSize: '15px', padding: '14px 32px', flex: 1 }}
              >
                Lihat Hasil Assessment
              </button>
            </div>
          </div>
        )}

        {/* SUBMITTING STAGE */}
        {stage === 'submitting' && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '3px solid rgba(42,158,153,0.2)',
                borderTopColor: '#2A9E99',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 24px',
              }}
            />
            <p style={{ fontSize: '16px', color: '#9e98a8' }}>
              Menghitung hasil assessment kamu...
            </p>
            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
              @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
            `}</style>
          </div>
        )}

        {/* Inject keyframes for fillBar outside submitting stage too */}
        {stage !== 'submitting' && (
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
          `}</style>
        )}
      </div>
    </div>
  );
}
