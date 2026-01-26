import { Link } from 'react-router-dom'
import Icon from './Icons'
import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        navigation: [
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
            { to: '/about', label: 'About' },
            { to: '/connect', label: 'Connect' },
        ],
        services: [
            { label: 'Web Development' },
            { label: 'Mobile Apps' },
            { label: 'AI/ML Projects' },
            { label: 'Academic Projects' },
        ],
    }

    const socialLinks = [
        { href: 'mailto:contact@ideon.dev', label: 'Email', icon: 'email' },
        { href: 'https://wa.me/919876543210', label: 'WhatsApp', icon: 'whatsapp' },
        { href: 'https://linkedin.com/company/ideon', label: 'LinkedIn', icon: 'linkedin' },
        { href: 'https://github.com/ideon', label: 'GitHub', icon: 'github' },
    ]

    return (
        <footer className="footer">
            <div className="footer-glow"></div>
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0L2.7 10.3z" />
                                </svg>
                            </span>
                            <span className="logo-text">Ideon</span>
                        </Link>
                        <p className="footer-tagline">
                            Transforming student ideas into deployed reality.
                            Professional project development services.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={social.label}
                                >
                                    <Icon name={social.icon} size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-links-section">
                            <h4>Navigation</h4>
                            <ul>
                                {footerLinks.navigation.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-section">
                            <h4>Services</h4>
                            <ul>
                                {footerLinks.services.map((link) => (
                                    <li key={link.label}>
                                        <span>{link.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-section">
                            <h4>Get in Touch</h4>
                            <p className="footer-contact-text">
                                Have a project idea? Let's discuss how we can help bring it to life.
                            </p>
                            <Link to="/connect" className="btn btn-secondary btn-sm">
                                Start a Conversation
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} Ideon. All rights reserved.</p>
                    <p className="footer-disclaimer">
                        All project discussions and delivery happen outside this platform.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
