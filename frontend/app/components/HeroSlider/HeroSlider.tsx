"use client";
import { useEffect, useState } from "react";

// === FIXED TYPE ===
interface SlideImage {
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface Slide {
  id: number;
  title: string;
  customers: string;
  start_from: string;
  subtitle: string | null;
  cta_text: string;
  cta_url: string;
  before_image: SlideImage;
  after_image: SlideImage;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);

  // 1) FETCH DATA SEKALI SAJA
  useEffect(() => {
    fetch("http://localhost:1337/api/heroslides?populate=*")
      .then((res) => res.json())
      .then((json) => setSlides(json.data));
  }, []);

  // 2) JALANKAN BEFORE-AFTER SETELAH SLIDER RENDER
  useEffect(() => {
    if (slides.length === 0) return;

    const wrappers = document.querySelectorAll(".before-after");

    wrappers.forEach((wrapper) => {
      const top = wrapper.querySelector(".before-after__top") as HTMLElement;
      const handle = wrapper.querySelector(".before-after__handle") as HTMLElement;
      if (!top || !handle) return;

      const setPosition = (x: number) => {
        const rect = wrapper.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(rect.width, x - rect.left));
        const percent = (offsetX / rect.width) * 100;

        handle.style.left = `${percent}%`;
        top.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      };

      const onMove = (e: any) => {
        if (e.touches) setPosition(e.touches[0].clientX);
        else setPosition(e.clientX);
      };

      const startDrag = () => {
        document.addEventListener("mousemove", onMove);
        document.addEventListener("touchmove", onMove);
      };

      const stopDrag = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("touchmove", onMove);
      };

      wrapper.addEventListener("mousedown", startDrag);
      wrapper.addEventListener("touchstart", startDrag);
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchend", stopDrag);
    });

    return () => {
      wrappers.forEach((wrapper) => {
        wrapper.replaceWith(wrapper.cloneNode(true));
      });
    };
  }, [slides]); // RUN AFTER SLIDES LOADED

  return (
    <section className="w-full hero-section">
      <div>
        {slides.length === 0 ? (
          <p className="text-center text-gray-500">Loading hero slider...</p>
        ) : (
          slides.map((slide) => (
            <div key={slide.id}>

                {/* BEFORE AFTER SLIDER */}
                <div className="hero-slider">
                    <div className="before-after">
                    
                    <div className="before-after__layer before-after__bottom">
                        <div className="before-after__content-wrap">
                        <img
                            src={`http://localhost:1337${slide.before_image.url}`}
                            alt="Before"
                            className="noselect"
                        />
                        </div>
                    </div>

                    <div className="before-after__layer before-after__top">
                        <div className="before-after__content-wrap">
                        <img
                            src={`http://localhost:1337${slide.after_image.url}`}
                            alt="After"
                            className="noselect"
                        />
                        </div>
                    </div>

                    <div className="before-after__handle">
                        <div className="before-after__handle-inner"></div>
                    </div>

                    </div>
                </div>

                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="container-fluid">
                        <div className="hero-text">
                            <div>{slide.customers}</div>
                            <div>Satisfied Customers</div>
                        </div>
                        <div className="hero-text">
                            <div>{slide.start_from}</div>
                            <div>Start from</div>
                        </div>
                        <div className="hero-flex">
                            <div>
                                <h1 >{slide.title}</h1>
                                {slide.subtitle && <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>}
                            </div>
                            
                            <div className="content-hero">
                                {slide.cta_text && (
                                    <p>{slide.cta_text}</p>
                                )}
                                <a
                                href={slide.cta_url}
                                className="px-6 py-3 bg-black text-white rounded-md inline-block"
                                >
                                Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
}
