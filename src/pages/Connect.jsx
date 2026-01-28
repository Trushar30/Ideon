import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Icon from '../components/Icons'
import { ScrollReveal, AnimatedText } from '../hooks/useScrollAnimation'
import './Connect.css'

function Connect() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        message: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const form = useRef()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSending(true)

        // Replace these with your actual EmailJS Service ID, Template ID, and Public Key
        // You can get them from https://dashboard.emailjs.com/
        const SERVICE_ID = 'service_bts1o1j'
        const TEMPLATE_ID = 'template_5d1x3rr'
        const PUBLIC_KEY = 'W04TYoTzsNsauiNXs'

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log('Email sent:', result.text)
                setIsSubmitted(true)
                setFormData({ name: '', email: '', projectType: '', message: '' })
            }, (error) => {
                console.log('Email error:', error.text)
                alert('Failed to send message. Please try again or email us directly.')
            })
            .finally(() => {
                setIsSending(false)
            })
    }

    const contactMethods = [
        {
            icon: 'email',
            label: 'Email',
            value: 'ideon2026@gmail.com',
            href: 'mailto:ideon2026@gmail.com',
            description: 'For detailed project discussions'
        },
        {
            icon: 'whatsapp',
            label: 'WhatsApp',
            value: '+91 98765 43210',
            href: 'https://wa.me/919876543210',
            description: 'Quick queries and updates'
        },
        {
            icon: 'linkedin',
            label: 'LinkedIn',
            value: 'Ideon Development',
            href: 'https://linkedin.com/company/ideon',
            description: 'Professional networking'
        },
        {
            icon: 'github',
            label: 'GitHub',
            value: 'github.com/ideon',
            href: 'https://github.com/ideon',
            description: 'View our open source work'
        }
    ]

    const projectTypes = [
        'Mini Project',
        'Major Project',
        'Final Year Project',
        'Hackathon Entry',
        'Startup MVP',
        'Other'
    ]

    return (
        <div className="connect-page">
            {/* Hero */}
            <section className="connect-hero">
                <div className="connect-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <ScrollReveal effect="zoomBlur" className="connect-hero-content">
                        <span className="section-label">Let's Talk</span>
                        <h1 className="page-title">
                            <AnimatedText
                                text="Start a Conversation"
                                type="words"
                                animation="fadeUp"
                                staggerDelay={0.08}
                            />
                        </h1>
                        <p className="page-subtitle">
                            Have a project idea? Questions about our work? We'd love to hear from you.
                            No pressure, no commitment — just a friendly conversation.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Form */}
                        <ScrollReveal effect="slideLeft" className="contact-form-wrapper">
                            <h2>Send us a Message</h2>
                            <p className="form-description">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            {isSubmitted ? (
                                <div className="form-success holographic-card">
                                    <div className="success-content">
                                        <span className="success-icon-animated">
                                            <Icon name="check" size={32} />
                                        </span>
                                        <h3>Message Transmitted</h3>
                                        <p>Your signal has been received. We'll establish a connection shortly.</p>
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => setIsSubmitted(false)}
                                            style={{ marginTop: '1rem' }}
                                        >
                                            Send Another
                                        </button>
                                    </div>
                                    <div className="holo-scan"></div>
                                </div>
                            ) : (
                                <form ref={form} onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            disabled={isSending}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            disabled={isSending}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="projectType">Project Type</label>
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            required
                                            disabled={isSending}
                                        >
                                            <option value="">Select a project type</option>
                                            {projectTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Tell us about your idea</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Describe your project idea, requirements, or any questions you have..."
                                            rows="5"
                                            required
                                            disabled={isSending}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary btn-lg launch-btn ${isSending ? 'launching' : ''}`}
                                        disabled={isSending}
                                    >
                                        <span className="btn-text">
                                            {isSending ? 'Launching...' : 'Launch Message'}
                                        </span>
                                        {!isSending && <Icon name="arrow" size={20} />}
                                        {isSending && <div className="rocket-loader"></div>}
                                    </button>
                                </form>
                            )}
                        </ScrollReveal>

                        {/* Contact Methods */}
                        <ScrollReveal effect="slideRight" delay={0.1} className="contact-methods-wrapper">
                            <h2>Or reach out directly</h2>
                            <p className="methods-description">
                                Prefer a direct conversation? Reach us through any of these channels.
                            </p>

                            <div className="contact-methods">
                                {contactMethods.map((method, index) => (
                                    <ScrollReveal
                                        key={index}
                                        effect="slideRight"
                                        delay={0.1 + index * 0.1}
                                    >
                                        <a
                                            href={method.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-method"
                                        >
                                            <span className="method-icon">
                                                <Icon name={method.icon} size={22} />
                                            </span>
                                            <div className="method-info">
                                                <span className="method-label">{method.label}</span>
                                                <span className="method-value">{method.value}</span>
                                                <span className="method-description">{method.description}</span>
                                            </div>
                                            <span className="method-arrow">
                                                <Icon name="arrow" size={18} />
                                            </span>
                                        </a>
                                    </ScrollReveal>
                                ))}
                            </div>

                            <div className="disclaimer">
                                <p>
                                    <strong>Note:</strong> All project discussions, pricing, and delivery
                                    happen outside this platform through direct communication channels.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section faq-section">
                <div className="container">
                    <ScrollReveal effect="fadeUp" className="section-header">
                        <span className="section-label">Common Questions</span>
                        <h2 className="section-title">FAQ</h2>
                    </ScrollReveal>

                    <div className="faq-grid">
                        <ScrollReveal effect="flip" delay={0}>
                            <div className="faq-item">
                                <h3>How does the process work?</h3>
                                <p>
                                    First, we discuss your project idea and requirements. Then, we provide
                                    a proposal with timeline and scope. Once agreed, we build your project
                                    with regular updates and deliver the complete solution.
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal effect="flip" delay={0.1}>
                            <div className="faq-item">
                                <h3>Do I get the source code?</h3>
                                <p>
                                    Yes, absolutely! You receive full ownership of all source code,
                                    documentation, and deployment configurations. It's your project.
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal effect="flip" delay={0.2}>
                            <div className="faq-item">
                                <h3>How long does a project take?</h3>
                                <p>
                                    It depends on complexity. A mini project might take 1-2 weeks,
                                    while a major project could take 4-8 weeks. We'll provide a
                                    realistic timeline after understanding your requirements.
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal effect="flip" delay={0.3}>
                            <div className="faq-item">
                                <h3>What if I need changes after delivery?</h3>
                                <p>
                                    We offer post-delivery support for bug fixes and minor adjustments.
                                    For major changes, we can discuss an extended engagement.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Connect
