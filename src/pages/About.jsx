import Icon from '../components/Icons'
import Lanyard from '../components/Lanyard'
import {
    ScrollReveal,
    AnimatedText,
    AnimatedCounter
} from '../hooks/useScrollAnimation'
import './About.css'

function About() {
    const skills = [
        { category: 'Frontend', items: ['React', 'Next.js', 'Flutter', 'HTML/CSS', 'TypeScript'] },
        { category: 'Backend', items: ['Node.js', 'Python', 'Express', 'FastAPI', 'REST APIs'] },
        { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'Redis'] },
        { category: 'AI/ML', items: ['TensorFlow', 'OpenAI', 'Gemini', 'LangChain', 'RAG'] },
        { category: 'DevOps', items: ['Docker', 'Vercel', 'AWS', 'Railway', 'GitHub Actions'] },
        { category: 'Mobile', items: ['Flutter', 'React Native', 'iOS', 'Android', 'PWA'] },
    ]

    const values = [
        {
            icon: 'quality',
            title: 'Quality Over Speed',
            description: 'We take the time to build things right. No rushed code, no shortcuts that create technical debt.'
        },
        {
            icon: 'transparency',
            title: 'Full Transparency',
            description: 'Every project you see here is real. Real code, real deployment, real usage. No mockups or fake demos.'
        },
        {
            icon: 'knowledge',
            title: 'Knowledge Transfer',
            description: 'We don\'t just deliver code. We explain how it works, document everything, and ensure you understand your project.'
        },
        {
            icon: 'support',
            title: 'Post-Delivery Support',
            description: 'Our relationship doesn\'t end at delivery. We\'re here to help with deployment, updates, and questions.'
        }
    ]

    return (
        <div className="about-page">
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <ScrollReveal effect="zoomBlur" className="about-hero-content">
                        <span className="section-label">About Ideon</span>
                        <h1 className="page-title">
                            <AnimatedText
                                text="We Build, You Shine"
                                type="words"
                                animation="fadeUp"
                                staggerDelay={0.08}
                            />
                        </h1>
                        <p className="page-subtitle">
                            Ideon is a team of passionate developers who believe every student
                            deserves a project that's professionally built and actually works.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Story Section */}
            <section className="section story-section">
                <div className="container">
                    <div className="story-content">
                        <ScrollReveal effect="slideLeft" className="story-text">
                            <h2>Our Story</h2>
                            <p>
                                We started as students ourselves, frustrated by the gap between
                                having great project ideas and the technical skills to build them.
                                We saw classmates struggling to find reliable help, getting scammed
                                by fake developers, or receiving copied code that didn't work.
                            </p>
                            <p>
                                Ideon was born from this frustration. We're not a faceless agency
                                or a marketplace of anonymous freelancers. We're a small, dedicated
                                team that treats every project like it's our own.
                            </p>
                            <p>
                                Our philosophy is simple: <strong>the work should speak for itself</strong>.
                                That's why we showcase real, deployed projects. No promises, just proof.
                            </p>
                        </ScrollReveal>
                        <div className="story-visual">
                            <ScrollReveal effect="flip" delay={0} className="story-card">
                                <div className="story-stat">
                                    <span className="stat-number">
                                        <AnimatedCounter end="50" suffix="+" />
                                    </span>
                                    <span className="stat-label">Projects Delivered</span>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal effect="flip" delay={0.1} className="story-card">
                                <div className="story-stat">
                                    <span className="stat-number">
                                        <AnimatedCounter end="100" suffix="%" />
                                    </span>
                                    <span className="stat-label">Deployment Rate</span>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal effect="flip" delay={0.2} className="story-card">
                                <div className="story-stat">
                                    <span className="stat-number">
                                        <AnimatedCounter end="15" suffix="+" />
                                    </span>
                                    <span className="stat-label">Technologies</span>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section values-section">
                <div className="container">
                    <ScrollReveal effect="fadeUp" className="section-header">
                        <span className="section-label">What We Stand For</span>
                        <h2 className="section-title">Our Values</h2>
                    </ScrollReveal>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <ScrollReveal
                                key={index}
                                effect="rotate"
                                delay={index * 0.1}
                            >
                                <div className="value-card gradient-border">
                                    <div className="value-icon">
                                        <Icon name={value.icon} size={24} />
                                    </div>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section skills-section">
                <div className="container">
                    <ScrollReveal effect="zoomBlur" className="section-header">
                        <span className="section-label">Technical Expertise</span>
                        <h2 className="section-title">Technologies We Work With</h2>
                        <p className="section-subtitle">
                            We stay updated with the latest technologies to deliver modern,
                            scalable solutions.
                        </p>
                    </ScrollReveal>

                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <ScrollReveal
                                key={index}
                                effect="scale"
                                delay={index * 0.08}
                            >
                                <div className="skill-category">
                                    <h4>{skill.category}</h4>
                                    <div className="skill-items">
                                        {skill.items.map((item, i) => (
                                            <span key={i} className="tag">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Lanyard Section - Uniqueness and Space */}
            <section className="section lanyard-section" style={{ height: '100vh', position: 'relative' }}>
                <div className="container" style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 10, pointerEvents: 'none' }}>
                    <ScrollReveal effect="fadeUp" className="section-header">
                        <span className="section-label">Our Identity</span>
                        <h2 className="section-title">Unique Space</h2>
                        <p className="section-subtitle">
                            We value privacy but deliver excellence. Meet x1 and x2.
                        </p>
                    </ScrollReveal>
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <Lanyard text1="x1" text2="x2" />
                </div>
            </section>

            {/* What We're Not Section */}
            <section className="section not-section">
                <div className="container">
                    <ScrollReveal effect="scale" className="not-content">
                        <h2>What Ideon is <span className="strikethrough">NOT</span></h2>
                        <div className="not-grid">
                            <ScrollReveal effect="slideLeft" delay={0.1} className="not-item">
                                <span className="not-icon">
                                    <Icon name="x" size={16} />
                                </span>
                                <span>A template marketplace</span>
                            </ScrollReveal>
                            <ScrollReveal effect="slideRight" delay={0.15} className="not-item">
                                <span className="not-icon">
                                    <Icon name="x" size={16} />
                                </span>
                                <span>A copy-paste solution provider</span>
                            </ScrollReveal>
                            <ScrollReveal effect="slideLeft" delay={0.2} className="not-item">
                                <span className="not-icon">
                                    <Icon name="x" size={16} />
                                </span>
                                <span>An instant delivery service</span>
                            </ScrollReveal>
                            <ScrollReveal effect="slideRight" delay={0.25} className="not-item">
                                <span className="not-icon">
                                    <Icon name="x" size={16} />
                                </span>
                                <span>A faceless freelance platform</span>
                            </ScrollReveal>
                        </div>
                        <p className="not-description">
                            We build custom, unique projects tailored to your specific requirements.
                            Every project is treated as a new challenge, not a repetitive task.
                        </p>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}

export default About
