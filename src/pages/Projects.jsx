import { useState, useEffect, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import { projects, getProjectsByCategory } from '../data/projects'
import './Projects.css'

function Projects() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const sectionRef = useRef(null)

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'mobile', label: 'Mobile Apps' },
        { id: 'web', label: 'Web Apps' },
        { id: 'ai', label: 'AI/ML' },
    ]

    useEffect(() => {
        setFilteredProjects(getProjectsByCategory(activeCategory))
    }, [activeCategory])

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
    }, [])

    return (
        <div className="projects-page" ref={sectionRef}>
            <section className="projects-hero">
                <div className="container">
                    <div className="projects-hero-content scroll-animate">
                        <span className="section-label">Our Portfolio</span>
                        <h1 className="page-title">Projects That Speak</h1>
                        <p className="page-subtitle">
                            Every project here is real, deployed, and proven to work.
                            Click on any project to explore the details, screenshots, and live demos.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section projects-list-section">
                <div className="container">
                    <div className="projects-filters scroll-animate">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="projects-grid scroll-animate">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <div className="no-projects">
                                <p>No projects found in this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Projects
