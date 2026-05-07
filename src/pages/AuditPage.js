import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const businessTypes = [
  { id: 'kiosk', label: 'Food kiosk', icon: '🏠' },
  { id: 'hotel', label: 'Hotel / resto', icon: '🍽️' },
  { id: 'market', label: 'Market stall', icon: '🛒' },
  { id: 'retail', label: 'Retail shop', icon: '🏪' },
  { id: 'bar', label: 'Bar / lounge', icon: '🍺' },
  { id: 'other', label: 'Other', icon: '📋' },
];

const laws = [
  { id: 'cap242', label: 'Cap 242' },
  { id: 'emca', label: 'EMCA 1999' },
  { id: 'swma', label: 'SWMA 2022' },
  { id: 'food', label: 'Food Hygiene 2020' },
  { id: 'noise', label: 'Noise Regs 2009' },
  { id: 'osha', label: 'OSHA 2007' },
];

function AuditPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [bizName, setBizName] = useState('');
  const [bizLocation, setBizLocation] = useState('');
  const [bizType, setBizType] = useState('hotel');
  const [selectedLaws, setSelectedLaws] = useState(['cap242', 'emca', 'swma']);
  const [analyzing, setAnalyzing] = useState(false);

  function toggleLaw(id) {
    setSelectedLaws(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  }

  function handleCapture() {
    setPhotoTaken(true);
    setStep(2);
  }

  function handleRunAudit() {
    setAnalyzing(true);
    setStep(3);
    setTimeout(() => navigate('/report'), 3000);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif', paddingBottom: 40 }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--eco)', padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <button onClick={() => navigate('/dashboard')} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none',
          borderRadius: '50%', width: 32, height: 32,
          color: '#fff', fontSize: 16, display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>←</button>
        <span style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>New audit</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginLeft: 'auto' }}>eComply</span>
      </div>

      {/* Step indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '16px 20px',
        background: '#fff', borderBottom: '1px solid var(--border)'
      }}>
        {[1, 2, 3].map((s, i) => (
          <React.Fragment key={s}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600,
              background: step > s ? 'var(--eco)' : step === s ? 'var(--eco-light)' : 'var(--surface)',
              color: step > s ? '#fff' : step === s ? 'var(--eco)' : 'var(--text3)',
              border: step === s ? '2px solid var(--eco)' : 'none'
            }}>{step > s ? '✓' : s}</div>
            {i < 2 && (
              <div style={{
                flex: 1, height: 2, margin: '0 6px',
                background: step > s + 1 ? 'var(--eco)' : step > s ? 'var(--eco-mid)' : 'var(--border)'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Camera zone */}
      {!photoTaken ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleCapture}
          style={{
            background: 'linear-gradient(160deg, #0a4a3a, #083d32)',
            minHeight: 220, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 24
          }}
        >
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            border: '2px dashed rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 14
          }}>
            <div style={{
              width: 70, height: 70, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28
            }}>📸</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', marginBottom: 4 }}>Tap to take photo</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Point camera at the business premises</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '12px 0' }}>or</div>
          <button onClick={handleCapture} style={{
            fontSize: 12, padding: '7px 20px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 20, color: '#fff'
          }}>Upload from gallery</button>
        </motion.div>
      ) : (
        <div style={{
          background: 'linear-gradient(135deg, #1a5c4a, #0a3d2e)',
          height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: 48 }}>🖼️</div>
          <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
            <button onClick={() => { setPhotoTaken(false); setStep(1); }} style={{
              fontSize: 11, padding: '5px 14px',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 20, color: '#fff'
            }}>Retake</button>
          </div>
          <div style={{
            position: 'absolute', top: 10, right: 10,
            fontSize: 11, padding: '3px 10px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 20, color: 'var(--eco)', fontWeight: 500
          }}>Photo ready ✓</div>
        </div>
      )}

      {/* Form */}
      <div style={{ padding: 16 }}>

        {/* Business name */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Business name</label>
          <input
            value={bizName}
            onChange={e => setBizName(e.target.value)}
            placeholder="e.g. Mama Njeri's Kitchen"
            style={{
              width: '100%', padding: '11px 14px',
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: 10, fontSize: 14, outline: 'none', color: 'var(--text1)'
            }}
          />
        </div>

        {/* Location */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Location</label>
          <input
            value={bizLocation}
            onChange={e => setBizLocation(e.target.value)}
            placeholder="e.g. Westlands, Nairobi"
            style={{
              width: '100%', padding: '11px 14px',
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: 10, fontSize: 14, outline: 'none', color: 'var(--text1)'
            }}
          />
        </div>

        {/* Business type */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>Business type</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {businessTypes.map(type => (
              <div key={type.id} onClick={() => setBizType(type.id)} style={{
                background: bizType === type.id ? 'var(--eco-light)' : '#fff',
                border: bizType === type.id ? '2px solid var(--eco)' : '1px solid var(--border)',
                borderRadius: 10, padding: '12px 8px', textAlign: 'center', cursor: 'pointer'
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{type.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: bizType === type.id ? 'var(--eco)' : 'var(--text1)' }}>{type.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Laws */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>Laws to check against</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {laws.map(law => (
              <div key={law.id} onClick={() => toggleLaw(law.id)} style={{
                fontSize: 12, padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                background: selectedLaws.includes(law.id) ? 'var(--legal-light)' : '#fff',
                border: selectedLaws.includes(law.id) ? '1px solid #85B7EB' : '1px solid var(--border)',
                color: selectedLaws.includes(law.id) ? 'var(--legal)' : 'var(--text2)',
                fontWeight: selectedLaws.includes(law.id) ? 500 : 400
              }}>{law.label}</div>
            ))}
          </div>
        </div>

        {/* Analyzing state */}
        {analyzing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '20px 0' }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              border: '3px solid var(--eco-light)',
              borderTop: '3px solid var(--eco)',
              margin: '0 auto 12px',
              animation: 'spin 1s linear infinite'
            }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--eco)', marginBottom: 4 }}>Analysing with eComply AI</div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>Checking against Kenyan environmental law...</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </motion.div>
        ) : (
          <button
            onClick={handleRunAudit}
            disabled={!photoTaken}
            style={{
              width: '100%', padding: 14,
              background: photoTaken ? 'var(--eco)' : 'var(--border)',
              border: 'none', borderRadius: 12, color: '#fff',
              fontSize: 14, fontWeight: 600,
              opacity: photoTaken ? 1 : 0.6
            }}
          >
            {photoTaken ? '▶ Run compliance audit' : 'Take a photo first'}
          </button>
        )}

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', marginTop: 12, lineHeight: 1.5 }}>
          eComply provides guidance only — not legal counsel.
        </p>
      </div>
    </div>
  );
}

export default AuditPage;