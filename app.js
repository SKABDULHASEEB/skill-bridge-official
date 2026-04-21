/* ============================================
   SKILL BRIDGE — Application Logic
   ============================================ */

// ==========================================
// DATA
// ==========================================
const DATA = {
  subjects: [
    {
      id: 'cse',
      name: 'Computer Science',
      short: 'CSE',
      emoji: '💻',
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
      desc: 'Software, algorithms, AI, and more',
      specializations: [
        {
          id: 'ai',
          name: 'Artificial Intelligence',
          emoji: '🤖',
          desc: 'Machine learning, deep learning & neural networks',
          courses: {
            basics: [
              { name: 'Machine Learning by Andrew Ng', platform: 'YouTube', platformColor: '#ef4444', classes: 112, desc: 'Comprehensive intro to ML concepts, supervised and unsupervised learning.', url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I', type: 'free', emoji: '🎬' },
              { name: 'Deep Learning Crash Course', platform: 'freeCodeCamp', platformColor: '#10b981', classes: 24, desc: 'Neural networks, CNNs, RNNs explained with Python examples.', url: 'https://www.freecodecamp.org', type: 'free', emoji: '📚' },
              { name: 'AI Fundamentals', platform: 'Khan Academy', platformColor: '#3b82f6', classes: 45, desc: 'Build a strong foundation in artificial intelligence concepts.', url: 'https://www.khanacademy.org', type: 'free', emoji: '🎓' },
            ],
            pro: [
              { name: 'Deep Learning Specialization', platform: 'Coursera', platformColor: '#3b82f6', classes: 80, desc: '5-course specialization covering neural networks, CNNs, sequence models.', url: 'https://www.coursera.org/specializations/deep-learning', price: '₹3,499/mo', duration: '5 months', type: 'paid', emoji: '🎯' },
              { name: 'Machine Learning Engineer', platform: 'Udacity', platformColor: '#06b6d4', classes: 120, desc: 'Nanodegree covering production ML pipelines and deployment.', url: 'https://www.udacity.com', price: '₹24,999', duration: '4 months', type: 'paid', emoji: '🚀' },
              { name: 'AI for Everyone', platform: 'Udemy', platformColor: '#a855f7', classes: 56, desc: 'Practical AI applications with hands-on projects and modern tools.', url: 'https://www.udemy.com', price: '₹449', duration: '2 months', type: 'paid', emoji: '💡' },
            ],
            certifications: [
              { name: 'TensorFlow Developer Certificate', platform: 'Google', platformColor: '#f59e0b', classes: 40, desc: 'Official Google certification for TensorFlow proficiency.', url: 'https://www.tensorflow.org/certificate', type: 'cert', emoji: '🏆' },
              { name: 'AWS Machine Learning Specialty', platform: 'AWS', platformColor: '#f59e0b', classes: 65, desc: 'Validate expertise in building, training, and deploying ML models on AWS.', url: 'https://aws.amazon.com/certification/', type: 'cert', emoji: '☁️' },
              { name: 'Microsoft AI Engineer Associate', platform: 'Microsoft', platformColor: '#3b82f6', classes: 50, desc: 'Design and implement AI solutions on Azure platform.', url: 'https://learn.microsoft.com/en-us/certifications/', type: 'cert', emoji: '🔷' },
            ]
          }
        },
        {
          id: 'ds',
          name: 'Data Science',
          emoji: '📊',
          desc: 'Analytics, visualization & big data processing',
          courses: {
            basics: [
              { name: 'Data Science Full Course', platform: 'YouTube', platformColor: '#ef4444', classes: 96, desc: 'Complete data science bootcamp covering Python, Pandas, and visualization.', url: 'https://www.youtube.com/results?search_query=data+science+full+course', type: 'free', emoji: '🎬' },
              { name: 'Statistics & Probability', platform: 'Khan Academy', platformColor: '#3b82f6', classes: 80, desc: 'Master the mathematical foundations required for data science.', url: 'https://www.khanacademy.org', type: 'free', emoji: '🎓' },
              { name: 'Python for Data Analysis', platform: 'freeCodeCamp', platformColor: '#10b981', classes: 32, desc: 'Learn data analysis with Python, NumPy, and Pandas.', url: 'https://www.freecodecamp.org', type: 'free', emoji: '📚' },
            ],
            pro: [
              { name: 'IBM Data Science Professional', platform: 'Coursera', platformColor: '#3b82f6', classes: 90, desc: 'Professional certificate with hands-on labs and real-world projects.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '6 months', type: 'paid', emoji: '🎯' },
              { name: 'Data Scientist Nanodegree', platform: 'Udacity', platformColor: '#06b6d4', classes: 110, desc: 'Industry-aligned curriculum with mentor support and project reviews.', url: 'https://www.udacity.com', price: '₹29,999', duration: '4 months', type: 'paid', emoji: '🚀' },
            ],
            certifications: [
              { name: 'Google Data Analytics', platform: 'Google', platformColor: '#f59e0b', classes: 40, desc: 'Entry-level professional certificate for aspiring data analysts.', url: 'https://grow.google/certificates/data-analytics/', type: 'cert', emoji: '🏆' },
              { name: 'Microsoft Power BI Analyst', platform: 'Microsoft', platformColor: '#3b82f6', classes: 45, desc: 'Demonstrate your ability to create data-driven business insights.', url: 'https://learn.microsoft.com', type: 'cert', emoji: '🔷' },
            ]
          }
        },
        {
          id: 'cybersec',
          name: 'Cyber Security',
          emoji: '🔐',
          desc: 'Ethical hacking, cryptography & network security',
          courses: {
            basics: [
              { name: 'Ethical Hacking for Beginners', platform: 'YouTube', platformColor: '#ef4444', classes: 72, desc: 'Learn penetration testing, network scanning, and vulnerability assessment.', url: 'https://www.youtube.com/results?search_query=ethical+hacking+beginners', type: 'free', emoji: '🎬' },
              { name: 'Cyber Security Fundamentals', platform: 'Cisco Networking Academy', platformColor: '#10b981', classes: 50, desc: 'Comprehensive intro to cybersecurity concepts and practices.', url: 'https://www.netacad.com', type: 'free', emoji: '🌐' },
              { name: 'Cryptography Basics', platform: 'Khan Academy', platformColor: '#3b82f6', classes: 30, desc: 'Understand encryption, hashing, and digital signatures.', url: 'https://www.khanacademy.org', type: 'free', emoji: '🎓' },
            ],
            pro: [
              { name: 'CompTIA Security+ Prep', platform: 'Udemy', platformColor: '#a855f7', classes: 88, desc: 'Complete preparation for the CompTIA Security+ certification exam.', url: 'https://www.udemy.com', price: '₹649', duration: '3 months', type: 'paid', emoji: '💡' },
              { name: 'Google Cybersecurity Certificate', platform: 'Coursera', platformColor: '#3b82f6', classes: 95, desc: 'Professional certificate program designed by Google security experts.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '6 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'CompTIA Security+', platform: 'CompTIA', platformColor: '#ef4444', classes: 60, desc: 'Globally recognized baseline certification for IT security.', url: 'https://www.comptia.org/certifications/security', type: 'cert', emoji: '🛡️' },
              { name: 'Certified Ethical Hacker (CEH)', platform: 'EC-Council', platformColor: '#f59e0b', classes: 55, desc: 'Prove your ethical hacking and penetration testing skills.', url: 'https://www.eccouncil.org', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'webdev',
          name: 'Web Development',
          emoji: '🌐',
          desc: 'Frontend, backend & full-stack development',
          courses: {
            basics: [
              { name: 'HTML, CSS, JS Full Course', platform: 'YouTube', platformColor: '#ef4444', classes: 140, desc: 'Build responsive websites from scratch with modern web technologies.', url: 'https://www.youtube.com/results?search_query=web+development+full+course', type: 'free', emoji: '🎬' },
              { name: 'Responsive Web Design', platform: 'freeCodeCamp', platformColor: '#10b981', classes: 60, desc: 'Earn a certification while learning responsive web design principles.', url: 'https://www.freecodecamp.org', type: 'free', emoji: '📚' },
              { name: 'JavaScript Algorithms', platform: 'freeCodeCamp', platformColor: '#10b981', classes: 75, desc: 'Master data structures and algorithms with JavaScript.', url: 'https://www.freecodecamp.org', type: 'free', emoji: '📚' },
            ],
            pro: [
              { name: 'The Complete Web Developer', platform: 'Udemy', platformColor: '#a855f7', classes: 200, desc: 'Zero to mastery: HTML, CSS, JS, React, Node.js, and databases.', url: 'https://www.udemy.com', price: '₹499', duration: '4 months', type: 'paid', emoji: '💡' },
              { name: 'Full-Stack Engineer', platform: 'Codecademy', platformColor: '#6366f1', classes: 150, desc: 'Career path covering frontend, backend, and deployment.', url: 'https://www.codecademy.com', price: '₹1,299/mo', duration: '6 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'Meta Front-End Developer', platform: 'Meta', platformColor: '#3b82f6', classes: 45, desc: 'Professional certificate to start your career as a front-end developer.', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', type: 'cert', emoji: '🏆' },
              { name: 'AWS Cloud Practitioner', platform: 'AWS', platformColor: '#f59e0b', classes: 40, desc: 'Foundational understanding of AWS cloud services.', url: 'https://aws.amazon.com/certification/', type: 'cert', emoji: '☁️' },
            ]
          }
        }
      ]
    },
    {
      id: 'ece',
      name: 'Electronics & Comm.',
      short: 'ECE',
      emoji: '📡',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
      desc: 'Circuits, signals, VLSI & communication',
      specializations: [
        {
          id: 'vlsi',
          name: 'VLSI Design',
          emoji: '🔌',
          desc: 'Chip design, Verilog, FPGA & semiconductor technology',
          courses: {
            basics: [
              { name: 'Digital Electronics Basics', platform: 'YouTube', platformColor: '#ef4444', classes: 60, desc: 'Learn logic gates, flip-flops, counters & digital circuit design.', url: 'https://www.youtube.com/results?search_query=digital+electronics', type: 'free', emoji: '🎬' },
              { name: 'Introduction to VLSI', platform: 'NPTEL', platformColor: '#f59e0b', classes: 40, desc: 'Comprehensive VLSI design course from IIT professors.', url: 'https://nptel.ac.in', type: 'free', emoji: '🎓' },
            ],
            pro: [
              { name: 'VLSI Physical Design', platform: 'Udemy', platformColor: '#a855f7', classes: 55, desc: 'Master VLSI physical design flow from RTL to GDSII.', url: 'https://www.udemy.com', price: '₹699', duration: '3 months', type: 'paid', emoji: '💡' },
            ],
            certifications: [
              { name: 'Cadence Certified Design Professional', platform: 'Cadence', platformColor: '#3b82f6', classes: 35, desc: 'Industry certification for EDA tool proficiency.', url: 'https://www.cadence.com', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'embedded',
          name: 'Embedded Systems',
          emoji: '🛠️',
          desc: 'Microcontrollers, IoT & real-time systems',
          courses: {
            basics: [
              { name: 'Arduino for Beginners', platform: 'YouTube', platformColor: '#ef4444', classes: 30, desc: 'Hands-on embedded programming with Arduino microcontrollers.', url: 'https://www.youtube.com/results?search_query=arduino+beginners', type: 'free', emoji: '🎬' },
              { name: 'Embedded C Programming', platform: 'NPTEL', platformColor: '#f59e0b', classes: 48, desc: 'Learn C programming specifically for embedded systems.', url: 'https://nptel.ac.in', type: 'free', emoji: '🎓' },
            ],
            pro: [
              { name: 'Mastering Embedded Linux', platform: 'Udemy', platformColor: '#a855f7', classes: 70, desc: 'Build production-grade embedded Linux systems from scratch.', url: 'https://www.udemy.com', price: '₹799', duration: '4 months', type: 'paid', emoji: '💡' },
            ],
            certifications: [
              { name: 'ARM Accredited Engineer', platform: 'ARM', platformColor: '#10b981', classes: 40, desc: 'Official ARM certification for embedded developers.', url: 'https://www.arm.com', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'signals',
          name: 'Signal Processing',
          emoji: '📶',
          desc: 'DSP, image processing & communication systems',
          courses: {
            basics: [
              { name: 'Signals & Systems', platform: 'YouTube', platformColor: '#ef4444', classes: 55, desc: 'Complete signals and systems course with examples.', url: 'https://www.youtube.com/results?search_query=signals+and+systems', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Digital Signal Processing', platform: 'Coursera', platformColor: '#3b82f6', classes: 60, desc: 'Advanced DSP techniques with MATLAB implementations.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '3 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'MathWorks Certified MATLAB', platform: 'MathWorks', platformColor: '#f59e0b', classes: 30, desc: 'Demonstrate MATLAB proficiency for signal processing.', url: 'https://www.mathworks.com', type: 'cert', emoji: '🏆' },
            ]
          }
        }
      ]
    },
    {
      id: 'mech',
      name: 'Mechanical Engg.',
      short: 'MECH',
      emoji: '⚙️',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      desc: 'Design, thermodynamics & manufacturing',
      specializations: [
        {
          id: 'cad',
          name: 'CAD/CAM Design',
          emoji: '📐',
          desc: 'SolidWorks, AutoCAD, CNC & 3D modeling',
          courses: {
            basics: [
              { name: 'AutoCAD Complete Tutorial', platform: 'YouTube', platformColor: '#ef4444', classes: 45, desc: '2D & 3D drafting fundamentals with AutoCAD.', url: 'https://www.youtube.com/results?search_query=autocad+tutorial', type: 'free', emoji: '🎬' },
              { name: 'SolidWorks for Beginners', platform: 'YouTube', platformColor: '#ef4444', classes: 38, desc: 'Learn 3D modeling and assembly design with SolidWorks.', url: 'https://www.youtube.com/results?search_query=solidworks+beginners', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Mastering SolidWorks', platform: 'Udemy', platformColor: '#a855f7', classes: 85, desc: 'From beginner to professional SolidWorks designer.', url: 'https://www.udemy.com', price: '₹599', duration: '3 months', type: 'paid', emoji: '💡' },
            ],
            certifications: [
              { name: 'CSWA Certification', platform: 'Dassault Systèmes', platformColor: '#3b82f6', classes: 25, desc: 'Certified SolidWorks Associate — industry standard certification.', url: 'https://www.solidworks.com/certifications', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'thermo',
          name: 'Thermodynamics',
          emoji: '🌡️',
          desc: 'Heat transfer, fluid mechanics & energy systems',
          courses: {
            basics: [
              { name: 'Thermodynamics Lectures', platform: 'NPTEL', platformColor: '#f59e0b', classes: 40, desc: 'Complete thermodynamics course by IIT professors.', url: 'https://nptel.ac.in', type: 'free', emoji: '🎓' },
              { name: 'Fluid Mechanics Basics', platform: 'YouTube', platformColor: '#ef4444', classes: 35, desc: 'Fluid statics, dynamics, and Bernoulli equation explained.', url: 'https://www.youtube.com/results?search_query=fluid+mechanics', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Advanced Thermodynamics', platform: 'Coursera', platformColor: '#3b82f6', classes: 50, desc: 'Deep dive into thermodynamic cycles and applications.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '3 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'ASME Certification', platform: 'ASME', platformColor: '#10b981', classes: 30, desc: 'Professional certification from the American Society of Mechanical Engineers.', url: 'https://www.asme.org', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'robotics',
          name: 'Robotics',
          emoji: '🦾',
          desc: 'Automation, kinematics & control systems',
          courses: {
            basics: [
              { name: 'Introduction to Robotics', platform: 'YouTube', platformColor: '#ef4444', classes: 40, desc: 'Robot kinematics, dynamics, and control fundamentals.', url: 'https://www.youtube.com/results?search_query=introduction+to+robotics', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Modern Robotics Specialization', platform: 'Coursera', platformColor: '#3b82f6', classes: 100, desc: 'Northwestern University\'s comprehensive robotics program.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '5 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'ROS Developer Certificate', platform: 'The Construct', platformColor: '#f59e0b', classes: 35, desc: 'Certified Robot Operating System developer.', url: 'https://www.theconstructsim.com', type: 'cert', emoji: '🏆' },
            ]
          }
        }
      ]
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      short: 'CIVIL',
      emoji: '🏗️',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      desc: 'Structures, surveying & construction',
      specializations: [
        {
          id: 'structural',
          name: 'Structural Engineering',
          emoji: '🏛️',
          desc: 'Structural analysis, RCC design & steel structures',
          courses: {
            basics: [
              { name: 'Structural Analysis', platform: 'NPTEL', platformColor: '#f59e0b', classes: 42, desc: 'Comprehensive course on structural analysis methods.', url: 'https://nptel.ac.in', type: 'free', emoji: '🎓' },
              { name: 'RCC Design Fundamentals', platform: 'YouTube', platformColor: '#ef4444', classes: 50, desc: 'Learn reinforced cement concrete design from basics.', url: 'https://www.youtube.com/results?search_query=rcc+design', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Advanced Structural Design', platform: 'Udemy', platformColor: '#a855f7', classes: 65, desc: 'Professional structural design with STAAD Pro and ETABS.', url: 'https://www.udemy.com', price: '₹699', duration: '3 months', type: 'paid', emoji: '💡' },
            ],
            certifications: [
              { name: 'PE Civil: Structural', platform: 'NCEES', platformColor: '#3b82f6', classes: 50, desc: 'Professional Engineer license for structural specialization.', url: 'https://ncees.org', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'geotech',
          name: 'Geotechnical Engg.',
          emoji: '🪨',
          desc: 'Soil mechanics, foundation design & earth sciences',
          courses: {
            basics: [
              { name: 'Soil Mechanics', platform: 'NPTEL', platformColor: '#f59e0b', classes: 38, desc: 'Soil properties, classification, and testing methods.', url: 'https://nptel.ac.in', type: 'free', emoji: '🎓' },
            ],
            pro: [
              { name: 'Foundation Engineering', platform: 'Udemy', platformColor: '#a855f7', classes: 45, desc: 'Design of shallow and deep foundations with practical examples.', url: 'https://www.udemy.com', price: '₹599', duration: '2 months', type: 'paid', emoji: '💡' },
            ],
            certifications: [
              { name: 'PE Civil: Geotechnical', platform: 'NCEES', platformColor: '#3b82f6', classes: 45, desc: 'Professional Engineer license for geotechnical specialization.', url: 'https://ncees.org', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'surveying',
          name: 'Surveying & GIS',
          emoji: '🗺️',
          desc: 'Land surveying, GPS technology & geographic systems',
          courses: {
            basics: [
              { name: 'Surveying Fundamentals', platform: 'YouTube', platformColor: '#ef4444', classes: 30, desc: 'Total station, leveling, and mapping techniques.', url: 'https://www.youtube.com/results?search_query=surveying+fundamentals', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'GIS & Remote Sensing', platform: 'Coursera', platformColor: '#3b82f6', classes: 55, desc: 'Master geographic information systems and spatial analysis.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '4 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'Esri ArcGIS Desktop', platform: 'Esri', platformColor: '#10b981', classes: 30, desc: 'Industry certification for GIS professionals.', url: 'https://www.esri.com/training/certification/', type: 'cert', emoji: '🏆' },
            ]
          }
        }
      ]
    },
    {
      id: 'eee',
      name: 'Electrical Engg.',
      short: 'EEE',
      emoji: '⚡',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #22d3ee)',
      desc: 'Power systems, machines & control',
      specializations: [
        {
          id: 'power',
          name: 'Power Systems',
          emoji: '🔋',
          desc: 'Power generation, transmission & distribution',
          courses: {
            basics: [
              { name: 'Power Systems Engineering', platform: 'NPTEL', platformColor: '#f59e0b', classes: 50, desc: 'Comprehensive course on power generation and distribution.', url: 'https://nptel.ac.in', type: 'free', emoji: '🎓' },
              { name: 'Electrical Circuits', platform: 'YouTube', platformColor: '#ef4444', classes: 45, desc: 'Circuit analysis, Kirchhoff\'s laws, and network theorems.', url: 'https://www.youtube.com/results?search_query=electrical+circuits', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Power Electronics Masterclass', platform: 'Udemy', platformColor: '#a855f7', classes: 68, desc: 'Converters, inverters, and motor drives in depth.', url: 'https://www.udemy.com', price: '₹699', duration: '3 months', type: 'paid', emoji: '💡' },
            ],
            certifications: [
              { name: 'PE Electrical: Power', platform: 'NCEES', platformColor: '#3b82f6', classes: 55, desc: 'Professional Engineer license for power engineering.', url: 'https://ncees.org', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'renewable',
          name: 'Renewable Energy',
          emoji: '☀️',
          desc: 'Solar, wind, and sustainable energy systems',
          courses: {
            basics: [
              { name: 'Solar Energy Basics', platform: 'YouTube', platformColor: '#ef4444', classes: 25, desc: 'Photovoltaic systems, solar panel design, and grid integration.', url: 'https://www.youtube.com/results?search_query=solar+energy+basics', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Renewable Energy Systems', platform: 'Coursera', platformColor: '#3b82f6', classes: 45, desc: 'Design and analyze renewable energy systems and microgrids.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '3 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'NABCEP Solar Associate', platform: 'NABCEP', platformColor: '#10b981', classes: 30, desc: 'Entry-level credential for solar energy professionals.', url: 'https://www.nabcep.org', type: 'cert', emoji: '🏆' },
            ]
          }
        }
      ]
    },
    {
      id: 'biotech',
      name: 'Biotechnology',
      short: 'BIO',
      emoji: '🧬',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      desc: 'Genetics, bioinformatics & bioengineering',
      specializations: [
        {
          id: 'genomics',
          name: 'Genomics',
          emoji: '🧪',
          desc: 'DNA sequencing, gene editing & molecular biology',
          courses: {
            basics: [
              { name: 'Molecular Biology Fundamentals', platform: 'YouTube', platformColor: '#ef4444', classes: 50, desc: 'DNA replication, transcription, and translation explained.', url: 'https://www.youtube.com/results?search_query=molecular+biology', type: 'free', emoji: '🎬' },
              { name: 'Genetics & Evolution', platform: 'Khan Academy', platformColor: '#3b82f6', classes: 60, desc: 'Comprehensive genetics course with interactive exercises.', url: 'https://www.khanacademy.org', type: 'free', emoji: '🎓' },
            ],
            pro: [
              { name: 'Genomic Data Science', platform: 'Coursera', platformColor: '#3b82f6', classes: 75, desc: 'Johns Hopkins specialization covering genomic technologies.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '5 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'Bioinformatics Certification', platform: 'ISCB', platformColor: '#10b981', classes: 40, desc: 'International Society for Computational Biology certification.', url: 'https://www.iscb.org', type: 'cert', emoji: '🏆' },
            ]
          }
        },
        {
          id: 'bioinfo',
          name: 'Bioinformatics',
          emoji: '💊',
          desc: 'Computational biology, drug discovery & proteomics',
          courses: {
            basics: [
              { name: 'Bioinformatics for Beginners', platform: 'YouTube', platformColor: '#ef4444', classes: 35, desc: 'Introduction to computational biology tools and databases.', url: 'https://www.youtube.com/results?search_query=bioinformatics+beginners', type: 'free', emoji: '🎬' },
            ],
            pro: [
              { name: 'Bioinformatics Specialization', platform: 'Coursera', platformColor: '#3b82f6', classes: 80, desc: 'UC San Diego\'s bioinformatics program with coding projects.', url: 'https://www.coursera.org', price: '₹3,499/mo', duration: '6 months', type: 'paid', emoji: '🎯' },
            ],
            certifications: [
              { name: 'NCBI Certified Analyst', platform: 'NCBI', platformColor: '#f59e0b', classes: 25, desc: 'Demonstrate proficiency with NCBI bioinformatics tools.', url: 'https://www.ncbi.nlm.nih.gov', type: 'cert', emoji: '🏆' },
            ]
          }
        }
      ]
    }
  ]
};

// ==========================================
// STATE
// ==========================================
let currentPage = 'home';
let currentSubject = null;
let currentSpec = null;
let currentTab = 'basics';
let navigationStack = [];

// ==========================================
// DOM REFERENCES
// ==========================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ==========================================
// INTRO ANIMATION
// ==========================================
function runIntro() {
  const introScreen = $('#intro-screen');
  const star = $('#star-element');
  const trail = $('#star-trail');
  const container = $('#shooting-star-container');
  const typedText = $('#typed-text');
  const flash = $('#flash-overlay');
  const flyingComet = $('#flying-comet');

  // Create background particles
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'intro-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 3 + 's';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    introScreen.appendChild(p);
  }

  // Phase 1: Type "Skill Bridge" text
  setTimeout(() => {
    typeText('Skill Bridge', typedText, 100, () => {
      typedText.classList.add('done');

      // Phase 2: Star shoots from left to right + trail grows behind it
      setTimeout(() => {
        star.classList.add('shoot');
        trail.classList.add('animate');

        // Spawn sparkle particles during the shooting
        let sparkleCount = 0;
        const sparkleInterval = setInterval(() => {
          if (sparkleCount > 12) {
            clearInterval(sparkleInterval);
            return;
          }
          const sparkle = document.createElement('div');
          sparkle.className = 'star-sparkle';
          // Position sparkle along the trail path
          const progress = sparkleCount / 12;
          sparkle.style.left = (progress * 300) + 'px';
          sparkle.style.top = (35 + (Math.random() - 0.5) * 20) + 'px';
          sparkle.style.animationDelay = (Math.random() * 0.2) + 's';
          container.appendChild(sparkle);
          // Remove after animation
          setTimeout(() => sparkle.remove(), 1000);
          sparkleCount++;
        }, 120);

        // After shooting finishes, settle into idle pulse
        setTimeout(() => {
          star.classList.remove('shoot');
          star.classList.add('arrived');
          trail.classList.remove('animate');
          trail.classList.add('glow-pulse');
        }, 1600);
      }, 400);

      // Phase 3: Show flying comet at the intro center, then fly to home page
      setTimeout(() => {
        // Position comet at the center of the shooting-star-container
        const containerRect = container.getBoundingClientRect();
        flyingComet.style.top = (containerRect.top + containerRect.height / 2 - 11) + 'px';
        flyingComet.style.left = (containerRect.left + containerRect.width / 2 - 60) + 'px';
        flyingComet.classList.add('visible');

        // Flash overlay
        flash.classList.add('flash');

        setTimeout(() => {
          // Start fading out the intro
          introScreen.classList.add('fade-out');

          setTimeout(() => {
            // Hide intro, show app
            introScreen.style.display = 'none';
            $('#app').classList.remove('hidden');
            renderHome();

            // Wait a frame for layout, then fly comet to its landing spot
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const landing = $('#comet-landing');
                if (landing) {
                  const landingRect = landing.getBoundingClientRect();
                  flyingComet.style.top = (landingRect.top + landingRect.height / 2 - 11) + 'px';
                  flyingComet.style.left = (landingRect.left + landingRect.width / 2 - 60) + 'px';
                  flyingComet.classList.add('fly-to-home');
                }

                // After flight completes, settle into gentle float
                setTimeout(() => {
                  flyingComet.classList.remove('visible', 'fly-to-home');
                  flyingComet.classList.add('settled');
                }, 1300);
              });
            });
          }, 1300);
        }, 400);
      }, 2800);
    });
  }, 800);
}

function typeText(text, el, speed, callback) {
  let i = 0;
  const orangeEnd = 5; // "Skill" = 5 chars
  function type() {
    if (i < text.length) {
      const char = text[i];
      const span = document.createElement('span');
      span.textContent = char;
      if (i < orangeEnd) {
        span.style.color = '#ff8c00';
      } else {
        span.style.color = '#ffffff';
      }
      el.appendChild(span);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// ==========================================
// NAVIGATION
// ==========================================
function navigateTo(page, options = {}) {
  // Hide all pages
  $$('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = $(`#page-${page}`);
  if (target) {
    target.classList.add('active');

    // Breadcrumb management
    if (page === 'home') {
      target.classList.remove('with-breadcrumb');
      $('#breadcrumb').classList.add('hidden');
      $('#back-btn').classList.add('hidden');
      navigationStack = [];
    } else {
      target.classList.add('with-breadcrumb');
      $('#breadcrumb').classList.remove('hidden');
      $('#back-btn').classList.remove('hidden');
    }
  }

  currentPage = page;

  // Update bottom nav
  $$('.nav-item').forEach(n => n.classList.remove('active'));
  if (page === 'home') {
    $('#nav-home').classList.add('active');
  }

  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  if (navigationStack.length > 0) {
    const prev = navigationStack.pop();
    if (prev.page === 'home') {
      navigateTo('home');
    } else if (prev.page === 'specializations') {
      showSpecializations(prev.subjectId, false);
    } else if (prev.page === 'learning') {
      showLearning(prev.subjectId, prev.specId, false);
    }
  } else {
    navigateTo('home');
  }
}

function updateBreadcrumb(crumbs) {
  const container = $('#breadcrumb-text');
  container.innerHTML = '';
  crumbs.forEach((c, i) => {
    const span = document.createElement('span');
    span.className = 'crumb' + (i === crumbs.length - 1 ? ' active' : '');
    span.textContent = c;
    container.appendChild(span);
    if (i < crumbs.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'crumb-sep';
      sep.textContent = '›';
      container.appendChild(sep);
    }
  });
}

// ==========================================
// RENDER HOME
// ==========================================
function renderHome() {
  const grid = $('#subjects-grid');
  grid.innerHTML = '';

  DATA.subjects.forEach(subject => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `subject-${subject.id}`;
    card.innerHTML = `
      <div class="card-bg-glow" style="background: ${subject.gradient}"></div>
      <div>
        <div class="card-emoji">${subject.emoji}</div>
        <div class="card-title">${subject.name}</div>
        <div class="card-subtitle">${subject.desc}</div>
      </div>
      <div class="card-arrow">→</div>
    `;
    card.addEventListener('click', (e) => {
      createRipple(e, card);
      setTimeout(() => {
        navigationStack.push({ page: 'home' });
        showSpecializations(subject.id);
      }, 200);
    });
    grid.appendChild(card);
  });

  // Search
  const searchInput = $('#search-input');
  searchInput.value = '';
  searchInput.removeEventListener('input', handleSearch);
  searchInput.addEventListener('input', handleSearch);
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const grid = $('#subjects-grid');

  if (!query) {
    renderHome();
    return;
  }

  const filtered = DATA.subjects.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.short.toLowerCase().includes(query) ||
    s.desc.toLowerCase().includes(query) ||
    s.specializations.some(sp => sp.name.toLowerCase().includes(query))
  );

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1;">
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">No subjects found for "${e.target.value}"</div>
      </div>
    `;
    return;
  }

  filtered.forEach(subject => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-bg-glow" style="background: ${subject.gradient}"></div>
      <div>
        <div class="card-emoji">${subject.emoji}</div>
        <div class="card-title">${subject.name}</div>
        <div class="card-subtitle">${subject.desc}</div>
      </div>
      <div class="card-arrow">→</div>
    `;
    card.addEventListener('click', (e) => {
      createRipple(e, card);
      setTimeout(() => {
        navigationStack.push({ page: 'home' });
        showSpecializations(subject.id);
      }, 200);
    });
    grid.appendChild(card);
  });
}

// ==========================================
// RENDER SPECIALIZATIONS
// ==========================================
function showSpecializations(subjectId, pushStack = true) {
  const subject = DATA.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  currentSubject = subject;

  if (pushStack === true) {
    // Already pushed in caller
  }

  navigateTo('specializations');
  updateBreadcrumb(['Home', subject.name]);

  $('#spec-icon').textContent = subject.emoji;
  $('#spec-title').textContent = subject.name;
  $('#spec-desc').textContent = subject.desc;

  const grid = $('#specializations-grid');
  grid.innerHTML = '';

  subject.specializations.forEach(spec => {
    const card = document.createElement('div');
    card.className = 'card spec-card';
    card.id = `spec-${spec.id}`;
    card.innerHTML = `
      <div class="card-bg-glow" style="background: ${subject.gradient}"></div>
      <div class="card-emoji">${spec.emoji}</div>
      <div class="spec-card-info">
        <div class="card-title">${spec.name}</div>
        <div class="card-subtitle">${spec.desc}</div>
      </div>
      <div class="card-arrow">→</div>
    `;
    card.addEventListener('click', (e) => {
      createRipple(e, card);
      setTimeout(() => {
        navigationStack.push({ page: 'specializations', subjectId: subject.id });
        showLearning(subject.id, spec.id);
      }, 200);
    });
    grid.appendChild(card);
  });
}

// ==========================================
// RENDER LEARNING SECTIONS
// ==========================================
function showLearning(subjectId, specId, pushStack = true) {
  const subject = DATA.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  const spec = subject.specializations.find(sp => sp.id === specId);
  if (!spec) return;

  currentSubject = subject;
  currentSpec = spec;
  currentTab = 'basics';

  navigateTo('learning');
  updateBreadcrumb(['Home', subject.name, spec.name]);

  $('#learning-title').textContent = spec.name;
  $('#learning-desc').textContent = spec.desc;

  // Setup tabs
  $$('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.tab === 'basics') tab.classList.add('active');
  });

  renderCourses('basics');

  // Tab event listeners (remove old ones by cloning)
  $$('.tab').forEach(tab => {
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    newTab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      newTab.classList.add('active');
      currentTab = newTab.dataset.tab;
      renderCourses(currentTab);
    });
  });
}

function renderCourses(tab) {
  const container = $('#courses-container');
  container.innerHTML = '';

  if (!currentSpec || !currentSpec.courses[tab]) return;

  const courses = currentSpec.courses[tab];

  if (courses.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">📭</div>
        <div class="no-results-text">No courses available yet</div>
      </div>
    `;
    return;
  }

  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.id = `course-${course.name.replace(/\s+/g, '-').toLowerCase()}`;

    const badgeClass = course.type === 'free' ? 'badge-free' : course.type === 'paid' ? 'badge-paid' : 'badge-cert';
    const badgeText = course.type === 'free' ? 'FREE' : course.type === 'paid' ? course.price : 'CERT';

    let metaHTML = `
      <span class="course-meta-item">📚 ${course.classes} classes</span>
    `;
    if (course.duration) {
      metaHTML += `<span class="meta-dot"></span><span class="course-meta-item">⏱️ ${course.duration}</span>`;
    }

    card.innerHTML = `
      <div class="course-thumb" style="background: ${currentSubject.gradient}">
        <span>${course.emoji}</span>
      </div>
      <div class="course-info">
        <span class="course-platform" style="background: ${course.platformColor}22; color: ${course.platformColor}">${course.platform}</span>
        <div class="course-name">${course.name}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-meta">
          ${metaHTML}
          <span class="meta-dot"></span>
          <span class="course-badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      createRipple(e, card);
      setTimeout(() => {
        showRedirect(course);
      }, 250);
    });

    container.appendChild(card);
  });
}

// ==========================================
// REDIRECT PAGE
// ==========================================
function showRedirect(course) {
  navigateTo('redirect');
  $('#breadcrumb').classList.add('hidden');
  $('#back-btn').classList.add('hidden');

  // Hide bottom nav during redirect
  $('#bottom-nav').style.display = 'none';

  const msg = $('#redirect-message');
  msg.textContent = `We are moving to the original site of ${course.platform}`;

  const bar = $('#redirect-bar');
  bar.style.width = '0%';

  // Start progress
  requestAnimationFrame(() => {
    bar.style.width = '100%';
  });

  // Redirect after 3 seconds
  setTimeout(() => {
    window.open(course.url, '_blank');
    // Go back to learning after redirect
    setTimeout(() => {
      $('#bottom-nav').style.display = 'flex';
      goBack();
    }, 500);
  }, 3000);
}

// ==========================================
// RIPPLE EFFECT
// ==========================================
function createRipple(e, el) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

// ==========================================
// EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Start intro
  runIntro();

  // Back button
  $('#back-btn').addEventListener('click', goBack);

  // Bottom nav
  $('#nav-home').addEventListener('click', () => {
    navigationStack = [];
    navigateTo('home');
    renderHome();
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $('#nav-home').classList.add('active');
  });

  $('#nav-explore').addEventListener('click', () => {
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $('#nav-explore').classList.add('active');
    // Focus search
    navigateTo('home');
    renderHome();
    setTimeout(() => {
      $('#search-input').focus();
    }, 300);
  });

  $('#nav-favorites').addEventListener('click', () => {
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $('#nav-favorites').classList.add('active');
  });

  $('#nav-profile').addEventListener('click', () => {
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $('#nav-profile').classList.add('active');
  });
});
