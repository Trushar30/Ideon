import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const canvasRef = useRef(null)
    const [isMobile, setIsMobile] = useState(true)
    const [isHovering, setIsHovering] = useState(false)

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

    // Cursor State
    const mousePos = useRef({ x: -100, y: -100 })
    const cursorPos = useRef({ x: -100, y: -100 })
    const targetScale = useRef(1)
    const currentScale = useRef(1)
    const targetRotate = useRef(0)
    const currentRotate = useRef(0)
    const isVisible = useRef(false)
    const isIdle = useRef(false)
    const lastPos = useRef({ x: -100, y: -100 }) // To calculate velocity

    // Spark State
    const sparksRef = useRef([])
    const sparkConfig = {
        color: '#ff3366', // Primary accent color
        count: 8,
        size: 5, // length of spark line
        radius: 20, // distance from center
        duration: 400,
        extraScale: 1.2
    }

    // Helper for Easing
    const easeOutQuad = (t) => t * (2 - t)

    useEffect(() => {
        if (isMobile) return

        // Set canvas size
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight
            }
        }
        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
            isIdle.current = false
            if (!isVisible.current) {
                isVisible.current = true
                if (cursorRef.current) cursorRef.current.style.opacity = '1'
            }
        }

        const onMouseDown = (e) => {
            targetScale.current = 0.8
            isIdle.current = false

            // Add Sparks
            const now = performance.now()
            const { count } = sparkConfig
            const angleStep = (Math.PI * 2) / count

            // Random offset for more natural feel
            const randomOffset = Math.random() * Math.PI

            for (let i = 0; i < count; i++) {
                sparksRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    angle: (angleStep * i) + randomOffset,
                    startTime: now,
                    speed: 1 + Math.random() * 0.5 // Varied speed
                })
            }
        }

        const onMouseUp = () => {
            targetScale.current = 1
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

        const handleHover = (e) => {
            const target = e.target
            const isClickable = target.closest('a, button, [role="button"], .clickable, [style*="cursor: pointer"]') ||
                window.getComputedStyle(target).cursor === 'pointer'
            setIsHovering(!!isClickable)
        }

        window.addEventListener('mouseover', handleHover)
        window.addEventListener('mouseout', () => setIsHovering(false))

        window.addEventListener('mousemove', onMouseMove, { passive: true })
        window.addEventListener('mousedown', onMouseDown, { passive: true })
        window.addEventListener('mouseup', onMouseUp, { passive: true })
        document.body.addEventListener('mouseleave', onMouseLeave, { passive: true })
        document.body.addEventListener('mouseenter', onMouseEnter, { passive: true })

        const style = document.createElement('style')
        style.innerHTML = `
            * { cursor: none !important; }
            .custom-cursor { pointer-events: none; }
        `
        style.id = 'cursor-style'
        document.head.appendChild(style)

        let animationFrameId
        let ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null

        const animate = (timestamp) => {
            // Early exit if using native behavior
            if (isMobile) return

            // --- SPARK ANIMATION ---
            if (canvasRef.current && sparksRef.current.length > 0) {
                if (!ctx) ctx = canvasRef.current.getContext('2d')

                // Clear entire canvas 
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

                // Filter & Draw
                sparksRef.current = sparksRef.current.filter(spark => {
                    const elapsed = timestamp - spark.startTime
                    if (elapsed >= sparkConfig.duration) return false

                    const progress = elapsed / sparkConfig.duration
                    const eased = easeOutQuad(progress)

                    const distance = eased * sparkConfig.radius * spark.speed * sparkConfig.extraScale
                    const lineLength = sparkConfig.size * (1 - eased)

                    // Calculate line coords
                    const x1 = spark.x + distance * Math.cos(spark.angle)
                    const y1 = spark.y + distance * Math.sin(spark.angle)
                    const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
                    const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

                    // Draw
                    ctx.strokeStyle = `rgba(255, 51, 102, ${1 - eased})` // Fade out
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.stroke()

                    return true
                })
            } else if (ctx && sparksRef.current.length === 0) {
                // Clean up if no sparks (one last clear)
                // Checking if we need to clear to avoid redundant calls would be good, 
                // but clearing an empty canvas is cheap enough here.
                if (!isIdle.current) {
                    // Only clear if we were just animating and haven't already
                    // But for simplicity/robustness we can lazily clear again or track state
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            }

            // --- CURSOR ANIMATION ---

            // Deltas
            const dx = mousePos.current.x - cursorPos.current.x
            const dy = mousePos.current.y - cursorPos.current.y

            // Calculate Velocity for Tilt/Stretch
            const vx = mousePos.current.x - lastPos.current.x
            const vy = mousePos.current.y - lastPos.current.y
            lastPos.current.x = mousePos.current.x
            lastPos.current.y = mousePos.current.y

            // Velocity dampening for smoothness
            // We map large changes in mouse position to rotation
            const velocity = Math.sqrt(vx * vx + vy * vy)

            // Only apply tilt if moving fast enough
            if (velocity > 0.5) {
                // Simple tilt based on X velocity:
                const simpleTilt = Math.min(Math.max(vx * 1.5, -25), 25)
                targetRotate.current = simpleTilt
            } else {
                if (!isIdle.current) targetRotate.current = 0 // Reset when stopped
            }

            const ds = targetScale.current - currentScale.current
            const dr = targetRotate.current - currentRotate.current

            const isPositionSettled = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1
            const isStyleSettled = Math.abs(ds) < 0.001 && Math.abs(dr) < 0.1
            const isSparksIdle = sparksRef.current.length === 0

            if (isPositionSettled && isStyleSettled && isSparksIdle) {
                if (!isIdle.current) {
                    cursorPos.current.x = mousePos.current.x
                    cursorPos.current.y = mousePos.current.y
                    currentScale.current = targetScale.current
                    currentRotate.current = targetRotate.current

                    if (cursorRef.current) {
                        const { x, y } = cursorPos.current
                        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-25%, -5%) scale(${currentScale.current}) rotate(${currentRotate.current}deg)`
                    }
                    isIdle.current = true

                    // Clear canvas one last time to be sure
                    if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                }
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            // Not idle
            const posLerp = 0.45
            cursorPos.current.x += dx * posLerp
            cursorPos.current.y += dy * posLerp

            const styleLerp = 0.3
            currentScale.current += ds * styleLerp
            currentRotate.current += dr * styleLerp

            if (cursorRef.current) {
                const { x, y } = cursorPos.current
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-25%, -5%) scale(${currentScale.current}) rotate(${currentRotate.current}deg)`
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        // Start loop
        requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
            document.body.removeEventListener('mouseleave', onMouseLeave)
            document.body.removeEventListener('mouseenter', onMouseEnter)
            window.removeEventListener('mouseover', handleHover)
            const existingStyle = document.getElementById('cursor-style')
            if (existingStyle) existingStyle.remove()
        }
    }, [isMobile])

    if (isMobile) return null

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9998
                }}
            />
            <div
                ref={cursorRef}
                className="custom-cursor"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '32px',
                    height: '32px',
                    backgroundImage: `url(${isHovering ? '/hover.png' : '/PhotoshopExtension_Image.png'})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    willChange: 'transform',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                }}
            />
        </>
    )
}

export default CustomCursor
