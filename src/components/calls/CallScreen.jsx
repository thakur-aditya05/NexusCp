import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, Mic, MicOff, Camera, CameraOff, Monitor, PhoneOff, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import UserAvatar from '@/components/common/UserAvatar';

const MinimizedCall = ({ contactName, onExpand, onClose }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border/50 shadow-lg cursor-pointer"
    onClick={onExpand}
  >
    <div className="w-2 h-2 rounded-full bg-online animate-pulse-soft" />
    <UserAvatar name={contactName} size="sm" showStatus={false} />
    <div className="text-sm text-foreground font-medium">{contactName}</div>
    <span className="text-xs text-primary font-mono">12:45</span>
    <button
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      className="w-7 h-7 rounded-full bg-destructive flex items-center justify-center"
    >
      <PhoneOff className="w-3.5 h-3.5 text-destructive-foreground" />
    </button>
  </motion.div>
);

const CallControls = ({ type, isMuted, isCameraOff, onToggleMute, onToggleCamera, onMinimize, onClose }) => (
  <div className="relative z-10 flex items-center gap-4 mt-16">
    <button
      onClick={onToggleMute}
      className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
        isMuted ? 'bg-destructive/20 text-destructive' : 'bg-surface-3 text-foreground hover:bg-surface-hover'
      }`}
    >
      {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
    </button>

    {type === 'video' && (
      <button
        onClick={onToggleCamera}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
          isCameraOff ? 'bg-destructive/20 text-destructive' : 'bg-surface-3 text-foreground hover:bg-surface-hover'
        }`}
      >
        {isCameraOff ? <CameraOff className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
      </button>
    )}

    <button className="w-14 h-14 rounded-full bg-surface-3 text-foreground hover:bg-surface-hover flex items-center justify-center transition-colors">
      <Monitor className="w-6 h-6" />
    </button>

    <button
      onClick={onMinimize}
      className="w-14 h-14 rounded-full bg-surface-3 text-foreground hover:bg-surface-hover flex items-center justify-center transition-colors"
    >
      <Minimize2 className="w-6 h-6" />
    </button>

    <button
      onClick={onClose}
      className="w-16 h-16 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/80 flex items-center justify-center transition-colors"
    >
      <PhoneOff className="w-7 h-7" />
    </button>
  </div>
);

const CallScreen = ({ isOpen, onClose, contactName, type }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  if (isMinimized) {
    return <MinimizedCall contactName={contactName} onExpand={() => setIsMinimized(false)} onClose={onClose} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
      >
        {type === 'video' && (
          <div className="absolute inset-0 bg-gradient-to-b from-surface-2 to-background" />
        )}

        <div className="relative z-10 flex flex-col items-center">
          <UserAvatar name={contactName} size="xl" showStatus={false} />
          <h2 className="mt-4 text-2xl font-bold text-foreground">{contactName}</h2>
          <p className="text-sm text-primary mt-1 font-mono">12:45</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {type === 'video' ? 'Video call' : 'Voice call'} · HD
          </p>
        </div>

        {type === 'video' && (
          <div className="absolute top-6 right-6 w-32 h-44 rounded-2xl bg-surface-3 border border-border/50 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Your camera</span>
            </div>
          </div>
        )}

        <CallControls
          type={type}
          isMuted={isMuted}
          isCameraOff={isCameraOff}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleCamera={() => setIsCameraOff(!isCameraOff)}
          onMinimize={() => setIsMinimized(true)}
          onClose={onClose}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default CallScreen;
