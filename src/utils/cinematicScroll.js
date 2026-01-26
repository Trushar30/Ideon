import { useEffect, useRef } from 'react'

/**
 * Cinematic scroll animation system
 * Creates smooth, film-like scroll experiences
 */

// Initialize cinematic scroll effects
export function initCinematicScroll() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    // Initialize all animated elements
    initRevealAnimations()
    initParallaxElements()
    initScaleOnScroll()
    initHorizontalScroll()
    initTextReveal()
    initProgressIndicator()
}

// Reveal animations with stagger
function initRevealAnimations() {
    const reveals = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target
                    const delay = el.dataset.delay || 0
                    const direction = el.dataset.reveal || 'up'

                    setTimeout(() => {
                        el.classList.add('revealed')
                        el.style.setProperty('--reveal-direction', direction)
                    }, delay * 1000)

                    observer.unobserve(el)
                }
            })
        },
        { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )

    reveals.forEach((el) => observer.observe(el))
}

// Parallax effect on scroll
function initParallaxElements() {
    const parallaxElements = document.querySelectorAll('[data-parallax]')

    if (parallaxElements.length === 0) return

    let ticking = false

    const updateParallax = () => {
        parallaxElements.forEach((el) => {
            const rect = el.getBoundingClientRect()
            const speed = parseFloat(el.dataset.parallax) || 0.5
            const inView = rect.top < window.innerHeight && rect.bottom > 0

            if (inView) {
                const yPos = (rect.top - window.innerHeight / 2) * speed
                el.style.transform = `translateY(${yPos}px)`
            }
        })
        ticking = false
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax)
            ticking = true
        }
    }, { passive: true })

    updateParallax()
}

// Scale elements on scroll
function initScaleOnScroll() {
    const scaleElements = document.querySelectorAll('[data-scale-scroll]')

    if (scaleElements.length === 0) return

    let ticking = false

    const updateScale = () => {
        scaleElements.forEach((el) => {
            const rect = el.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const center = windowHeight / 2
            const elementCenter = rect.top + rect.height / 2
            const distance = Math.abs(center - elementCenter)
            const maxDistance = windowHeight / 2

            // Scale from 0.9 to 1 as element approaches center
            const scale = 0.9 + (1 - Math.min(distance / maxDistance, 1)) * 0.1
            const opacity = 0.5 + (1 - Math.min(distance / maxDistance, 1)) * 0.5

            el.style.transform = `scale(${scale})`
            el.style.opacity = opacity
        })
        ticking = false
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScale)
            ticking = true
        }
    }, { passive: true })

    updateScale()
}

// Horizontal scroll on vertical scroll
function initHorizontalScroll() {
    const horizontalSections = document.querySelectorAll('[data-horizontal-scroll]')

    horizontalSections.forEach((section) => {
        const container = section.querySelector('.horizontal-content')
        if (!container) return

        let ticking = false

        const updateHorizontal = () => {
            const rect = section.getBoundingClientRect()
            const sectionHeight = section.offsetHeight
            const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)))
            const maxScroll = container.scrollWidth - section.offsetWidth

            container.style.transform = `translateX(${-progress * maxScroll}px)`
            ticking = false
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHorizontal)
                ticking = true
            }
        }, { passive: true })
    })
}

// Text reveal animation (word by word)
function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]')

    textElements.forEach((el) => {
        const text = el.textContent
        const words = text.split(' ')
        el.innerHTML = words.map((word, i) =>
            `<span class="reveal-word" style="--word-index: ${i}">${word}</span>`
        ).join(' ')
    })

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-revealed')
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.3 }
    )

    textElements.forEach((el) => observer.observe(el))
}

// Scroll progress indicator
function initProgressIndicator() {
    const indicator = document.querySelector('.scroll-progress')
    if (!indicator) return

    let ticking = false

    const updateProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = (window.scrollY / scrollHeight) * 100
        indicator.style.setProperty('--scroll-progress', `${progress}%`)
        ticking = false
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress)
            ticking = true
        }
    }, { passive: true })
}

// Custom hook for React components
export function useCinematicScroll() {
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current) {
            // Delay to ensure DOM is ready
            const timer = setTimeout(() => {
                initCinematicScroll()
                initialized.current = true
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [])
}

// Individual animation hooks
export function useRevealOnScroll(options = {}) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const delay = options.delay || 0
                    setTimeout(() => {
                        el.classList.add('cinematic-revealed')
                    }, delay * 1000)
                    observer.unobserve(el)
                }
            },
            {
                threshold: options.threshold || 0.15,
                rootMargin: options.rootMargin || '0px 0px -50px 0px'
            }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [options.delay, options.threshold, options.rootMargin])

    return ref
}

export function useParallax(speed = 0.3) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        let ticking = false

        const update = () => {
            const rect = el.getBoundingClientRect()
            const yPos = (rect.top - window.innerHeight / 2) * speed
            el.style.transform = `translateY(${yPos}px)`
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update)
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        update()

        return () => window.removeEventListener('scroll', onScroll)
    }, [speed])

    return ref
}

export default {
    initCinematicScroll,
    useCinematicScroll,
    useRevealOnScroll,
    useParallax
}
