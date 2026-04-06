import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInfoDrawer from '@/components/chat/ChatInfoDrawer';
import EmptyState from '@/components/chat/EmptyState';
import CallScreen from '@/components/calls/CallScreen';
import IncomingCallModal from '@/components/calls/IncomingCallModal';
import TemporaryChatModal from '@/components/modals/TemporaryChatModal';
import NewChatModal from '@/components/modals/NewChatModal';
import { chats } from '@/data/chats';

const ChatApp = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showTempModal, setShowTempModal] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [callState, setCallState] = useState({
    open: false,
    type: 'voice',
    contact: '',
  });
  const [incomingCall, setIncomingCall] = useState(false);

  const selectedChat = chats.find(c => c.id === selectedChatId);

  const handleOpenCall = (type) => {
    if (selectedChat) {
      setCallState({ open: true, type, contact: selectedChat.contact.name });
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <div
        className={`${
          selectedChatId ? 'hidden md:flex' : 'flex'
        } w-full md:w-80 lg:w-96 flex-shrink-0`}
      >
        <ChatSidebar
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onNewChat={() => setShowNewChat(true)}
        />
      </div>

      <div className={`${selectedChatId ? 'flex' : 'hidden md:flex'} flex-1 min-w-0`}>
        {selectedChatId ? (
          <div className="flex-1 flex">
            <div className="flex-1 min-w-0">
              <ChatWindow
                chatId={selectedChatId}
                onBack={() => setSelectedChatId(null)}
                onOpenInfo={() => setShowInfo(true)}
                onOpenCall={handleOpenCall}
              />
            </div>
            <AnimatePresence>
              {showInfo && selectedChatId && (
                <ChatInfoDrawer
                  chatId={selectedChatId}
                  onClose={() => setShowInfo(false)}
                  onEnableTemporary={() => setShowTempModal(true)}
                />
              )}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <TemporaryChatModal
        isOpen={showTempModal}
        onClose={() => setShowTempModal(false)}
        onEnable={(duration) => console.log('Temporary chat:', duration)}
        currentDuration={selectedChat?.temporaryChat?.duration}
        isEnabled={selectedChat?.temporaryChat?.enabled}
      />

      <NewChatModal
        isOpen={showNewChat}
        onClose={() => setShowNewChat(false)}
        onSelect={(contactId) => {
          const chat = chats.find(c => c.contact.id === contactId);
          if (chat) setSelectedChatId(chat.id);
        }}
      />

      <CallScreen
        isOpen={callState.open}
        onClose={() => setCallState({ ...callState, open: false })}
        contactName={callState.contact}
        type={callState.type}
      />

      <IncomingCallModal
        isOpen={incomingCall}
        contactName="Aisha Patel"
        type="voice"
        onAccept={() => {
          setIncomingCall(false);
          setCallState({ open: true, type: 'voice', contact: 'Aisha Patel' });
        }}
        onDecline={() => setIncomingCall(false)}
      />
    </div>
  );
};

export default ChatApp;
