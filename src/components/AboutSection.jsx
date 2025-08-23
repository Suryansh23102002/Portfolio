import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      introRef.current,
      { y: 50, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    starsRef.current.forEach((star,index)=>{
      const direction = index % 2 === 0 ? 1 : -1
      const speed = 0.5 + Math.random() * 0.5

      gsap.to(star, {
        x: `${direction * (100 + index * 20)}`,
        y: `${direction * -50 - index * 10}`,
        rotation: direction * 360,
        ease: 'none',
        scrollTrigger:{
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: speed,
        }
      })
    })

    return ()=>{
      ScrollTrigger.getAll().forEach((trigger)=>{
        if(trigger.vars.trigger === sectionRef.current){
          trigger.kill()
        }
      })
    }
  }, []);

  const addToStars = (el) => {
    if(el && !starsRef.current.includes(el)){
      starsRef.current.push(el)
    }
  }

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#6919d850] flex flex-col items-center justify-center"
    >
      <div>
        {[...Array(10)].map((_, i)=>(
          <div
            ref={addToStars} 
            key={`star-${i}`}
            className='absolute rounded-full'
            style={{
              width: `${10 + i *3}px`,
              height: `${10 + i *3}px`,
              background: "white",
              opacity: 0.2 + Math.random() * 0.4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-20 mb-12">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center text-white opacity-0"
        >
          About Me
        </h1>
      </div>

      <div 
        ref={introRef} 
        className="container mx-auto px-5 lg:px-24 flex md:flex-row flex-col justify-between items-center opacity-0 z-10 gap-10"
      >
        <h3
          className="text-base md:text-2xl font-bold text-purple-200 lg:max-w-[45rem] max-w-full tracking-wider text-center md:text-left"
        >
          Hi, I’m Suryansh, a MERN Stack Developer focused on building scalable, efficient, and robust web applications. I build complete, end-to-end solutions using MongoDB, Express.js, React, and Node.js. Whether it’s a dynamic e-commerce platform, a real-time data dashboard, or a complex SaaS product, I’m all about clean code, robust architecture, and creating a seamless connection between the user and the data.
        </h3>
        <img
          className="lg:h-[40rem] md:h-[25rem] h-[18rem] mix-blend-lighten"
          src="/images/profile.png"
          alt="profile-img"
        />
      </div>
    </section>
  );
};

export default AboutSection;
