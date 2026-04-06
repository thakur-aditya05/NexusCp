import { Search, Phone, Video, ChevronLeft, Clock, Info } from 'lucide-react';
import { messages as allMessages } from '@/data/messages';
import { chats } from '@/data/chats';
import UserAvatar from '@/components/common/UserAvatar';
import MessageBubble from '@/components/chat/MessageBubble';
import MessageComposer from '@/components/chat/MessageComposer';
import TypingIndicator from '@/components/chat/TypingIndicator';

const ChatHeader = ({ chat, onBack, onOpenInfo, onOpenCall }) => (
  <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card">
    <button onClick={onBack} className="md:hidden w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors">
      <ChevronLeft className="w-5 h-5 text-muted-foreground" />
    </button>
    <button onClick={onOpenInfo} className="flex items-center gap-3 flex-1 min-w-0">
      <UserAvatar name={chat.contact.name} status={chat.contact.status} isAI={chat.isAI} />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground truncate">{chat.contact.name}</span>
          {chat.temporaryChat?.enabled && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-temporary/15 text-temporary text-[10px] font-medium">
              <Clock className="w-3 h-3" />
              {chat.temporaryChat.duration === '3d' ? '3 days' : chat.temporaryChat.duration}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {chat.typing ? (
            <span className="text-primary">typing...</span>
          ) : chat.contact.status === 'online' ? (
            'Online'
          ) : (
            chat.contact.lastSeen ? `Last seen ${chat.contact.lastSeen}` : 'Offline'
          )}
        </span>
      </div>
    </button>

    <div className="flex items-center gap-1">
      <button className="w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors">
        <Search className="w-4 h-4 text-muted-foreground" />
      </button>
      <button
        onClick={() => onOpenCall('voice')}
        className="w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors"
      >
        <Phone className="w-4 h-4 text-muted-foreground" />
      </button>
      <button
        onClick={() => onOpenCall('video')}
        className="w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors"
      >
        <Video className="w-4 h-4 text-muted-foreground" />
      </button>
      <button
        onClick={onOpenInfo}
        className="w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors"
      >
        <Info className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  </div>
);

const TemporaryChatBanner = ({ temporaryChat }) => {
  if (!temporaryChat?.enabled) return null;
  return (
    <div className="px-4 py-2 bg-temporary/5 border-b border-temporary/10 flex items-center gap-2">
      <Clock className="w-3.5 h-3.5 text-temporary" />
      <span className="text-xs text-temporary">
        Temporary chat enabled — messages will disappear after {temporaryChat.duration === '3d' ? '3 days' : temporaryChat.duration}
      </span>
    </div>
  );
};

const ChatWindow = ({ chatId, onBack, onOpenInfo, onOpenCall }) => {
  const chat = chats.find(c => c.id === chatId);
  const chatMessages = allMessages[chatId] || [];

  if (!chat) return null;

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader chat={chat} onBack={onBack} onOpenInfo={onOpenInfo} onOpenCall={onOpenCall} />
      <TemporaryChatBanner temporaryChat={chat.temporaryChat} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        <div className="flex justify-center mb-4">
          <span className="text-[11px] text-muted-foreground bg-surface-1 px-3 py-1 rounded-full">Today</span>
        </div>
        {chatMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isAI={chat.isAI} />
        ))}
        {chat.typing && <TypingIndicator />}
      </div>

      <MessageComposer isAI={chat.isAI} />
    </div>
  );
};

export default ChatWindow;
