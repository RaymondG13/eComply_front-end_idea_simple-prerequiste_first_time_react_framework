import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Home', icon: '🏠' },
  { to: '/audit', label: 'Audit', icon: '📸' },
  { to: '/education', label: 'Learn', icon: '📚' },
  { to: '/login', label: 'Profile', icon: '👤' },
];

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%',
      transform: 'translateX(-50%)', width: '100%', maxWidth: 420,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
      padding: '10px 8px 14px', zIndex: 50,
    }}>
      {items.map(({ to, label, icon }) => {
        const active = location.pathname === to;
        const isAudit = to === '/audit';
        return (
          <button key={to} onClick={() => navigate(to)} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4,
            background: 'transparent', border: 'none',
            color: active ? 'var(--eco)' : 'var(--text3)',
            fontSize: 11, fontWeight: 600,
            fontFamily: 'Inter, sans-serif', cursor: 'pointer',
          }}>
            <div style={{
              width: isAudit ? 46 : 36,
              height: isAudit ? 46 : 36,
              marginTop: isAudit ? -18 : 0,
              borderRadius: isAudit ? 16 : 12,
              background: isAudit
                ? 'linear-gradient(135deg, var(--eco), #1D9E75)'
                : active ? 'var(--eco-light)' : 'transparent',
              color: isAudit ? '#fff' : active ? 'var(--eco)' : 'var(--text3)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: isAudit ? 22 : 18,
              boxShadow: isAudit ? '0 10px 24px -8px rgba(15,110,86,0.5)' : 'none',
            }}>{icon}</div>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;