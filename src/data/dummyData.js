// Placeholder content. Replace via the /admin dashboard once Firestore is
// connected — everything here is only a fallback shown in demo mode.

export const clubInfo = {
  name: 'MIST Nuclear Engineering Club',
  shortName: 'MNEC',
  institution: 'Military Institute of Science and Technology (MIST)',
  founded: 2016,
  tagline: 'Promoting the Safe Use of Nuclear Energy & Empowering MIST Nuclear Engineers.',
  charter:
    "The club is for the students who are interested in the field of Nuclear Engineering at MIST. Each of our club's activities will be dedicated to creating awareness to promote the safe use of Nuclear Energy. To explore the job opportunities for students of MIST in the field of Nuclear Engineering through organizing job seminars conducted by scholars of MIST & other educational & professional organization of relevant field.",
  mission:
    "The club is for the students who are interested in the field of Nuclear Engineering at MIST. Each of our club's activities will be dedicated to creating awareness to promote the safe use of Nuclear Energy. To explore the job opportunities for students of MIST in the field of Nuclear Engineering through organizing job seminars conducted by scholars of MIST & other educational & professional organization of relevant field.",
  history:
    'Founded at the Department of Nuclear Science & Engineering (NSE) at the Military Institute of Science and Technology (MIST), MNEC unites undergraduate and postgraduate students passionate about nuclear science. Every workshop, public outreach campaign, and technical symposium we organize is dedicated to building awareness around the safe, sustainable use of nuclear energy and connecting MIST students directly with career opportunities through job seminars led by MIST scholars, BAEC scientists, Rooppur NPP engineers, and international nuclear professionals.',
  email: 'mnec@mist.ac.bd',
  address: 'Dept. of Nuclear Science & Engineering, MIST, Mirpur Cantonment, Dhaka-1216',
  social: {
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
  stats: [
    { label: 'Active Members', value: '220+' },
    { label: 'Job & Safety Seminars', value: '45+' },
    { label: 'Partner Orgs & Labs', value: '18+' },
    { label: 'Alumni in Sector', value: '400+' },
  ],
  pillars: [
    {
      id: 'p1',
      code: 'MANDATE §01',
      title: 'For MIST Nuclear Engineering Enthusiasts',
      subtitle: 'Student Technical Community',
      description:
        'A dedicated hub for all MIST students interested in Nuclear Engineering — bridging classroom theory with reactor physics modeling, radiation detection labs, and peer mentorship.',
      accent: 'cherenkov',
      metric: 'NSE Batches & All MIST Depts',
    },
    {
      id: 'p2',
      code: 'MANDATE §02',
      title: 'Awareness for Safe Use of Nuclear Energy',
      subtitle: 'Safety Culture & Public Literacy',
      description:
        'Every club activity champions nuclear safety, ALARA radiation protection principles, defence-in-depth engineering, and public awareness of clean, reliable carbon-free nuclear power.',
      accent: 'safety',
      metric: '100% IAEA Safety-Aligned',
    },
    {
      id: 'p3',
      code: 'MANDATE §03',
      title: 'Career & Job Seminars with Scholars',
      subtitle: 'Industry & Academic Pathways',
      description:
        'Exploring national and global job opportunities for MIST students through career seminars conducted by MIST faculty scholars, BAEC, Rooppur NPP, NINMAS, and international organizations.',
      accent: 'uranium',
      metric: 'Direct Industry-Scholar Link',
    },
  ],
  careerSeminars: [
    {
      id: 'cs1',
      title: 'Nuclear Career Pathways at Rooppur NPP & BAEC',
      speakers: 'MIST NSE Senior Scholars & Chief Engineers, NPCBL (Rooppur NPP)',
      organization: 'MIST NSE × Bangladesh Atomic Energy Commission (BAEC)',
      topic: 'Recruitment pipelines, VVER-1200 reactor operations roles, licensing exams, and commissioning engineering careers for MIST graduates.',
      badge: 'Flagship Job Seminar',
    },
    {
      id: 'cs2',
      title: 'Global Fellowships, IAEA Internships & Graduate Research Abroad',
      speakers: 'MIST Alumni Scholars (KAIST, Texas A&M, & IAEA Vienna)',
      organization: 'MIST Scholars & International Nuclear Network',
      topic: 'Securing fully funded PhD/MS fellowships, Marie Skłodowska-Curie scholarships, and technical officer placements at the IAEA.',
      badge: 'Scholar Career Seminar',
    },
    {
      id: 'cs3',
      title: 'Radiation Protection, Medical Physics & Industrial NDT Careers',
      speakers: 'Clinical Physicists & Radiation Safety Officers (NINMAS & BAERA)',
      organization: 'National Institute of Nuclear Medicine & Allied Sciences',
      topic: 'High-demand domestic and international career tracks in hospital oncology physics, cyclotrons, regulatory compliance, and non-destructive testing.',
      badge: 'Professional Org Seminar',
    },
  ],
}

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'News', path: '/news' },
  { name: 'Panel', path: '/panel' },
  { name: 'Alumni', path: '/alumni' },
  { name: 'Activities', path: '/activities' },
  { name: 'Resources', path: '/resources' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
]

