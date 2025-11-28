import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, FileText, Building2, PieChart, TrendingUp, BarChart3, Briefcase, Landmark, Shield, Star } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { products, assetTypes, providers } from '../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  FileText, Building2, PieChart, TrendingUp, BarChart3, Briefcase, Landmark
};

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    content: "This platform has made investing so simple. I can compare FDs and bonds from multiple providers in one place.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=0ea5e9&color=fff"
  },
  {
    id: 2,
    name: "Amit Patel",
    role: "Business Owner",
    content: "Excellent platform for diversifying investments. The curated baskets are particularly useful for busy professionals.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Amit+Patel&background=0ea5e9&color=fff"
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "Marketing Manager",
    content: "I love how transparent everything is. Clear data on returns, risks, and fees. Highly recommend!",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=0ea5e9&color=fff"
  }
];

export const Home = () => {
  const trendingProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Explore Investment <br />
                <span className="text-blue-300">Opportunities</span>
              </h1>
              <p className="text-blue-100 text-lg max-w-lg">
                Discover safe and high-yield investment options. FDs, Bonds, Mutual Funds, and more — all in one place.
              </p>
              
              <div className="bg-white p-2 rounded-lg shadow-lg max-w-md flex">
                <div className="flex-1 flex items-center px-3">
                  <Search className="text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search bonds, funds, or schemes..." 
                    className="w-full p-2 outline-none text-gray-900"
                  />
                </div>
                <Link to="/explore" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Search
                </Link>
              </div>
              
              <div className="flex gap-4 pt-2">
                <Link to="/explore" className="text-sm font-medium underline text-blue-200 hover:text-white">Browse All Products</Link>
              </div>
            </div>
            <div className="hidden md:block relative">
               <img 
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Investment Growth" 
                className="rounded-lg shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Products Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Investment Products</h2>
            <p className="text-gray-600 mt-2">Explore our wide range of investment options tailored to your goals</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {assetTypes.map((type) => {
              const Icon = iconMap[type.icon];
              return (
                <Link to={`/explore?type=${type.id}`} key={type.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{type.label}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{type.description}</p>
                  <div className="mt-3 flex items-center text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight size={12} className="ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Products</h2>
              <p className="text-gray-600 mt-2">Popular investment options this week</p>
            </div>
            <Link to="/explore" className="text-blue-700 font-medium flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How Investing Works</h2>
            <p className="text-gray-600 mt-2">Start your investment journey in just a few simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center relative">
            {/* Connector Line (Desktop only) */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10"></div>
            
            {[
              { title: 'Browse Products', desc: 'Explore our wide range of investment options', icon: Search },
              { title: 'Compare & Select', desc: 'Compare returns, risks, and features', icon: BarChart3 },
              { title: 'Complete KYC', desc: 'Quick and secure verification process', icon: Shield },
              { title: 'Start Investing', desc: 'Invest and track your portfolio', icon: TrendingUp },
            ].map((step, idx) => (
              <div key={idx} className="bg-gray-50 md:bg-transparent p-4 rounded-lg">
                <div className="w-16 h-16 mx-auto bg-blue-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white shadow-sm">
                  <step.icon size={24} />
                </div>
                <div className="text-blue-200 font-bold text-6xl absolute top-0 left-1/2 -translate-x-1/2 -z-10 opacity-10">0{idx + 1}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Providers */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900">Trusted by Leading Providers</h3>
            <p className="text-sm text-gray-500">Partner with top financial institutions</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {providers.map(p => (
              <div key={p.id} className="flex flex-col items-center gap-2">
                 <img src={p.logo} alt={p.name} className="h-12 w-12 rounded-full" />
                 <span className="text-xs font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Investors Say (Added based on image) */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Investors Say</h2>
            <p className="text-gray-600 mt-2">Join thousands of satisfied investors who trust InvestHub</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join thousands of investors who trust InvestHub for their financial growth.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="bg-white text-blue-700 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
              Create Free Account
            </Link>
            <button className="border border-white text-white px-8 py-3 rounded-md font-bold hover:bg-blue-600 transition-colors">
              Talk to Expert
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
