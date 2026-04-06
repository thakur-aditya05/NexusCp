import { Check, CheckCheck, Play, FileText, Image as ImageIcon } from 'lucide-react';

const StatusIcon = ({ isMe, status }) => {
  if (!isMe || !status) return null;
  if (status === 'read') return <CheckCheck className="w-3.5 h-3.5 text-primary" />;
  if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />;
  return <Check className="w-3.5 h-3.5 text-muted-foreground" />;
};

const MessageBubble = ({ message, isAI }) => {
  const isMe = message.senderId === 'me';
  const isSystem = message.type === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-[11px] text-muted-foreground bg-chat-system px-3 py-1.5 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1`}>
      <div
        className={`max-w-[75%] md:max-w-[65%] ${
          isMe
            ? 'bg-chat-outgoing rounded-2xl rounded-br-md'
            : message.type === 'ai-response'
            ? 'bg-surface-2 border border-primary/20 rounded-2xl rounded-bl-md'
            : 'bg-chat-incoming rounded-2xl rounded-bl-md'
        }`}
      >
        {message.type === 'image' && (
          <div className="p-1.5">
            <div className="w-56 h-40 rounded-xl bg-surface-3 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
            </div>
          </div>
        )}

        {message.type === 'voice' && (
          <div className="px-4 py-3 flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-primary ml-0.5" />
            </button>
            <div className="flex-1">
              <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground">{message.duration}</span>
          </div>
        )}

        {message.type === 'file' && (
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-foreground truncate">{message.fileName}</div>
              <div className="text-[11px] text-muted-foreground">{message.fileSize}</div>
            </div>
          </div>
        )}

        {(message.type === 'text' || message.type === 'ai-response') && message.content && (
          <div className="px-4 py-2.5">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
        )}

        <div className={`flex items-center gap-1.5 px-4 pb-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[10px] text-muted-foreground">{message.timestamp}</span>
          <StatusIcon isMe={isMe} status={message.status} />
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
