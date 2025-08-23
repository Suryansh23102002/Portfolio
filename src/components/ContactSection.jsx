import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ContactSection = ({ openContactForm }) => {
  const circleRef = useRef(null)
  const sectionRef = useRef(null)
  const initialTextRef = useRef(null)
  const finalTextRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cleanup = () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionRef.current) st.kill(true)
      })
    }

    cleanup()

    gsap.set(circleRef.current, { scale: 1, backgroundColor: "#ffffff" })
    gsap.set(initialTextRef.current, { opacity: 1 })
    gsap.set(finalTextRef.current, { opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(circleRef.current, {
      scale: 17,
      backgroundColor: "#E9D5FF",
      boxShadow: "0 0 50px 20px rgba(233, 213, 255, 0.3)",
      ease: "power2.inOut",
      duration: 3,
    })

    tl.to(initialTextRef.current, { opacity: 0, ease: "power1.out", duration: 1 }, 0.5)

    tl.to(finalTextRef.current, { opacity: 1, ease: "power2.in", duration: 1.5 }, 1.5)

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
      scrub: 1,
      pinSpacing: false,
    })

    return cleanup
  }, [])

  return (
    <section
      id="contact-section"
      ref={sectionRef}
      className='flex items-center justify-center bg-black relative w-full min-h-screen m-0 p-0'
      style={{ overscrollBehavior: "none" }}
    >
      <div
        ref={circleRef}
        className='w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative shadow-lg shadow-violet-300/50 bg-gradient-to-r from-violet-400 to-pink-100 transition-shadow duration-1000'
      >
        <p
          ref={initialTextRef}
          className='absolute inset-0 flex items-center justify-center text-black font-bold text-base sm:text-lg md:text-xl text-center'
        >
          SCROLL DOWN
        </p>
      </div>

      <div
        ref={finalTextRef}
        className='absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 w-full h-full'
      >
        <h1 className='text-black font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight'>
          Step Into the Future with Suryansh
        </h1>
        <p className='text-black text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mb-8 leading-relaxed'>
          Full-stack MERN Developer specializing in building end-to-end, high-performance web applications. Proficient in crafting robust RESTful APIs with Node.js and Express, designing scalable MongoDB databases, and developing dynamic, responsive user interfaces with React. Focused on creating seamless, secure, and scalable solutions from server to client.
        </p>
        <button
          onClick={openContactForm}
          className='px-12 py-3 rounded-xl bg-black hover:bg-white hover:text-black transition-all duration-500 whitespace-nowrap text-lg'
        >
          Contact Me
        </button>
      </div>
    </section>
  )
}

export default ContactSection
