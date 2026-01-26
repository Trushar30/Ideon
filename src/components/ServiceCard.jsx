import Icon from './Icons'
import './ServiceCard.css'

function ServiceCard({ service, index }) {
    const { icon, title, description, techStack } = service

    return (
        <div
            className="service-card gradient-border"
            style={{ '--stagger': `${index * 0.1}s` }}
        >
            <div className="service-card-icon">
                <Icon name={icon} size={28} />
            </div>

            <h3 className="service-card-title">{title}</h3>

            <p className="service-card-description">{description}</p>

            <div className="service-card-tech">
                {techStack.map((tech, i) => (
                    <span key={i} className="tag">{tech}</span>
                ))}
            </div>

            <div className="service-card-glow"></div>
        </div>
    )
}

export default ServiceCard
