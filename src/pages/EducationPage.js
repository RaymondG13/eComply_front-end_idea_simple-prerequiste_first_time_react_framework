import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = ['All', 'Hygiene', 'Waste', 'Environment', 'Safety'];

const guides = [
  {
    tag: 'Most violated · 2026',
    title: 'Proper drainage & waste water disposal',
    desc: 'Standing water near food prep areas is the single most cited violation in Nairobi — and the easiest to fix in under an hour.',
    law: 'EMCA 1999 — 372(1)(b)',
    steps: ['Identify blockage source', 'Clear & disinfect drain', 'Re-audit & confirm'],
    category: 'Hygiene'
  },
  {
    tag: 'Common miss',
    title: 'Waste segregation at source',
    desc: 'Mixed waste bins are cited in 68% of failed audits. Separate bins for organic, recyclable and general waste are mandatory.',
    law: 'SWMA 2022 — Section 28',
    steps: ['Label three bins', 'Train staff', 'Display signage'],
    category: 'Waste'
  },
  {
    tag: 'Safety',
    title: 'Fire exit and evacuation routes',
    desc: 'All food businesses must have a clearly marked emergency exit accessible at all times.',
    law: 'OSHA 2007 — Section 22',
    steps: ['Mark exit clearly', 'Keep exit clear', 'Post evacuation map'],
    category: 'Safety'
  },
];

const laws = [
  { id: 'cap242', icon: '🏠', name: 'Cap 242', full: 'Public Health Act', color: '#0F6E56', desc: 'Covers food hygiene, drainage, waste disposal and structural standards for food businesses.' },
  { id: 'emca', icon: '🛡️', name: 'EMCA 1999', full: 'Environmental Management Act', color: '#0C447C', desc: 'Governs environmental protection, pollution control and sustainable use of natural resources.' },
  { id: 'swma', icon: '♻️', name: 'SWMA 2022', full: 'Sustainable Waste Management Act', color: '#BA7517', desc: 'Mandates waste segregation at source, proper disposal and extended producer responsibility.' },
  { id: 'food', icon: '🍽️', name: 'Food Hygiene', full: 'Food Hygiene Regulations 2020', color: '#0F6E56', desc: 'Sets standards for food handling, storage, staff hygiene and premises cleanliness.' },
  { id: 'osha', icon: '⚠️', name: 'OSHA 2007', full: 'Occupational Safety & Health Act', color: '#E24B4A', desc: 'Protects workers from hazards including chemicals, fire risks and unsafe structures.' },
  { id: 'noise', icon: '🔊', name: 'Noise Regs', full: 'Noise Control Regulations 2009', color: '#534AB7', desc: 'Limits noise levels especially at night for businesses near residential areas.' },
];

const recommendations = [
  {
    num: 1,
    title: 'Fix drainage before anything else',
    desc: 'Blocked drainage is cited in 68% of failed audits. A clear, disinfected channel takes under an hour and removes your biggest risk.',
    tags: ['Critical', 'EMCA §72', 'Under 1 hr'],
    tagColors: ['#E24B4A', '#0C447C', '#0F6E56'],
  },
  {
    num: 2,
    title: 'Replace open bins with pedal bins',
    desc: 'SWMA 2022 requires all food premises to use covered waste bins. A KSh 500 pedal bin eliminates an automatic violation.',
    tags: ['Warning', 'SWMA §28', 'Quick fix'],
    tagColors: ['#BA7517', '#0C447C', '#0F6E56'],
  },
  {
    num: 3,
    title: 'Keep a handwashing station visible',
    desc: 'Cap 242 §34 requires a dedicated handwash point with soap at all times during food prep. Inspectors check this first.',
    tags: ['Compliant', 'Cap 242 §34'],
    tagColors: ['#0F6E56', '#0C447C'],
  },
  {
    num: 4,
    title: 'Store food off the floor, covered',
    desc: 'All food must be stored at least 15cm off the ground in sealed containers. This prevents rodent access and satisfies Cap 242 §31.',
    tags: ['Common miss', 'Cap 242 §31'],
    tagColors: ['#BA7517', '#0C447C'],
  },
];

const kitchenZones = [
  { id: 'prep', label: 'PREP AREA', sub: 'Clean surfaces', law: 'Cap 242 §28', color: '#0F6E56', bg: '#E1F5EE' },
  { id: 'cook', label: 'COOKING', sub: 'Ventilation req.', law: 'OSHA §22', color: '#0C447C', bg: '#E6F1FB' },
  { id: 'hand', label: 'HANDWASH', sub: 'Soap + water always present', law: 'Cap 242 §34', color: '#0F6E56', bg: '#E1F5EE' },
  { id: 'store', label: 'STORAGE', sub: 'Off floor, covered', law: 'Cap 242 §31', color: '#BA7517', bg: '#FAEEDA' },
  { id: 'waste', label: 'WASTE', sub: 'Covered bins', law: 'SWMA §18', color: '#E24B4A', bg: '#FCEBEB' },
  { id: 'drain', label: 'DRAINAGE', sub: 'Clear channel', law: 'EMCA §72', color: '#0C447C', bg: '#E6F1FB' },
];

