import React, { useEffect, useState } from "react";

const texts = [
    "Welcome To Aditya Bus Tracking!!",
    "Have You Lost Your Bus...?",
    "Don't Worry, We Got Your Back!!",
    "Click Below To Get Started....",
];

export const Header = () => {
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false); // New state for pause

    useEffect(() => {
        const handleTyping = () => {
            if (isPaused) return; // Exit if we are in the pause state

            if (isDeleting) {
                if (charIndex > 0) {
                    setCurrentText(texts[textIndex].substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % texts.length);
                    setCharIndex(0);
                    setIsPaused(true); // Enter pause state
                    setTimeout(() => setIsPaused(false), 500); // Pause for 2 seconds
                }
            } else {
                if (charIndex < texts[textIndex].length) {
                    setCurrentText(texts[textIndex].substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setIsDeleting(true);
                }
            }
        };

        const typingSpeed = isPaused ? 1000 : isDeleting ? 75 : 100; // Adjust typing speed during pause
        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, textIndex, charIndex, isPaused]);

    return (
        <div>
            <div className="home_header">
                <div className="home_ht">
                    <div className="home_h1">
                        ADITYA
                    </div>
                    <div className="home_h1">ADITYA</div>
                    <div className="home_h1">ADITYA</div>
                </div>
                <div className="home_h11"><h1>Transport Hub</h1></div>
                <div className="home_container">
                    <div>
                        <h2 className="type" id="dynamicText">{currentText}</h2>
                    </div>
                </div>
            </div>
            
        </div>
    );
};
