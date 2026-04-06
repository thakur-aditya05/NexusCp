import { useState } from 'react';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';
import { aiPrompts } from '@/data/aiPrompts';

const MessageComposer = ({ isAI }) => {
  const [message, setMessage] = useState('');

  return (
    <div className="border-t border-border/50 bg-card">
      {isAI && (
        <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-none">
          {aiPrompts.slice(0, 4).map(prompt => (
            <button
              key={prompt.id}
              onClick={() => setMessage(prompt.text)}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-surface-1 border border-border/50 text-xs text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-all"
            >
              {prompt.icon} {prompt.text}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2 p-3">
        <button className="w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors flex-shrink-0">
          <Smile className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors flex-shrink-0">
          <Paperclip className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <input
            type="text"
            placeholder={isAI ? 'Ask my.ai anything...' : 'Type a message...'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-surface-1 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
        {message.trim() ? (
          <button className="w-9 h-9 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors flex-shrink-0 shadow-glow">
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        ) : (
          <button className="w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors flex-shrink-0">
            <Mic className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageComposer;