export const news = [
  {
    id: 'n1',
    title: 'National Job Seminar: Career Opportunities in Nuclear Engineering for MIST Students',
    excerpt:
      'Distinguished scholars of MIST, BAEC scientists, and Rooppur NPP engineers convene to guide students through national and international nuclear career tracks.',
    body:
      'In alignment with MNEC’s core mandate to explore job opportunities for students of MIST in the field of Nuclear Engineering, the club is hosting its flagship Career & Job Seminar this month.\n\nConducted jointly by senior scholars of MIST and invited professionals from the Bangladesh Atomic Energy Commission (BAEC), Nuclear Power Plant Company Bangladesh Limited (NPCBL - Rooppur NPP), and international research institutions, the seminar will cover:\n• Engineering recruitment and training pipelines for VVER-1200 reactor operations.\n• Regulatory and radiation safety officer careers at BAERA and NINMAS.\n• Fully-funded higher study and research fellowships with partner universities worldwide.\n\nOpen to all MIST students interested in Nuclear Engineering.',
    date: '2026-07-02',
    author: 'MNEC Career & Seminar Desk',
    tag: 'Seminar',
    cover: 'https://images.unsplash.com/photo-1581093458791-9d42cc03c1e2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'n2',
    title: 'Safe Use of Nuclear Energy Awareness Week & Dosimetry Exhibition',
    excerpt:
      'A week-long campus and inter-institutional outreach campaign demonstrating reactor defence-in-depth, radiation shielding, and clean baseload nuclear energy.',
    body:
      'Each of MNEC’s activities is dedicated to creating awareness to promote the safe use of Nuclear Energy. This semester’s Safe Nuclear Energy Awareness Week features interactive 3D VVER-1200 containment demonstrations, live Geiger-Müller background radiation workshops, and fact-based panels debunking common myths about nuclear power.\n\nVisitors will experience how modern Generation III+ passive safety systems, multi-barrier containment vessels, and strict IAEA safeguards make nuclear energy one of the safest, lowest-carbon energy sources on Earth.',
    date: '2026-06-18',
    author: 'MNEC Safety Awareness Wing',
    tag: 'Event',
    cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'n3',
    title: 'MNEC Team Secures Top Honors at Inter-University Nuclear Safety & Reactor Design Quiz',
    excerpt:
      'Three MIST Nuclear Engineering Club members brought home the trophy after competing across reactor kinetics, radiation protection, and energy policy.',
    body:
      'Representing MIST at the National Nuclear Science & Safety Championship, a three-member MNEC squad secured top honors out of eighteen competing institutions. The competition tested rapid calculations in neutron diffusion theory, six-factor criticality formulas, ALARA radiation shielding protocols, and sustainable grid decarbonization in South Asia.',
    date: '2026-06-05',
    author: 'MNEC Media Team',
    tag: 'Achievement',
    cover: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'n4',
    title: 'Industry-Academia Colloquium: Small Modular Reactors (SMRs) & Future Grid Jobs',
    excerpt:
      'Visiting scholars and MIST faculty explore SMR licensing pathways, passive safety systems, and emerging engineering roles for graduates.',
    body:
      'The MIST Nuclear Engineering Club invites all students interested in Nuclear Engineering to an industry-academia colloquium on Small Modular Reactors (SMRs). The session bridges technical safety innovations—such as natural circulation cooling and underground containment—with the rapidly expanding global job market for nuclear systems engineers, thermal-hydraulics analysts, and licensing specialists.',
    date: '2026-05-22',
    author: 'Academic & Professional Wing',
    tag: 'Announcement',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop',
  },
]

