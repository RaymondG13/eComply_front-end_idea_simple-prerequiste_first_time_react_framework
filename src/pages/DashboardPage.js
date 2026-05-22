import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const RECENT_AUDITS = [
  { name: "Java House", area: "Kimathi St", score: 88, type: "Restaurant" },
  { name: "Mama Njeri's Kitchen", area: "Westlands", score: 64, type: "Food kiosk" },
  { name: "Kenchic Inn", area: "Kenyatta Ave", score: 42, type: "Restaurant" },
  { name: "Mama Oliech", area: "Hurlingham", score: 76, type: "Restaurant" },
  { name: "Githeri House", area: "Eastleigh", score: 35, type: "Food kiosk" },
];

const TREND = [62, 58, 71, 66, 74, 69];
const MONTHS = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

function scoreColor(n) {
  return n >= 75 ? '#1D9E75' : n >= 50 ? '#BA7517' : '#E24B4A';
}

function DashboardPage() {
  const navigate = useNavigate();
  const max = Math.max(...TREND);

  const stats = [
    { label: 'Total audits', value: '47', icon: '📋', color: '#0F6E56', bg: '#E1F5EE' },
    { label: 'Avg score', value: '67', icon: '📊', color: '#0C447C', bg: '#E6F1FB' },
    { label: 'Violations', value: '82', icon: '⚠️', color: '#BA7517', bg: '#FAEEDA' },
    { label: 'Pass rate', value: '61%', icon: '✅', color: '#1D9E75', bg: '#E1F5EE' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif', paddingBottom: 96 }}>

      {/* Header */}
      <div style={{ padding: '24px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text2)' }}>Habari, Inspector 👋</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text1)', letterSpacing: -0.4 }}>Kenneth Muchui</div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'linear-gradient(135deg, var(--eco), #1D9E75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700, color: '#fff',
          boxShadow: '0 8px 20px -8px rgba(15,110,86,0.5)'
        }}>KM</div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '12px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 240, damping: 20 }}
            style={{
              padding: 14, borderRadius: 18,
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 12px 28px -18px rgba(15,110,86,0.3)'
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: s.bg, color: s.color,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 16, marginBottom: 8
            }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text1)', letterSpacing: -0.5 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Trend chart */}
      <div style={{
        margin: '20px 20px 0', padding: 18, borderRadius: 20,
        background: '#fff', border: '1px solid var(--border)',
        boxShadow: '0 12px 30px -22px rgba(15,110,86,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>6-month trend</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)' }}>Average score</div>
          </div>
          <div style={{
            fontSize: 12, fontWeight: 700, color: '#1D9E75',
            padding: '4px 10px', borderRadius: 999, background: 'var(--eco-light)'
          }}>▲ 11%</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 130, gap: 8 }}>
          {TREND.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text2)', position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)' }}>{v}</div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / max) * 100}%` }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '100%',
                    background: `linear-gradient(180deg, ${scoreColor(v)}, ${scoreColor(v)}99)`,
                    borderRadius: '8px 8px 4px 4px',
                  }}
                />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600 }}>{MONTHS[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent audits */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)', margin: 0 }}>Recent audits</h3>
          <button onClick={() => navigate('/audit')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '6px 12px', borderRadius: 999,
            background: 'linear-gradient(135deg, var(--eco), #1D9E75)',
            color: '#fff', border: 'none', fontSize: 12, fontWeight: 700,
            fontFamily: 'Inter, sans-serif'
          }}>+ New</button>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {RECENT_AUDITS.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => navigate('/report')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 12, borderRadius: 16, background: '#fff',
                border: '1px solid var(--border)', cursor: 'pointer'
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'var(--eco-light)', color: 'var(--eco)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13, flexShrink: 0
              }}>
                {a.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>{a.area} · {a.type}</div>
              </div>
              <div style={{
                padding: '6px 10px', borderRadius: 999,
                background: scoreColor(a.score) + '1a',
                color: scoreColor(a.score),
                fontWeight: 800, fontSize: 13
              }}>{a.score}</div>
              <span style={{ color: 'var(--text3)', fontSize: 16 }}>›</span>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default DashboardPage;