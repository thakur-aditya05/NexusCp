const categories = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
  { key: 'friends', label: 'Friends' },
];

const ChatCategoryTabs = ({ active, onChange }) => {
  return (
    <div className="flex gap-1.5">
      {categories.map(cat => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            active === cat.key
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface-1 text-muted-foreground hover:bg-surface-hover hover:text-foreground'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default ChatCategoryTabs;
