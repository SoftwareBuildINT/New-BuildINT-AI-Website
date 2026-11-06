import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { img } from '../../config.js'
import { GreenXMark } from '../GreenX.jsx'

/* ------------------------------------------------------------------ *
 * Home page story film (white theme).
 *   1. The building   2. Inside   3. The problem
 *   4. The solution (Green X platform + devices)
 *   5. The product (live platform demo)   6. The result
 * Isometric SVG scenes + real product photos. Plain React + CSS
 * animations, so it weighs almost nothing and pauses cleanly.
 * ------------------------------------------------------------------ */

const CHAPTERS = [
  { id: 'building', label: 'The Building', dur: 6, scene: 'ext', kicker: 'Every building', title: 'Your Building Never Stops Consuming',
    text: 'Offices, bank branches, hospitals and factories run AC, lighting, pumps and UPS from morning to night, often across hundreds of sites.' },
  { id: 'inside', label: 'Inside', dur: 6, scene: 'room', kicker: 'Step inside', title: 'Dozens of Systems on Every Floor',
    text: 'AC units, lights, meters and UPS keep people comfortable and the business running, each one drawing power all day.' },
  { id: 'problem', label: 'The Problem', dur: 9, scene: 'room', kicker: 'The problem', title: 'Energy Leaks Nobody Can See',
    text: 'Most buildings lose energy every single day without anyone noticing.' },
  { id: 'solution', label: 'The Solution', dur: 9, scene: 'room', kicker: 'The solution', title: 'Green X Energy Intelligence Platform',
    text: 'Made-in-India Green X devices connect every AC, light and meter to one AI-powered cloud that senses, controls and optimises on its own.' },
  { id: 'product', label: 'The Product', dur: 10, scene: 'dash', kicker: 'The product', title: 'One Dashboard. Every Site. Live.',
    text: 'The Green X platform monitors energy, runs HVAC and lighting automatically and flags issues before they cost you.' },
  { id: 'result', label: 'The Result', dur: 7, scene: 'ext', kicker: 'The result', title: 'Smarter, Safer, Greener Buildings',
    text: 'Lower bills, automated operations and complete visibility, from a single branch to a national network.' },
]
const STARTS = CHAPTERS.reduce((a, c, i) => [...a, i ? a[i - 1] + CHAPTERS[i - 1].dur : 0], [])
const TOTAL = CHAPTERS.reduce((s, c) => s + c.dur, 0)
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

const PROBLEMS = [
  { t: 'Energy wastage', d: 'ACs cool empty rooms, lights burn after hours', at: 0.4 },
  { t: 'Fragmented systems', d: 'AC, lighting and meters each run on their own', at: 2.8 },
  { t: 'Limited visibility', d: 'No live view of usage until the bill arrives', at: 5.2 },
]
const DEVICES = [
  { n: 1, name: 'Green X 100', role: 'Lighting · LiBi', img: 'products/libi' },
  { n: 2, name: 'Green X 200', role: 'Meters & UPS · BigIO', img: 'products/bigio' },
  { n: 3, name: 'Green X 500', role: 'AC control · NEON', img: 'products/neon' },
  { n: 4, name: 'Green X 1000', role: 'Sensors · Bi-Bug', img: 'products/bibug' },
]
const MODULES = ['Overview', 'Energy', 'HVAC', 'Lighting', 'Alerts']

const C = { ink: '#0F172A', slate: '#475569', mute: '#94A3B8', line: '#E2E8F0', line2: '#CBD5E1', bg: '#F8FAFC', green: '#3CA80C', deep: '#2B7F0A', lime: '#76DF23', tint: '#F1FAEA', red: '#DC2626', redTint: '#FEF2F2', amber: '#F59E0B', sky: '#7DD3FC', glass: '#DCEBF7', warm: '#FFE39A' }

/* ---------- isometric helpers ---------- */
function iso(S, ox, oy) {
  const p = (x, y, z = 0) => [ox + (x - y) * S * 0.866, oy + (x + y) * S * 0.5 - z * S]
  const poly = (...a) => a.map((q) => p(...q).map((n) => n.toFixed(1)).join(',')).join(' ')
  return { p, poly, S }
}
function Box({ I, x0, x1, y0, y1, z0, z1, top = '#fff', left = '#F4F7FA', right = '#E6ECF2', stroke = C.line2, sw = 1 }) {
  return (
    <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
      <polygon points={I.poly([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1])} fill={left} />
      <polygon points={I.poly([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1])} fill={right} />
      <polygon points={I.poly([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1])} fill={top} />
    </g>
  )
}
const quadY = (I, c, x0, x1, z0, z1) => I.poly([x0, c, z0], [x1, c, z0], [x1, c, z1], [x0, c, z1])
const quadX = (I, c, y0, y1, z0, z1) => I.poly([c, y0, z0], [c, y1, z0], [c, y1, z1], [c, y0, z1])

/* Flat label pill in screen space */
function Pill({ x, y, text, tone = 'ink', delay = 0, anchor = 'middle', icon }) {
  const w = text.length * 6.1 + (icon ? 34 : 22)
  const fill = { ink: C.ink, red: C.red, green: C.deep, white: '#fff' }[tone]
  const fg = tone === 'white' ? C.ink : '#fff'
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x
  return (
    <g className="xf-pop" style={{ animationDelay: `${delay}s` }}>
      <rect x={x0} y={y - 12} width={w} height={24} rx={12} fill={fill} stroke={tone === 'white' ? C.line : 'none'} filter="url(#xf-sh)" />
      {icon && <circle cx={x0 + 13} cy={y} r={4} fill={tone === 'red' ? '#FECACA' : tone === 'green' ? C.lime : C.lime} className={tone === 'red' ? 'xf-blink' : ''} />}
      <text x={x0 + (icon ? 24 : 11)} y={y + 4} fontSize="11" fontWeight="700" fill={fg} fontFamily="Plus Jakarta Sans, system-ui, sans-serif">{text}</text>
    </g>
  )
}

function Defs() {
  return (
    <defs>
      <filter id="xf-sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity=".14" /></filter>
      <filter id="xf-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10" /></filter>
      <radialGradient id="xf-cone" cx="50%" cy="100%" r="80%"><stop offset="0" stopColor={C.warm} stopOpacity=".75" /><stop offset="1" stopColor={C.warm} stopOpacity="0" /></radialGradient>
      <linearGradient id="xf-glass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#EAF4FC" /><stop offset=".55" stopColor="#D3E6F5" /><stop offset="1" stopColor="#C4DCEF" /></linearGradient>
      <linearGradient id="xf-sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#BFE3FB" /><stop offset="1" stopColor="#EFF8FE" /></linearGradient>
      <radialGradient id="xf-halo"><stop offset="0" stopColor={C.lime} stopOpacity=".45" /><stop offset="1" stopColor={C.lime} stopOpacity="0" /></radialGradient>
    </defs>
  )
}

/* =================================================================== *
 * Scene A: building exterior
 * =================================================================== */
