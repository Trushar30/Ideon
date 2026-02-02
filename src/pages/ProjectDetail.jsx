import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icons'
import PhoneGallery from '../components/PhoneGallery'
import { getProjectById } from '../data/projects'
import './ProjectDetail.css'

function ProjectDetail() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const foundProject = getProjectById(id)
        setProject(foundProject)
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            const elements = sectionRef.current.querySelectorAll('.scroll-animate')
            elements.forEach((el) => observer.observe(el))
        }

        return () => observer.disconnect()
    }, [project])

    if (!project) {
        return (
            <div className="project-detail-page not-found">
                <div className="container">
                    <h1>Project Not Found</h1>
                    <p>The project you're looking for doesn't exist.</p>
                    <Link to="/projects" className="btn btn-primary">
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="project-detail-page" ref={sectionRef}>
            {/* Hero Section */}
            <section className="project-hero">
                <div className="project-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <Link to="/projects" className="back-link scroll-animate">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12,19 5,12 12,5" />
                        </svg>
                        Back to Projects
                    </Link>

                    <div className="project-hero-content scroll-animate">
                        <div className="project-meta">
                            <span className={`badge ${project.status === 'deployed' ? 'badge-success' : 'badge-warning'}`}>
                                <span className="badge-dot"></span>
                                {project.status === 'deployed' ? 'Deployed' : 'Prototype'}
                            </span>
                            {project.hackathon && (
                                <span className="project-hackathon">{project.hackathon}</span>
                            )}
                        </div>

                        <h1 className="project-title">{project.title}</h1>
                        <p className="project-subtitle">{project.subtitle}</p>

                        <div className="project-tech-stack">
                            {project.techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="tag tag-colored"
                                    style={{ color: tech.color }}
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>

                        {project.demoLink && (
                            <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-lg"
                            >
                                View Live Demo
                                <Icon name="externalLink" size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Problem & Solution */}
            <section className="section problem-section">
                <div className="container">
                    <div className="problem-solution-grid scroll-animate">
                        <div className="problem-card gradient-border">
                            <div className="card-icon">
                                <Icon name="target" size={28} />
                            </div>
                            <h3>Problem Statement</h3>
                            <p>{project.problem}</p>
                        </div>

                        <div className="solution-card gradient-border">
                            <div className="card-icon">
                                <Icon name="lightbulb" size={28} />
                            </div>
                            <h3>Our Solution</h3>
                            <p>{project.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots Gallery - 3D Phone Mockup */}
            {project.screenshots && project.screenshots.length > 0 && (
                <section className="section gallery-section">
                    <div className="container">
                        <div className="section-header scroll-animate">
                            <span className="section-label">Visual Preview</span>
                            <h2 className="section-title">Screenshots</h2>
                            <p className="section-subtitle">
                                Experience {project.category === 'mobile' ? 'the app' : 'the website'} through our interactive device showcase
                            </p>
                        </div>

                        <div className="scroll-animate">
                            <PhoneGallery screenshots={project.screenshots} category={project.category} />
                        </div>
                    </div>
                </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
                <section className="section features-section">
                    <div className="container">
                        <div className="section-header scroll-animate">
                            <span className="section-label">Key Highlights</span>
                            <h2 className="section-title">Features & Capabilities</h2>
                        </div>

                        <div className="features-grid scroll-animate">
                            {project.features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <span className="feature-check">
                                        <Icon name="check" size={14} />
                                    </span>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Architecture */}
            {project.architecture && (
                <section className="section architecture-section">
                    <div className="container">
                        <div className="architecture-content scroll-animate">
                            <div className="architecture-text">
                                <span className="section-label">Technical Details</span>
                                <h2 className="section-title" style={{ textAlign: 'left' }}>Architecture Overview</h2>
                                <p>{project.architecture}</p>
                            </div>

                            <div className="tech-breakdown">
                                {project.techStack.map((tech, index) => (
                                    <div key={index} className="tech-item" style={{ borderColor: tech.color }}>
                                        <span className="tech-dot" style={{ background: tech.color }}></span>
                                        <span className="tech-name">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="section project-cta-section">
                <div className="container">
                    <div className="project-cta scroll-animate">
                        <h2>Want Something Similar?</h2>
                        <p>Let's discuss how we can build something like this for your project.</p>
                        <Link to="/connect" className="btn btn-primary btn-lg">
                            Start a Conversation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProjectDetail
