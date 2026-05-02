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

    // Visual positions separate from physics — drives the bloom animation
    const lerpPos = {};
    nodesCopy.forEach(n => { lerpPos[n.id] = { x: W / 2, y: H / 2 }; });
    const LERP_IN  = 0.09; // speed toward bloom
    const LERP_OUT = 0.06; // speed back to physics

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

      // Detect hover using lerped visual positions
      let hovered = null;
      let minD = Infinity;
      for (const n of nodesCopy) {
        const lx = lerpPos[n.id].x, ly = lerpPos[n.id].y;
        const dx = lx - mx, dy = ly - my;
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

      // ── Radial bloom targets ──
      const bloomTargets = {};
      if (hovered && hp > 0) {
        const neighbors = [...(neighborMap[hovered.id] || [])];
        const count = neighbors.length;
        const bloomR = hovered.type === 'category' ? 160 : 130;
        bloomTargets[hovered.id] = { x: hovered.x, y: hovered.y };
        neighbors.forEach((nbId, i) => {
          const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
          bloomTargets[nbId] = {
            x: hovered.x + Math.cos(angle) * bloomR,
            y: hovered.y + Math.sin(angle) * bloomR,
          };
        });
      }

      // ── Lerp all visual positions ──
      for (const n of nodesCopy) {
        const lp = lerpPos[n.id];
        const bt = bloomTargets[n.id];
        lp.x += ((bt ? bt.x : n.x) - lp.x) * (bt ? LERP_IN : LERP_OUT);
        lp.y += ((bt ? bt.y : n.y) - lp.y) * (bt ? LERP_IN : LERP_OUT);
      }

      if (!hovered && sim.alpha() < 0.04) sim.alpha(0.04).restart();

      // ── Draw Links ──
      for (const l of linksCopy) {
        const s = l.source, t = l.target;
        if (typeof s === 'string') continue;
        const isActive = hovered && activeSet.has(s.id) && activeSet.has(t.id)
          && (s.id === hovered.id || t.id === hovered.id);

        if (hp > 0 && !isActive) {
          // Dim non-active links — neutral gray works on light AND dark backgrounds
          const a = (0.12 * (1 - hp * 0.85)).toFixed(2);
          ctx.strokeStyle = `rgba(100,110,130,${a})`;
          ctx.lineWidth = 0.8;
        } else if (hp > 0 && isActive) {
          // Active links: vivid category color, thicker stroke
          const hexA = Math.round(0x99 + 0x55 * hp).toString(16).padStart(2,'0');
          ctx.strokeStyle = hovered.color + hexA;
          ctx.lineWidth = l.weight === 3 ? 2.5 : 2;
          ctx.lineCap = 'round';
        } else {
          // Resting state — neutral gray, clearly visible on both light & dark
          ctx.strokeStyle = l.weight === 3 ? 'rgba(100,110,130,0.45)' : 'rgba(100,110,130,0.22)';
          ctx.lineWidth = l.weight === 3 ? 1.4 : 0.9;
        }
        const sx = lerpPos[s.id].x, sy = lerpPos[s.id].y;
        const tx = lerpPos[t.id].x, ty2 = lerpPos[t.id].y;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(tx, ty2); ctx.stroke();
      }

      // ── Draw Nodes ──
      for (const n of nodesCopy) {
        const nx = lerpPos[n.id].x;
        const ny = lerpPos[n.id].y;
        const isHov = hovered && n.id === hovered.id;
        const isNb = hovered && activeSet.has(n.id);
        const dimmed = hp > 0 && !isNb;
        const scaleT = isHov ? 1.38 : 1;
        const r = n.radius * (1 + (scaleT - 1) * hp);
        const nodeAlpha = dimmed ? (1 - hp * 0.72) : 1;

        ctx.globalAlpha = nodeAlpha;

        // ── Outer glow pulse for hovered node ──
        if (isHov && hp > 0.05) {
          const glowR = r + 20 * hp;
          const g = ctx.createRadialGradient(nx, ny, r * 0.8, nx, ny, glowR);
          g.addColorStop(0, n.color + '30');
          g.addColorStop(0.5, n.color + '14');
          g.addColorStop(1, n.color + '00');
          ctx.beginPath(); ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        }

        // ── Inner dark fill — matches the dark site background ──
        ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = dimmed ? 'rgba(6,9,18,0.55)' : 'rgba(6,9,18,0.90)';
        ctx.fill();

        // ── Colored ring border ──
        ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2);
        if (isHov) {
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 2.8 + 1.2 * hp;
        } else if (isNb) {
          ctx.strokeStyle = n.color + 'bb';
          ctx.lineWidth = n.type === 'category' ? 2.2 : 1.8;
        } else if (dimmed) {
          ctx.strokeStyle = 'rgba(180,190,210,0.12)';
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = n.color + (n.type === 'category' ? '6a' : '40');
          ctx.lineWidth = n.type === 'category' ? 2.2 : 1.4;
        }
        ctx.stroke();

        // ── Icon (white line-art, always centered) ──
        drawIcon(ctx, n.icon, nx, ny, r);

        // ── Label pill ──
        const showLabel = isHov || (isNb && hp > 0.3) || (n.type === 'category' && hp < 0.3);
        if (showLabel) {
          const fs = isHov ? 11 : n.type === 'category' ? 10 : 9;
          ctx.font = `600 ${fs}px Inter,sans-serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          const lty = ny - r - 13;
          const tw = ctx.measureText(n.label).width + 16;
          const th = fs + 10;
          ctx.beginPath(); ctx.roundRect(nx - tw / 2, lty - th / 2, tw, th, th / 2);
          ctx.fillStyle = isHov ? 'rgba(6,9,18,0.85)' : 'rgba(6,9,18,0.70)';
          ctx.fill();
          ctx.strokeStyle = isHov ? n.color + 'aa' : 'rgba(255,255,255,0.10)';
          ctx.lineWidth = isHov ? 1 : 0.6;
          ctx.stroke();
          ctx.fillStyle = (isHov || isNb) ? '#ffffff' : n.type === 'category' ? n.color : 'rgba(220,228,240,0.90)';
          ctx.fillText(n.label, nx, lty);
        }
        ctx.globalAlpha = 1;
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
