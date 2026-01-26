import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarfieldBackground from './StarfieldBackground'
import './Hero.css'

function Hero() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section className="hero">
            {/* Cinematic Starfield Background */}
            <div className="hero-bg">
                <StarfieldBackground />
                <div className="hero-noise"></div>
                <div className="hero-gradient-blob"></div>
            </div>

            {/* Content */}
            <div className="hero-container">
                <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
                    {/* Eyebrow */}
                    <div className="hero-eyebrow">
                        <span className="eyebrow-line"></span>
                        <span className="eyebrow-text">Student Project Studio</span>
                    </div>

                    {/* Main Title - Split layout */}
                    <div className="hero-title-block">
                        <h1 className="hero-title">
                            <span className="title-word title-word-1">Ideas</span>
                            <span className="title-arrow">→</span>
                            <span className="title-word title-word-2">Reality</span>
                        </h1>
                        <p className="hero-tagline">
                            We turn your project concepts into<br />
                            <em>deployed, working applications.</em>
                        </p>
                    </div>

                    {/* Description */}
                    <p className="hero-description">
                        Not templates. Not copy-paste. Every project is built from scratch,
                        tailored to your requirements, and actually deployed.
                    </p>

                    {/* Actions */}
                    <div className="hero-actions">
                        <Link to="/projects" className="hero-btn hero-btn-primary">
                            <span>See Our Work</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12,5 19,12 12,19" />
                            </svg>
                        </Link>
                        <Link to="/connect" className="hero-btn hero-btn-secondary">
                            <span>Get in Touch</span>
                        </Link>
                    </div>

                    {/* Quick Stats - Minimal */}
                    <div className="hero-proof">
                        <div className="proof-item">
                            <span className="proof-number">50+</span>
                            <span className="proof-label">projects shipped</span>
                        </div>
                        <div className="proof-divider">·</div>
                        <div className="proof-item">
                            <span className="proof-number">100%</span>
                            <span className="proof-label">deployment rate</span>
                        </div>
                    </div>
                </div>

                {/* Side Visual */}
                <div className={`hero-visual ${isLoaded ? 'loaded' : ''}`}>
                    <div className="visual-card visual-card-1">
                        <div className="card-header">
                            <span className="card-dot"></span>
                            <span className="card-title">agriconnect.app</span>
                        </div>
                        <div className="card-preview">
                            <div className="preview-bar"></div>
                            <div className="preview-content">
                                <div className="preview-circle"></div>
                                <div className="preview-lines">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="visual-card visual-card-2">
                        <div className="card-code">
                            <span className="code-line"><span className="code-purple">const</span> project = <span className="code-green">"yours"</span>;</span>
                            <span className="code-line"><span className="code-purple">const</span> status = <span className="code-green">"deployed"</span>;</span>
                        </div>
                    </div>
                    <div className="visual-badge">
                        <span className="badge-dot"></span>
                        Live & Working
                    </div>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className={`hero-scroll ${isLoaded ? 'loaded' : ''}`}>
                <span>scroll</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    )
}

export default Hero
