import React, { useRef, useEffect, useCallback } from 'react';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide, forceX, forceY } from 'd3-force';
import { nodes as rawNodes, links as rawLinks } from '../data/skillMapData';
import './SkillMap.css';

const LEGEND = [
  { label: 'Industry 4.0', color: '#ccff00' },
  { label: 'Data Systems', color: '#38bdf8' },
  { label: 'Industrial Automation', color: '#34d399' },
  { label: 'AI & Machine Learning', color: '#a78bfa' },
];

/* ── Minimal line-art icon renderer ── */
function drawIcon(ctx, type, x, y, r) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = Math.max(1, r * 0.1);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const s = r * 0.36;
  switch (type) {
    case 'factory': {
      ctx.beginPath();
      ctx.moveTo(x-s,y+s); ctx.lineTo(x-s,y-s*0.2);
      ctx.lineTo(x-s*0.2,y-s); ctx.lineTo(x-s*0.2,y-s*0.2);
      ctx.lineTo(x+s*0.6,y-s); ctx.lineTo(x+s*0.6,y+s); ctx.closePath(); ctx.stroke();
      break; }
    case 'bars': {
      const bw = s*0.3;
      ctx.fillRect(x-s*0.7, y+s-s*0.8, bw, s*0.8);
      ctx.fillRect(x-s*0.15, y+s-s*1.3, bw, s*1.3);
      ctx.fillRect(x+s*0.4, y+s-s*1.7, bw, s*1.7);
      break; }
    case 'gear': {
      ctx.beginPath(); ctx.arc(x,y,s*0.35,0,Math.PI*2); ctx.stroke();
      for(let i=0;i<6;i++){const a=i*Math.PI/3;
        ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*s*0.35,y+Math.sin(a)*s*0.35);
        ctx.lineTo(x+Math.cos(a)*s*0.7,y+Math.sin(a)*s*0.7); ctx.stroke();}
      break; }
    case 'brain': {
      ctx.beginPath(); ctx.arc(x-s*0.2,y-s*0.1,s*0.45,Math.PI*1.2,Math.PI*2.2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.2,y-s*0.1,s*0.45,Math.PI*0.8,Math.PI*1.8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x,y-s*0.5); ctx.lineTo(x,y+s*0.5); ctx.stroke();
      break; }
    case 'code': {
      ctx.beginPath(); ctx.moveTo(x-s*0.3,y-s*0.5); ctx.lineTo(x-s*0.7,y); ctx.lineTo(x-s*0.3,y+s*0.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+s*0.3,y-s*0.5); ctx.lineTo(x+s*0.7,y); ctx.lineTo(x+s*0.3,y+s*0.5); ctx.stroke();
      break; }
    case 'db': {
      ctx.beginPath(); ctx.ellipse(x,y-s*0.4,s*0.55,s*0.25,0,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x-s*0.55,y-s*0.4); ctx.lineTo(x-s*0.55,y+s*0.3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+s*0.55,y-s*0.4); ctx.lineTo(x+s*0.55,y+s*0.3); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x,y+s*0.3,s*0.55,s*0.25,0,0,Math.PI); ctx.stroke();
      break; }
    case 'signal': {
      for(let i=1;i<=3;i++){
        ctx.beginPath(); ctx.arc(x,y+s*0.3,s*0.25*i,Math.PI*1.2,Math.PI*1.8); ctx.stroke();}
      ctx.beginPath(); ctx.arc(x,y+s*0.3,s*0.12,0,Math.PI*2); ctx.fill();
      break; }
    case 'screen': {
      ctx.strokeRect(x-s*0.6,y-s*0.5,s*1.2,s*0.85);
      ctx.beginPath(); ctx.moveTo(x,y+s*0.35); ctx.lineTo(x,y+s*0.65); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x-s*0.3,y+s*0.65); ctx.lineTo(x+s*0.3,y+s*0.65); ctx.stroke();
      break; }
    case 'eye': {
      ctx.beginPath(); ctx.moveTo(x-s*0.7,y); ctx.quadraticCurveTo(x,y-s*0.6,x+s*0.7,y);
      ctx.quadraticCurveTo(x,y+s*0.6,x-s*0.7,y); ctx.stroke();
      ctx.beginPath(); ctx.arc(x,y,s*0.2,0,Math.PI*2); ctx.fill();
      break; }
    case 'wrench': {
      ctx.beginPath(); ctx.moveTo(x-s*0.5,y+s*0.5); ctx.lineTo(x+s*0.2,y-s*0.2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.35,y-s*0.35,s*0.3,0,Math.PI*2); ctx.stroke();
      break; }
    case 'link': {
      ctx.beginPath(); ctx.arc(x-s*0.3,y,s*0.3,Math.PI*0.3,Math.PI*1.7); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.3,y,s*0.3,Math.PI*1.3,Math.PI*2.7); ctx.stroke();
      break; }
    case 'bolt': {
      ctx.beginPath(); ctx.moveTo(x-s*0.1,y-s*0.7); ctx.lineTo(x-s*0.3,y+s*0.05);
      ctx.lineTo(x+s*0.1,y-s*0.05); ctx.lineTo(x-s*0.1,y+s*0.7); ctx.stroke();
      break; }
    case 'wave': {
      ctx.beginPath(); ctx.moveTo(x-s*0.7,y);
      ctx.quadraticCurveTo(x-s*0.35,y-s*0.6,x,y);
      ctx.quadraticCurveTo(x+s*0.35,y+s*0.6,x+s*0.7,y); ctx.stroke();
      break; }
    case 'pipe': {
      ctx.beginPath(); ctx.moveTo(x-s*0.7,y-s*0.2); ctx.lineTo(x,y-s*0.2);
      ctx.lineTo(x,y+s*0.2); ctx.lineTo(x+s*0.7,y+s*0.2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x,y-s*0.2,s*0.12,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x,y+s*0.2,s*0.12,0,Math.PI*2); ctx.fill();
      break; }
    case 'chip': {
      ctx.strokeRect(x-s*0.35,y-s*0.35,s*0.7,s*0.7);
      for(let i=-1;i<=1;i++){
        ctx.beginPath(); ctx.moveTo(x+i*s*0.2,y-s*0.35); ctx.lineTo(x+i*s*0.2,y-s*0.6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x+i*s*0.2,y+s*0.35); ctx.lineTo(x+i*s*0.2,y+s*0.6); ctx.stroke();}
      break; }
    case 'target': {
      ctx.beginPath(); ctx.arc(x,y,s*0.6,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x,y,s*0.25,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x,y,s*0.06,0,Math.PI*2); ctx.fill();
      break; }
    default: break;
  }
  ctx.restore();
}

