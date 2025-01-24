import React, { useState, useEffect, useRef } from "react";

interface TypingEffectProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({ 
    text, 
    speed = 30,
    onComplete 
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (currentIndex < text.length) {
            timeoutRef.current = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    useEffect(() => {
        setDisplayedText("");
        setCurrentIndex(0);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [text]);

    return (
        <div className="typing-effect whitespace-pre-wrap">
            {displayedText}
            {currentIndex < text.length && (
                <span className="inline-block w-1 h-4 ml-1 -mb-0.5 bg-roofing-orange/50 animate-pulse" />
            )}
        </div>
    );
};