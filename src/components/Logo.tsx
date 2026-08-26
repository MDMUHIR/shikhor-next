interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none cursor-pointer group ${className}`}>
      {/* Stylized SHIKHOR Peak/Summit Mark */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        >
          {/* Isometric Diamond / Apex Mountain */}
          <path
            d="M20 3L36 12.5V27.5L20 37L4 27.5V12.5L20 3Z"
            stroke="#0f172a"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Ascending Peak S / Apex Arrow */}
          <path
            d="M20 8L30 24H23L20 18L17 24H10L20 8Z"
            fill="#2563eb"
          />
          <path
            d="M13 28H27L20 34L13 28Z"
            fill="#38bdf8"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-black tracking-tight text-slate-900 leading-none group-hover:text-blue-600 transition-colors">
            SHIKHOR
          </span>
          <span className="px-1.5 py-0.5 rounded bg-blue-600/10 text-blue-700 text-[9px] font-black tracking-wider leading-none">
            শিখর
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-none mt-0.5">
          Learning Platform
        </span>
      </div>
    </div>
  );
}

