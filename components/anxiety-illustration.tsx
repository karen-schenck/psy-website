type AnxietyIllustrationProps = {
  alt: string
}

function TexturedBubble({ color, className }: { color: string; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={`absolute ${className}`}>
      <defs>
        <filter id="anxiety-bubble-grain" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="11" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0.24 0 0 0 0.42 0 0.24 0 0 0.42 0 0 0.24 0 0 0.42 0 0 0 0.16 0"
            result="grain"
          />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="50" fill={color} filter="url(#anxiety-bubble-grain)" />
    </svg>
  )
}

/** A borderless decorative composition for the anxiety detail page. */
export function AnxietyIllustration({ alt }: AnxietyIllustrationProps) {
  return (
    <div className="relative isolate min-h-80 overflow-visible sm:min-h-96" aria-label={alt} role="img">
      <TexturedBubble color="#3b4a57" className="blob-drift-a -bottom-10 -left-12 h-52 w-52 opacity-25 sm:h-72 sm:w-72" />
      <TexturedBubble color="#964a3d" className="blob-drift-b -right-6 -top-8 h-36 w-36 opacity-40 sm:h-52 sm:w-52" />
      <TexturedBubble color="#d4c7bb" className="blob-drift-c bottom-[10%] left-[3%] h-14 w-14 opacity-80 sm:h-20 sm:w-20" />
      <TexturedBubble color="#ddc8b4" className="blob-drift-b bottom-[2%] right-[9%] h-20 w-20 opacity-65 sm:h-28 sm:w-28" />
      <img
        src="/images/anxiety-layered.svg"
        alt=""
        className="relative z-10 mx-auto block h-full max-h-[28rem] w-full object-contain"
      />
    </div>
  )
}
