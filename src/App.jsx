import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <section
        id="content"
        className="min-h-screen bg-white px-6 py-24 md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Results that compound
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Scroll landed here. Add your practice areas, services, and case
            studies below.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
