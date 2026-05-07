import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const recentAudits = [
  { name: "Mama Njeri's Kitchen", location: 'Westlands', score: 64, type: 'Food kiosk', date: '3 May 2026' },
  { name: 'Java House Westlands', location: 'Westlands', score: 88, type: 'Restaurant', date: '2 May 2026' },
  { name: 'Kenchic Inn Ngong Rd', location: 'Ngong Road', score: 42, type: 'Hotel', date: '1 May 2026' },
  { name: 'Mama Oliech', location: 'Hurlingham', score: 76, type: 'Restaurant', date: '30 Apr 2026' },
  { name: 'Githeri House', location: 'CBD', score: 35, type: 'Food kiosk', date: '29 Apr 2026' },
];

function scoreColor(score) {
  if (score >= 75) return 'var(--eco)';
  if (score >= 50) return 'var(--warn)';
  return 'var(--danger)';
}

function scoreBg(score) {
  if (score >= 75) return 'var(--eco-light)';
  if (score >= 50) return 'var(--warn-light)';
  return 'var(--danger-light)';
}

function scoreLabel(score) {
  if (score >= 75) return 'Compliant';
  if (score >= 50) return 'Needs work';
  return 'Critical';
}

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif', paddingBottom: 80 }}>

      {/* Top bar */}
      <div style={{
        background: 'linear-gradient(160deg, #0F6E56, #083d32)',
        padding: '20px 20px 28px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 2 }}>Good morning 👋</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Kenneth Muchui</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>County Health Inspector · Nairobi</div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#fff', fontWeight: 600
          }}>KM</div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Total audits', value: '47', icon: '📋' },
            { label: 'Avg score', value: '68', icon: '📊' },
            { label: 'Violations found', value: '124', icon: '⚠️' },
            { label: 'Pass rate', value: '61%', icon: '✅' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12, padding: '14px'
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Score trend */}
      <div style={{ margin: '16px', background: '#fff', borderRadius: 14, border: '1px solid var(--border)', padding: '16px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 14 }}>Score trend — last 6 months</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
          {[
            { month: 'Dec', score: 55 },
            { month: 'Jan', score: 60 },
            { month: 'Feb', score: 58 },
            { month: 'Mar', score: 65 },
            { month: 'Apr', score: 63 },
            { month: 'May', score: 68 },
          ].map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${d.score}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  width: '100%', background: i === 5 ? 'var(--eco)' : 'var(--eco-light)',
                  borderRadius: '4px 4px 0 0', minHeight: 4,
                  border: i === 5 ? 'none' : '1px solid var(--eco-mid)'
                }}
              />
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent audits */}
      <div style={{ margin: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase' }}>Recent audits</div>
          <div style={{ fontSize: 12, color: 'var(--eco)', fontWeight: 500 }}>See all</div>
        </div>

        {recentAudits.map((audit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => navigate('/report')}
            style={{
              background: '#fff', borderRadius: 12, border: '1px solid var(--border)',
              padding: '14px', marginBottom: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12
            }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: scoreBg(audit.score),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: scoreColor(audit.score) }}>{audit.score}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text1)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{audit.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>{audit.location} · {audit.type}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                fontSize: 11, fontWeight: 500, padding: '3px 10px',
                borderRadius: 20, background: scoreBg(audit.score),
                color: scoreColor(audit.score), marginBottom: 4
              }}>{scoreLabel(audit.score)}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{audit.date}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 420, background: '#fff',
        borderTop: '1px solid var(--border)', display: 'flex',
        padding: '10px 0', zIndex: 100
      }}>
        {[
          { icon: '🏠', label: 'Home', path: '/dashboard', active: true },
          { icon: '📸', label: 'Audit', path: '/audit', active: false },
          { icon: '📚', label: 'Learn', path: '/education', active: false },
          { icon: '👤', label: 'Profile', path: '/', active: false },
        ].map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)} style={{
            flex: 1, background: 'transparent', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '4px 0'
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: item.active ? 600 : 400, color: item.active ? 'var(--eco)' : 'var(--text3)' }}>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}

export default DashboardPage;