export const panel = {
  advisors: [
    {
      id: 'a1',
      name: 'Dr. Rahim Uddin Ahmed',
      role: 'Chief Faculty Advisor',
      dept: 'Dept. of Nuclear Science & Engineering, MIST',
      photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 'a2',
      name: 'Dr. Sabrina Karim',
      role: 'Faculty Co-Advisor (Safety & Career Seminars)',
      dept: 'Dept. of Nuclear Science & Engineering, MIST',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    },
  ],
  executives: [
    { id: 'e1', name: 'Farhan Kabir', role: 'President', batch: 'NSE-14', photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop' },
    { id: 'e2', name: 'Nusrat Jahan', role: 'Vice President (Safety Awareness)', batch: 'NSE-14', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop' },
    { id: 'e3', name: 'Tanvir Hasan', role: 'General Secretary', batch: 'NSE-15', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
    { id: 'e4', name: 'Mehrin Chowdhury', role: 'Treasurer', batch: 'NSE-15', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop' },
    { id: 'e5', name: 'Shafiul Islam', role: 'Director, Career & Job Seminars', batch: 'NSE-16', photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'e6', name: 'Rafia Tabassum', role: 'Director, Publications & Outreach', batch: 'NSE-16', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
    { id: 'e7', name: 'Ovi Das', role: 'Director, Reactor Research & Simulation', batch: 'NSE-16', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
    { id: 'e8', name: 'Anika Tasnim', role: 'Director, IT & Digital Media', batch: 'NSE-17', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
  ],
}

export const alumni = [
  { id: 'al1', name: 'Mahmudul Hasan', batch: 'NSE-08', role: 'Founding President', current: 'Senior Reactor Engineer, Rooppur NPP (NPCBL)', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop' },
  { id: 'al2', name: 'Sadia Afrin', batch: 'NSE-09', role: 'Former General Secretary', current: 'Doctoral Researcher, Nuclear Safety, KAIST', photo: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=400&auto=format&fit=crop' },
  { id: 'al3', name: 'Imran Chowdhury', batch: 'NSE-10', role: 'Former VP', current: 'Scientific Officer & Radiation Safety Specialist, BAEC', photo: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=400&auto=format&fit=crop' },
  { id: 'al4', name: 'Tasnia Rahman', batch: 'NSE-11', role: 'Former Director, Research', current: 'Clinical Medical Physicist, NINMAS', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop' },
  { id: 'al5', name: 'Zahid Hasan', batch: 'NSE-12', role: 'Former President', current: 'Nuclear Safeguards Fellow, IAEA (Vienna)', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
  { id: 'al6', name: 'Farzana Yasmin', batch: 'NSE-13', role: 'Former Treasurer', current: 'Nuclear Fuel Cycle & Thermal-Hydraulics Analyst', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop' },
]

export const activities = [
  {
    id: 'ac1',
    title: 'Career & Job Seminars with Scholars',
    category: 'Career & Industry',
    description:
      'Dedicated job seminars conducted by scholars of MIST and professionals from BAEC, Rooppur NPP, NINMAS, and international nuclear organizations to explore career opportunities for MIST students.',
    frequency: 'Monthly',
    icon: 'Users',
  },
  {
    id: 'ac2',
    title: 'Safe Use of Nuclear Energy Awareness Campaigns',
    category: 'Safety Awareness',
    description:
      'Campus-wide and public outreach exhibitions promoting nuclear safety literacy, ALARA radiation protection, defence-in-depth engineering, and clean baseload energy awareness.',
    frequency: 'Monthly',
    icon: 'ShieldAlert',
  },
  {
    id: 'ac3',
    title: 'Reactor Physics & Safety Simulation Bootcamp',
    category: 'Technical Workshop',
    description:
      'Hands-on training covering neutron transport, criticality safety calculations, thermal-hydraulics, and point-kinetics reactor modeling for MIST students.',
    frequency: 'Yearly',
    icon: 'Atom',
  },
  {
    id: 'ac4',
    title: 'Nuclear Facility & Research Reactor Site Visits',
    category: 'Field Exposure',
    description:
      'Guided technical visits to BAEC Savar TRIGA Mark-II Research Reactor, Rooppur NPP, and NINMAS facilities to observe safety protocols and engineering operations first-hand.',
    frequency: 'Bi-annual',
    icon: 'MapPin',
  },
  {
    id: 'ac5',
    title: 'Undergraduate Nuclear Research & Safety Symposium',
    category: 'Research & Scholars',
    description:
      'A peer-reviewed showcase for student research in reactor design, medical physics, radiation shielding, and nuclear energy policy evaluated by MIST scholars.',
    frequency: 'Bi-annual',
    icon: 'FlaskConical',
  },
  {
    id: 'ac6',
    title: 'National Nuclear Olympiad & Quiz Circle',
    category: 'Competition Prep',
    description:
      'Weekly technical drills preparing MIST teams for national and international nuclear science quizzes, safety case studies, and policy debates.',
    frequency: 'Weekly',
    icon: 'Brain',
  },
]

export const resources = [
  {
    id: 'r1',
    title: 'MIST Nuclear Engineering Career & Job Seminar Compendium',
    type: 'PDF',
    category: 'Career & Job Seminars',
    size: '3.8 MB',
    link: '#preview-r1',
    summary:
      'Comprehensive career roadmap compiled from seminars by MIST scholars, BAEC scientists, and NPCBL engineers. Covers Rooppur NPP recruitment stages, BAEC Scientific Officer exams, medical physics residency pathways, and IAEA fellowship applications.',
  },
  {
    id: 'r2',
    title: 'IAEA Safety Standards & Safe Nuclear Energy Awareness Guide',
    type: 'PDF',
    category: 'Nuclear Safety Awareness',
    size: '6.5 MB',
    link: '#preview-r2',
    summary:
      'Student and public reference manual on Fundamental Safety Principles (SF-1), Defence-in-Depth barriers, ALARA dosimetry limits, and passive safety systems in Generation III+ VVER-1200 reactors.',
  },
  {
    id: 'r3',
    title: 'Reactor Physics & Neutron Diffusion — MIST Lecture Dossier',
    type: 'PDF',
    category: 'Coursework',
    size: '4.2 MB',
    link: '#preview-r3',
    summary:
      'Complete derivations of the Six-Factor Formula, one-group and two-group neutron diffusion equations, buckling calculations, and control rod worth curves.',
  },
  {
    id: 'r4',
    title: 'Radiation Detection, Shielding & Dosimetry Lab Manual',
    type: 'PDF',
    category: 'Lab Manual',
    size: '2.8 MB',
    link: '#preview-r4',
    summary:
      'Experimental procedures for Geiger-Müller counters, NaI(Tl) gamma spectroscopy, half-value layer (HVL) lead/concrete attenuation, and personal dosimeter calibration.',
  },
  {
    id: 'r5',
    title: 'Point-Kinetics & Reactivity Safety Simulator (MATLAB / Python)',
    type: 'Tool',
    category: 'Software',
    size: '1.4 MB',
    link: '#preview-r5',
    summary:
      'Six-group delayed neutron point-kinetics solver with step/ramp reactivity insertion, Doppler temperature feedback, and SCRAM safety shutdown plotting.',
  },
  {
    id: 'r6',
    title: 'Higher Studies & Global Nuclear Scholarships Directory',
    type: 'PDF',
    category: 'Career & Job Seminars',
    size: '2.1 MB',
    link: '#preview-r6',
    summary:
      'Curated directory of graduate nuclear engineering programs, research assistantships, IAEA Marie Skłodowska-Curie fellowships, and MIST alumni mentors worldwide.',
  },
]

export const gallery = [
  { id: 'g1', title: 'Job Seminar with MIST Scholars & Industry Experts', album: 'Job Seminars', url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=900&auto=format&fit=crop' },
  { id: 'g2', title: 'Safe Use of Nuclear Energy Awareness Exhibition', album: 'Safety Awareness', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=900&auto=format&fit=crop' },
  { id: 'g3', title: 'Reactor Physics & Kinetics Lab Session', album: 'Reactor Physics Bootcamp', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop' },
  { id: 'g4', title: 'National Nuclear Quiz Championship Finals', album: 'Competitions', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop' },
  { id: 'g5', title: 'Research Facility & Shielding Site Visit', album: 'Field Trips', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=900&auto=format&fit=crop' },
  { id: 'g6', title: 'MIST NSE Freshers Orientation & Safety Briefing', album: 'Community', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=900&auto=format&fit=crop' },
  { id: 'g7', title: 'Executive Panel & Faculty Scholars Strategy Meet', album: 'Job Seminars', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=900&auto=format&fit=crop' },
  { id: 'g8', title: 'MNEC Annual Symposium — Cohort Photo', album: 'Reactor Physics Bootcamp', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=900&auto=format&fit=crop' },
]
