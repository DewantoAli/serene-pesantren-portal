
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Users, BookOpen, Calendar, MapPin } from 'lucide-react';

const Organization: React.FC = () => {
  // Organization Structure Data
  const leadershipTeam = [
    {
      name: "Dr. Ahmad Fadhil",
      position: "Director",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      education: "Ph.D. in Islamic Studies, Al-Azhar University",
      experience: "20+ years in Islamic education",
      bio: "Dr. Ahmad Fadhil has dedicated his life to Islamic education and has been leading Irsyadulhaq since 2005. Under his guidance, the school has expanded its programs and gained recognition for academic excellence."
    },
    {
      name: "Ustadz Mahmoud Hassan",
      position: "Academic Director",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      education: "M.A. in Education, University of Jordan",
      experience: "15+ years in curriculum development",
      bio: "Ustadz Mahmoud oversees all academic programs and ensures that our curriculum meets both national standards and Islamic educational principles."
    },
    {
      name: "Ustadzah Fatima Rahman",
      position: "Student Affairs Director",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      education: "M.Sc. in Psychology, International Islamic University",
      experience: "12+ years in student counseling",
      bio: "Ustadzah Fatima leads student affairs, ensuring the well-being and development of all students through mentorship and guidance programs."
    }
  ];
  
  const departments = [
    {
      name: "Islamic Studies Department",
      head: "Ustadz Ibrahim Malik",
      description: "Focuses on Quranic studies, Hadith, Fiqh, and Islamic history.",
      programs: ["Quran Memorization", "Hadith Studies", "Islamic Jurisprudence", "History of Islam"]
    },
    {
      name: "Academic Department",
      head: "Ustadz Yusuf Hamid",
      description: "Covers general education subjects following the national curriculum.",
      programs: ["Mathematics", "Sciences", "Languages", "Social Studies", "Arts"]
    },
    {
      name: "Character Development Department",
      head: "Ustadzah Aisha Noor",
      description: "Focuses on developing moral values and leadership skills in students.",
      programs: ["Islamic Ethics", "Leadership Training", "Community Service", "Personal Development"]
    },
    {
      name: "Extracurricular Department",
      head: "Ustadz Khalid Omar",
      description: "Organizes sports, arts, and other extracurricular activities.",
      programs: ["Sports Activities", "Arts & Crafts", "Debate Club", "Science Competitions"]
    }
  ];
  
  const administrationTeam = [
    {
      name: "Administration & Finance",
      head: "Mrs. Layla Zubair",
      positions: ["Financial Manager", "Administrative Assistants", "HR Staff", "Accounting Team"]
    },
    {
      name: "Facilities & Maintenance",
      head: "Mr. Rizwan Ahmed",
      positions: ["Maintenance Supervisors", "Security Team", "Cleaning Staff", "Gardeners"]
    },
    {
      name: "Student Services",
      head: "Mrs. Samira Malik",
      positions: ["Health Services", "Dining Services", "Dormitory Supervisors", "Transportation Coordinators"]
    },
    {
      name: "Community Relations",
      head: "Mr. Hassan Ibrahim",
      positions: ["Parent Coordinators", "Alumni Relations", "Event Organizers", "Media Team"]
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
          <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-8">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                Our Organization
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                Organizational Structure
              </h1>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                Meet the dedicated team of professionals who lead Irsyadulhaq Islamic Boarding School.
              </p>
            </AnimatedSectionWrapper>
          </div>
        </section>
        
        {/* Organizational Chart */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Leadership Team
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Our school is guided by experienced leaders committed to excellence in Islamic education.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {leadershipTeam.map((leader, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-md mx-auto w-40">
                      <img 
                        src={leader.photo} 
                        alt={leader.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 mx-auto w-fit px-4 py-1 bg-islamic-navy text-white text-sm font-medium rounded-full">
                      {leader.position}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-display font-semibold text-islamic-navy mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-islamic-slate mb-3">
                      {leader.education}
                    </p>
                    <p className="text-sm text-islamic-teal font-medium mb-4">
                      {leader.experience}
                    </p>
                    <p className="text-sm text-islamic-slate mb-4">
                      {leader.bio}
                    </p>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
            
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Academic Departments
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Our school is organized into specialized departments, each focused on different aspects of our students' education.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {departments.map((dept, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="fade-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-islamic-teal/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={24} className="text-islamic-teal" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-islamic-navy mb-2">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-islamic-teal font-medium mb-3">
                        Head: {dept.head}
                      </p>
                      <p className="text-sm text-islamic-slate mb-4">
                        {dept.description}
                      </p>
                      <div className="p-4 bg-islamic-navy/5 rounded-lg">
                        <h4 className="text-sm font-medium text-islamic-navy mb-2">
                          Programs & Courses:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                          {dept.programs.map((program, idx) => (
                            <li key={idx} className="text-sm text-islamic-slate flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-islamic-teal mr-2"></div>
                              {program}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
            
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Administration & Support
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Our administrative and support teams ensure the smooth operation of all school functions.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {administrationTeam.map((team, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="fade-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-islamic-gold/20 flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-islamic-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-islamic-navy mb-2">
                        {team.name}
                      </h3>
                      <p className="text-sm text-islamic-gold font-medium mb-3">
                        Head: {team.head}
                      </p>
                      <div className="p-4 bg-islamic-navy/5 rounded-lg">
                        <h4 className="text-sm font-medium text-islamic-navy mb-2">
                          Key Positions:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                          {team.positions.map((position, idx) => (
                            <li key={idx} className="text-sm text-islamic-slate flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-islamic-gold mr-2"></div>
                              {position}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* School Information */}
        <PatternBackground className="py-16" patternType="geometric">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                School Information
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Key statistics and information about Irsyadulhaq Islamic Boarding School.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={0}
                className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-islamic-navy/10 flex items-center justify-center">
                    <Users size={36} className="text-islamic-navy" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-islamic-navy mb-2">
                    1,000+
                  </h3>
                  <p className="text-islamic-slate font-medium">
                    Students Enrolled
                  </p>
                  <div className="w-16 h-1 bg-islamic-navy/20 mx-auto my-4"></div>
                  <ul className="text-sm text-islamic-slate space-y-2">
                    <li>60% Male Students</li>
                    <li>40% Female Students</li>
                    <li>Ages 12-18 years</li>
                    <li>From 15+ different regions</li>
                  </ul>
                </div>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={100}
                className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-islamic-emerald/10 flex items-center justify-center">
                    <BookOpen size={36} className="text-islamic-emerald" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-islamic-navy mb-2">
                    100+
                  </h3>
                  <p className="text-islamic-slate font-medium">
                    Faculty & Staff Members
                  </p>
                  <div className="w-16 h-1 bg-islamic-emerald/20 mx-auto my-4"></div>
                  <ul className="text-sm text-islamic-slate space-y-2">
                    <li>60 Teaching Faculty</li>
                    <li>15 Islamic Scholars</li>
                    <li>25 Administrative Staff</li>
                    <li>15 Support Staff</li>
                  </ul>
                </div>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={200}
                className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-islamic-gold/10 flex items-center justify-center">
                    <Calendar size={36} className="text-islamic-gold" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-islamic-navy mb-2">
                    Since 1985
                  </h3>
                  <p className="text-islamic-slate font-medium">
                    Years of Excellence
                  </p>
                  <div className="w-16 h-1 bg-islamic-gold/20 mx-auto my-4"></div>
                  <ul className="text-sm text-islamic-slate space-y-2">
                    <li>38 Years of Operation</li>
                    <li>5,000+ Alumni Worldwide</li>
                    <li>85% University Admission Rate</li>
                    <li>30+ National Awards</li>
                  </ul>
                </div>
              </AnimatedSectionWrapper>
            </div>
          </div>
        </PatternBackground>
        
        {/* Campus Facilities */}
        <section className="py-16 bg-islamic-navy relative overflow-hidden">
          <PatternBackground className="absolute inset-0" patternType="dots" patternColor="#ffffff" patternOpacity={0.05} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Campus Facilities
              </h2>
              <div className="geometric-divider bg-islamic-gold mx-auto"></div>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                Our campus provides modern facilities to support both academic and personal development.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Academic Buildings",
                  items: [
                    "20 Modern Classrooms",
                    "Science Laboratories",
                    "Computer Labs",
                    "Library with 10,000+ Books",
                    "Language Learning Center"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Islamic Facilities",
                  items: [
                    "Grand Mosque",
                    "Quran Recitation Halls",
                    "Islamic Studies Center",
                    "Prayer Rooms in Each Building",
                    "Wudu Areas"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Residential Facilities",
                  items: [
                    "Separate Dormitories for Boys & Girls",
                    "Dining Halls",
                    "Recreation Areas",
                    "Student Lounges",
                    "Health Center"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Sports Facilities",
                  items: [
                    "Soccer Field",
                    "Basketball Courts",
                    "Indoor Sports Hall",
                    "Swimming Pool",
                    "Athletics Track"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Extracurricular Areas",
                  items: [
                    "Arts & Crafts Studio",
                    "Music Room",
                    "Debate Club Room",
                    "Gardening Area",
                    "Robotics Lab"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Support Facilities",
                  items: [
                    "Administration Building",
                    "Counseling Offices",
                    "Meeting Rooms",
                    "Visitor Center",
                    "Parent Lounge"
                  ]
                }
              ].map((facility, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="fade-in" 
                  delay={index * 50}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-islamic-gold/20 flex items-center justify-center">
                      {facility.icon}
                    </div>
                    <h3 className="text-lg font-display font-semibold text-white">
                      {facility.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {facility.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-islamic-cream/80 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-islamic-gold mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="glass-card max-w-3xl mx-auto p-8 rounded-lg">
              <h2 className="text-2xl font-serif font-bold text-islamic-navy mb-4 text-center">
                Would You Like to Visit Our Campus?
              </h2>
              <p className="text-islamic-slate mb-6 text-center">
                Schedule a tour to visit our campus and meet with our faculty and staff members.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="btn-primary">
                  Schedule a Tour
                </a>
                <a href="#" className="btn-outline">
                  Contact Us
                </a>
              </div>
            </AnimatedSectionWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Organization;
