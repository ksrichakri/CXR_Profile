import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, MapPin, Activity, Settings, Users, ArrowRight } from 'lucide-react';
import ThreeCanvas from '../components/ThreeCanvas';
// Using global index.css for styling

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in text effects
      const textRevealElements = gsap.utils.toArray('.reveal-text');
      textRevealElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
          }
        );
      });

      // Counters
      const counters = gsap.utils.toArray('.stat-counter');
      counters.forEach((counter) => {
        gsap.fromTo(counter, 
          { innerHTML: 0 }, 
          {
            innerHTML: counter.dataset.target,
            duration: 2,
            snap: { innerHTML: 1 },
            scrollTrigger: { trigger: counter, start: 'top 85%' }
          }
        );
      });
      
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="portfolio-wrapper">
      <ThreeCanvas />

      {/* Navbar overlay */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', zIndex: 50, mixBlendMode: 'difference', color: '#fff' }}>
        <h2 style={{ margin: 0, color: '#fff' }}>CXR</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/request" style={{ color: '#fff' }}>Inventory</Link>
          <Link to="/admin" style={{ color: '#fff' }}>Admin Login</Link>
        </div>
      </nav>

      {/* SECTION: Hero */}
      <section id="hero-section" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10%' }}>
        <h1 className="reveal-text text-gradient" style={{ fontSize: '5rem', maxWidth: '700px', marginBottom: '20px' }}>
          Centre for Extended Reality
        </h1>
        <p className="reveal-text" style={{ fontSize: '1.5rem', maxWidth: '500px', color: '#333' }}>
          Shaping the future of immersive computing through AR, VR, and mixed environments.
        </p>
        <div className="reveal-text" style={{ marginTop: '30px' }}>
          <button className="btn-primary">Explore Our Vision <ChevronRight size={20} style={{marginLeft: '8px'}} /></button>
        </div>
      </section>

      {/* SECTION: What is CXR */}
      <section id="about-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%', background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.9))' }}>
        <div className="glass-panel text-content" style={{ padding: '60px', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 className="text-gradient reveal-text" style={{ fontSize: '3rem' }}>Redefining Boundaries</h2>
          <p className="reveal-text" style={{ fontSize: '1.2rem', color: '#444' }}>
            The Centre for Extended Reality (CXR) is a specialized lab dedicated to pushing the technical limits of Augmented and Virtual Reality. We blend engineering with human-computer interaction to build the next generation of spatial computing architectures.
          </p>
        </div>
      </section>

      {/* SECTION: Facts / Stats */}
      <section id="facts-section" style={{ padding: '100px 10%', display: 'flex', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', backgroundColor: 'var(--bg-color-alt)' }}>
        <div className="glass-panel" style={{ flex: 1, padding: '40px', textAlign: 'center' }}>
          <Activity size={40} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '4rem', margin: 0 }} className="stat-counter" data-target="150">0</h3>
          <p>Projects Completed</p>
        </div>
        <div className="glass-panel" style={{ flex: 1, padding: '40px', textAlign: 'center' }}>
          <Users size={40} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '4rem', margin: 0 }} className="stat-counter" data-target="45">0</h3>
          <p>Industry Partners</p>
        </div>
        <div className="glass-panel" style={{ flex: 1, padding: '40px', textAlign: 'center' }}>
          <Settings size={40} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '4rem', margin: 0 }} className="stat-counter" data-target="12">0</h3>
          <p>Active Patents</p>
        </div>
      </section>

      {/* SECTION: Projects */}
      <section id="projects-section" style={{ padding: '100px 10%', background: 'var(--bg-color)' }}>
        <h2 className="reveal-text text-gradient" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Ongoing Innovations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {[1,2,3].map(i => (
            <div key={i} className="glass-panel reveal-text" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}>
              <div style={{ height: '200px', backgroundColor: 'var(--accent-color)', opacity: 0.2 }}></div>
              <div style={{ padding: '30px' }}>
                <h3>Project Alpha {i}</h3>
                <p>Advanced spatial tracking mechanisms utilizing neural network rendering for mixed reality.</p>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-color)', fontWeight: 600 }}>
                  View Demo <ArrowRight size={16} style={{marginLeft:'8px'}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Collaborators (Marquee) */}
      <section id="collaborators-section" style={{ padding: '60px 0', backgroundColor: 'var(--accent-color)', color: '#fff', overflow: 'hidden' }}>
        <h3 style={{ textAlign: 'center', color: '#fff', marginBottom: '40px' }} className="reveal-text">Supported By Industry Leaders</h3>
        <div style={{ display: 'flex', width: '200%', animation: 'marquee 15s linear infinite' }}>
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} style={{ flex: 1, whiteSpace: 'nowrap', fontSize: '1.5rem', fontWeight: 600, opacity: 0.7 }}>
              PARTNER CO. {i} 
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee { 
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
      </section>

      {/* SECTION: Management Body */}
      <section id="management-section" style={{ padding: '100px 10%', background: 'var(--bg-color-alt)' }}>
        <h2 className="reveal-text text-gradient" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Leadership & Engineering</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
          {[
            { role: 'Assistant Director', name: 'Dr. Jane Smith' },
            { role: 'Project Engineer', name: 'John Doe' },
            { role: 'Technical Assistant', name: 'Alex Wong' }
          ].map((member, i) => (
            <div key={i} className="glass-panel reveal-text" style={{ padding: '40px', width: '300px', textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#ddd', margin: '0 auto 20px' }}></div>
              <h3>{member.name}</h3>
              <p style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Location & Lab */}
      <section id="location-section" style={{ padding: '100px 10%', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div className="reveal-text" style={{ flex: 1, minWidth: '300px' }}>
          <h2 className="text-gradient" style={{ fontSize: '3rem' }}>Our Laboratory</h2>
          <p>
            Nestled inside the core technology block, our facility boasts world-class VR treadmills, haptic feedback suits, and high-fidelity rendering clusters.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', fontWeight: 600 }}>
            <MapPin color="var(--accent-color)" /> Tech Park, Innovation Block 4
          </div>
        </div>
        <div className="glass-panel reveal-text" style={{ flex: 1, minWidth: '300px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Static Map Placeholder, could be an embedded iframe */}
          <h3 style={{ color: 'var(--accent-color)' }}>Interactive 3D Map Loading...</h3>
        </div>
      </section>

      <footer style={{ padding: '40px 10%', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0 }}>© 2026 Centre for Extended Reality</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;