import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatArea.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ChatArea({ chat, onSendMessage, userId, onBackToList, isMobile }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chat.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={styles.chatArea}>
      <div className={styles.chatHeader}>
        {isMobile && (
          <button onClick={onBackToList} className={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <Link to={`/profile/${chat.otherParticipant.role}/${chat.otherParticipant.id}`} className={styles.link}>
          <span className={styles.name}>{chat.fullName}</span>
        </Link>
      </div>
      <div className={styles.messagesWrapper}>
        <div className={styles.messages}>
          {chat.messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.sender.id === userId ? styles.tutor : ''}`}>
              <div className={styles.messageContent}>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </div>
  );
}

export default ChatArea;