function Exterior({ green }) {
  const I = iso(20, 292, 266)
  const W = 10, D = 7, F = 5, FH = 1.9, H = F * FH
  const tree = (x, y, s = 1, d = 0) => {
    const [tx, ty] = I.p(x, y, 0)
    return (
      <g key={`${x}${y}`} className="xf-pop" style={{ animationDelay: `${d}s` }}>
        <ellipse cx={tx} cy={ty} rx={14 * s} ry={6 * s} fill="#0F172A" opacity=".07" />
        <rect x={tx - 1.5} y={ty - 22 * s} width="3" height={22 * s} fill="#A8865E" />
        <circle cx={tx} cy={ty - 30 * s} r={14 * s} fill="#8BD45A" />
        <circle cx={tx + 5 * s} cy={ty - 26 * s} r={9 * s} fill="#5DB534" />
      </g>
    )
  }
  const hub = I.p(0.8, 6.2, H + 2.4)
  let wi = 0
  return (
    <g>
      {/* sky accents */}
      <g className="xf-a" style={{ animationDelay: '.1s' }}>
        <g className="xf-drift"><ellipse cx="96" cy="70" rx="38" ry="12" fill="#EEF4FA" /><ellipse cx="118" cy="62" rx="24" ry="13" fill="#EEF4FA" /></g>
        <g className="xf-drift" style={{ animationDelay: '-6s' }}><ellipse cx="520" cy="44" rx="34" ry="10" fill="#EEF4FA" /><ellipse cx="540" cy="37" rx="20" ry="11" fill="#EEF4FA" /></g>
        <circle cx="560" cy="96" r="20" fill="#FFF3C4" /><circle cx="560" cy="96" r="12" fill="#FFE08A" />
      </g>
      {green && <ellipse cx={I.p(5, 3.5)[0]} cy={I.p(5, 3.5)[1] + 10} rx="270" ry="120" fill="url(#xf-halo)" className="xf-fade" />}
      {/* ground */}
      <polygon points={I.poly([-3.5, -3.5, 0], [13.5, -3.5, 0], [13.5, 10.5, 0], [-3.5, 10.5, 0])} fill="#F1F5F3" />
      <polygon points={I.poly([-3.5, 10.5, 0], [13.5, 10.5, 0], [13.5, 10.5, -0.5], [-3.5, 10.5, -0.5])} fill="#E2E8E4" />
      <polygon points={I.poly([13.5, -3.5, 0], [13.5, 10.5, 0], [13.5, 10.5, -0.5], [13.5, -3.5, -0.5])} fill="#D5DDD8" />
      <polygon points={I.poly([4.3, 7, 0], [5.7, 7, 0], [5.7, 10.5, 0], [4.3, 10.5, 0])} fill="#E2E8F0" />
      <polygon points={I.poly([-3.5, 8.2, 0], [13.5, 8.2, 0], [13.5, 10.5, 0], [-3.5, 10.5, 0])} fill="#E8EDF1" opacity=".7" />

      {/* neighbour tower (context) */}
      <g opacity=".7" className="xf-fade"><Box I={I} x0={1} x1={5} y0={-8} y1={-4.4} z0={0} z1={8} top="#F8FAFC" left="#F1F5F9" right="#E8EEF4" stroke="#E2E8F0" /></g>

      {/* floors stack in one by one */}
      {Array.from({ length: F }, (_, f) => {
        const z0 = f * FH, z1 = z0 + FH
        return (
          <g key={f} className="xf-drop" style={{ animationDelay: `${0.25 + f * 0.16}s` }}>
            <Box I={I} x0={0} x1={W} y0={0} y1={D} z0={z0} z1={z1} />
            <polygon points={I.poly([0, D, z1 - 0.12], [W, D, z1 - 0.12], [W, D, z1], [0, D, z1])} fill="#E2E8F0" />
            <polygon points={I.poly([W, 0, z1 - 0.12], [W, D, z1 - 0.12], [W, D, z1], [W, 0, z1])} fill="#D5DEE7" />
            {/* windows: left face */}
            {[0, 1, 2, 3, 4].map((i) => {
              if (f === 0 && i === 2) return null
              const x = 0.6 + i * 1.8, k = wi++
              return <polygon key={`l${i}`} points={quadY(I, D, x, x + 1.4, z0 + 0.5, z0 + 1.45)} fill="url(#xf-glass)" stroke="#B9CCDD" strokeWidth=".8"
                className={green ? '' : 'xf-litw'} style={{ animationDelay: `${1.4 + (k % 9) * 0.12 + f * 0.05}s` }} />
            })}
            {/* windows: right face */}
            {[0, 1, 2, 3].map((i) => {
              const y = 0.55 + i * 1.6, k = wi++
              return <polygon key={`r${i}`} points={quadX(I, W, y, y + 1.1, z0 + 0.5, z0 + 1.45)} fill="#C9DCEC" stroke="#AFC3D6" strokeWidth=".8"
                className={green ? '' : 'xf-litw'} style={{ animationDelay: `${1.4 + (k % 9) * 0.12 + f * 0.05}s` }} />
            })}
            {f === 0 && (
              <g>
                <polygon points={quadY(I, D, 4.2, 5.8, 0, 1.55)} fill="#CFE3F3" stroke={C.green} strokeWidth="1.6" />
                <line x1={I.p(5, D, 0)[0]} y1={I.p(5, D, 0)[1]} x2={I.p(5, D, 1.55)[0]} y2={I.p(5, D, 1.55)[1]} stroke={C.green} strokeWidth="1.2" />
                <polygon points={I.poly([3.9, D, 1.75], [6.1, D, 1.75], [6.1, D + 0.9, 1.75], [3.9, D + 0.9, 1.75])} fill={C.green} />
              </g>
            )}
          </g>
        )
      })}
      {/* brand band on the top floor */}
      <g className="xf-a" style={{ animationDelay: '1.2s' }}>
        <polygon points={quadY(I, D, 0, W, H - 0.12, H + 0.25)} fill={C.green} />
        <polygon points={quadX(I, W, 0, D, H - 0.12, H + 0.25)} fill={C.deep} />
        <polygon points={I.poly([0, 0, H + 0.25], [W, 0, H + 0.25], [W, D, H + 0.25], [0, D, H + 0.25])} fill="#fff" stroke={C.line2} />
      </g>
      {/* roof: HVAC + solar */}
      <g className="xf-a" style={{ animationDelay: '1.35s' }}>
        {[[1, 3, 0.8, 2.6], [1, 3, 3.2, 5]].map(([a, b, c, d], i) => {
          const [fx, fy] = I.p((a + b) / 2, (c + d) / 2, H + 1.15)
          return (
            <g key={i}>
              <Box I={I} x0={a} x1={b} y0={c} y1={d} z0={H + 0.25} z1={H + 1.15} top="#F1F5F9" left="#E2E8F0" right="#D3DCE6" />
              <g transform={`translate(${fx} ${fy}) scale(1 .55)`}>
                <circle r="11" fill="#CBD5E1" stroke="#94A3B8" />
                <g className="xf-spin"><path d="M0 0 L0 -10 M0 0 L8.7 5 M0 0 L-8.7 5" stroke="#64748B" strokeWidth="2.4" strokeLinecap="round" /></g>
              </g>
            </g>
          )
        })}
        {[0, 1, 2].map((j) => [[1, 2.8], [3.6, 5.4]].map(([y0, y1], r) => (
          <g key={`${j}${r}`}>
            <polygon points={I.poly([4.8 + j * 1.6, y0, H + 0.45], [6.2 + j * 1.6, y0, H + 0.45], [6.2 + j * 1.6, y1, H + 0.75], [4.8 + j * 1.6, y1, H + 0.75])} fill="#2C4A6E" stroke="#1E3550" strokeWidth=".8" />
            <polyline points={I.poly([5.5 + j * 1.6, y0, H + 0.45], [5.5 + j * 1.6, y1, H + 0.75])} stroke="#5B7FA6" strokeWidth=".7" fill="none" />
          </g>
        )))}
      </g>
      {/* Green X hub on the roof (result) */}
      {green && (
        <g className="xf-pop" style={{ animationDelay: '.5s' }}>
          <line x1={I.p(0.8, 6.2, H + 0.25)[0]} y1={I.p(0.8, 6.2, H + 0.25)[1]} x2={hub[0]} y2={hub[1] + 10} stroke="#64748B" strokeWidth="2.5" />
          <circle cx={hub[0]} cy={hub[1]} r="13" className="xf-ring" fill="none" stroke={C.lime} strokeWidth="2" />
          <circle cx={hub[0]} cy={hub[1]} r="13" className="xf-ring" style={{ animationDelay: '1s' }} fill="none" stroke={C.lime} strokeWidth="2" />
          <circle cx={hub[0]} cy={hub[1]} r="11" fill="#fff" stroke={C.green} strokeWidth="2" />
          <path d={`M${hub[0] - 5} ${hub[1] - 5} L${hub[0] + 5} ${hub[1] + 5} M${hub[0] + 5} ${hub[1] - 5} L${hub[0] - 5} ${hub[1] + 5}`} stroke={C.lime} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {tree(-1.6, 8.6, 1, 0.9)}{tree(11.6, -1.4, 0.9, 1)}{tree(12, 6.5, 1.1, 1.1)}{tree(8.5, 9.6, 0.8, 1.2)}
      {!green && <Pill x={I.p(5, D, 0)[0] - 30} y={I.p(5, 9.8)[1] + 34} text="Offices · Banks · Hospitals · Factories" tone="white" delay={2.2} />}
      {green && <Pill x={hub[0]} y={hub[1] - 30} text="Green X connected" tone="green" icon delay={0.9} />}
    </g>
  )
}

/* =================================================================== *
 * Scene B: interior (one office floor). mode: inside | problem | solution
 * =================================================================== */
const RI = iso(28, 272, 196)
const DEV = { neon: [4.15, 0, 4.05], libi: [0, 7.0, 2.45], bigio: [11.35, 0.3, 2.2], bibug: [6.65, 0, 4.55] }

function Lamp({ x, y, on, delay = 0 }) {
  const I = RI
  const [sx, sy] = I.p(x, y, 4.15)
  const [fx, fy] = I.p(x, y, 0)
  const rx = 1.25 * I.S * 1.22, ry = 1.25 * I.S * 0.707
  return (
    <g>
      <g style={{ opacity: on ? 0.75 : 0, transition: `opacity 1.2s ease ${delay}s` }}>
        <polygon points={`${sx - 7},${sy + 3} ${sx + 7},${sy + 3} ${fx + rx},${fy} ${fx - rx},${fy}`} fill="url(#xf-cone)" />
        <ellipse cx={fx} cy={fy} rx={rx} ry={ry} fill={C.warm} opacity=".38" />
      </g>
      <line x1={sx} y1={I.p(x, y, 5)[1]} x2={sx} y2={sy} stroke="#94A3B8" strokeWidth="1.2" />
      <path d={`M${sx - 9} ${sy + 4} L${sx - 4} ${sy - 4} L${sx + 4} ${sy - 4} L${sx + 9} ${sy + 4} Z`} fill="#334155" />
      <ellipse cx={sx} cy={sy + 4} rx="9" ry="2.6" style={{ fill: on ? '#FFE9A8' : '#CBD5E1', transition: `fill 1.2s ease ${delay}s` }} />
    </g>
  )
}

function AC({ a, b, flow, led, delay = 0 }) {
  const I = RI
  return (
    <g>
      <Box I={I} x0={a} x1={b} y0={0} y1={0.42} z0={3.75} z1={4.5} top="#F8FAFC" left="#FFFFFF" right="#E2E8F0" />
      <polyline points={I.poly([a + 0.15, 0.42, 3.86], [b - 0.15, 0.42, 3.86])} fill="none" stroke="#94A3B8" strokeWidth="1.4" />
      <circle cx={I.p(b - 0.25, 0.42, 4.25)[0]} cy={I.p(b - 0.25, 0.42, 4.25)[1]} r="2.6" style={{ fill: led, transition: `fill .6s ease ${delay}s` }} />
      <g style={{ opacity: flow ? 1 : 0, transition: `opacity 1s ease ${delay}s` }}>
        {[0, 1, 2].map((i) => {
          const x = a + 0.35 + i * ((b - a - 0.7) / 2)
          const [x1, y1] = I.p(x, 0.55, 3.65), [x2, y2] = I.p(x, 1.6, 2.9), [x3, y3] = I.p(x, 2.7, 2.2)
          return <path key={i} d={`M${x1} ${y1} Q ${x2 - 8} ${y2} ${x2} ${y2} T ${x3} ${y3}`} fill="none" stroke={C.sky} strokeWidth="2.2" strokeLinecap="round" className="xf-flow" style={{ animationDelay: `${i * 0.2}s` }} />
        })}
      </g>
    </g>
  )
}

function Person({ x, y, shirt }) {
  const I = RI
  const [hx, hy] = I.p(x, y, 2.4)
  const [bx, by] = I.p(x, y, 1.0)
  return (
    <g>
      <Box I={I} x0={x - 0.38} x1={x + 0.38} y0={y + 0.3} y1={y + 0.48} z0={0.55} z1={1.25} top="#64748B" left="#475569" right="#334155" stroke="none" />
      <path d={`M${bx - 10} ${by} Q ${bx - 11} ${hy + 8} ${bx} ${hy + 7} Q ${bx + 11} ${hy + 8} ${bx + 10} ${by} Z`} fill={shirt} />
      <rect x={hx - 3} y={hy + 4} width="6" height="5" fill="#D9A77E" />
      <circle cx={hx} cy={hy} r="7.5" fill="#3F2E21" />
      <ellipse cx={hx - 7} cy={hy + 1} rx="1.6" ry="2.4" fill="#D9A77E" /><ellipse cx={hx + 7} cy={hy + 1} rx="1.6" ry="2.4" fill="#D9A77E" />
    </g>
  )
}

function DeviceMark({ at, n, delay }) {
  const [x, y] = RI.p(...at)
  return (
    <g className="xf-pop" style={{ animationDelay: `${delay}s` }}>
      <circle cx={x} cy={y} r="9" fill="none" stroke={C.lime} strokeWidth="2" className="xf-ring" />
      <rect x={x - 7} y={y - 7} width="14" height="14" rx="4" fill="#fff" stroke={C.green} strokeWidth="2" />
      <rect x={x - 3.5} y={y - 3} width="7" height="1.8" fill={C.green} /><rect x={x - 2} y={y - 0.5} width="5.5" height="1.8" fill={C.lime} /><rect x={x - 3.5} y={y + 2} width="7" height="1.8" fill={C.green} />
      <circle cx={x + 9} cy={y - 9} r="7" fill={C.ink} />
      <text x={x + 9} y={y - 5.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Plus Jakarta Sans, sans-serif">{n}</text>
    </g>
  )
}

function Room({ mode }) {
  const I = RI
  const sol = mode === 'solution', prob = mode === 'problem'
  const offDelay = sol ? 4.4 : 0
  const meetingOn = !sol
  const ledColor = prob ? C.red : C.lime
  const dial = I.p(11.35, 0.3, 2.85)
  const hub = [520, 52]
  const link = (k, i) => {
    const [x, y] = I.p(...DEV[k])
    const d = `M${x} ${y} C ${x} ${y - 70}, ${hub[0] - 40 + i * 12} ${hub[1] + 60}, ${hub[0]} ${hub[1] + 16}`
    return (
      <g key={k}>
        <path d={d} fill="none" stroke={C.green} strokeOpacity=".45" strokeWidth="1.6" strokeDasharray="4 5" className="xf-fade" style={{ animationDelay: `${2.6 + i * 0.15}s` }} />
        <circle r="3.2" fill={C.green}><animateMotion dur={`${1.8 + i * 0.25}s`} begin={`${2.9 + i * 0.2}s`} repeatCount="indefinite" path={d} /></circle>
      </g>
    )
  }

  return (
    <g style={{ transform: sol ? 'translate(0px, 6px) scale(.8)' : 'none', transformOrigin: '330px 30px', transformBox: 'view-box', transition: 'transform 1s cubic-bezier(.2,.7,.2,1)' }}>
      {/* soft shadow under the room */}
      <ellipse cx={I.p(6, 4)[0]} cy={I.p(12, 8)[1] - 40} rx="250" ry="70" fill="#0F172A" opacity=".06" filter="url(#xf-soft)" />
      {/* floor + walls */}
      <polygon points={I.poly([0, 0, 0], [12, 0, 0], [12, 8, 0], [0, 8, 0])} fill="#F8FAFC" stroke={C.line2} />
      <polygon points={I.poly([0, 8, 0], [12, 8, 0], [12, 8, -0.3], [0, 8, -0.3])} fill="#E2E8F0" />
      <polygon points={I.poly([12, 0, 0], [12, 8, 0], [12, 8, -0.3], [12, 0, -0.3])} fill="#CBD5E1" />
      {[2, 4, 6, 8, 10].map((x) => <polyline key={x} points={I.poly([x, 0, 0], [x, 8, 0])} stroke="#EEF2F6" fill="none" />)}
      <polygon points={I.poly([0, 0, 0], [12, 0, 0], [12, 0, 5], [0, 0, 5])} fill="#FFFFFF" stroke={C.line2} />
      <polygon points={I.poly([0, 0, 0], [0, 8, 0], [0, 8, 5], [0, 0, 5])} fill="#F1F5F9" stroke={C.line2} />
      <polygon points={I.poly([-0.25, -0.25, 5], [12, -0.25, 5], [12, 0, 5], [0, 0, 5], [0, 8, 5], [-0.25, 8, 5])} fill="#CBD5E1" />
      <polygon points={I.poly([0.3, 0.3, 0], [4.9, 0.3, 0], [4.9, 7.7, 0], [0.3, 7.7, 0])} fill="#EEF2F7" />

      {/* wall items */}
      <polygon points={quadX(I, 0.02, 2.4, 5.4, 1.9, 3.5)} fill="#1E293B" />
      <polygon points={quadX(I, 0.03, 2.55, 5.25, 2.0, 3.4)} fill="#334155" />
      <polygon points={quadY(I, 0.02, 5.8, 7.7, 1.3, 4.0)} fill="url(#xf-sky)" stroke="#B9CCDD" strokeWidth="2" />
      <polyline points={I.poly([6.75, 0.02, 1.3], [6.75, 0.02, 4.0])} stroke="#B9CCDD" strokeWidth="2" fill="none" />
      <polygon points={quadY(I, 0.03, 6.0, 6.5, 2.8, 3.7)} fill="#fff" opacity=".55" />
      <AC a={1.2} b={3.6} flow={meetingOn} led={sol ? C.lime : ledColor} delay={offDelay} />
      <AC a={8.2} b={10.5} flow led={prob ? C.amber : C.lime} />
      {/* panel + meter */}
      <Box I={I} x0={10.85} x1={11.85} y0={0} y1={0.3} z0={1.0} z1={3.45} top="#E2E8F0" left="#F1F5F9" right="#CBD5E1" />
      <ellipse cx={dial[0]} cy={dial[1]} rx="9" ry="9" fill="#fff" stroke="#94A3B8" />
      <g transform={`translate(${dial[0]} ${dial[1]})`}><line x1="0" y1="0" x2="0" y2="-7" strokeWidth="2" strokeLinecap="round" className={prob ? 'xf-spin-fast' : 'xf-spin-slow'} style={{ stroke: prob ? C.red : sol ? C.green : '#475569', transition: 'stroke .6s ease 4.4s' }} /></g>
      <text x={dial[0]} y={dial[1] + 24} textAnchor="middle" fontSize="7" fontWeight="700" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">METER</text>
      <Box I={I} x0={10.9} x1={11.8} y0={0.7} y1={1.6} z0={0} z1={1.3} top="#E2E8F0" left="#F8FAFC" right="#CBD5E1" />
      <circle cx={I.p(11.35, 1.6, 1.0)[0]} cy={I.p(11.35, 1.6, 1.0)[1]} r="2" fill={C.lime} />
      {/* switch board (lighting) */}
      <polygon points={quadX(I, 0.03, 6.7, 7.4, 2.15, 2.75)} fill="#fff" stroke="#94A3B8" />

      {/* meeting room furniture */}
      {[[1.7, 2.3], [3.0, 3.6]].map(([a, b]) => <Box key={a} I={I} x0={a} x1={b} y0={2.55} y1={3.0} z0={0} z1={0.75} top="#94A3B8" left="#CBD5E1" right="#94A3B8" stroke="none" />)}
      <Box I={I} x0={1.3} x1={3.9} y0={3.1} y1={5.9} z0={0.95} z1={1.12} top="#EADFD2" left="#DCCBB8" right="#CDB9A3" stroke="#C5B29C" />
      <polyline points={I.poly([2.6, 4.5, 0], [2.6, 4.5, 0.95])} stroke="#94A3B8" strokeWidth="3" fill="none" />
      {[[1.7, 2.3], [3.0, 3.6]].map(([a, b]) => <Box key={a} I={I} x0={a} x1={b} y0={6.05} y1={6.5} z0={0} z1={0.75} top="#94A3B8" left="#CBD5E1" right="#94A3B8" stroke="none" />)}
      <Lamp x={2.6} y={4.5} on={meetingOn} delay={offDelay} />
      {/* glass partition */}
      <polygon points={quadX(I, 5.2, 0, 8, 0, 3.6)} fill="#E0F2FE" fillOpacity=".35" stroke="#BAE6FD" />
      <polyline points={I.poly([5.2, 0, 3.6], [5.2, 8, 3.6])} stroke="#7DD3FC" strokeWidth="2" fill="none" />

      {/* workspace */}
      {[7.0, 9.0].map((a) => <g key={a}><polygon points={quadY(I, 3.35, a, a + 1.1, 1.3, 2.05)} fill="#0F172A" /><polygon points={quadY(I, 3.36, a + 0.08, a + 1.02, 1.36, 1.99)} fill="#BAE6FD" /></g>)}
      <Box I={I} x0={6.4} x1={10.6} y0={3.0} y1={4.3} z0={1.0} z1={1.12} top="#F8FAFC" left="#E2E8F0" right="#CBD5E1" />
      <Person x={7.55} y={4.85} shirt={C.green} />
      <Person x={9.55} y={4.85} shirt="#64748B" />
      {[7.0, 9.0].map((a) => <g key={a}><polygon points={quadY(I, 5.95, a, a + 1.1, 1.3, 2.05)} fill="#0F172A" /><polygon points={quadY(I, 5.96, a + 0.08, a + 1.02, 1.36, 1.99)} fill="#BAE6FD" /></g>)}
      <Box I={I} x0={6.4} x1={10.6} y0={5.6} y1={6.9} z0={1.0} z1={1.12} top="#F8FAFC" left="#E2E8F0" right="#CBD5E1" />
      <Person x={9.55} y={7.4} shirt="#0EA5E9" />
      <Lamp x={7.6} y={3.6} on />
      <Lamp x={9.9} y={6.2} on />

      {/* ---- chapter overlays ---- */}
      {mode === 'inside' && (
        <g key="inside">
          <Pill x={I.p(9.35, 0, 4.5)[0]} y={I.p(9.35, 0, 4.5)[1] - 22} text="Air conditioning" delay={0.5} />
          <Pill x={I.p(9.9, 6.2, 4.2)[0] + 52} y={I.p(9.9, 6.2, 4.2)[1] + 4} text="Lighting" delay={1.1} />
          <Pill x={I.p(11.35, 0.3, 3.5)[0] + 6} y={I.p(11.35, 0.3, 3.5)[1] - 24} text="Meter & UPS" delay={1.7} />
          <Pill x={I.p(8.5, 6.2, 2.6)[0]} y={I.p(8.5, 6.2, 2.6)[1] + 70} text="People at work" delay={2.3} />
          <Pill x={I.p(2.6, 4.5, 2.4)[0]} y={I.p(2.6, 4.5, 2.4)[1] - 6} text="Meeting room" tone="white" delay={2.9} />
        </g>
      )}
      {prob && (
        <g key="problem">
          {/* 1. wastage */}
          <Pill x={I.p(2.6, 4.5, 2.6)[0]} y={I.p(2.6, 4.5, 2.6)[1] - 10} text="Empty room: AC + lights ON" tone="red" icon delay={0.5} />
          {[0, 1, 2, 3, 4].map((i) => (
            <text key={i} x={dial[0] - 14 + (i % 3) * 14} y={dial[1] - 14} fontSize="14" fontWeight="800" fill={C.red} className="xf-rise" style={{ animationDelay: `${0.9 + i * 0.45}s` }} fontFamily="Plus Jakarta Sans, sans-serif">₹</text>
          ))}
          <Pill x={dial[0] - 22} y={dial[1] + 30} text="Bill keeps rising" tone="red" anchor="end" delay={1.4} />
          {/* 2. fragmented systems */}
          {(() => {
            const a = [I.p(9.35, 0, 4.5)[0], I.p(9.35, 0, 4.5)[1] - 24]
            const b = [I.p(0, 7.05, 2.45)[0] + 12, I.p(0, 7.05, 2.45)[1] - 50]
            const m = [I.p(11.35, 0.3, 1.0)[0] + 18, I.p(11.35, 0.3, 1.0)[1] + 26]
            const seg = (p, q, d) => (
              <g className="xf-a" style={{ animationDelay: `${d}s` }}>
                <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={C.red} strokeWidth="1.6" strokeDasharray="5 6" opacity=".7" />
                <g transform={`translate(${(p[0] + q[0]) / 2} ${(p[1] + q[1]) / 2})`}><circle r="8" fill="#fff" stroke={C.red} strokeWidth="1.5" /><path d="M-3.5 -3.5 L3.5 3.5 M3.5 -3.5 L-3.5 3.5" stroke={C.red} strokeWidth="2" strokeLinecap="round" /></g>
              </g>
            )
            return (
              <g>
                {seg(a, b, 3.6)}{seg(a, m, 3.8)}
                <Pill x={a[0]} y={a[1]} text="AC: own remote" tone="white" delay={3.0} />
                <Pill x={b[0]} y={b[1]} text="Lights: wall switches" tone="white" delay={3.2} />
                <Pill x={m[0]} y={m[1]} text="Meter: manual reading" tone="white" delay={3.4} />
              </g>
            )
          })()}
          {/* 3. no visibility */}
          <g className="xf-pop" style={{ animationDelay: '5.4s' }}>
            <rect x="36" y="26" width="178" height="74" rx="14" fill="#fff" stroke={C.line} filter="url(#xf-sh)" />
            <g transform="translate(58 50)" stroke={C.red} strokeWidth="2" fill="none" strokeLinecap="round"><path d="M-9 0 Q0 -9 9 0 Q0 9 -9 0Z" /><circle r="2.8" /><path d="M-10 8 L10 -8" /></g>
            <text x="76" y="47" fontSize="10.5" fontWeight="700" fill={C.slate} fontFamily="Plus Jakarta Sans, sans-serif">Energy used today</text>
            <text x="76" y="68" fontSize="20" fontWeight="800" fill={C.ink} fontFamily="Plus Jakarta Sans, sans-serif">??? kWh</text>
            <text x="48" y="88" fontSize="9.5" fontWeight="600" fill={C.red} fontFamily="Plus Jakarta Sans, sans-serif">No live data until the bill arrives</text>
          </g>
        </g>
      )}
      {sol && (
        <g key="solution">
          <DeviceMark at={DEV.libi} n={1} delay={0.4} />
          <DeviceMark at={DEV.bigio} n={2} delay={0.75} />
          <DeviceMark at={DEV.neon} n={3} delay={1.1} />
          <DeviceMark at={DEV.bibug} n={4} delay={1.45} />
          {['libi', 'bigio', 'neon', 'bibug'].map(link)}
          <g className="xf-pop" style={{ animationDelay: '2.4s' }}>
            <circle cx={hub[0]} cy={hub[1]} r="22" fill="none" stroke={C.lime} strokeWidth="2" className="xf-ring" />
            <rect x={hub[0] - 62} y={hub[1] - 17} width="124" height="34" rx="17" fill="#fff" stroke={C.green} strokeWidth="1.5" filter="url(#xf-sh)" />
            <g transform={`translate(${hub[0] - 44} ${hub[1]})`}><path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke={C.lime} strokeWidth="3.4" strokeLinecap="round" /></g>
            <text x={hub[0] - 30} y={hub[1] + 4} fontSize="11.5" fontWeight="800" fill={C.ink} fontFamily="Plus Jakarta Sans, sans-serif">Green X Cloud</text>
          </g>
          <Pill x={I.p(2.6, 4.5, 2.6)[0]} y={I.p(2.6, 4.5, 2.6)[1] - 10} text="Room empty: AC + lights OFF" tone="green" icon delay={4.6} />
          <Pill x={dial[0] + 2} y={dial[1] - 70} text="Saving energy" tone="green" icon delay={5.2} />
        </g>
      )}
    </g>
  )
}

/* =================================================================== *
 * Scene C: platform demo (HTML, in the 640×540 design box)
 * =================================================================== */
function Dashboard({ sub }) {
  const m = Math.min(sub, MODULES.length - 1)
  return (
    <div className="xf-zoomin absolute left-[18px] top-[22px] grid h-[496px] w-[604px] grid-cols-[132px_1fr] overflow-hidden rounded-[18px] border border-slate-200 bg-white text-left shadow-[0_30px_70px_-30px_rgba(15,23,42,.35)]">
      <aside className="flex flex-col gap-1 border-r border-slate-100 bg-slate-50/70 p-3">
        <div className="mb-3 flex items-center gap-1.5 px-1.5 pt-1 text-[14px] font-extrabold tracking-tight text-ink">
          Green<GreenXMark className="h-3.5 w-3.5" /><span className="ml-1 rounded bg-[#0E6B3A] px-1 py-0.5 text-[8px] font-extrabold leading-none text-white">AIoT</span>
        </div>
        {MODULES.map((x, i) => (
          <div key={x} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-semibold transition-colors duration-300 ${i === m ? 'bg-white text-ink shadow-sm ring-1 ring-slate-200' : 'text-slate-500'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${i === m ? 'bg-brand' : 'bg-slate-300'}`} />{x}
          </div>
        ))}
        <div className="mt-auto rounded-lg bg-brand-tint p-2.5 text-[10.5px] leading-snug text-brand-dark"><b className="block text-[11px]">248 / 250</b>devices online</div>
      </aside>
      <section className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Mumbai HQ · 12 sites</div>
            <div className="text-[15px] font-extrabold text-ink">{MODULES[m]}</div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[10.5px] font-bold text-brand-deep"><span className="xf-blink h-1.5 w-1.5 rounded-full bg-brand" />LIVE</span>
        </header>
        <div key={m} className="xf-a relative min-h-0 flex-1 p-4">
          {m === 0 && <Overview />}
          {m === 1 && <EnergyChart />}
          {m === 2 && <Hvac />}
          {m === 3 && <Lighting />}
          {m === 4 && <Alerts />}
        </div>
        <div className="px-4 pb-2.5 text-right text-[9px] font-semibold uppercase tracking-wider text-slate-300">Illustrative data</div>
      </section>
    </div>
  )
}
const Kpi = ({ l, v, s, tone = 'ink', d }) => (
  <div className="xf-a rounded-xl border border-slate-100 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,.04)]" style={{ animationDelay: `${d}s` }}>
    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{l}</div>
    <div className={`mt-1 text-[22px] font-extrabold leading-none tracking-tight ${tone === 'green' ? 'text-brand-deep' : 'text-ink'}`}>{v}</div>
    <div className="mt-1 text-[10.5px] text-slate-500">{s}</div>
  </div>
)
function Overview() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Kpi l="Live load" v="128 kW" s="across 12 sites" d={0.05} />
        <Kpi l="Energy today" v="1,240 kWh" s="vs 1,510 baseline" d={0.15} />
        <Kpi l="Saved this month" v="↓ 18%" s="₹ 2.4 L avoided" tone="green" d={0.25} />
        <Kpi l="Open alerts" v="2" s="1 auto-resolved" d={0.35} />
      </div>
      <div className="xf-a grid gap-1.5 rounded-xl border border-slate-100 p-3" style={{ animationDelay: '.45s' }}>
        {[['Corporate office', 92], ['Bank branch', 78], ['ATM site', 64]].map(([s, v]) => (
          <div key={s} className="grid grid-cols-[110px_1fr_34px] items-center gap-2 text-[11px] text-slate-600">
            <span className="font-semibold">{s}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-slate-100"><span className="xf-bar block h-full rounded-full bg-brand" style={{ width: `${v}%` }} /></span>
            <span className="text-right font-data text-[10px] text-slate-500">{v}%</span>
          </div>
        ))}
        <div className="mt-0.5 text-[9.5px] text-slate-400">Efficiency score by site</div>
      </div>
    </div>
  )
}
function EnergyChart() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-2">
      <div className="flex gap-4 text-[11px] font-semibold"><span className="flex items-center gap-1.5 text-brand-deep"><span className="h-0.5 w-4 rounded bg-brand" />With Green X</span><span className="flex items-center gap-1.5 text-slate-400"><span className="h-0 w-4 border-t-2 border-dashed border-slate-300" />Baseline</span></div>
      <svg viewBox="0 0 420 300" className="h-full w-full">
        {[60, 120, 180, 240].map((y) => <line key={y} x1="30" x2="410" y1={y} y2={y} stroke="#F1F5F9" />)}
        {['00', '06', '12', '18', '24'].map((t, i) => <text key={t} x={30 + i * 95} y="290" fontSize="11" fill="#94A3B8" textAnchor="middle" fontFamily="IBM Plex Mono, monospace">{t}:00</text>)}
        <path d="M30 220 C 80 215 110 160 160 110 S 250 60 290 80 S 360 170 410 200" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="6 6" />
        <path d="M30 238 C 80 236 110 196 160 152 S 250 112 290 128 S 360 200 410 226 L410 270 L30 270Z" fill="#76DF23" opacity=".12" className="xf-fade" style={{ animationDelay: '.9s' }} />
        <path d="M30 238 C 80 236 110 196 160 152 S 250 112 290 128 S 360 200 410 226" fill="none" stroke="#3CA80C" strokeWidth="3.5" strokeLinecap="round" pathLength="1" className="xf-drawline" />
        <g className="xf-pop" style={{ animationDelay: '1.3s' }}><rect x="232" y="64" width="100" height="26" rx="13" fill="#0F172A" /><text x="282" y="81" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff" fontFamily="Plus Jakarta Sans, sans-serif">Peak cut −22%</text></g>
      </svg>
    </div>
  )
}
function Hvac() {
  const acs = [['Workspace AC', '24°C', 'Auto · cooling', true], ['Meeting room AC', 'Standby', 'Room empty', false], ['Cabin AC', '25°C', 'Schedule · 9–7', true], ['Server room AC', '22°C', 'Always on', true]]
  return (
    <div className="grid grid-cols-2 gap-3">
      {acs.map(([n, t, s, on], i) => (
        <div key={n} className="xf-a rounded-xl border border-slate-100 p-3" style={{ animationDelay: `${i * 0.12}s` }}>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">{n}<span className={`h-2 w-2 rounded-full ${on ? 'bg-brand' : 'bg-slate-300'}`} /></div>
          <div className={`mt-2 text-[24px] font-extrabold leading-none ${on ? 'text-ink' : 'text-slate-400'}`}>{t}</div>
          <div className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${on ? 'bg-brand-tint text-brand-deep' : 'bg-slate-100 text-slate-500'}`}>{s}</div>
        </div>
      ))}
      <div className="xf-a col-span-2 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600" style={{ animationDelay: '.55s' }}><b className="text-ink">Green X 500</b> adjusts each AC by occupancy, temperature and schedule.</div>
    </div>
  )
}
function Lighting() {
  const z = [['Workspace', 'ON', 'Occupied', true], ['Meeting room', 'OFF', 'No motion · 10 min', false], ['Reception', 'ON', 'Schedule 7am–9pm', true], ['Parking', 'OFF', 'Daylight detected', false]]
  return (
    <div className="grid gap-2.5">
      {z.map(([n, st, s, on], i) => (
        <div key={n} className="xf-a flex items-center gap-3 rounded-xl border border-slate-100 p-3" style={{ animationDelay: `${i * 0.12}s` }}>
          <span className={`grid h-9 w-9 place-items-center rounded-lg ${on ? 'bg-amber-50' : 'bg-slate-100'}`}><svg viewBox="0 0 24 24" className={`h-5 w-5 ${on ? 'text-amber-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></svg></span>
          <div className="min-w-0 flex-1"><div className="text-[12.5px] font-bold text-ink">{n}</div><div className="text-[10.5px] text-slate-500">{s}</div></div>
          <span className={`relative h-5 w-9 rounded-full transition-colors ${on ? 'bg-brand' : 'bg-slate-200'}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${on ? 'left-[18px]' : 'left-0.5'}`} /></span>
          <span className={`w-7 text-right text-[10px] font-bold ${on ? 'text-brand-deep' : 'text-slate-400'}`}>{st}</span>
        </div>
      ))}
    </div>
  )
}
function Alerts() {
  const a = [['Meeting room AC left on', 'Turned off automatically', 'green', '2 min ago'], ['UPS battery below 20%', 'Service ticket raised', 'amber', '14 min ago'], ['Peak load approaching limit', 'Non-critical loads shed', 'green', '1 h ago'], ['Branch #108 offline', 'Engineer notified', 'red', '3 h ago']]
  const dot = { green: 'bg-brand', amber: 'bg-amber-400', red: 'bg-red-500' }
  return (
    <div className="grid gap-2.5">
      {a.map(([t, s, c, w], i) => (
        <div key={t} className="xf-slide flex items-start gap-3 rounded-xl border border-slate-100 p-3" style={{ animationDelay: `${i * 0.18}s` }}>
          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[c]}`} />
          <div className="min-w-0 flex-1"><div className="text-[12.5px] font-bold text-ink">{t}</div><div className="text-[10.5px] text-slate-500">{s}</div></div>
          <span className="shrink-0 text-[10px] text-slate-400">{w}</span>
        </div>
      ))}
    </div>
  )
}

/* Product strip shown with the solution scene */
function DeviceStrip() {
  return (
    <div className="absolute inset-x-[14px] bottom-[10px] grid grid-cols-4 gap-2.5">
      {DEVICES.map((d, i) => (
        <div key={d.n} className="xf-a relative grid justify-items-center rounded-2xl border border-slate-200 bg-white px-2 pb-2.5 pt-2 text-center shadow-[0_12px_30px_-18px_rgba(15,23,42,.35)]" style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
          <span className="absolute left-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-extrabold text-white">{d.n}</span>
          <img src={img(d.img)} alt="" className="h-[62px] w-full object-contain" />
          <b className="mt-1 text-[12.5px] font-extrabold leading-tight text-ink">{d.name}</b>
          <span className="text-[10px] font-semibold leading-tight text-slate-500">{d.role}</span>
        </div>
      ))}
    </div>
  )
}

function ResultStats() {
  const s = [['15,000+', 'sites deployed', 'left-[14px] top-[118px]', 0.8], ['Up to 30%', 'lower HVAC energy', 'right-[14px] top-[210px]', 1.1], ['52+', 'enterprise clients', 'left-[26px] top-[330px]', 1.4]]
  return s.map(([v, l, pos, d]) => (
    <div key={l} className={`xf-a absolute ${pos} rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-left shadow-[0_18px_40px_-22px_rgba(15,23,42,.4)] backdrop-blur`} style={{ animationDelay: `${d}s` }}>
      <b className="block text-[24px] font-extrabold leading-none tracking-tight text-brand-deep">{v}</b>
      <span className="mt-1 block text-[11.5px] font-semibold text-slate-500">{l}</span>
    </div>
  ))
}

/* Scales the fixed 640×540 design box to whatever space it is given */
function Stage({ ch, sub, paused }) {
  const box = useRef(null)
  const svg = useRef(null)
  const [k, setK] = useState(1)
  useLayoutEffect(() => {
    const el = box.current; if (!el) return
    const ro = new ResizeObserver(([e]) => { const { width, height } = e.contentRect; setK(Math.min(width / 640, height / 540)) })
    ro.observe(el); return () => ro.disconnect()
  }, [])
  useEffect(() => { const s = svg.current; if (!s) return; paused ? s.pauseAnimations?.() : s.unpauseAnimations?.() }, [paused, ch])
  const c = CHAPTERS[ch]
  const roomMode = c.scene === 'room' ? c.id : 'inside'
  return (
    <div ref={box} className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[540px] w-[640px]" style={{ transform: `translate(-50%, -50%) scale(${k})` }}>
        <svg ref={svg} viewBox="0 0 640 540" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={`${c.kicker}: ${c.title}`}>
          <Defs />
          {c.scene === 'ext' && <g key={`ext-${c.id}`} className="xf-zoomin"><Exterior green={c.id === 'result'} /></g>}
          {(c.scene === 'room' || c.scene === 'dash') && (
            <g key="room" className={c.id === 'inside' ? 'xf-zoomin' : ''} style={{ opacity: c.scene === 'dash' ? 0.18 : 1, transition: 'opacity .6s ease' }}>
              <Room mode={roomMode} />
            </g>
          )}
        </svg>
        {c.id === 'solution' && <DeviceStrip key="strip" />}
        {c.scene === 'dash' && <Dashboard sub={sub} />}
        {c.id === 'result' && <ResultStats />}
      </div>
    </div>
  )
}

/* =================================================================== *
 * Caption (left column on desktop, below the scene on mobile)
 * =================================================================== */
function Caption({ ch, sub }) {
  const c = CHAPTERS[ch]
  return (
    <div key={c.id} className="grid content-center gap-3.5">
      <span className="xf-a font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand-deep">{String(ch + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')} · {c.kicker}</span>
      <h2 className="text-[clamp(24px,2.6vw,36px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
        {c.title.split(' ').map((w, i) => (
          <span key={i} className={`xf-word mr-[0.24em] inline-block ${c.id === 'solution' && i < 2 ? 'text-brand-deep' : ''}`} style={{ animationDelay: `${0.08 + i * 0.06}s` }}>{w}</span>
        ))}
      </h2>
      <p className="xf-a text-[15px] leading-relaxed text-slate-600" style={{ animationDelay: '.45s' }}>{c.text}</p>

      {c.id === 'problem' && (
        <ul className="grid gap-2">
          {PROBLEMS.map((p) => (
            <li key={p.t} className="xf-a flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50/60 px-3 py-2" style={{ animationDelay: `${p.at}s` }}>
              <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-500 text-[10px] font-black text-white">!</span>
              <span className="text-[13px] leading-snug text-slate-600"><b className="block text-ink">{p.t}</b>{p.d}</span>
            </li>
          ))}
        </ul>
      )}
      {c.id === 'solution' && (
        <ul className="grid gap-1.5 text-[13px] text-slate-600">
          {['Sense: occupancy, temperature, energy', 'Control: AC and lights switch automatically', 'Optimise: AI learns each site and cuts waste'].map((t, i) => (
            <li key={t} className="xf-a flex items-center gap-2" style={{ animationDelay: `${3 + i * 0.5}s` }}>
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand text-white"><svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>{t}
            </li>
          ))}
        </ul>
      )}
      {c.id === 'product' && (
        <div className="xf-a flex flex-wrap gap-1.5" style={{ animationDelay: '.6s' }}>
          {MODULES.map((x, i) => (
            <span key={x} className={`rounded-full px-3 py-1.5 text-[12px] font-bold transition-colors duration-300 ${i === Math.min(sub, MODULES.length - 1) ? 'bg-ink text-white' : 'bg-slate-100 text-slate-500'}`}>{x}</span>
          ))}
        </div>
      )}
      {c.id === 'result' && (
        <div className="xf-a" style={{ animationDelay: '.7s' }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-2 text-[13px] font-bold text-brand-deep">Go green. Save energy.</span>
        </div>
      )}
    </div>
  )
}

function useMedia(q) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => { const mq = window.matchMedia(q); const on = () => setM(mq.matches); on(); mq.addEventListener('change', on); return () => mq.removeEventListener('change', on) }, [q])
  return m
}
function useReducedMotion() { return useMedia('(prefers-reduced-motion: reduce)') }

export default function ExplainerFilm() {
  const reduce = useReducedMotion()
  const desktop = useMedia('(min-width: 768px)')
  const [ch, setCh] = useState(0)
  const [sub, setSub] = useState(0)
  const [playing, setPlaying] = useState(!reduce)
  const visible = useRef(true)
  const elapsed = useRef(0)
  const chRef = useRef(0)
  const subRef = useRef(0)
  const fills = useRef([])
  const timeEl = useRef(null)
  const box = useRef(null)

  useEffect(() => { if (reduce) setPlaying(false) }, [reduce])

  const paint = useCallback(() => {
    const e = elapsed.current
    CHAPTERS.forEach((c, i) => {
      const f = fills.current[i]; if (!f) return
      f.style.transform = `scaleX(${Math.min(1, Math.max(0, (e - STARTS[i]) / c.dur))})`
    })
    if (timeEl.current) timeEl.current.textContent = `${fmt(e)} / ${fmt(TOTAL)}`
  }, [])

  const jump = (i) => { elapsed.current = STARTS[i] + 0.001; chRef.current = i; subRef.current = 0; setCh(i); setSub(0); paint() }

  useEffect(() => {
    let raf, last
    const step = (now) => {
      if (last != null && playing && visible.current && !document.hidden) {
        elapsed.current = (elapsed.current + (now - last) / 1000) % TOTAL
        let i = CHAPTERS.length - 1
        while (i > 0 && STARTS[i] > elapsed.current) i--
        if (i !== chRef.current) { chRef.current = i; subRef.current = 0; setCh(i); setSub(0) }
        const s = Math.floor((elapsed.current - STARTS[i]) / 2)
        if (s !== subRef.current) { subRef.current = s; setSub(s) }
        paint()
      }
      last = now
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [playing, paint])

  useEffect(() => {
    const io = new IntersectionObserver((es) => { visible.current = es[0].isIntersecting }, { threshold: 0.2 })
    if (box.current) io.observe(box.current)
    paint()
    return () => io.disconnect()
  }, [paint])

  const paused = !playing
  const controls = (
    <div className="flex items-center gap-3 px-4 py-3 md:px-6">
      <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause animation' : 'Play animation'}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105">
        {playing
          ? <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          : <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor"><path d="M7 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5z" /></svg>}
      </button>
      <div className="grid min-w-0 flex-1 gap-1.5" style={{ gridTemplateColumns: CHAPTERS.map((c) => `${c.dur}fr`).join(' ') }}>
        {CHAPTERS.map((c, i) => (
          <button key={c.id} type="button" onClick={() => jump(i)} aria-label={`Chapter ${i + 1}: ${c.label}`} aria-current={i === ch ? 'step' : undefined} className="group grid min-w-0 gap-1.5 text-left">
            <span className="relative h-1 overflow-hidden rounded-full bg-slate-200 transition group-hover:bg-slate-300">
              <span ref={(el) => (fills.current[i] = el)} className="absolute inset-0 origin-left rounded-full bg-brand" style={{ transform: 'scaleX(0)' }} />
            </span>
            <span className={`hidden truncate font-mono text-[10.5px] font-semibold uppercase tracking-wider transition sm:block ${i === ch ? 'text-ink' : 'text-slate-400 group-hover:text-slate-600'}`}>{c.label}</span>
          </button>
        ))}
      </div>
      <span ref={timeEl} className="hidden shrink-0 font-data text-xs tabular-nums text-slate-400 sm:block">0:00</span>
    </div>
  )

  return (
    <div ref={box} role="region" aria-label="BuildINT story: the problem, the Green X solution and the platform, animated" className={`xf relative overflow-hidden rounded-[28px] border border-slate-200 bg-white text-ink shadow-[0_40px_120px_-40px_rgba(60,168,12,.45)] ${paused ? 'xf-paused' : ''}`}>
      <style>{CSS}</style>
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_78%_8%,rgba(118,223,35,.10),transparent_45%),radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:auto,22px_22px]" />
      {desktop ? (
        <div className="relative aspect-[16/9]">
          <div className="absolute bottom-[64px] right-[2%] top-[3%] w-[62%]"><Stage ch={ch} sub={sub} paused={paused} /></div>
          <div className="absolute inset-y-0 left-0 grid w-[36%] content-center p-8 pb-20 lg:p-10 lg:pb-20"><Caption ch={ch} sub={sub} /></div>
          <span className="absolute left-8 top-6 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 lg:left-10">How BuildINT works</span>
          <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 bg-white/90 backdrop-blur">{controls}</div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative aspect-[640/540]"><Stage ch={ch} sub={sub} paused={paused} /></div>
          <div className="border-t border-slate-100">{controls}</div>
          <div className="border-t border-slate-100 p-5"><Caption ch={ch} sub={sub} /></div>
        </div>
      )}
    </div>
  )
}

const CSS = `
.xf-paused *, .xf-paused *::before, .xf-paused *::after { animation-play-state: paused !important; }
@keyframes xf-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes xf-pop { 0% { opacity: 0; transform: scale(.4); } 70% { opacity: 1; transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
@keyframes xf-drop { from { opacity: 0; transform: translateY(-60px); } to { opacity: 1; transform: none; } }
@keyframes xf-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes xf-zoom { from { opacity: 0; transform: scale(1.12); } to { opacity: 1; transform: none; } }
@keyframes xf-lit { to { fill: #FFE39A; } }
@keyframes xf-flow { to { stroke-dashoffset: -24; } }
@keyframes xf-rise { 0% { opacity: 0; transform: translateY(0); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateY(-64px); } }
@keyframes xf-ring { 0% { transform: scale(.6); opacity: .9; } 100% { transform: scale(2.1); opacity: 0; } }
@keyframes xf-blink { 50% { opacity: .25; } }
@keyframes xf-spin { to { transform: rotate(360deg); } }
@keyframes xf-dash { to { stroke-dashoffset: 0; } }
@keyframes xf-word { from { opacity: 0; transform: translateY(.45em); filter: blur(6px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes xf-drift { 50% { transform: translateX(18px); } }
@keyframes xf-bar { from { transform: scaleX(0); } }
@keyframes xf-slide { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
.xf-a { animation: xf-in .6s cubic-bezier(.2,.7,.2,1) both; }
.xf-word { animation: xf-word .55s cubic-bezier(.2,.7,.2,1) both; }
.xf-pop { animation: xf-pop .55s cubic-bezier(.2,.7,.2,1) both; transform-box: fill-box; transform-origin: center; }
.xf-drop { animation: xf-drop .75s cubic-bezier(.2,.8,.2,1) both; }
.xf-fade { animation: xf-fade .9s ease both; }
.xf-zoomin { animation: xf-zoom .9s cubic-bezier(.2,.7,.2,1) both; transform-origin: 50% 50%; transform-box: view-box; }
div.xf-zoomin { transform-box: border-box; }
.xf-litw { animation: xf-lit .5s ease forwards; }
.xf-flow { stroke-dasharray: 5 7; animation: xf-flow 1s linear infinite; }
.xf-rise { animation: xf-rise 2.2s ease-out infinite both; }
.xf-ring { animation: xf-ring 2.2s ease-out infinite; transform-box: fill-box; transform-origin: center; }
.xf-blink { animation: xf-blink 1.2s steps(1) infinite; }
.xf-spin { animation: xf-spin 1.4s linear infinite; }
.xf-spin-slow { animation: xf-spin 6s linear infinite; }
.xf-spin-fast { animation: xf-spin .7s linear infinite; }
.xf-draw { stroke-dashoffset: 300; animation: xf-dash 1.2s ease forwards; }
.xf-drawline { stroke-dasharray: 1; stroke-dashoffset: 1; animation: xf-dash 1.8s .2s cubic-bezier(.2,.7,.2,1) forwards; }
.xf-drift { animation: xf-drift 12s ease-in-out infinite; }
.xf-bar { transform-origin: left; animation: xf-bar 1s .5s cubic-bezier(.2,.7,.2,1) both; }
.xf-slide { animation: xf-slide .55s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .xf * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
`
