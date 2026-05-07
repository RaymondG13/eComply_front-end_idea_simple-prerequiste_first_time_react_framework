import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const violations = [
  {
    severity: 'critical',
    title: 'Open drainage near food prep area',
    law: 'Public Health Act, Cap 242 — Section 115',
    desc: 'Uncovered drainage within 1m of food surfaces creates direct contamination risk.',
    fix: 'Seal all drainage channels with grated covers.'
  },
  {
    severity: 'warning',
    title: 'Waste not segregated at source',
    law: 'Sustainable Waste Management Act, 2022 — Section 28',
    desc: 'Mixed organic and non-organic waste in a single bin violates mandatory segregation law.',
    fix: 'Provide separate labelled bins for each waste category.'
  },
  {
    severity: 'warning',
    title: 'Absorbent wall surface in cooking area',
    law: 'Food Hygiene Regulations, 2020 — Regulation 11(b)',
    desc: 'Porous walls behind cooking station harbour bacteria and cannot be properly sanitised.',
    fix: 'Tile or apply non-absorbent paint to all cooking area walls.'
  },
];

const compliant = [
  { title: 'Handwashing station present', law: 'Food Hygiene Regulations, 2020 — Regulation 8' },
  { title: 'Food stored off the ground', law: 'Public Health Act, Cap 242 — Section 118' },
];

function ScoreGauge({ score }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 70;
    let current = 0;

    function getColor(s) {
      if (s >= 75) return '#0F6E56';
      if (s >= 50) return '#BA7517';
      return '#E24B4A';
    }

    function draw(val) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, Math.PI * 0.75, Math.PI * 2.25);
      ctx.strokeStyle = '#E1F5EE';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Score arc
      const angle = Math.PI * 0.75 + (val / 100) * Math.PI * 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, Math.PI * 0.75, angle);
      ctx.strokeStyle = getColor(val);
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Score number
      ctx.fillStyle = getColor(val);
      ctx.font = 'bold 36px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(val), cx, cy - 8);

      // /100
      ctx.fillStyle = '#9a9895';
      ctx.font = '13px Inter, sans-serif';
      ctx.fillText('/100', cx, cy + 22);
    }

    // Animate
    const interval = setInterval(() => {
      current += 1;
      draw(current);
      if (current >= score) clearInterval(interval);
    }, 18);

    return () => clearInterval(interval);
  }, [score]);

  return <canvas ref={canvasRef} width={180} height={180} />;
}

function BellCurve({ score }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    function bell(x) {
      const mean = 55, std = 18;
      return Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
    }

    const pts = [];
    for (let i = 0; i <= 100; i++) {
      pts.push({ x: (i / 100) * (w - 20) + 10, y: h - 10 - bell(i) * (h - 24) });
    }

    ctx.beginPath();
    ctx.moveTo(pts[0].x, h - 10);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, h - 10);
    ctx.closePath();
    ctx.fillStyle = 'rgba(15,110,86,0.08)';
    ctx.fill();

    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = 'rgba(15,110,86,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const sx = (score / 100) * (w - 20) + 10;
    const sy = h - 10 - bell(score) * (h - 24);

    ctx.beginPath();
    ctx.moveTo(sx, h - 10);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = 'var(--eco)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(sx, sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#0F6E56';
    ctx.fill();

    ctx.font = '500 10px sans-serif';
    ctx.fillStyle = '#0F6E56';
    ctx.textAlign = sx > w / 2 ? 'right' : 'left';
    ctx.fillText('Better than 71%', sx + (sx > w / 2 ? -8 : 8), sy - 6);

    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#9a9895';
    ctx.textAlign = 'left';
    ctx.fillText('0', 10, h - 1);
    ctx.fillText('50', w / 2 - 6, h - 1);
    ctx.textAlign = 'right';
    ctx.fillText('100', w - 10, h - 1);
  }, [score]);

  return <canvas ref={canvasRef} width={200} height={70} style={{ width: '100%' }} />;
}

