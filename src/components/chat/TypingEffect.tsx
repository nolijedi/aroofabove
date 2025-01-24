import React from "react";

interface TypingEffectProps {
    text: string;
    speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 50 }) => {
    return (
        <div className="typing-effect">
            {text}
        </div>
    );
};

export default TypingEffect;