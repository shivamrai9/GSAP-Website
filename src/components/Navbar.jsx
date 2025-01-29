import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import clsx from 'clsx';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap/all';


const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState()
  const [isNavVisible,setIsNavVisible] = useState();
    // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y:currentScrollY} = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  console.log(currentScrollY > lastScrollY)

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);


  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }


useEffect(()=>{
    if(isAudioPlaying){
        audioElementRef.current.play();
    } else {
        audioElementRef.current.pause()
    }
},[isAudioPlaying])


useEffect(()=>{

},[])
    return (
        <div ref={navContainerRef} className='fixed top-4 inset-x-0 z-50 h-16 transition-all duration-700 sm:inset-x-6 '>
            <header className='absolute top-1/2 w-full -translate-y-1/2 '>
                <nav className='flex justify-between items-center p-4 size-full'>
                    <div className='flex items-center gap-7'>
                        <img src="./img/logo.png" alt="logo" className='w-10' />
                        <Button id='product-button' title='Products' rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden item-center justify-center"
                        />

                    </div>
                    <div className='h-full flex items-center'>
                        <div className='hidden md:block '>
                            {
                                navItems.map((item, idx) => (
                                    <a key={idx} href={`#${item.toLocaleLowerCase()}`} className='nav-hover-btn'>
                                        {item}
                                    </a>
                                ))
                            }

                        </div>

                        <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1,2,3,4,5].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
