import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SlShareAlt } from 'react-icons/sl'

const ProjectSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const titleLineRef = useRef(null)
  const triggerRef = useRef(null)
  const horizontalRef = useRef(null)

  const projectImage = [
    { id: 1, title: 'PingUp', imageSrc: '/images/project-1.png', url: 'https://pingup-lac.vercel.app/' },
    { id: 2, title: 'Gemini Clone', imageSrc: '/images/project-2.png', url: 'https://gemini-clone-blush-ten.vercel.app/' },
    { id: 3, title: 'Non Germinous Lump Detection', imageSrc: '/images/project-3.png', url: 'https://lumpdetection.example.com' },
    { id: 4, title: 'skiper ui', imageSrc: '/images/project-4.png', url: 'https://skiper-next.vercel.app/' },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      titleLineRef.current,
      { width: '0%', opacity: 0 },
      {
        width: '100%',
        opacity: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      triggerRef.current,
      { y: 100, rotationX: 20, opacity: 0 },
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      sectionRef.current,
      { backgroundPosition: '50% 0%' },
      {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    const horizontalScroll = gsap.to('.panel', {
      xPercent: -100 * (projectImage.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => `+=${horizontalRef.current.offsetWidth}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (projectImage.length - 1),
          duration: { min: 0.2, max: 0.3 },
          delay: 0.1,
        },
        invalidateOnRefresh: true,
      },
    })

    const panels = gsap.utils.toArray('.panel')
    panels.forEach((panel) => {
      const image = panel.querySelector('.project-image')
      const imageTitle = panel.querySelector('.project-title')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalScroll,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      })

      tl.fromTo(image, { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.5 })

      if (imageTitle) {
        tl.fromTo(imageTitle, { y: 30 }, { y: -100, duration: 0.3 }, 0.2)
      }
    })
  }, [projectImage.length])

  return (
    <div>
      <section
        id="project-section"
        ref={sectionRef}
        className='relative py-20 bg-[#f6f6f6] overflow-hidden'
      >
        <div className='container mx-auto px-4 mb-16 relative z-10'>
          <h2
            ref={titleRef}
            className='text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4 opacity-0'
          >
            Featured Projects
          </h2>
          <div
            ref={titleLineRef}
            className='w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0'
          ></div>
        </div>

        <div ref={triggerRef} className='overflow-hidden opacity-0'>
          <div ref={horizontalRef} className='horizontal-section flex md:w-[400%] w-[420%]'>
            {projectImage.map((project) => (
              <div
                key={project.id}
                className='panel relative flex items-center justify-center h-[100vh]'
              >
                <div className='relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12'>
                  <img
                    className='project-image max-w-full h-[70%] rounded-2xl object-cover'
                    src={project.imageSrc}
                    alt='Project-img'
                  />
                  <h2 className='project-title flex items-center gap-3 md:text-3xl text-sm md:font-bold text-black mt-6 z-50 text-nowrap hover:text-gray-400 transition-colors duration-300 cursor-pointer'>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className='flex items-center gap-3'>
                      {project.title} <SlShareAlt />
                    </a>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectSection
