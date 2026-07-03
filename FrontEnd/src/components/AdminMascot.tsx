import './AdminMascot.css'

export function AdminMascot() {
  return (
    <div className="admin-mascot-container">
      <svg
        width="140"
        height="140"
        viewBox="0 0 120 120"
        className="admin-mascot-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse
          cx="60"
          cy="112"
          rx="25"
          ry="5"
          fill="black"
          className="admin-mascot-shadow"
        />

        {/* Mascot Body Group */}
        <g className="admin-mascot-body">
          {/* Mortarboard / Graduation Cap */}
          {/* Cap Base */}
          <rect x="42" y="28" width="36" height="8" fill="#1e293b" rx="2" />
          {/* Cap Diamond Top */}
          <path d="M60 12 L85 22 L60 32 L35 22 Z" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          {/* Tassel Button */}
          <circle cx="60" cy="22" r="2.5" fill="#f59e0b" />
          {/* Tassel Thread & Ribbon */}
          <path
            d="M60 22 C55 24, 48 28, 48 34"
            stroke="#f59e0b"
            strokeWidth="1.5"
            fill="none"
            className="admin-mascot-tassel"
          />
          <rect
            x="46.5"
            y="34"
            width="3"
            height="6"
            fill="#f59e0b"
            rx="1"
            className="admin-mascot-tassel-fringe"
          />

          {/* Main Head/Body */}
          <rect
            x="35"
            y="38"
            width="50"
            height="50"
            rx="16"
            fill="url(#adminMascotGradient)"
            stroke="#4b5563"
            strokeWidth="2.5"
          />

          {/* Screen Face */}
          <rect x="42" y="46" width="36" height="24" rx="6" fill="#1f2937" />

          {/* Glowing Eyes */}
          <ellipse cx="50" cy="55" rx="3" ry="3" fill="#6366f1" className="admin-mascot-eye left" />
          <ellipse cx="70" cy="55" rx="3" ry="3" fill="#6366f1" className="admin-mascot-eye right" />

          {/* Professor Circular Glasses */}
          <circle cx="50" cy="55" r="9" stroke="#f59e0b" strokeWidth="2.2" fill="none" />
          <circle cx="70" cy="55" r="9" stroke="#f59e0b" strokeWidth="2.2" fill="none" />
          {/* Bridge */}
          <path d="M59 55 H61" stroke="#f59e0b" strokeWidth="2.2" />
          {/* Glasses Frame Sides */}
          <path d="M41 55 C37 53, 35 50, 35 48" stroke="#f59e0b" strokeWidth="1.2" fill="none" />
          <path d="M79 55 C83 53, 85 50, 85 48" stroke="#f59e0b" strokeWidth="1.2" fill="none" />

          {/* Mouth */}
          <path
            d="M55 64 C57 66, 63 66, 65 64"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Smart Bow Tie */}
          <path d="M52 87 L60 83 L68 87 L60 91 Z" fill="#ef4444" />
          <circle cx="60" cy="87" r="1.5" fill="#fff" />
          
          {/* Feet */}
          <rect x="44" y="88" width="10" height="8" rx="4" fill="#4b5563" />
          <rect x="66" y="88" width="10" height="8" rx="4" fill="#4b5563" />
        </g>

        {/* Gradient Definitions */}
        <defs>
          <linearGradient
            id="adminMascotGradient"
            x1="35"
            y1="38"
            x2="85"
            y2="88"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
