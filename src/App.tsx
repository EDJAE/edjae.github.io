import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Timeline />
        <Services />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
