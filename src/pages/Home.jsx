import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import Icon from '../components/Icons'
import { getFeaturedProjects } from '../data/projects'
import { services } from '../data/services'
import '../styles/cinematicScroll.css'
import './Home.css'

function Home() {
    const featuredProjects = getFeaturedProjects()
    const sectionsRef = useRef([])

    useEffect(() => {
        // Initialize cinematic scroll effects
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view')

                        // Stagger children animation
                        const children = entry.target.querySelectorAll('.stagger-item')
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('revealed')
                            }, index * 150)
                        })
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        )

        sectionsRef.current.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el)
        }
    }

    return (
        <div className="home">
            {/* Scroll Progress */}
            <div className="scroll-progress"></div>

            <Hero />

            {/* About - Cinematic Reveal */}
            <section className="section-about section-fade" ref={addToRefs}>
                <div className="about-container">
                    <div className="about-label blur-reveal">
                        <span className="label-line"></span>
                        <span>What is Ideon?</span>
                    </div>

                    <div className="about-grid">
                        <div className="about-main">
                            <h2 className="about-heading wipe-reveal" data-text-reveal>
                                A portfolio of real work, not promises.
                            </h2>
                            <p className="about-text blur-reveal">
                                Every project here was built from scratch and deployed to production.
                                We help students turn their ideas into actual working applications —
                                no templates, no copy-paste, no shortcuts.
                            </p>
                        </div>

                        <div className="about-points">
                            <div className="point stagger-item">
                                <span className="point-number">01</span>
                                <div className="point-content">
                                    <h4>Custom Built</h4>
                                    <p>Tailored to your specific requirements</p>
                                </div>
                            </div>
                            <div className="point stagger-item">
                                <span className="point-number">02</span>
                                <div className="point-content">
                                    <h4>Fully Deployed</h4>
                                    <p>Live and accessible on the internet</p>
                                </div>
                            </div>
                            <div className="point stagger-item">
                                <span className="point-number">03</span>
                                <div className="point-content">
                                    <h4>You Own It</h4>
                                    <p>Complete source code and documentation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services - Dramatic Reveal */}
            <section className="section-services section-fade" ref={addToRefs}>
                <div className="services-container">
                    <div className="services-header">
                        <h2 className="services-title dramatic-scale">What we build</h2>
                        <p className="services-subtitle blur-reveal">
                            Full-stack solutions across web, mobile, and AI
                        </p>
                    </div>

                    <div className="services-grid stagger-children">
                        {services.slice(0, 6).map((service, index) => (
                            <div
                                key={service.id}
                                className="service-item stagger-item spin-reveal"
                                style={{ '--i': index }}
                            >
                                <div className="service-icon">
                                    <Icon name={service.icon} size={24} />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.shortDesc || service.description.slice(0, 80)}...</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Work - Cinematic Layout */}
            <section className="section-work section-fade" ref={addToRefs}>
                <div className="work-container">
                    <div className="work-header">
                        <div className="work-label blur-reveal">
                            <span className="label-line"></span>
                            <span>Featured Work</span>
                        </div>
                        <h2 className="work-title clip-reveal">Projects that speak for themselves</h2>
                    </div>

                    <div className="work-grid stagger-children">
                        {featuredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="work-item stagger-item"
                                style={{ '--i': index }}
                            >
                                <ProjectCard project={project} index={index} />
                            </div>
                        ))}
                    </div>

                    <div className="work-footer blur-reveal">
                        <Link to="/projects" className="work-link">
                            <span>View all projects</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12,5 19,12 12,19" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA - Dramatic */}
            <section className="section-cta section-fade" ref={addToRefs}>
                <div className="cta-container">
                    <div className="cta-content dramatic-scale pulse-glow">
                        <h2>Have a project in mind?</h2>
                        <p>Let's talk — no pressure, no commitment.</p>
                        <Link to="/connect" className="cta-button">
                            <span>Start a conversation</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