function ReportPage() {
  const navigate = useNavigate();
  const score = 64;
  const [ownerOpen, setOwnerOpen] = useState(false);

  function severityColor(s) {
    return s === 'critical' ? 'var(--danger)' : 'var(--warn)';
  }

  function severityBg(s) {
    return s === 'critical' ? 'var(--danger-light)' : 'var(--warn-light)';
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif', paddingBottom: 40 }}>

      {/* Top bar */}
      <div style={{ background: 'var(--eco)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => navigate('/dashboard')} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
          width: 32, height: 32, color: '#fff', fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>←</button>
        <span style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>Audit report</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginLeft: 'auto' }}>3 May 2026</span>
      </div>

      {/* Hero score section */}
      <div style={{
        background: 'linear-gradient(160deg, #0F6E56, #083d32)',
        padding: '20px 20px 28px'
      }}>
        {/* Profile row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, #9FE1CB, #0F6E56)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 600, color: '#fff',
            border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0
          }}>MN</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Mama Njeri's Kitchen</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>Westlands, Nairobi · Food kiosk</div>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 500,
              padding: '3px 10px', borderRadius: 20, marginTop: 4,
              background: 'var(--warn-light)', color: '#633806'
            }}>Needs improvement</div>
          </div>
          <button onClick={() => setOwnerOpen(!ownerOpen)} style={{
            fontSize: 11, padding: '6px 12px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 20, color: '#fff', whiteSpace: 'nowrap'
          }}>More details</button>
        </div>

        {/* Score + curve */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 16, padding: '8px',
            flexShrink: 0
          }}>
            <ScoreGauge score={score} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Performance vs others</div>
            <BellCurve score={score} />
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* Owner drawer */}
        {ownerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              background: '#fff', borderRadius: 14,
              border: '1px solid var(--border)', padding: 16, marginBottom: 14
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--legal-light)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600, color: 'var(--legal)'
              }}>NW</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)' }}>Njeri Wambui</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Business owner · Sole proprietor</div>
              </div>
            </div>
            {[
              ['Business reg.', 'BN/2021/04872'],
              ['Phone', '+254 712 345 678'],
              ['Operating since', 'March 2021'],
              ['County permit', 'Nairobi — valid to Dec 2026'],
              ['Previous audits', '2 (last score: 58)'],
            ].map(([k, v], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 12, padding: '8px 0',
                borderBottom: i < 4 ? '1px solid var(--border)' : 'none'
              }}>
                <span style={{ color: 'var(--text2)' }}>{k}</span>
                <span style={{ fontWeight: 500, color: 'var(--text1)' }}>{v}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Photo evidence */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Visual evidence</div>
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            border: '1px solid var(--border)', position: 'relative',
            background: 'linear-gradient(135deg, #c8e8df, #a8d8cc)',
            height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ fontSize: 48 }}>🖼️</div>
            {/* Hotspots */}
            <div style={{ position: 'absolute', top: 20, left: 20, width: 60, height: 50, background: 'rgba(226,75,74,0.35)', borderRadius: 6, border: '2px solid rgba(226,75,74,0.6)' }} />
            <div style={{ position: 'absolute', top: 22, left: 84, fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 10, background: 'rgba(226,75,74,0.9)', color: '#fff' }}>Drainage</div>
            <div style={{ position: 'absolute', bottom: 30, right: 30, width: 70, height: 40, background: 'rgba(186,117,23,0.35)', borderRadius: 6, border: '2px solid rgba(186,117,23,0.6)' }} />
            <div style={{ position: 'absolute', bottom: 32, right: 104, fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 10, background: 'rgba(186,117,23,0.9)', color: '#fff' }}>Waste bins</div>
            <div style={{ position: 'absolute', top: 20, right: 20, width: 50, height: 40, background: 'rgba(15,110,86,0.35)', borderRadius: 6, border: '2px solid rgba(15,110,86,0.6)' }} />
            <div style={{ position: 'absolute', top: 22, right: 74, fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 10, background: 'rgba(15,110,86,0.9)', color: '#fff' }}>Handwash ✓</div>
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
              <span style={{ fontSize: 11, padding: '3px 10px', background: 'rgba(255,255,255,0.9)', borderRadius: 20, color: 'var(--eco)', fontWeight: 500 }}>3 areas flagged</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11, color: 'var(--text2)' }}>
            <span>🔴 Critical</span>
            <span>🟡 Warning</span>
            <span>🟢 Compliant</span>
          </div>
        </div>

        {/* Violations */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 10 }}>Violations ({violations.length})</div>
        {violations.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: '#fff', borderRadius: 12,
              border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 10
            }}
          >
            <div style={{ padding: '12px 14px 10px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: severityColor(v.severity), flexShrink: 0, marginTop: 4
              }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text1)', lineHeight: 1.4 }}>{v.title}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--legal)', marginTop: 2 }}>{v.law}</div>
              </div>
            </div>
            <div style={{
              padding: '8px 14px 12px', fontSize: 12,
              color: 'var(--text2)', borderTop: '1px solid var(--border)', lineHeight: 1.6
            }}>
              {v.desc}
              <div style={{ fontSize: 12, color: 'var(--eco)', marginTop: 6, fontWeight: 500 }}>Fix: {v.fix}</div>
            </div>
          </motion.div>
        ))}

        {/* Compliant */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 10, marginTop: 4 }}>Compliant areas ({compliant.length})</div>
        {compliant.map((c, i) => (
          <div key={i} style={{
            background: 'var(--eco-light)', border: '1px solid var(--eco-mid)',
            borderRadius: 12, padding: '12px 14px',
            display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--eco)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#085041' }}>{c.title}</div>
              <div style={{ fontSize: 11, color: 'var(--eco)' }}>{c.law}</div>
            </div>
          </div>
        ))}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button style={{
            flex: 1, padding: 12, background: 'var(--eco)',
            border: 'none', borderRadius: 10, color: '#fff',
            fontSize: 13, fontWeight: 600
          }}>Export PDF</button>
          <button style={{
            flex: 1, padding: 12, background: 'transparent',
            border: '1px solid var(--border)', borderRadius: 10,
            color: 'var(--eco)', fontSize: 13, fontWeight: 600
          }}>Share report</button>
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', marginTop: 16, lineHeight: 1.5 }}>
          eComply AI · Nairobi, Kenya · Not a substitute for legal counsel
        </div>
      </div>
    </div>
  );
}

export default ReportPage;