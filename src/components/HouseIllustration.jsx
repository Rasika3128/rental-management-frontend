function HouseIllustration() {
  return (
    <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bldg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="bldg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      <rect x="150" y="60" width="55" height="130" rx="6" fill="url(#bldg2)" opacity="0.85" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect x={162} y={78 + row * 26} width="12" height="14" rx="2" fill="#fff" fillOpacity="0.5" />
          <rect x={182} y={78 + row * 26} width="12" height="14" rx="2" fill="#fff" fillOpacity="0.5" />
        </g>
      ))}

      <rect x="35" y="95" width="130" height="95" rx="10" fill="url(#bldg1)" />
      <polygon points="25,100 100,45 175,100" fill="url(#roofGrad)" />

      <rect x="85" y="140" width="30" height="50" rx="4" fill="#fff" fillOpacity="0.95" />
      <circle cx="107" cy="165" r="2.2" fill="#6366f1" />

      <rect x="52" y="112" width="24" height="24" rx="4" fill="#fff" fillOpacity="0.9" />
      <line x1="64" y1="112" x2="64" y2="136" stroke="#818cf8" strokeWidth="2" />
      <line x1="52" y1="124" x2="76" y2="124" stroke="#818cf8" strokeWidth="2" />

      <rect x="124" y="112" width="24" height="24" rx="4" fill="#fff" fillOpacity="0.9" />
      <line x1="136" y1="112" x2="136" y2="136" stroke="#818cf8" strokeWidth="2" />
      <line x1="124" y1="124" x2="148" y2="124" stroke="#818cf8" strokeWidth="2" />

      <ellipse cx="120" cy="200" rx="100" ry="8" fill="#000" fillOpacity="0.15" />

      <circle cx="195" cy="35" r="16" fill="#fde68a" />
      <circle cx="195" cy="35" r="22" fill="#fde68a" fillOpacity="0.3" />
    </svg>
  );
}

export default HouseIllustration;