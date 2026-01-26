import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Custom hook for unique scroll animations
 * Provides multiple animation types: fade, slide, scale, rotate, parallax, stagger
 */
export function useScrollAnimation(options = {}) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        once = true, // Only animate once
        delay = 0,
    } = options

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay)
                    if (once) observer.unobserve(element)
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [threshold, rootMargin, once, delay])

    return { ref, isVisible, scrollProgress }
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax(speed = 0.5) {
    const ref = useRef(null)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const scrolled = window.innerHeight - rect.top
            setOffset(scrolled * speed)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial call
        return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return { ref, offset }
}

/**
 * Hook for scroll progress within an element
 */
export function useScrollProgress() {
    const ref = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const windowHeight = window.innerHeight

            // Calculate progress from when element enters to when it leaves
            const start = windowHeight
            const end = -rect.height
            const current = rect.top
            const progress = Math.min(Math.max((start - current) / (start - end), 0), 1)

            setProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return { ref, progress }
}

/**
 * Component for text reveal animation (letter by letter or word by word)
 */
export function AnimatedText({
    text,
    type = 'words', // 'words' or 'chars'
    className = '',
    staggerDelay = 0.03,
    animation = 'fadeUp' // fadeUp, fadeIn, slideLeft, slideRight
}) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

    const items = type === 'words' ? text.split(' ') : text.split('')

    const getAnimationStyle = (index) => {
        const delay = index * staggerDelay
        const baseStyle = {
            display: 'inline-block',
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
            whiteSpace: type === 'words' ? 'pre' : 'normal',
        }

        if (!isVisible) {
            switch (animation) {
                case 'fadeUp':
                    return { ...baseStyle, opacity: 0, transform: 'translateY(30px)' }
                case 'fadeIn':
                    return { ...baseStyle, opacity: 0 }
                case 'slideLeft':
                    return { ...baseStyle, opacity: 0, transform: 'translateX(-30px)' }
                case 'slideRight':
                    return { ...baseStyle, opacity: 0, transform: 'translateX(30px)' }
                case 'scale':
                    return { ...baseStyle, opacity: 0, transform: 'scale(0.8)' }
                default:
                    return { ...baseStyle, opacity: 0, transform: 'translateY(30px)' }
            }
        }

        return { ...baseStyle, opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' }
    }

    return (
        <span ref={ref} className={`animated-text ${className}`}>
            {items.map((item, index) => (
                <span
                    key={index}
                    style={getAnimationStyle(index)}
                >
                    {type === 'words' ? `${item} ` : item}
                </span>
            ))}
        </span>
    )
}

/**
 * Component for staggered children animation
 */
export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    animation = 'fadeUp'
}) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

    return (
        <div ref={ref} className={`stagger-container ${className}`}>
            {Array.isArray(children) ? children.map((child, index) => (
                <StaggerItem
                    key={index}
                    index={index}
                    isVisible={isVisible}
                    delay={staggerDelay}
                    animation={animation}
                >
                    {child}
                </StaggerItem>
            )) : children}
        </div>
    )
}

function StaggerItem({ children, index, isVisible, delay, animation }) {
    const getStyle = () => {
        const staggerDelay = index * delay
        const baseStyle = {
            transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}s`,
        }

        if (!isVisible) {
            switch (animation) {
                case 'fadeUp':
                    return { ...baseStyle, opacity: 0, transform: 'translateY(40px)' }
                case 'fadeIn':
                    return { ...baseStyle, opacity: 0 }
                case 'slideLeft':
                    return { ...baseStyle, opacity: 0, transform: 'translateX(-40px)' }
                case 'slideRight':
                    return { ...baseStyle, opacity: 0, transform: 'translateX(40px)' }
                case 'scale':
                    return { ...baseStyle, opacity: 0, transform: 'scale(0.9)' }
                case 'rotate':
                    return { ...baseStyle, opacity: 0, transform: 'rotate(-5deg) translateY(20px)' }
                default:
                    return { ...baseStyle, opacity: 0, transform: 'translateY(40px)' }
            }
        }

        return { ...baseStyle, opacity: 1, transform: 'translateY(0) translateX(0) scale(1) rotate(0deg)' }
    }

    return <div style={getStyle()}>{children}</div>
}

/**
 * Component for parallax section
 */
export function ParallaxSection({ children, speed = 0.3, className = '' }) {
    const { ref, offset } = useParallax(speed)

    return (
        <div
            ref={ref}
            className={`parallax-section ${className}`}
            style={{ transform: `translateY(${offset}px)` }}
        >
            {children}
        </div>
    )
}

/**
 * Component for scroll-linked reveal
 */
export function ScrollReveal({
    children,
    className = '',
    effect = 'fadeUp', // fadeUp, fadeIn, slideLeft, slideRight, scale, rotate, flip
    duration = 0.8,
    delay = 0
}) {
    const { ref, isVisible } = useScrollAnimation({ delay: delay * 1000 })

    const getClassName = () => {
        let classes = `scroll-reveal scroll-reveal-${effect} ${className}`
        if (isVisible) classes += ' is-visible'
        return classes
    }

    return (
        <div
            ref={ref}
            className={getClassName()}
            style={{
                '--reveal-duration': `${duration}s`,
                '--reveal-delay': `${delay}s`
            }}
        >
            {children}
        </div>
    )
}

/**
 * Component for counter animation
 */
export function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '' }) {
    const [count, setCount] = useState(0)
    const { ref, isVisible } = useScrollAnimation({ once: true })
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (isVisible && !hasAnimated.current) {
            hasAnimated.current = true
            const startTime = Date.now()
            const endValue = parseInt(end)

            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / (duration * 1000), 1)

                // Easing function (ease out)
                const easeOut = 1 - Math.pow(1 - progress, 3)
                const current = Math.floor(easeOut * endValue)

                setCount(current)

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }

            requestAnimationFrame(animate)
        }
    }, [isVisible, end, duration])

    return (
        <span ref={ref} className="animated-counter">
            {prefix}{count}{suffix}
        </span>
    )
}

/**
 * Component for horizontal scroll progress indicator
 */
export function ScrollProgressIndicator() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollProgress = (window.scrollY / scrollHeight) * 100
            setProgress(scrollProgress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="scroll-progress-indicator">
            <div
                className="scroll-progress-bar"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}

export default {
    useScrollAnimation,
    useParallax,
    useScrollProgress,
    AnimatedText,
    StaggerContainer,
    ParallaxSection,
    ScrollReveal,
    AnimatedCounter,
    ScrollProgressIndicator,
}
