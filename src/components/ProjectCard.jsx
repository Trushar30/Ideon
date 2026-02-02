import { Link } from 'react-router-dom'
import './ProjectCard.css'

function ProjectCard({ project, index }) {
    return (
        <Link to={`/projects/${project.id}`} className="project-card">
            {/* Phone/Browser Preview based on category */}
            <div className="project-preview">
                {project.category === 'mobile' ? (
                    /* Phone Mockup */
                    <div className="phone-mockup">
                        <div className="phone-frame-card">
                            {/* Phone notch */}
                            <div className="phone-notch-card">
                                <div className="notch-speaker-card"></div>
                                <div className="notch-camera-card"></div>
                            </div>

                            {/* Phone screen */}
                            <div className="phone-screen-card">
                                {project.thumbnail ? (
                                    <img src={project.thumbnail} alt={project.title} />
                                ) : (
                                    <div className="preview-placeholder">
                                        <div className="placeholder-icon">{project.title.charAt(0)}</div>
                                        <span className="placeholder-text">Preview</span>
                                    </div>
                                )}
                            </div>

                            {/* Phone buttons */}
                            <div className="phone-button-power-card"></div>
                            <div className="phone-button-volume-card"></div>
                        </div>
                    </div>
                ) : (
                    /* Browser Frame for web apps */
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
                            {project.thumbnail ? (
                                <img src={project.thumbnail} alt={project.title} className="single-image" />
                            ) : (
                                <div className="preview-placeholder">
                                    <div className="placeholder-icon">{project.title.charAt(0)}</div>
                                    <span className="placeholder-text">Preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
