import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../components/BottomNav';
const R = {
  business: "Mama Njeri's Kitchen",
  location: "Westlands, Nairobi",
  type: "Food kiosk",
  owner: "Njeri Wambui",
  reg: "BN/2021/04872",
  phone: "+254 712 345 678",
  permit: "Valid until Dec 2026",
  score: 64,
  verdict: "Needs improvement",
  betterThan: 38,
  violations: [
    {
      severity: "critical",
      title: "Open drainage near food prep area",
      law: "Public Health Act, Cap 242 — Section 115",
      desc: "Wastewater channel runs adjacent to the food handling station with no cover.",
      fix: "Install a sealed drainage cover and reroute greywater to the municipal line.",
    },
    {
      severity: "warn",
      title: "Waste not segregated at source",
      law: "Sustainable Waste Management Act 2022 — Section 28",
      desc: "Organic and inorganic waste collected in a single bin behind the kiosk.",
      fix: "Provide colour-coded bins (green: organic, blue: recyclables, black: residual).",
    },
    {
      severity: "warn",
      title: "Wall surface absorbent / not washable",
      law: "Food Hygiene Regulations 2020 — Reg 11(b)",
      desc: "Untreated timber wall behind cooker absorbs grease and moisture.",
      fix: "Tile or apply a smooth, impervious, washable finish to a height of 1.8m.",
    },
  ],
  compliant: [
    { title: "Handwashing station with soap & running water", law: "Food Hyg. Reg 8" },
    { title: "Food stored 30cm off the ground on racks", law: "Cap 242 — Section 118" },
  ],
};

function scoreColor(n) {
  return n >= 75 ? '#1D9E75' : n >= 50 ? '#BA7517' : '#E24B4A';
}

function sevColor(s) {
  return s === 'critical' ? '#E24B4A' : s === 'warn' ? '#BA7517' : '#1D9E75';
}

function sevBg(s) {
  return s === 'critical' ? '#FCEBEB' : s === 'warn' ? '#FAEEDA' : '#E1F5EE';
}

function ScoreGauge({ score }) {
  const [val, setVal] = useState(0);
  const size = 180, stroke = 14;
  const r = (size - stroke) / 2;
  const cir = 2 * Math.PI * r;
  const off = cir - (val / 100) * cir;
  const col = scoreColor(score);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      if (n >= score) { n = score; clearInterval(id); }
      setVal(n);
    }, 18);
    return () => clearInterval(id);
  }, [score]);

  return (
    <div style={{
      margin: '-30px 20px 0', padding: 22,
      background: '#fff', borderRadius: 24,
      border: '1px solid var(--border)',
      boxShadow: '0 24px 50px -22px rgba(15,110,86,0.3)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', position: 'relative', zIndex: 2
    }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--border)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            stroke={col} strokeWidth={stroke}
            fill="none" strokeLinecap="round"
            strokeDasharray={cir} strokeDashoffset={off}
            style={{ transition: 'stroke-dashoffset 0.1s' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--text1)', letterSpacing: -2, lineHeight: 1 }}>{val}</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 600 }}>out of 100</div>
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text2)' }}>
        Compliance score · <span style={{ color: col, fontWeight: 700 }}>{R.verdict}</span>
      </div>
    </div>
  );
}

function BellCurve({ score, betterThan }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    cv.width = cv.offsetWidth * 2;
    cv.height = 120 * 2;
    const w = cv.width, h = cv.height;
    const mean = w / 2, sd = w / 6;
    const f = x => Math.exp(-((x - mean) ** 2) / (2 * sd * sd));
    const peak = f(mean);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0F6E5660');
    grad.addColorStop(1, '#0F6E5600');

    let p = 0;
    const target = betterThan / 100;

    const tick = () => {
      p += 0.02;
      if (p > target) p = target;
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 2) {
        ctx.lineTo(x, h - (f(x) / peak) * (h - 30) - 10);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h - (f(x) / peak) * (h - 30) - 10;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#0F6E56';
      ctx.lineWidth = 4;
      ctx.stroke();

      const dx = p * w;
      const dy = h - (f(dx) / peak) * (h - 30) - 10;
      ctx.beginPath();
      ctx.arc(dx, dy, 14, 0, Math.PI * 2);
      ctx.fillStyle = scoreColor(score);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 6;
      ctx.stroke();

      if (p < target) requestAnimationFrame(tick);
    };
    tick();
  }, [score, betterThan]);

  return (
    <div style={{
      margin: '16px 20px 0', padding: 16,
      background: '#fff', borderRadius: 20,
      border: '1px solid var(--border)'
    }}>
      <div style={{ fontSize: 12, color: 'var(--text2)' }}>You scored</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)', marginBottom: 8 }}>
        Better than <span style={{ color: scoreColor(score) }}>{betterThan}%</span> of audited businesses
      </div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 120 }} />
    </div>
  );
}

const HOTSPOTS = [
  { x: 18, y: 64, sev: 'critical', label: 'Open drainage' },
  { x: 70, y: 38, sev: 'warn', label: 'Absorbent wall' },
  { x: 44, y: 78, sev: 'warn', label: 'Mixed waste' },
  { x: 80, y: 70, sev: 'compliant', label: 'Handwash' },
];

