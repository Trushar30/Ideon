import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const [isMobile, setIsMobile] = useState(true) // Default to true to prevent flash on load

    // Check for mobile/touch device
    useEffect(() => {
        const checkMobile = () => {
            const hasTouch = (typeof window !== 'undefined') &&
                ('ontouchstart' in window || navigator.maxTouchPoints > 0)
            setIsMobile(hasTouch)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile, { passive: true })
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // All state purely in refs to avoid React render cycles
    const mousePos = useRef({ x: -100, y: -100 }) // Start off-screen
    const cursorPos = useRef({ x: -100, y: -100 })
    const targetScale = useRef(1)
    const currentScale = useRef(1)
    const targetRotate = useRef(0)
    const currentRotate = useRef(0)
    const isVisible = useRef(false)
    const isIdle = useRef(false)

    useEffect(() => {
        if (isMobile) return

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
            isIdle.current = false // Wake up
            if (!isVisible.current) {
                isVisible.current = true
                if (cursorRef.current) cursorRef.current.style.opacity = '1'
            }
        }

        const onMouseDown = () => {
            targetScale.current = 0.8
            targetRotate.current = -12
            isIdle.current = false
        }

        const onMouseUp = () => {
            targetScale.current = 1
            targetRotate.current = 0
            isIdle.current = false
        }

        const onMouseLeave = () => {
            isVisible.current = false
            if (cursorRef.current) cursorRef.current.style.opacity = '0'
        }

        const onMouseEnter = () => {
            isVisible.current = true
            if (cursorRef.current) cursorRef.current.style.opacity = '1'
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true })
        window.addEventListener('mousedown', onMouseDown, { passive: true })
        window.addEventListener('mouseup', onMouseUp, { passive: true })
        document.body.addEventListener('mouseleave', onMouseLeave, { passive: true })
        document.body.addEventListener('mouseenter', onMouseEnter, { passive: true })

        // Inject styles
        const style = document.createElement('style')
        style.innerHTML = `
            * { cursor: none !important; }
            .custom-cursor { pointer-events: none; }
        `
        style.id = 'cursor-style'
        document.head.appendChild(style)

        let animationFrameId

        const animate = () => {
            // Early exit if using native behavior (shouldn't happen due to return logic but just in case)
            if (isMobile) return

            // Calculate Deltas
            const dx = mousePos.current.x - cursorPos.current.x
            const dy = mousePos.current.y - cursorPos.current.y
            const ds = targetScale.current - currentScale.current
            const dr = targetRotate.current - currentRotate.current

            // Check if settled (very small changes)
            // If settled, verify one last frame to snap to exact position, then skip DOM updates
            const isPositionSettled = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1
            const isStyleSettled = Math.abs(ds) < 0.001 && Math.abs(dr) < 0.1

            if (isPositionSettled && isStyleSettled) {
                if (!isIdle.current) {
                    // One final update to snap to exact values
                    cursorPos.current.x = mousePos.current.x
                    cursorPos.current.y = mousePos.current.y
                    currentScale.current = targetScale.current
                    currentRotate.current = targetRotate.current

                    if (cursorRef.current) {
                        const { x, y } = cursorPos.current
                        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${currentScale.current}) rotate(${currentRotate.current}deg)`
                    }
                    isIdle.current = true
                }
                // Continue loop but Skip calculations and DOM writes
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            // Not idle, update values
            const posLerp = 0.25
            cursorPos.current.x += dx * posLerp
            cursorPos.current.y += dy * posLerp

            const styleLerp = 0.15
            currentScale.current += ds * styleLerp
            currentRotate.current += dr * styleLerp

            if (cursorRef.current) {
                const { x, y } = cursorPos.current
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${currentScale.current}) rotate(${currentRotate.current}deg)`
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
            document.body.removeEventListener('mouseleave', onMouseLeave)
            document.body.removeEventListener('mouseenter', onMouseEnter)

            const existingStyle = document.getElementById('cursor-style')
            if (existingStyle) existingStyle.remove()
        }
    }, [isMobile])

    if (isMobile) return null

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '32px', // Slightly smaller for precision feel
                height: '32px',
                backgroundImage: 'url(/PhotoshopExtension_Image.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                pointerEvents: 'none',
                zIndex: 9999,
                willChange: 'transform',
                opacity: 0, // Start hidden until mouse move
                transition: 'opacity 0.2s ease',
            }}
        />
    )
}

export default CustomCursor
