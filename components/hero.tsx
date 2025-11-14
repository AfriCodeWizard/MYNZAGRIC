"use client"
import Navbar from "@/components/navbar" // Import the Navbar component

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
        <source src="https://videos.pexels.com/video-files/19570489/19570489-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen pt-24 md:pt-28">
        {/* Navbar */}
        <Navbar /> {/* Using the new Navbar component with animated hover effects */}
        {/* Main Content */}
        <main className="mt-12 md:mt-32 flex-grow">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              GROW WITH
              <br />
              <span className="text-green-300">MYNZAGRIC</span>
            </h1>
            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              Certified grafted fruit seedlings ready for transplanting. Premium quality seedlings from Kenya's trusted
              nursery.
            </p>
          </div>
        </main>
        {/* Satisfied Clients Card - Top Right */}
        <div className="absolute top-28 right-8 hidden xl:block">
          <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white text-center">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm">Satisfied Farmers</p>
            <div className="flex justify-center -space-x-2 mt-4">
              <div className="w-8 h-8 rounded-full border-2 border-white/50 bg-white/20" />
              <div className="w-8 h-8 rounded-full border-2 border-white/50 bg-white/20" />
              <div className="w-8 h-8 rounded-full border-2 border-white/50 bg-white/20" />
            </div>
          </div>
        </div>
        {/* Footer with CTA and Featured Card */}
        <footer className="py-8 mt-auto">
          <div className="flex items-end justify-between">
            <div className="w-full lg:w-auto">
              <div className="flex items-center space-x-6">
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Get Started
                </a>
                <a
                  href="#seedlings"
                  className="text-white border-b border-white/50 pb-1 font-semibold hover:border-white transition-colors"
                >
                  Explore Products
                </a>
              </div>
              <div className="w-full max-w-xs text-white mt-10">
                <div className="flex items-center">
                  <span className="font-semibold">01</span>
                  <div className="relative flex-grow h-0.5 bg-white/20 mx-4">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white" />
                  </div>
                  <span className="font-semibold text-white/50">03</span>
                </div>
              </div>
            </div>

            {/* Featured Project Card - Bottom Right */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-tr from-white/10 to-white/40 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white max-w-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🌱</span>
                      <h3 className="font-semibold text-lg">Premium Seedlings</h3>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      Grafted and tissue-cultured disease-resistant seedlings for beautiful, sustainable produce.
                    </p>
                  </div>
                  <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors shrink-0 ml-4">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
