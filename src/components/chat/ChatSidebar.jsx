import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { chats as initialChats } from '@/data/chats';
import ChatCategoryTabs from '@/components/chat/ChatCategoryTabs';
import ChatItem from '@/components/chat/ChatItem';

const ChatSidebar = ({ selectedChatId, onSelectChat, onNewChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filterChats = (chatList) => {
    let filtered = chatList.filter(c => !c.isArchived);

    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (activeCategory) {
      case 'unread': return filtered.filter(c => c.unreadCount > 0);
      case 'read': return filtered.filter(c => c.unreadCount === 0);
      case 'friends': return filtered.filter(c => c.contact.isFriend);
      default: return filtered;
    }
  };

  const pinnedChats = filterChats(initialChats).filter(c => c.isPinned);
  const regularChats = filterChats(initialChats).filter(c => !c.isPinned);

  return (
    <div className="w-full h-full flex flex-col bg-card border-r border-border/50">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Chats</h1>
          <button
            onClick={onNewChat}
            className="w-8 h-8 rounded-lg bg-surface-3 hover:bg-surface-hover flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-1 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>

        <ChatCategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {pinnedChats.length > 0 && (
          <div className="mb-1">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Pinned</div>
            {pinnedChats.map(chat => (
              <ChatItem key={chat.id} chat={chat} selected={selectedChatId === chat.id} onClick={() => onSelectChat(chat.id)} />
            ))}
          </div>
        )}
        {regularChats.length > 0 && (
          <div>
            {pinnedChats.length > 0 && (
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">All Messages</div>
            )}
            {regularChats.map(chat => (
              <ChatItem key={chat.id} chat={chat} selected={selectedChatId === chat.id} onClick={() => onSelectChat(chat.id)} />
            ))}
          </div>
        )}
        {pinnedChats.length === 0 && regularChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
            <Filter className="w-8 h-8 mb-2 opacity-40" />
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