const quizQuestions = [
  {
    question: 'Under SWMA 2022, which type of waste bin is required in food preparation areas?',
    options: ['Any bin with a label', 'A covered, pedal-operated bin', 'A bin placed outside the kitchen'],
    correct: 1,
  },
  {
    question: 'What is the minimum height for food storage off the ground under Cap 242?',
    options: ['5cm', '10cm', '15cm'],
    correct: 2,
  },
  {
    question: 'Which law governs noise levels for businesses near residential areas?',
    options: ['OSHA 2007', 'Noise Control Regulations 2009', 'EMCA 1999'],
    correct: 1,
  },
];

function EducationPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedLaw, setSelectedLaw] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [score, setScore] = useState(0);

  const filteredGuides = guides.filter(g => {
    const matchCat = activeCategory === 'All' || g.category === activeCategory;
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleAnswer(idx) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizQuestions[quizIndex].correct) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (quizIndex + 1 < quizQuestions.length) {
        setQuizIndex(q => q + 1);
        setSelected(null);
      } else {
        setQuizDone(true);
      }
    }, 1200);
  }

  function resetQuiz() {
    setQuizIndex(0);
    setSelected(null);
    setQuizDone(false);
    setScore(0);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'Inter, sans-serif', paddingBottom: 80 }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--legal)', padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <button onClick={() => navigate('/dashboard')} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none',
          borderRadius: '50%', width: 32, height: 32,
          color: '#fff', fontSize: 16, display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>←</button>
        <span style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>Learn & improve</span>
        <button style={{
          marginLeft: 'auto', background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,0.7)', fontSize: 18
        }}>↗</button>
      </div>

      {/* Search */}
      <div style={{ background: 'var(--legal)', padding: '0 16px 16px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search guides..."
          style={{
            width: '100%', padding: '11px 14px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 10, fontSize: 14,
            color: '#fff', outline: 'none',
          }}
        />
      </div>

      {/* Category chips */}
      <div style={{
        display: 'flex', gap: 8, padding: '14px 16px',
        background: '#fff', borderBottom: '1px solid var(--border)',
        overflowX: 'auto'
      }}>
        {categories.map(cat => (
          <div key={cat} onClick={() => setActiveCategory(cat)} style={{
            fontSize: 12, padding: '6px 14px', borderRadius: 20,
            background: activeCategory === cat ? 'var(--eco)' : 'var(--surface)',
            color: activeCategory === cat ? '#fff' : 'var(--text2)',
            border: activeCategory === cat ? 'none' : '1px solid var(--border)',
            cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeCategory === cat ? 500 : 400
          }}>{cat}</div>
        ))}
      </div>

      <div style={{ padding: 16 }}>

        {/* Featured guides */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12 }}>Featured guides</div>

        {filteredGuides.map((guide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: 'linear-gradient(135deg, #0F6E56, #0C447C)',
              borderRadius: 14, padding: 16, marginBottom: 12
            }}
          >
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 500,
              padding: '3px 10px', borderRadius: 20,
              background: 'rgba(255,255,255,0.15)',
              color: '#fff', marginBottom: 10
            }}>{guide.tag}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{guide.title}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 12, lineHeight: 1.5 }}>{guide.desc}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, padding: '6px 12px',
              fontSize: 12, color: '#fff', marginBottom: 12
            }}>📋 {guide.law}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {guide.steps.map((step, j) => (
                <div key={j} style={{
                  flex: 1, background: 'rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '10px 8px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>
                    {j === 0 ? '🔍' : j === 1 ? '🧹' : '✅'}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>{step}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Kenyan laws explained */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12, marginTop: 8 }}>Kenyan laws explained</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {laws.map((law, i) => (
            <div key={i} onClick={() => setSelectedLaw(selectedLaw?.id === law.id ? null : law)} style={{
              background: '#fff', borderRadius: 12,
              border: selectedLaw?.id === law.id ? `2px solid ${law.color}` : '1px solid var(--border)',
              padding: '14px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{law.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: law.color }}>{law.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{law.full}</div>
            </div>
          ))}
        </div>

        {/* Law detail drawer */}
        {selectedLaw && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              background: '#fff', borderRadius: 12,
              border: `1px solid ${selectedLaw.color}`,
              padding: 16, marginBottom: 16
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: selectedLaw.color, marginBottom: 6 }}>
              {selectedLaw.icon} {selectedLaw.full}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{selectedLaw.desc}</div>
          </motion.div>
        )}

        {/* Kitchen layout */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Compliant kitchen layout</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 12 }}>Tap any zone to see what the law requires</div>
        <div style={{
          background: '#fff', borderRadius: 14,
          border: '1px solid var(--border)', padding: 14, marginBottom: 16
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 8 }}>
            {kitchenZones.map((zone, i) => (
              <div key={i} style={{
                background: zone.bg, borderRadius: 8, padding: '10px 6px',
                textAlign: 'center', border: `1px solid ${zone.color}40`
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: zone.color, letterSpacing: 0.5 }}>{zone.label}</div>
                <div style={{ fontSize: 9, color: zone.color, opacity: 0.8, marginTop: 2 }}>{zone.sub}</div>
                <div style={{ fontSize: 9, color: zone.color, fontWeight: 600, marginTop: 4 }}>{zone.law}</div>
              </div>
            ))}
          </div>
          <div style={{
            background: 'var(--legal-light)', borderRadius: 8, padding: '8px 12px',
            fontSize: 11, fontWeight: 500, color: 'var(--legal)', textAlign: 'center',
            border: '1px solid #85B7EB'
          }}>
            CUSTOMER AREA — Noise Regs 2009 + Food Hygiene 2020
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            {[
              { label: 'Hygiene zone', color: '#0F6E56' },
              { label: 'Safety zone', color: '#0C447C' },
              { label: 'Storage zone', color: '#BA7517' },
              { label: 'Waste zone', color: '#E24B4A' },
            ].map((z, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text2)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: z.color }} />
                {z.label}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12 }}>Top recommendations</div>
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: '#fff', borderRadius: 12,
              border: '1px solid var(--border)', padding: '14px',
              marginBottom: 10, display: 'flex', gap: 12
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--eco-light)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'var(--eco)', flexShrink: 0
            }}>{rec.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text1)', marginBottom: 4 }}>{rec.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 8 }}>{rec.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {rec.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontSize: 11, padding: '2px 10px', borderRadius: 20,
                    background: `${rec.tagColors[j]}15`,
                    color: rec.tagColors[j], fontWeight: 500,
                    border: `1px solid ${rec.tagColors[j]}30`
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Quiz */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12, marginTop: 8 }}>Test your knowledge</div>
        <div style={{
          background: 'linear-gradient(135deg, #0C447C, #083d32)',
          borderRadius: 14, padding: 18
        }}>
          {!quizDone ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
                Quick quiz · {quizIndex + 1}/{quizQuestions.length}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 16, lineHeight: 1.5 }}>
                {quizQuestions[quizIndex].question}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {quizQuestions[quizIndex].options.map((opt, i) => {
                  let bg = 'rgba(255,255,255,0.08)';
                  let border = '1px solid rgba(255,255,255,0.15)';
                  let color = '#fff';
                  if (selected !== null) {
                    if (i === quizQuestions[quizIndex].correct) {
                      bg = 'rgba(15,110,86,0.4)';
                      border = '1px solid #9FE1CB';
                    } else if (i === selected) {
                      bg = 'rgba(226,75,74,0.4)';
                      border = '1px solid #E24B4A';
                    }
                  }
                  return (
                    <div key={i} onClick={() => handleAnswer(i)} style={{
                      padding: '12px 14px', borderRadius: 10,
                      background: bg, border, color,
                      fontSize: 13, cursor: 'pointer', transition: 'all 0.2s'
                    }}>{opt}</div>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{score === quizQuestions.length ? '🎉' : '📚'}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                {score}/{quizQuestions.length} correct
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
                {score === quizQuestions.length ? 'Perfect score! You know your Kenyan law.' : 'Keep learning — review the guides above.'}
              </div>
              <button onClick={resetQuiz} style={{
                background: '#fff', border: 'none', color: 'var(--legal)',
                fontSize: 13, fontWeight: 600, padding: '10px 24px', borderRadius: 10
              }}>Try again</button>
            </div>
          )}
        </div>

      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 420, background: '#fff',
        borderTop: '1px solid var(--border)', display: 'flex',
        padding: '10px 0', zIndex: 100
      }}>
        {[
          { icon: '🏠', label: 'Home', path: '/dashboard' },
          { icon: '📸', label: 'Audit', path: '/audit' },
          { icon: '📚', label: 'Learn', path: '/education', active: true },
          { icon: '👤', label: 'Profile', path: '/' },
        ].map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)} style={{
            flex: 1, background: 'transparent', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '4px 0'
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: item.active ? 600 : 400, color: item.active ? 'var(--legal)' : 'var(--text3)' }}>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}

export default EducationPage;