function ReportPage() {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const initials = R.business.split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif', paddingBottom: 96 }}>

      {/* Hero */}
      <div style={{
        position: 'relative', padding: '20px 20px 30px',
        background: 'linear-gradient(160deg, var(--eco), var(--legal))',
        color: '#fff', borderRadius: '0 0 28px 28px', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate('/dashboard')} style={{
            width: 38, height: 38, borderRadius: 12,
            background: 'rgba(255,255,255,0.18)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, backdropFilter: 'blur(10px)', cursor: 'pointer'
          }}>←</button>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>Audit report</div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 18, backdropFilter: 'blur(10px)'
          }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4 }}>{R.business}</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{R.location} · {R.type}</div>
          </div>
          <div style={{
            padding: '5px 10px', borderRadius: 999,
            background: scoreColor(R.score), color: '#fff',
            fontSize: 11, fontWeight: 800
          }}>{R.verdict}</div>
        </div>
      </div>

      {/* Score gauge */}
      <ScoreGauge score={R.score} />

      {/* Bell curve */}
      <BellCurve score={R.score} betterThan={R.betterThan} />

      {/* More details accordion */}
      <div style={{
        margin: '14px 20px 0', borderRadius: 16,
        background: '#fff', border: '1px solid var(--border)', overflow: 'hidden'
      }}>
        <button onClick={() => setDetailsOpen(!detailsOpen)} style={{
          width: '100%', padding: '14px 16px',
          background: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', cursor: 'pointer',
          fontSize: 14, fontWeight: 700, color: 'var(--text1)',
          fontFamily: 'Inter, sans-serif'
        }}>
          <span>More details</span>
          <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }}>▼</motion.span>
        </button>
        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 16px 16px', fontSize: 13 }}>
                {[
                  ['Owner', R.owner],
                  ['Registration', R.reg],
                  ['Phone', R.phone],
                  ['Permit', R.permit],
                ].map(([k, v], i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '8px 0',
                    borderTop: '1px solid var(--border)'
                  }}>
                    <span style={{ color: 'var(--text2)' }}>{k}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text1)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Photo evidence */}
      <div style={{ margin: '16px 20px 0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)', margin: '0 0 12px' }}>Photo evidence</h3>
        <div style={{
          position: 'relative', borderRadius: 18, overflow: 'hidden',
          aspectRatio: '4/3',
          background: 'linear-gradient(135deg, #1a5c4a, #0a3d2e)',
          boxShadow: '0 16px 40px -22px rgba(15,110,86,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: 64, opacity: 0.3 }}>🍽️</span>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)' }} />
          {HOTSPOTS.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 260, damping: 18 }}
              style={{
                position: 'absolute',
                left: `${h.x}%`, top: `${h.y}%`,
                transform: 'translate(-50%,-50%)'
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: sevColor(h.sev),
                border: '3px solid #fff',
                boxShadow: `0 0 0 3px ${sevColor(h.sev)}55, 0 6px 14px rgba(0,0,0,0.3)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 12, fontWeight: 800
              }}>{i + 1}</div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          {[
            { c: '#E24B4A', l: 'Critical' },
            { c: '#BA7517', l: 'Warning' },
            { c: '#1D9E75', l: 'Compliant' },
          ].map(x => (
            <span key={x.l} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text2)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: x.c }} /> {x.l}
            </span>
          ))}
        </div>
      </div>

      {/* Violations */}
      <div style={{ margin: '20px 20px 0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)', margin: '0 0 12px' }}>
          Violations <span style={{ color: '#E24B4A' }}>({R.violations.length})</span>
        </h3>
        <div style={{ display: 'grid', gap: 10 }}>
          {R.violations.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              style={{
                padding: 14, borderRadius: 16, background: '#fff',
                border: `1px solid ${sevColor(v.severity)}33`,
                borderLeft: `4px solid ${sevColor(v.severity)}`
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: sevBg(v.severity), color: sevColor(v.severity),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 16
                }}>{v.severity === 'critical' ? '🚨' : '⚠️'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)' }}>{v.title}</div>
                  <div style={{
                    display: 'inline-block', marginTop: 4,
                    padding: '3px 8px', borderRadius: 6,
                    background: 'var(--legal-light)', color: 'var(--legal)',
                    fontSize: 11, fontWeight: 700
                  }}>{v.law}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 8, lineHeight: 1.45 }}>{v.desc}</div>
                  <div style={{
                    marginTop: 8, padding: 10, borderRadius: 10,
                    background: 'var(--eco-light)',
                    fontSize: 12, color: 'var(--eco)', fontWeight: 600
                  }}>💡 {v.fix}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliant */}
      <div style={{ margin: '20px 20px 0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)', margin: '0 0 12px' }}>
          Compliant areas <span style={{ color: '#1D9E75' }}>({R.compliant.length})</span>
        </h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {R.compliant.map((c, i) => (
            <div key={i} style={{
              padding: 12, borderRadius: 14,
              background: 'var(--eco-light)',
              border: '1px solid var(--eco-mid)',
              display: 'flex', gap: 10, alignItems: 'center'
            }}>
              <span style={{ fontSize: 18 }}>✅</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text1)' }}>{c.title}</div>
                <div style={{ fontSize: 11, color: 'var(--eco)' }}>{c.law}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, padding: '24px 20px 32px' }}>
        <button style={{
          flex: 1, display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', gap: 8, padding: 14, borderRadius: 14,
          background: 'linear-gradient(135deg, var(--eco), #1D9E75)',
          color: '#fff', border: 'none', fontFamily: 'Inter, sans-serif',
          fontWeight: 700, fontSize: 14, cursor: 'pointer',
          boxShadow: '0 14px 28px -12px rgba(15,110,86,0.5)'
        }}>📄 Export PDF</button>
        <button style={{
          display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', padding: '14px 18px', borderRadius: 14,
          background: '#fff', color: 'var(--text1)',
          border: '1px solid var(--border)', fontFamily: 'Inter, sans-serif',
          fontWeight: 700, fontSize: 14, cursor: 'pointer'
        }}>↗</button>
      </div>

<BottomNav />
    </div>
  );
}

export default ReportPage;