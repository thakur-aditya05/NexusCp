import { motion } from 'framer-motion';
import { X, Clock, Image, FileText, Link as LinkIcon, BellOff, Trash2, Shield, Users } from 'lucide-react';
import { chats } from '@/data/chats';
import UserAvatar from '@/components/common/UserAvatar';

const InfoMenuItem = ({ icon: Icon, label, badge, iconColor = 'text-muted-foreground', onClick, destructive }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
      destructive ? 'hover:bg-destructive/10' : 'hover:bg-surface-hover'
    }`}
  >
    <Icon className={`w-4 h-4 ${destructive ? 'text-destructive' : iconColor}`} />
    <span className={`text-sm ${destructive ? 'text-destructive' : 'text-foreground'}`}>{label}</span>
    {badge && <span className="ml-auto text-xs text-muted-foreground">{badge}</span>}
  </button>
);

const ChatInfoDrawer = ({ chatId, onClose, onEnableTemporary }) => {
  const chat = chats.find(c => c.id === chatId);
  if (!chat) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      className="w-full md:w-80 h-full bg-card border-l border-border/50 flex flex-col overflow-y-auto"
    >
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h2 className="text-sm font-semibold text-foreground">Chat Info</h2>
        <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex flex-col items-center py-6">
        <UserAvatar name={chat.contact.name} status={chat.contact.status} size="xl" isAI={chat.isAI} />
        <h3 className="mt-3 text-lg font-semibold text-foreground">{chat.contact.name}</h3>
        <p className="text-sm text-muted-foreground">{chat.contact.about || 'No status'}</p>
        {chat.contact.phone && (
          <p className="text-xs text-muted-foreground mt-1">{chat.contact.phone}</p>
        )}
      </div>

      <div className="px-4 space-y-1">
        <button
          onClick={onEnableTemporary}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-colors"
        >
          <Clock className="w-4 h-4 text-temporary" />
          <span className="text-sm text-foreground">Temporary Chat</span>
          {chat.temporaryChat?.enabled && (
            <span className="ml-auto text-[11px] text-temporary font-medium">{chat.temporaryChat.duration}</span>
          )}
        </button>
        <InfoMenuItem icon={Image} label="Media" badge="24" />
        <InfoMenuItem icon={FileText} label="Documents" badge="8" />
        <InfoMenuItem icon={LinkIcon} label="Links" badge="12" />
      </div>

      <div className="px-4 mt-4 space-y-1">
        <div className="h-px bg-border/50 mb-2" />
        <InfoMenuItem icon={BellOff} label={`${chat.isMuted ? 'Unmute' : 'Mute'} notifications`} />
        <InfoMenuItem icon={Shield} label="Encryption" />
        <InfoMenuItem icon={Trash2} label="Delete chat" destructive />
      </div>

      {chat.isGroup && chat.groupMembers && (
        <div className="px-4 mt-4">
          <div className="h-px bg-border/50 mb-3" />
          <div className="flex items-center gap-2 px-3 mb-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Members ({chat.groupMembers.length})</span>
          </div>
          {chat.groupMembers.map(m => (
            <div key={m.id} className="flex items-center gap-3 px-3 py-2">
              <UserAvatar name={m.name} status={m.status} size="sm" />
              <span className="text-sm text-foreground">{m.name}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ChatInfoDrawer;
