import './FeedbackMascot.css'

export function FeedbackMascot() {
  return (
    <div className="mascot-container">
      <svg
        width="140"
        height="140"
        viewBox="0 0 120 120"
        className="mascot-svg"
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
          className="mascot-shadow"
        />

        {/* Mascot Body Group */}
        <g className="mascot-body">
          {/* Antenna */}
          <path
            d="M60 38V22"
            stroke="#6366f1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="60" cy="18" r="6" className="mascot-antenna-bulb" />

          {/* Main Body/Head */}
          <rect
            x="35"
            y="38"
            width="50"
            height="50"
            rx="16"
            fill="url(#mascotGradient)"
            stroke="#4b5563"
            strokeWidth="2.5"
          />

          {/* Screen Face */}
          <rect x="42" y="46" width="36" height="24" rx="6" fill="#1f2937" />

          {/* Glowing Eyes */}
          <ellipse cx="50" cy="55" rx="3" ry="3" className="mascot-eye left-eye" />
          <ellipse cx="70" cy="55" rx="3" ry="3" className="mascot-eye right-eye" />

          {/* Mouth */}
          <path
            d="M55 62 C57 65, 63 65, 65 62"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Ears */}
          <rect x="29" y="52" width="6" height="14" rx="3" fill="#4f46e5" />
          <rect x="85" y="52" width="6" height="14" rx="3" fill="#4f46e5" />

          {/* Feet */}
          <rect x="44" y="88" width="10" height="8" rx="4" fill="#4b5563" />
          <rect x="66" y="88" width="10" height="8" rx="4" fill="#4b5563" />
        </g>

        {/* Gradient Definitions */}
        <defs>
          <linearGradient
            id="mascotGradient"
            x1="35"
            y1="38"
            x2="85"
            y2="88"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