function SkillMap() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const simRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sizeRef = useRef({ w: 800, h: 600 });
  const hoverIdRef = useRef(null);
  const hpRef = useRef(0); // hover progress 0→1

  const initSim = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const W = wrap.clientWidth;
    const H = Math.max(wrap.clientHeight, 520);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    sizeRef.current = { w: W, h: H };

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const nodesCopy = rawNodes.map(n => ({ ...n }));
    const linksCopy = rawLinks.map(l => ({ ...l }));

    const targetX = (g) => g === 'left' ? W * 0.2 : g === 'right' ? W * 0.8 : W * 0.5;

    if (simRef.current) simRef.current.stop();

    const sim = forceSimulation(nodesCopy)
      .force('link', forceLink(linksCopy).id(d => d.id)
        .distance(d => d.weight === 3 ? 180 : d.weight === 2 ? 110 : 60)
        .strength(d => d.weight === 3 ? 0.15 : d.weight === 2 ? 0.06 : 0.05))
      .force('charge', forceManyBody().strength(-220))
      .force('center', forceCenter(W / 2, H / 2).strength(0.02))
      .force('collide', forceCollide(d => d.radius + 8).iterations(3))
      .force('x', forceX(d => targetX(d.group)).strength(0.13))
      .force('y', forceY(H / 2).strength(0.03))
      .alphaDecay(0.004)
      .velocityDecay(0.4);

    simRef.current = sim;
    const neighborMap = {};
    nodesCopy.forEach(n => { neighborMap[n.id] = new Set(); });

    const PAD = 5;

    const draw = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Clamp nodes inside canvas bounds
      for (const n of nodesCopy) {
        n.x = Math.max(n.radius + PAD, Math.min(w - n.radius - PAD, n.x));
        n.y = Math.max(n.radius + PAD, Math.min(h - n.radius - PAD, n.y));
      }

      // Build neighbor map
      if (linksCopy[0] && typeof linksCopy[0].source !== 'string') {
        for (const l of linksCopy) {
          neighborMap[l.source.id]?.add(l.target.id);
          neighborMap[l.target.id]?.add(l.source.id);
        }
      }

      // Detect hover
      let hovered = null;
      let minD = Infinity;
      for (const n of nodesCopy) {
        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < n.radius * 2.5 && dist < minD) { minD = dist; hovered = n; }
      }

      // Smooth hover transition
      const newId = hovered ? hovered.id : null;
      if (newId !== hoverIdRef.current) {
        if (newId) hpRef.current = 0; // reset on new target
        hoverIdRef.current = newId;
      }
      const hTarget = hovered ? 1 : 0;
      hpRef.current += (hTarget - hpRef.current) * 0.1;
      if (hpRef.current < 0.01) hpRef.current = 0;
      const hp = hpRef.current;

      const activeSet = new Set();
      if (hovered) {
        activeSet.add(hovered.id);
        neighborMap[hovered.id]?.forEach(id => activeSet.add(id));
      }

      // ── Draw Links ──
      for (const l of linksCopy) {
        const s = l.source, t = l.target;
        if (typeof s === 'string') continue;
        const isActive = hovered && activeSet.has(s.id) && activeSet.has(t.id)
          && (s.id === hovered.id || t.id === hovered.id);

        if (hp > 0 && !isActive) {
          const dimAlpha = 0.08 * (1 - hp) + 0.01 * hp;
          ctx.strokeStyle = `rgba(255,255,255,${dimAlpha})`;
          ctx.lineWidth = 0.3;
        } else if (hp > 0 && isActive) {
          ctx.strokeStyle = hovered.color + Math.round(0x44 + 0x44 * hp).toString(16);
          ctx.lineWidth = (l.weight === 3 ? 3 : l.weight === 2 ? 2 : 1) * (0.5 + 0.5 * hp);
        } else {
          ctx.strokeStyle = l.weight === 3 ? 'rgba(255,255,255,0.1)' : l.weight === 2 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)';
          ctx.lineWidth = l.weight === 3 ? 2 : l.weight === 2 ? 1 : 0.5;
        }
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(t.x, t.y); ctx.stroke();
      }

      // ── Draw Nodes ──
      for (const n of nodesCopy) {
        const isHov = hovered && n.id === hovered.id;
        const isNb = hovered && activeSet.has(n.id);
        const dimmed = hp > 0 && !isNb;
        const scaleT = isHov ? 1.5 : 1;
        const r = n.radius * (1 + (scaleT - 1) * hp);
        const nodeAlpha = dimmed ? (1 - hp * 0.75) : 1;

        ctx.globalAlpha = nodeAlpha;

        // Glow
        if (isHov && hp > 0.1) {
          ctx.beginPath(); ctx.arc(n.x, n.y, r + 10 * hp, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(n.x, n.y, r, n.x, n.y, r + 10 * hp);
          g.addColorStop(0, n.color + '55'); g.addColorStop(1, n.color + '00');
          ctx.fillStyle = g; ctx.fill();
        }

        // Circle
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = (isHov || isNb) ? n.color + (n.type === 'category' ? 'dd' : 'aa')
          : dimmed ? 'rgba(50,50,50,0.5)' : n.color + (n.type === 'category' ? 'bb' : n.type === 'concept' ? '77' : '55');
        ctx.fill();

        // Icon inside
        if (!dimmed || hp < 0.5) drawIcon(ctx, n.icon, n.x, n.y, r);

        // Labels
        const showLabel = isHov || (isNb && hp > 0.3) || (n.type === 'category' && hp < 0.3);
        if (showLabel) {
          const fs = isHov ? 12 : n.type === 'category' ? 11 : 10;
          ctx.font = `bold ${fs}px Inter,sans-serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          const ty = n.y - r - 9;
          const tw = ctx.measureText(n.label).width + 10;
          ctx.fillStyle = 'rgba(0,0,0,0.75)';
          ctx.beginPath(); ctx.roundRect(n.x - tw / 2, ty - 9, tw, 18, 5); ctx.fill();
          ctx.fillStyle = isHov ? '#fff' : n.color;
          ctx.fillText(n.label, n.x, ty);
        }
        ctx.globalAlpha = 1;
      }

      // Repulsion nudge
      if (hovered) {
        for (const n of nodesCopy) {
          if (n.id === hovered.id) continue;
          const dx = n.x - hovered.x, dy = n.y - hovered.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70 && dist > 0) { n.vx += (dx/dist)*0.5; n.vy += (dy/dist)*0.5; }
        }
        sim.alpha(0.1); sim.restart();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    sim.on('tick', () => {});
    draw();
  }, []);

  useEffect(() => {
    initSim();
    const ro = new ResizeObserver(() => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      initSim();
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => { ro.disconnect(); simRef.current?.stop(); animRef.current && cancelAnimationFrame(animRef.current); };
  }, [initSim]);

  const onMove = useCallback(e => {
    const r = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);
  const onLeave = useCallback(() => { mouseRef.current = { x: -9999, y: -9999 }; }, []);

  return (
    <section className="skillmap-section" id="skill-map-section">
      <div className="skillmap-heading animate-in">
        <h2>Hybrid <span style={{ color: 'var(--accent)' }}>Skill Map</span></h2>
        <p>An interactive map bridging Industrial Automation and Data Engineering. Hover any node to explore.</p>
      </div>
      <div className="skillmap-canvas-wrap" ref={wrapRef}>
        <canvas ref={canvasRef} onMouseMove={onMove} onMouseLeave={onLeave} />
      </div>
      <div className="skillmap-legend">
        {LEGEND.map(l => (
          <span className="legend-item" key={l.label}>
            <span className="legend-dot" style={{ background: l.color }} />{l.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SkillMap;
