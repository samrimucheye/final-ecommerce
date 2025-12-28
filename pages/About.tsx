
import React from 'react';

const About: React.FC = () => {
  const values = [
    { title: 'Quality First', desc: 'We source only the finest products that meet our rigorous quality standards.', icon: '💎' },
    { title: 'Global Reach', desc: 'Through our advanced dropshipping networks, we deliver worldwide in record time.', icon: '🌍' },
    { title: 'Customer Obsession', desc: "Your satisfaction isn't just a metric; it's our primary mission.", icon: '❤️' },
    { title: 'Innovation', desc: 'Leveraging AI and modern logistics to redefine the shopping experience.', icon: '🚀' }
  ];

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Founder', image: 'https://picsum.photos/seed/sarah/300/300' },
    { name: 'Marcus Thorne', role: 'Head of Logistics', image: 'https://picsum.photos/seed/marcus/300/300' },
    { name: 'Elena Rodriguez', role: 'Creative Director', image: 'https://picsum.photos/seed/elena/300/300' }
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover"
            alt="Office"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Our Story</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 leading-relaxed">
            Redefining modern retail through cutting-edge technology and a passion for curated excellence.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Mission</span>
            <h2 className="text-4xl font-black text-slate-800 leading-tight">Empowering lifestyles through seamless commerce.</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Founded in 2024, ShopBlue emerged from a simple idea: that premium shopping shouldn't be complicated. By integrating advanced AI sourcing with global logistics, we bridge the gap between world-class manufacturers and discerning customers.
            </p>
            <div className="pt-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">15k+</div>
                <p className="text-sm text-gray-500 font-medium">Happy customers served globally.</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">24h</div>
                <p className="text-sm text-gray-500 font-medium">Average order processing time.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Team Work" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 hidden md:block">
              <p className="text-4xl font-black text-blue-600 mb-1">98%</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 mb-4">The Values We Live By</h2>
          <p className="text-gray-500 max-w-xl mx-auto">These core principles guide every decision we make, from sourcing products to supporting our customers.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{v.icon}</div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{v.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 mb-4">Meet Our Leadership</h2>
          <p className="text-gray-500 max-w-xl mx-auto">The visionaries behind the ShopBlue ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((t, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="aspect-square rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 shadow-lg">
                <img src={t.image} className="w-full h-full object-cover" alt={t.name} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">{t.name}</h4>
                <p className="text-sm text-blue-600 font-medium">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
