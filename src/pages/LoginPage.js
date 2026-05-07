import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('inspector');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const handleLogin = () => {
    setMsg('Welcome back! Redirecting...');
    setMsgType('success');
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  const handleRegister = () => {
    setMsg('Account created! Switching to login...');
    setMsgType('success');
    setTimeout(() => setTab('login'), 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--eco)', padding: '16px 24px',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none',
          borderRadius: '50%', width: 32, height: 32,
          color: '#fff', fontSize: 16, display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>←</button>
        <span style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>eComply</span>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0F6E56, #083d32)',
        padding: '32px 24px', textAlign: 'center'
      }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🌿</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>eComply</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          AI-powered food safety compliance
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          {['Cap 242', 'EMCA 1999', 'SWMA 2022', 'OSHA 2007'].map((law, i) => (
            <span key={i} style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 20,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)'
            }}>{law}</span>
          ))}
        </div>
      </div>

      {/* Auth card */}
      <div style={{ padding: '24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#fff', borderRadius: 16,
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)', overflow: 'hidden'
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
            {['login', 'register'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '14px', background: 'transparent',
                border: 'none', fontSize: 14, fontWeight: 500,
                color: tab === t ? 'var(--eco)' : 'var(--text2)',
                borderBottom: tab === t ? '2px solid var(--eco)' : '2px solid transparent',
                textTransform: 'capitalize', transition: 'all 0.2s'
              }}>{t === 'login' ? 'Sign in' : 'Create account'}</button>
            ))}
          </div>

          <div style={{ padding: '20px' }}>

            {/* Register only — name field */}
            {tab === 'register' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Full name</label>
                <input placeholder="e.g. Kenneth Muchui" style={{
                  width: '100%', padding: '11px 14px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, fontSize: 14, outline: 'none', color: 'var(--text1)'
                }} />
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Email</label>
              <input type="email" placeholder="you@example.com" style={{
                width: '100%', padding: '11px 14px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, fontSize: 14, outline: 'none', color: 'var(--text1)'
              }} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="••••••••" style={{
                width: '100%', padding: '11px 14px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, fontSize: 14, outline: 'none', color: 'var(--text1)'
              }} />
            </div>

            {/* Register only — role picker */}
            {tab === 'register' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>I am a</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { id: 'inspector', label: 'County inspector', icon: '🏛️' },
                    { id: 'owner', label: 'Business owner', icon: '🍽️' }
                  ].map(r => (
                    <div key={r.id} onClick={() => setRole(r.id)} style={{
                      flex: 1, padding: '12px', borderRadius: 10, textAlign: 'center',
                      border: role === r.id ? '2px solid var(--eco)' : '1px solid var(--border)',
                      background: role === r.id ? 'var(--eco-light)' : 'var(--surface)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}>{r.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: role === r.id ? 'var(--eco)' : 'var(--text1)' }}>{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            {msg && (
              <div style={{
                fontSize: 13, textAlign: 'center', padding: '8px',
                borderRadius: 8, marginBottom: 12,
                background: msgType === 'success' ? 'var(--eco-light)' : 'var(--danger-light)',
                color: msgType === 'success' ? 'var(--eco)' : 'var(--danger)'
              }}>{msg}</div>
            )}

            {/* Submit button */}
            <button
              onClick={tab === 'login' ? handleLogin : handleRegister}
              style={{
                width: '100%', padding: '13px', background: 'var(--eco)',
                border: 'none', borderRadius: 10, color: '#fff',
                fontSize: 14, fontWeight: 600
              }}>
              {tab === 'login' ? 'Sign in' : 'Create account'}
            </button>

          </div>
        </motion.div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text3)', marginTop: 16, lineHeight: 1.6 }}>
          eComply provides guidance only — not legal counsel.<br />
          Results should be verified by a qualified inspector.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;