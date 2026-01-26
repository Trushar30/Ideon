import { useEffect, useRef } from 'react'

/**
 * Cinematic Starfield Background Component
 * Creates falling stars and meteor shower effect
 */
function StarfieldBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationId
        let stars = []
        let meteors = []

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Star class
        class Star {
            constructor() {
                this.reset()
            }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 1.5 + 0.5
                this.speed = Math.random() * 0.3 + 0.1
                this.opacity = Math.random() * 0.8 + 0.2
                this.twinkleSpeed = Math.random() * 0.02 + 0.01
                this.twinkleOffset = Math.random() * Math.PI * 2
            }

            update(time) {
                // Slow falling motion
                this.y += this.speed

                // Slight horizontal drift
                this.x += Math.sin(time * 0.001 + this.twinkleOffset) * 0.1

                // Reset when off screen
                if (this.y > canvas.height) {
                    this.y = -5
                    this.x = Math.random() * canvas.width
                }
                if (this.x < 0) this.x = canvas.width
                if (this.x > canvas.width) this.x = 0

                // Twinkle effect
                this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset))
            }

            draw() {
                // Optimized drawing
                ctx.save()
                ctx.globalAlpha = this.currentOpacity
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = 'white'
                ctx.fill()
                ctx.restore()
            }
        }

        // Meteor class
        class Meteor {
            constructor() {
                this.reset()
            }

            reset() {
                this.x = Math.random() * canvas.width * 1.5
                this.y = -50
                this.length = Math.random() * 80 + 40
                this.speed = Math.random() * 15 + 10
                this.opacity = 0
                this.fadeIn = true
                this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3
                this.thickness = Math.random() * 2 + 1
                this.active = false
                this.delay = Math.random() * 3000
                this.startTime = Date.now() + this.delay
            }

            update() {
                if (Date.now() < this.startTime) return

                this.active = true

                // Move diagonally
                this.x -= Math.cos(this.angle) * this.speed
                this.y += Math.sin(this.angle) * this.speed

                // Fade in/out
                if (this.fadeIn) {
                    this.opacity += 0.1
                    if (this.opacity >= 1) this.fadeIn = false
                }

                // Reset when off screen
                if (this.y > canvas.height + 50 || this.x < -100) {
                    this.reset()
                }
            }

            draw() {
                if (!this.active || this.opacity <= 0) return

                const tailX = this.x + Math.cos(this.angle) * this.length
                const tailY = this.y - Math.sin(this.angle) * this.length

                // Create gradient for meteor tail
                const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY)
                gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
                gradient.addColorStop(0.3, `rgba(255, 200, 150, ${this.opacity * 0.6})`)
                gradient.addColorStop(1, 'rgba(255, 100, 50, 0)')

                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(tailX, tailY)
                ctx.strokeStyle = gradient
                ctx.lineWidth = this.thickness
                ctx.lineCap = 'round'
                ctx.stroke()

                // Bright head
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.thickness, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
                ctx.fill()
            }
        }

        // Initialize stars
        const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000))
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star())
        }

        // Initialize meteors
        for (let i = 0; i < 5; i++) {
            meteors.push(new Meteor())
        }

        // Animation loop
        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw stars
            stars.forEach(star => {
                star.update(time)
                star.draw()
            })

            // Draw meteors
            meteors.forEach(meteor => {
                meteor.update()
                meteor.draw()
            })

            animationId = requestAnimationFrame(animate)
        }

        animate(0)

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="starfield-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}

export default StarfieldBackground
