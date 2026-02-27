import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingTransitionProps {
  isActive: boolean;
  onComplete: () => void;
  duration?: number;
}

export function LoadingTransition({
  isActive,
  onComplete,
  duration = 3000,
}: LoadingTransitionProps) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, duration]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Video Background */}
          {!videoError && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => {
                console.error("Erro ao carregar vídeo de loading");
                setVideoError(true);
              }}
            >
              <source src="/capivara-watcher-prototype/loading.mp4" type="video/mp4" />
            </video>
          )}

          {/* Fallback if video fails */}
          {videoError && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    x: [-100, 100],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-white text-6xl font-display"
                >
                  🐾
                </motion.div>
              </div>
            </div>
          )}

          {/* Overlay Text (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-10"
          >
            <h2 className="text-2xl font-display font-bold text-white drop-shadow-lg">
              Carregando...
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
