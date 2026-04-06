import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { contacts } from '@/data/contacts';
import UserAvatar from '@/components/common/UserAvatar';
import { useState } from 'react';

const ContactListItem = ({ contact, onSelect }) => (
  <button
    onClick={() => onSelect(contact.id)}
    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors"
  >
    <UserAvatar name={contact.name} status={contact.status} size="sm" />
    <div className="text-left">
      <div className="text-sm font-medium text-foreground">{contact.name}</div>
      <div className="text-xs text-muted-foreground">{contact.about}</div>
    </div>
  </button>
);

const NewChatModal = ({ isOpen, onClose, onSelect, title = 'New Chat' }) => {
  const [search, setSearch] = useState('');
  if (!isOpen) return null;

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl bg-card border border-border/50 shadow-lg overflow-hidden max-h-[70vh] flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-1 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {filtered.map(contact => (
              <ContactListItem key={contact.id} contact={contact} onSelect={(id) => { onSelect(id); onClose(); }} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewChatModal;
