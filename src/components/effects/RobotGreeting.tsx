import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GREETING_LINES = [
  { text: 'SYSTEM BOOT SEQUENCE INITIATED...', delay: 0 },
  { text: 'NEURAL LINK ESTABLISHED.', delay: 800 },
  { text: 'VISITOR SIGNATURE DETECTED.', delay: 1600 },
  { text: 'RUNNING IDENTITY SCAN...', delay: 2400 },
  { text: 'SCANNING COMPLETE. HUMAN CONFIRMED.', delay: 3200 },
  { text: 'LOADING MOHIT YADAV — DIGITAL DOMAIN.', delay: 4000 },
  { text: 'ALL SYSTEMS NOMINAL. STAND BY.', delay: 4800 },
];

const SPEECH_TEXT =
  "System boot sequence initiated. Neural link established. Visitor signature detected. " +
  "Running identity scan. Scan complete. Human confirmed. " +
  "Now loading the digital domain of Mohit Yadav, Full Stack Engineer and ECE student at S-V-N-I-T Surat. " +
  "All systems nominal. You may proceed. Good luck, explorer.";

export default function RobotGreeting() {
  const [show, setShow] = useState(false);
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('robot_greeted')) return;
    if (hasRun.current) return;
    hasRun.current = true;

    setShow(true);
  }, []);

  const handleStart = () => {
    setStarted(true);

    // Show lines progressively
    GREETING_LINES.forEach(({ delay }, i) => {
      setTimeout(() => setVisibleLines(prev => [...prev, i]), delay);
    });

    // ── Dismiss helper — called ONLY when speech fully completes ──────────
    const dismiss = () => {
      setDone(true);
      setProgress(100);
      // Brief pause so user sees 100% before fade-out
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('robot_greeted', '1');
      }, 700);
    };

    // ── Progress bar — fills to 95% during speech, jumps to 100% on end ──
    // Estimated speech duration at rate 0.82: ~11 seconds
    const estimatedDuration = 11000;
    const stepMs = 80;
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) { clearInterval(progressTimer); return 95; }
        return prev + (95 / (estimatedDuration / stepMs));
      });
    }, stepMs);

    // ── Web Speech API ────────────────────────────────────────────────────
    const speak = () => {
      if (!window.speechSynthesis) {
        // No speech support — fallback timer
        setTimeout(dismiss, 6000);
        return;
      }
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(SPEECH_TEXT);
      utterance.pitch = 0.1;   // Very low = robotic
      utterance.rate = 0.82;   // Slightly slower
      utterance.volume = 1.0;

      // Prefer a deep / robotic voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v =>
        v.name.toLowerCase().includes('google') ||
        v.name.toLowerCase().includes('microsoft david') ||
        v.name.toLowerCase().includes('daniel')
      );
      if (preferred) utterance.voice = preferred;

      // ✅ Dismiss only AFTER speech finishes — not before
      utterance.onend = () => {
        clearInterval(progressTimer);
        dismiss();
      };

      // Fallback if speech errors
      utterance.onerror = () => {
        clearInterval(progressTimer);
        setTimeout(dismiss, 400);
      };

      window.speechSynthesis.speak(utterance);
    };

    // Voices may load async
    if (window.speechSynthesis) {
      if (window.speechSynthesis.getVoices().length > 0) {
        speak();
      } else {
        window.speechSynthesis.onvoiceschanged = speak;
      }
    } else {
      setTimeout(dismiss, 6000);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#000' }}
        >
          {/* Animated scanline grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,0,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,0,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Horizontal scan beam */}
          <motion.div
            animate={{ y: ['-100vh', '100vh'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,0,0.5), transparent)' }}
          />

          {/* Corner brackets */}
          {[
            'top-8 left-8 border-l-2 border-t-2',
            'top-8 right-8 border-r-2 border-t-2',
            'bottom-8 left-8 border-l-2 border-b-2',
            'bottom-8 right-8 border-r-2 border-b-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`absolute w-12 h-12 border-primary/70 ${cls}`}
            />
          ))}

          {/* Main content */}
          <div className="relative w-full max-w-2xl mx-auto px-8">
            {!started ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center h-64"
              >
                <div className="text-primary font-heading mb-6 tracking-widest" style={{ textShadow: '0 0 10px rgba(0,255,0,0.8)' }}>
                  AWAITING USER INPUT TO INITIALIZE SYSTEM
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,0,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="px-8 py-3 border-2 border-primary text-primary font-heading tracking-widest uppercase hover:bg-primary/20 transition-all"
                >
                  [ INITIATE CONNECTION ]
                </motion.button>
              </motion.div>
            ) : (
              <>

            {/* Robot ASCII face */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <pre
                  className="font-heading text-primary text-center leading-tight text-xs"
                  style={{ textShadow: '0 0 15px rgba(0,255,0,0.8)' }}
                >{`
  ╔═══════════════╗
  ║  ┌─┐     ┌─┐ ║
  ║  │█│     │█│ ║
  ║  └─┘ ─── └─┘ ║
  ║   ╔═════════╗ ║
  ║   ║ ≡ ≡ ≡  ║ ║
  ║   ╚═════════╝ ║
  ╚═══════════════╝
`}</pre>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ textShadow: '0 0 20px rgba(0,255,0,1)' }}
                />
              </div>
            </motion.div>

            {/* Boot lines */}
            <div className="space-y-2 mb-8 font-heading">
              {GREETING_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleLines.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: 3, repeatType: 'loop' }}
                        className="text-primary text-sm"
                        style={{ textShadow: '0 0 8px rgba(0,255,0,0.8)' }}
                      >
                        ▶
                      </motion.span>
                      <span
                        className={`text-sm tracking-widest ${
                          i === GREETING_LINES.length - 1
                            ? 'text-secondary'
                            : i >= 4
                            ? 'text-primary'
                            : 'text-foreground/60'
                        }`}
                        style={i >= 4 ? { textShadow: '0 0 10px rgba(0,255,0,0.6)' } : {}}
                      >
                        {line.text}
                      </span>
                      {i === visibleLines[visibleLines.length - 1] && !done && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="text-primary text-sm"
                        >
                          █
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-background/40 rounded-full overflow-hidden border border-primary/20 mb-4">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full"
                transition={{ duration: 0.08 }}
                initial={false}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(90deg, #00ff00, #00ffff)',
                    boxShadow: '0 0 12px rgba(0,255,0,0.8)',
                  }}
                />
              </motion.div>
            </div>

            {/* Progress label */}
            <div className="flex justify-between font-heading text-xs text-foreground/40">
              <span>BOOT_SEQUENCE</span>
              <span className="text-primary">{Math.round(progress)}%</span>
            </div>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 1.5 }}
              whileHover={{ opacity: 1 }}
              onClick={() => {
                setDone(true);
                window.speechSynthesis?.cancel();
                setProgress(100);
                setTimeout(() => {
                  setShow(false);
                  sessionStorage.setItem('robot_greeted', '1');
                }, 300);
              }}
              className="absolute bottom-4 right-8 font-heading text-xs text-foreground/40 hover:text-primary transition-colors"
            >
              [ SKIP → ]
            </motion.button>
            </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
