import { useState } from 'react'
import './PhoneGallery.css'

function PhoneGallery({ screenshots, category = 'mobile' }) {
    const [activeIndex, setActiveIndex] = useState(0)

    if (!screenshots || screenshots.length === 0) return null

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
    }

    // Determine if we should show laptop or phone based on category
    const isWebProject = category === 'web'

    return (
        <div className="phone-gallery">
            {/* Floating devices background */}
            <div className="phone-gallery-bg">
                {screenshots.slice(0, 3).map((_, i) => (
                    <div
                        key={i}
                        className={`floating-phone floating-phone-${i + 1}`}
                        style={{ '--delay': `${i * 0.5}s` }}
                    >
                        <div className={isWebProject ? "laptop-frame-mini" : "phone-frame-mini"}>
                            <div className={isWebProject ? "laptop-screen-mini" : "phone-screen-mini"}>
                                <img
                                    src={screenshots[(activeIndex + i + 1) % screenshots.length].src}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main device showcase */}
            <div className="phone-showcase">
                <div className="phone-3d-container">
                    {isWebProject ? (
                        /* Laptop Mockup for Web Projects */
                        <div className="laptop-frame">
                            {/* Laptop screen */}
                            <div className="laptop-screen">
                                {/* Screen bezel */}
                                <div className="laptop-bezel">
                                    <div className="laptop-camera"></div>
                                </div>

                                {/* Screen content */}
                                <div className="laptop-screen-content">
                                    <img
                                        src={screenshots[activeIndex].src}
                                        alt={screenshots[activeIndex].alt}
                                    />
                                </div>
                            </div>

                            {/* Laptop base/keyboard */}
                            <div className="laptop-base">
                                <div className="laptop-trackpad"></div>
                            </div>
                        </div>
                    ) : (
                        /* Phone Mockup for Mobile Projects */
                        <div className="phone-frame">
                            {/* Phone notch */}
                            <div className="phone-notch">
                                <div className="notch-speaker"></div>
                                <div className="notch-camera"></div>
                            </div>

                            {/* Phone screen */}
                            <div className="phone-screen">
                                <img
                                    src={screenshots[activeIndex].src}
                                    alt={screenshots[activeIndex].alt}
                                />
                            </div>

                            {/* Phone buttons */}
                            <div className="phone-button-power"></div>
                            <div className="phone-button-volume-up"></div>
                            <div className="phone-button-volume-down"></div>
                        </div>
                    )}

                    {/* Reflection */}
                    <div className="phone-reflection">
                        <div className="phone-frame reflection-frame">
                            <div className="phone-screen">
                                <img
                                    src={screenshots[activeIndex].src}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glow effect */}
                <div className="phone-glow"></div>
            </div>

            {/* Controls */}
            <div className="phone-gallery-controls">
                <button className="gallery-nav-btn" onClick={handlePrev} aria-label="Previous screenshot">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                </button>

                <div className="gallery-dots">
                    {screenshots.map((_, index) => (
                        <button
                            key={index}
                            className={`gallery-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to screenshot ${index + 1}`}
                        />
                    ))}
                </div>

                <button className="gallery-nav-btn" onClick={handleNext} aria-label="Next screenshot">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,6 15,12 9,18" />
                    </svg>
                </button>
            </div>

            {/* Caption */}
            <p className="phone-gallery-caption">{screenshots[activeIndex].alt}</p>
        </div>
    )
}

export default PhoneGallery
