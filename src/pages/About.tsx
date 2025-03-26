
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Users, GraduationCap, Clock, ArrowRight, Award, Target, MapPin } from 'lucide-react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About: React.FC = () => {
  // Core values data
  const coreValues = [
    {
      icon: <BookOpen className="text-islamic-navy" />,
      title: "Islamic Knowledge",
      description: "We prioritize the teaching of authentic Islamic knowledge based on Quran and Sunnah."
    },
    {
      icon: <GraduationCap className="text-islamic-navy" />,
      title: "Academic Excellence",
      description: "We strive for the highest standards of academic achievement across all subjects."
    },
    {
      icon: <Users className="text-islamic-navy" />,
      title: "Character Development",
      description: "We emphasize the development of Islamic character, morals, and ethics in all students."
    },
    {
      icon: <Target className="text-islamic-navy" />,
      title: "Personal Growth",
      description: "We foster the development of leadership, creativity, and critical thinking skills."
    },
    {
      icon: <Award className="text-islamic-navy" />,
      title: "Service & Responsibility",
      description: "We encourage a spirit of service to community and responsibility toward society."
    },
    {
      icon: <Clock className="text-islamic-navy" />,
      title: "Lifelong Learning",
      description: "We instill a passion for continuous learning and personal improvement throughout life."
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
          <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-8">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                Our Story
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                About Irsyadul Haq Manado
              </h1>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                Learn about our journey, mission, and vision in providing exceptional Islamic education.
              </p>
            </AnimatedSectionWrapper>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSectionWrapper animation="fade-in-left" className="order-2 lg:order-1">
                <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-navy/10 text-islamic-navy text-sm font-medium">
                  Our History
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-islamic-navy mb-4">
                  A Legacy of Islamic Education Excellence
                </h2>
                <div className="geometric-divider"></div>
                <p className="text-islamic-slate mb-4">
                  Irsyadul Haq Islamic Boarding School was founded in 1985 by Sheikh Abdullah Hamid, a respected Islamic scholar with a vision to create an educational institution that would nurture both the intellectual and spiritual development of Muslim youth.
                </p>
                <p className="text-islamic-slate mb-6">
                  Starting with just 20 students and 3 teachers in a modest building, our school has grown into a renowned institution with over 1,000 students, modern facilities, and a comprehensive curriculum that balances Islamic studies with academic excellence.
                </p>
                <p className="text-islamic-slate mb-8">
                  For more than three decades, we have remained committed to our founding principles while adapting to the changing educational landscape. Today, Irsyadulhaq stands as a testament to our dedication to providing quality Islamic education that prepares students for success in this world and the hereafter.
                </p>
                <Link to="/organization" className="btn-primary inline-flex items-center space-x-2">
                  <span>Learn About Our Organization</span>
                  <ChevronRight size={18} />
                </Link>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper animation="fade-in-right" delay={200} className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                    <img 
                      src="https://ik.imagekit.io/uzuuvayyu/WhatsApp%20Image%202025-02-22%20at%209.56.40%20AM.jpeg?updatedAt=1742526180427" 
                      alt="Irsyadulhaq Islamic Boarding School Building" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute -bottom-10 -right-10 glass-card p-5 rounded-lg max-w-[260px]">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-islamic-gold flex items-center justify-center">
                        <Clock size={24} className="text-islamic-navy" />
                      </div>
                      <div>
                        <p className="text-islamic-navy font-medium">38+ Years</p>
                        <p className="text-sm text-islamic-navy/70">of Excellence</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-islamic-gold h-1.5 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </AnimatedSectionWrapper>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <PatternBackground className="py-16" patternType="geometric">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Mission & Vision
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Our guiding principles and aspirations for the future.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSectionWrapper 
                animation="scale-in" 
                className="glass-card p-8 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-islamic-teal/10 flex items-center justify-center mx-auto">
                    <div className="w-12 h-12 rounded-full bg-islamic-teal flex items-center justify-center">
                      <span className="text-white font-serif text-xl">M</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-islamic-navy mt-4">
                    Our Mission
                  </h3>
                </div>
               
                <ul className="space-y-3">
                  {[
                    "Menanamkan sifat Amanah dan Akhlakul karimah berdasarkan tuntunan syari'at Islam",
                    "Menjalankan pendidikan yang berkelanjutan, aktif, tertib, disiplin dan efisien",
                    "Membekali Ilmu Alat sebagai modal memahami Ilmu Ghoyah",
                    "Menciptakan Tempat Belajar yang sehat, aman dan menyenangkan",
                    "Memperkuat, mengembangkan serta mendakwahkan pemahaman islam berdasarkan Al Qur'an dan As Sunnah secara berkesinambungan",
                    "Membentuk Santri yang cinta dan bangga terhadap Negara Kesatuan Republik Indonesia"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-islamic-teal/20 flex items-center justify-center mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-islamic-teal"></div>
                      </div>
                      <span className="text-islamic-slate">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={200}
                className="glass-card p-8 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-islamic-gold/10 flex items-center justify-center mx-auto">
                    <div className="w-12 h-12 rounded-full bg-islamic-gold flex items-center justify-center">
                      <span className="text-islamic-navy font-serif text-xl">V</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-islamic-navy mt-4">
                    Our Vision
                  </h3>
                </div>
                <p className="text-islamic-slate text-center mb-6">
                 Mencetak generasi Rabbani dan Beraqidah lurus yang berlandaskan Al Qur'an dan As sunnah sebagaimana Pemahaman Salafush Shalih
                </p>
                <ul className="space-y-3">
                  {[
                    "Become a center of excellence in Islamic education",
                    "Set new standards for integrated Islamic-academic curriculum",
                    "Develop innovative teaching methods that honor Islamic traditions",
                    "Establish a global reputation for producing well-rounded graduates",
                    "Create a model for sustainable, values-based education"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-islamic-gold/20 flex items-center justify-center mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-islamic-gold"></div>
                      </div>
                      <span className="text-islamic-slate">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSectionWrapper>
            </div>
          </div>
        </PatternBackground>
        
        {/* Core Values */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Our Core Values
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                The fundamental principles that guide our educational approach and community life.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg decorative-corner hover:shadow-elegant transition-all duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-islamic-navy/10 mb-5">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-islamic-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="text-islamic-slate mb-4">
                    {value.description}
                  </p>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-emerald/10 text-islamic-emerald text-sm font-medium">
                Testimonials
              </span>
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                What Our Community Says
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Hear from our students, parents, and alumni about their experiences at Irsyadul Haq.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Studying at Irsyadulhaq has been a transformative experience. I've not only gained knowledge but also developed a stronger connection to my faith.",
                  name: "Hassan Ahmad",
                  role: "Current Student, Grade 11",
                  photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                },
                {
                  quote: "As a parent, I'm impressed by how the school balances academic excellence with Islamic values. My children have flourished here both in studies and character.",
                  name: "Fatima Rahman",
                  role: "Parent of Two Students",
                  photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                },
                {
                  quote: "The values and education I received at Irsyadulhaq have been the foundation of my success. I'm proud to be an alumnus of this prestigious institution.",
                  name: "Dr. Yusuf Ibrahim",
                  role: "Alumni, Class of 2005",
                  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                }
              ].map((testimonial, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-islamic-emerald/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-islamic-slate mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-islamic-navy">{testimonial.name}</h4>
                      <p className="text-sm text-islamic-slate">{testimonial.role}</p>
                    </div>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <PatternBackground className="py-16" patternType="geometric">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Join Our Community
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate mb-8 max-w-2xl mx-auto">
                Become part of our growing family at Irsyadulhaq Islamic Boarding School. Applications for the upcoming academic year are now open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/registration" className="btn-primary inline-flex items-center space-x-2">
                  <span>Apply Now</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/organization" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </AnimatedSectionWrapper>
          </div>
        </PatternBackground>
      </main>
      <Footer />
    </>
  );
};

export default About;
