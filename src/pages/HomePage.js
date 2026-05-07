import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawHero(ctx, canvas.width, canvas.height);
  }, []);

  function drawHero(ctx, w, h) {
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    sky.addColorStop(0, '#87CEEB');
    sky.addColorStop(1, '#FDB97D');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Sun
    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.25, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();

    // Mount Kenya silhouette
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.lineTo(w * 0.2, h * 0.2);
    ctx.lineTo(w * 0.35, h * 0.35);
    ctx.lineTo(w * 0.5, h * 0.15);
    ctx.lineTo(w * 0.65, h * 0.32);
    ctx.lineTo(w, h * 0.4);
    ctx.lineTo(w, h * 0.6);
    ctx.closePath();
    ctx.fillStyle = '#2d5a3d';
    ctx.fill();

    // Savanna ground
    const ground = ctx.createLinearGradient(0, h * 0.55, 0, h);
    ground.addColorStop(0, '#8B6914');
    ground.addColorStop(1, '#6B4F10');
    ctx.fillStyle = ground;
    ctx.fillRect(0, h * 0.55, w, h * 0.45);

    // Acacia tree left
    drawAcacia(ctx, w * 0.1, h * 0.55, 40);

    // Acacia tree right
    drawAcacia(ctx, w * 0.85, h * 0.55, 30);

    // Kenyan flag
    drawFlag(ctx, w * 0.45, h * 0.1, 60, 40);
  }

  function drawAcacia(ctx, x, y, size) {
    // trunk
    ctx.fillStyle = '#5C3A1E';
    ctx.fillRect(x - 3, y - size * 0.6, 6, size * 0.6);
    // canopy
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.7, size * 0.8, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1a4a2e';
    ctx.fill();
  }

  function drawFlag(ctx, x, y, w, h) {
    // pole
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(x, y, 3, h * 2);
    // black stripe
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 3, y, w, h / 3);
    // red stripe
    ctx.fillStyle = '#BB0000';
    ctx.fillRect(x + 3, y + h / 3, w, h / 3);
    // green stripe
    ctx.fillStyle = '#006600';
    ctx.fillRect(x + 3, y + (h / 3) * 2, w, h / 3);
    // white borders
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + 3, y + h / 3 - 2, w, 4);
    ctx.fillRect(x + 3, y + (h / 3) * 2 - 2, w, 4);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--eco)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 18
          }}>🌿</div>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--eco)' }}>eComply</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'transparent', border: 'none',
            color: 'var(--text2)', fontSize: 14, padding: '8px 16px'
          }}>Sign in</button>
          <button onClick={() => navigate('/login')} style={{
            background: 'var(--eco)', border: 'none', color: '#fff',
            fontSize: 14, fontWeight: 500, padding: '8px 20px',
            borderRadius: 8
          }}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: 20,
              padding: '4px 12px', fontSize: 12, color: '#fff', marginBottom: 12
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#9FE1CB', display: 'inline-block' }}></span>
              AI-powered · Kenya-built
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>
              Food safety compliance,<br />powered by AI
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20, maxWidth: 260 }}>
              Snap a photo of any food business. Get a full compliance report citing Kenyan law in seconds.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => navigate('/audit')} style={{
                background: 'var(--eco)', border: 'none', color: '#fff',
                fontSize: 13, fontWeight: 600, padding: '10px 20px', borderRadius: 8
              }}>Start free audit</button>
              <button onClick={() => navigate('/education')} style={{
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                fontSize: 13, fontWeight: 500, padding: '10px 20px', borderRadius: 8
              }}>Learn more</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        padding: '20px 24px', background: '#fff',
        borderBottom: '1px solid var(--border)'
      }}>
        {[
          { value: '3s', label: 'Avg audit time' },
          { value: '6', label: 'Kenyan laws' },
          { value: '100%', label: 'Free to start' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--eco)' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Law chips */}
      <div style={{ padding: '20px 24px', background: '#fff' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12 }}>Laws we check against</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Cap 242', 'EMCA 1999', 'SWMA 2022', 'Food Hygiene 2020', 'OSHA 2007', 'Noise Regs 2009'].map((law, i) => (
            <span key={i} style={{
              fontSize: 12, padding: '5px 12px', borderRadius: 20,
              background: 'var(--eco-light)', color: 'var(--eco)',
              border: '1px solid var(--eco-mid)', fontWeight: 500
            }}>{law}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '24px', background: 'var(--surface)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 16 }}>What eComply does</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { icon: '📸', title: 'Photo audit', desc: 'Snap any food business and get instant AI analysis' },
            { icon: '⚖️', title: 'Legal citations', desc: 'Every violation linked to exact Kenyan law sections' },
            { icon: '📊', title: 'Score tracking', desc: 'Track compliance improvement over time' },
            { icon: '📄', title: 'PDF export', desc: 'Share professional audit reports instantly' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#fff', borderRadius: 12, padding: '16px',
                border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text1)', marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '32px 24px', background: 'var(--eco)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          Ready to audit your first business?
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
          Free to use. No download required.
        </p>
        <button onClick={() => navigate('/audit')} style={{
          background: '#fff', border: 'none', color: 'var(--eco)',
          fontSize: 14, fontWeight: 600, padding: '12px 32px', borderRadius: 10
        }}>Start free audit</button>
      </div>

      {/* Footer */}
      <div style={{
        padding: '20px 24px', background: '#fff',
        borderTop: '1px solid var(--border)', textAlign: 'center'
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--eco)', marginBottom: 4 }}>🌿 eComply</div>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>AI-powered food safety compliance · Nairobi, Kenya</div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>Not a substitute for legal counsel</div>
      </div>

    </div>
  );
}

export default HomePage;