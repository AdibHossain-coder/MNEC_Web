// Placeholder content. Replace via the /admin dashboard once Firestore is
// connected — everything here is only a fallback shown in demo mode.

export const clubInfo = {
  name: 'MIST Nuclear Engineering Society',
  shortName: 'MIST NESC',
  institution: 'Military Institute of Science and Technology',
  founded: 2016,
  tagline: 'Splitting problems, not atoms of doubt.',
  mission:
    'To cultivate a rigorous, curious, and safety-first culture around nuclear science among students of MIST — through hands-on projects, technical seminars, and a peer network that carries into the profession.',
  history:
    'Founded by a small group of Nuclear Science & Engineering undergraduates, the society began as an informal study circle preparing for national physics olympiads. It has since grown into the department\'s flagship student body, running workshops on reactor physics, radiation protection, and computational modeling, and representing MIST at inter-university nuclear quiz and paper-presentation competitions.',
  email: 'nesc@mist.ac.bd',
  address: 'Dept. of Nuclear Science & Engineering, MIST, Mirpur Cantonment, Dhaka-1216',
  social: {
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
  stats: [
    { label: 'Active Members', value: '180+' },
    { label: 'Workshops Held', value: '35+' },
    { label: 'Years Running', value: '9' },
    { label: 'Alumni Network', value: '400+' },
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
    title: 'NESC Reactor Physics Bootcamp registration now open',
    excerpt:
      'A five-day intensive covering neutron diffusion theory, criticality calculations, and a hands-on session with our point-kinetics simulator.',
    body:
      'The Nuclear Engineering Society is opening registration for its annual Reactor Physics Bootcamp, running over the second week of next month. Sessions will cover neutron transport fundamentals, six-factor formula derivations, and criticality safety, capped off with a hands-on lab using the department\'s point-kinetics simulation tool. Seats are limited to 40 participants across all batches.',
    date: '2026-07-02',
    author: 'NESC Media Team',
    tag: 'Event',
    cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'n2',
    title: 'NESC team places 2nd at National Nuclear Quiz Championship',
    excerpt:
      'Three of our sophomore members brought home the runners-up trophy from this year\'s inter-university nuclear science quiz.',
    body:
      'Representing MIST at the National Nuclear Quiz Championship held at a partner university, a three-member NESC team secured second place out of eighteen competing institutions. The team fielded questions spanning isotope chemistry, reactor safety systems, and the history of nuclear energy policy in South Asia. Congratulations to the team and their mentors.',
    date: '2026-06-18',
    author: 'NESC Media Team',
    tag: 'Achievement',
    cover: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'n3',
    title: 'Guest lecture: "Small Modular Reactors and the Path to Grid Deployment"',
    excerpt:
      'A visiting research fellow joins us for a technical seminar on SMR design trade-offs and licensing pathways.',
    body:
      'NESC is hosting a guest seminar on Small Modular Reactors, covering passive safety design philosophy, factory fabrication economics, and the regulatory pathways different countries are taking toward deployment. Open to all NSE and adjacent-department students; light refreshments provided.',
    date: '2026-06-05',
    author: 'Academic Affairs Desk',
    tag: 'Seminar',
    cover: 'https://images.unsplash.com/photo-1581093458791-9d42cc03c1e2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'n4',
    title: 'Call for papers: NESC Undergraduate Research Symposium',
    excerpt:
      'Submit your abstracts for this semester\'s research symposium — open to all nuclear-adjacent undergraduate projects.',
    body:
      'The society invites undergraduate researchers to submit abstracts for the upcoming Research Symposium. Tracks include reactor engineering, radiation protection, medical physics, and nuclear policy. Selected presenters will receive travel support to the regional student conference.',
    date: '2026-05-22',
    author: 'Research Wing',
    tag: 'Announcement',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop',
  },
]

export const panel = {
  advisors: [
    {
      id: 'a1',
      name: 'Dr. Rahim Uddin Ahmed',
      role: 'Faculty Advisor',
      dept: 'Dept. of Nuclear Science & Engineering',
      photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop',
    },
  ],
  executives: [
    { id: 'e1', name: 'Farhan Kabir', role: 'President', batch: 'NSE-14', photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop' },
    { id: 'e2', name: 'Nusrat Jahan', role: 'Vice President', batch: 'NSE-14', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop' },
    { id: 'e3', name: 'Tanvir Hasan', role: 'General Secretary', batch: 'NSE-15', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
    { id: 'e4', name: 'Mehrin Chowdhury', role: 'Treasurer', batch: 'NSE-15', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop' },
    { id: 'e5', name: 'Shafiul Islam', role: 'Director, Events', batch: 'NSE-16', photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'e6', name: 'Rafia Tabassum', role: 'Director, Publications', batch: 'NSE-16', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
    { id: 'e7', name: 'Ovi Das', role: 'Director, Research', batch: 'NSE-16', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
    { id: 'e8', name: 'Anika Tasnim', role: 'Director, IT & Media', batch: 'NSE-17', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
  ],
}

export const alumni = [
  { id: 'al1', name: 'Mahmudul Hasan', batch: 'NSE-08', role: 'Founding President', current: 'Reactor Engineer, Rooppur NPP', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop' },
  { id: 'al2', name: 'Sadia Afrin', batch: 'NSE-09', role: 'Former General Secretary', current: 'PhD Candidate, Nuclear Eng., KAIST', photo: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=400&auto=format&fit=crop' },
  { id: 'al3', name: 'Imran Chowdhury', batch: 'NSE-10', role: 'Former VP', current: 'Radiation Safety Officer, BAEC', photo: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=400&auto=format&fit=crop' },
  { id: 'al4', name: 'Tasnia Rahman', batch: 'NSE-11', role: 'Former Director, Research', current: 'Medical Physicist, NINMAS', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop' },
  { id: 'al5', name: 'Zahid Hasan', batch: 'NSE-12', role: 'Former President', current: 'Research Fellow, IAEA', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
  { id: 'al6', name: 'Farzana Yasmin', batch: 'NSE-13', role: 'Former Treasurer', current: 'Nuclear Fuel Cycle Analyst', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop' },
]

export const activities = [
  {
    id: 'ac1',
    title: 'Reactor Physics Bootcamp',
    category: 'Workshop',
    description: 'Annual five-day intensive on neutron transport, criticality, and point-kinetics simulation.',
    frequency: 'Yearly',
    icon: 'Atom',
  },
  {
    id: 'ac2',
    title: 'Nuclear Quiz Circle',
    category: 'Competition Prep',
    description: 'Weekly practice sessions preparing teams for inter-university nuclear science quizzes.',
    frequency: 'Weekly',
    icon: 'Brain',
  },
  {
    id: 'ac3',
    title: 'Radiation Safety Seminar Series',
    category: 'Seminar',
    description: 'Guest talks from industry professionals on dosimetry, shielding, and regulatory compliance.',
    frequency: 'Monthly',
    icon: 'ShieldAlert',
  },
  {
    id: 'ac4',
    title: 'Undergraduate Research Symposium',
    category: 'Research',
    description: 'A showcase for student research spanning reactor design, medical physics, and policy.',
    frequency: 'Bi-annual',
    icon: 'FlaskConical',
  },
  {
    id: 'ac5',
    title: 'Site Visit Program',
    category: 'Field Trip',
    description: 'Guided visits to nuclear and radiological facilities for hands-on exposure to real systems.',
    frequency: 'Yearly',
    icon: 'MapPin',
  },
  {
    id: 'ac6',
    title: 'Freshers\' Orientation',
    category: 'Community',
    description: 'Welcoming new NSE batches with department tours, alumni talks, and club onboarding.',
    frequency: 'Yearly',
    icon: 'Users',
  },
]

export const resources = [
  { id: 'r1', title: 'Reactor Physics — Lecture Notes Compilation', type: 'PDF', category: 'Coursework', size: '4.2 MB', link: '#' },
  { id: 'r2', title: 'Radiation Detection & Measurement Lab Manual', type: 'PDF', category: 'Lab Manual', size: '2.8 MB', link: '#' },
  { id: 'r3', title: 'Point-Kinetics Simulator (MATLAB)', type: 'Tool', category: 'Software', size: '1.1 MB', link: '#' },
  { id: 'r4', title: 'IAEA Safety Standards — Student Digest', type: 'PDF', category: 'Reference', size: '6.5 MB', link: '#' },
  { id: 'r5', title: 'Past Quiz Question Archive (2019–2026)', type: 'PDF', category: 'Competition Prep', size: '3.3 MB', link: '#' },
  { id: 'r6', title: 'Six-Factor Formula Cheat Sheet', type: 'Image', category: 'Coursework', size: '0.4 MB', link: '#' },
]

export const gallery = [
  { id: 'g1', title: 'Bootcamp 2025 — Lab Session', album: 'Reactor Physics Bootcamp', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop' },
  { id: 'g2', title: 'Quiz Championship Finals', album: 'Competitions', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop' },
  { id: 'g3', title: 'Guest Seminar — SMR Talk', album: 'Seminars', url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=900&auto=format&fit=crop' },
  { id: 'g4', title: 'Site Visit — Research Facility', album: 'Field Trips', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=900&auto=format&fit=crop' },
  { id: 'g5', title: 'Freshers Orientation 2025', album: 'Community', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=900&auto=format&fit=crop' },
  { id: 'g6', title: 'Research Symposium Poster Session', album: 'Research', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=900&auto=format&fit=crop' },
  { id: 'g7', title: 'Executive Panel Retreat', album: 'Community', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=900&auto=format&fit=crop' },
  { id: 'g8', title: 'Bootcamp 2025 — Group Photo', album: 'Reactor Physics Bootcamp', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=900&auto=format&fit=crop' },
]
