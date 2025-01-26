import React, { useState, useEffect } from 'react'

const DestinationCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updateCursorPosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', updateCursorPosition)

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition)
        }
    }, [])

    useEffect(() => {
        document.body.style.cursor = 'none'
        return () => {
            document.body.style.cursor = 'default'
        }
    }, [])

    return (
        <div
            className="pointer-events-none fixed left-0 top-0 z-50"
            style={{
                transform: `translate(${position.x - 15}px, ${position.y - 30}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        >
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 0C9.48 0 5 4.48 5 10C5 17.5 15 30 15 30C15 30 25 17.5 25 10C25 4.48 20.52 0 15 0ZM15 13.5C13.07 13.5 11.5 11.93 11.5 10C11.5 8.07 13.07 6.5 15 6.5C16.93 6.5 18.5 8.07 18.5 10C18.5 11.93 16.93 13.5 15 13.5Z"
                    fill="#FF0000"
                />
            </svg>
        </div>
    )
}

export default DestinationCursor