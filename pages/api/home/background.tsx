function Background() {
    return (
      <div className="relative min-h-screen bg-gradient-to-r from-indigo-600 to-teal-500 text-white">
        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center h-screen text-center px-6 sm:px-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">Welcome to Your Virtual Bank</h1>
          <p className="text-lg sm:text-2xl font-light mb-6">
            Secure, Reliable, and Always Here for You
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-teal-600 rounded-lg text-xl font-medium hover:bg-teal-500 transition-colors shadow-lg">
              Open an Account
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg text-xl font-medium hover:bg-white hover:text-teal-800 transition-colors shadow-lg">
              Sign In
            </button>
          </div>
        </div>
  
        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 w-full bg-transparent p-6 sm:p-8 z-10">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">
              <a href="#">SuperIntelligentBank</a>
            </div>
            <div className="flex space-x-6 text-lg font-medium">
              <a href="#home" className="hover:text-teal-300 transition">Home</a>
              <a href="#about" className="hover:text-teal-300 transition">About</a>
              <a href="#services" className="hover:text-teal-300 transition">Services</a>
              <a href="#contact" className="hover:text-teal-300 transition">Contact</a>
            </div>
          </div>
        </nav>
  
        {/* Our Services Section */}
        <section id="services" className="py-20 sm:py-32 bg-teal-800">
          <div className="max-w-screen-lg mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Our Premium Banking Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-4">
              <div className="bg-teal-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Personal Banking</h3>
                <p>Manage your personal finances with ease, from savings to checking accounts.</p>
              </div>
              <div className="bg-teal-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Business Banking</h3>
                <p>Grow your business with custom financial solutions and expert guidance.</p>
              </div>
              <div className="bg-teal-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Investment Services</h3>
                <p>Explore wealth-building strategies and investment opportunities tailored to you.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default Background;
  