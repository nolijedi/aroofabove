export const animations = {
  phoneRing: {
    keyframes: `@keyframes phone-pulse {
      0% { transform: scale(1); opacity: 0.2; }
      25% { transform: scale(0.8); opacity: 0.3; }
      50% { transform: scale(1.6); opacity: 0.1; }
      75% { transform: scale(0.8); opacity: 0.3; }
      100% { transform: scale(1); opacity: 0.2; }
    }`,
    className: 'animate-live-chat-pulse'
  },
  liveChatPulse: {
    keyframes: `@keyframes live-chat-pulse {
      0% { transform: scale(1); opacity: 0.2; }
      25% { transform: scale(0.8); opacity: 0.3; }
      50% { transform: scale(1.6); opacity: 0.1; }
      75% { transform: scale(0.8); opacity: 0.3; }
      100% { transform: scale(1); opacity: 0.2; }
    }`,
    className: 'animate-live-chat-pulse'
  },
  bouncePause: {
    keyframes: `@keyframes bounce-pause {
      0%, 100% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      60%, 80% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
    }`,
    className: 'animate-bounce-pause'
  }
};
