import { Link } from 'react-router-dom'
import './ProjectCard.css'

function ProjectCard({ project, index }) {
    // Get first 2 screenshots for stacked effect
    const screenshots = project.screenshots?.slice(0, 2) || []

    return (
        <Link to={`/projects/${project.id}`} className="project-card">
            {/* Stacked Screenshot Preview */}
            <div className="project-preview">
                {/* Browser Frame */}
                <div className="browser-frame">
                    <div className="browser-header">
                        <div className="browser-dots">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                        </div>
                        <div className="browser-url">
                            <span className="url-icon">🔒</span>
                            <span className="url-text">{project.liveUrl ? new URL(project.liveUrl).hostname : `${project.id}.app`}</span>
                        </div>
                        <div className="browser-actions">
                            <span></span>
                        </div>
                    </div>

                    <div className="browser-content">
                        {screenshots.length > 0 ? (
                            <>
                                {/* Stacked background screenshot */}
                                {screenshots[1] && (
                                    <div className="stack-layer stack-back">
                                        <img src={screenshots[1].url} alt="" />
                                    </div>
                                )}
                                {/* Main screenshot */}
                                <div className="stack-layer stack-front">
                                    <img src={screenshots[0].url} alt={screenshots[0].title} />
                                </div>
                            </>
                        ) : project.thumbnail ? (
                            <img src={project.thumbnail} alt={project.title} className="single-image" />
                        ) : (
                            <div className="preview-placeholder">
                                <div className="placeholder-icon">{project.title.charAt(0)}</div>
                                <span className="placeholder-text">Preview</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="preview-overlay">
                    <div className="overlay-content">
                        <span className="overlay-text">View Project</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12,5 19,12 12,19" />
                        </svg>
                    </div>
                </div>

                {/* Status Badge */}
                <div className={`status-badge ${project.status}`}>
                    <span className="status-dot"></span>
                    <span>{project.status === 'deployed' ? 'Live' : 'Prototype'}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="project-info">
                <div className="project-meta">
                    {project.hackathon && (
                        <span className="project-hackathon">{project.hackathon}</span>
                    )}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>

                <div className="project-tech">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                        <span
                            key={i}
                            className="tech-pill"
                            style={{ '--tech-color': tech.color }}
                        >
                            {tech.name}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="tech-more">+{project.techStack.length - 3}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
