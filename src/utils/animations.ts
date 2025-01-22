export const animations = {
  phoneRing: {
    keyframes: `@keyframes phone-pulse {
      0% { transform: scale(1.5); }
      50% { transform: scale(0); }
      100% { transform: scale(1.5); }
    }`,
    className: 'animate-phone-pulse'
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
