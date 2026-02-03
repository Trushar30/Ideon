// Project data for the portfolio - Professional version
export const projects = [
    {
        id: 'agriconnect',
        title: 'Agri Connect',
        subtitle: 'Farmers Marketplace',
        status: 'deployed',
        category: 'mobile',
        featured: true,
        thumbnail: '/Projects/AgriConnect/Home.jpg',
        problem: 'Farmers often struggle to get fair prices for their produce due to the involvement of multiple middlemen in the supply chain. On the other hand, consumers pay higher prices and often lack information about the source of their food.',
        description: 'Agri Connect is a transformative mobile platform designed to effectively deconstruct the traditional agricultural supply chain. By removing middlemen, the platform ensures that farmers receive fair compensation for their hard work while consumers get access to fresh, organic produce at reasonable prices.',
        features: [
            'Multilingual System (English, Hindi, Gujarati)',
            'Role-Based Interfaces for Farmers and Consumers',
            'Real-time Dashboard Analytics',
            'Inventory Control with Image Uploads',
            'Order Fulfillment Workflow',
            'Smart Discovery with Category Filtering',
            'NGO Donation Module'
        ],
        techStack: [
            { name: 'Flutter', color: '#02569B' },
            { name: 'Dart', color: '#0175C2' },
            { name: 'Supabase', color: '#3ECF8E' },
            { name: 'PostgreSQL', color: '#4169E1' },
            { name: 'Provider', color: '#FF7043' }
        ],
        screenshots: [
            { src: '/Projects/AgriConnect/Home.jpg', alt: 'Home Screen' },
            { src: '/Projects/AgriConnect/Products.jpg', alt: 'Products Listing' },
            { src: '/Projects/AgriConnect/Order.jpg', alt: 'Order Management' },
            { src: '/Projects/AgriConnect/Profile.jpg', alt: 'User Profile' }
        ],
        demoLink: 'https://drive.google.com/drive/folders/19nWJHweTjhogcyqt6xxbqKAUEKoUxeN5',
        architecture: 'Built on a scalable MVVM (Model-View-ViewModel) architecture, leveraging Flutter for the frontend and Supabase for the backend with real-time capabilities.',
        hackathon: 'Odoo x Gujarat Vidhyapith Hackathon \'25',
        team: 'Team FarmFusion'
    },
    {
        id: 'examsprint',
        title: 'Exam Sprint',
        subtitle: 'AI-Powered Study Assistant',
        status: 'prototype',
        category: 'mobile',
        featured: true,
        thumbnail: '/Projects/ExamSprint/home.jpg',
        problem: 'Students struggle with effective exam preparation, lacking personalized study plans and AI-powered tools to help them understand complex topics quickly.',
        description: 'Exam Sprint is an intelligent mobile application that helps students prepare for exams efficiently using AI-powered summaries, question generation, and personalized study schedules.',
        features: [
            'AI-Powered Topic Summaries',
            'Smart Question Generation',
            'Personalized Study Plans',
            'Progress Tracking Dashboard',
            'Firebase Authentication',
            'Real-time Sync'
        ],
        techStack: [
            { name: 'Flutter', color: '#02569B' },
            { name: 'Gemini AI', color: '#8E44AD' },
            { name: 'Firebase', color: '#FFCA28' },
            { name: 'ChromaDB', color: '#00BCD4' }
        ],
        screenshots: [
            { src: '/Projects/ExamSprint/login.jpg', alt: 'Login Screen' },
            { src: '/Projects/ExamSprint/home.jpg', alt: 'Home Dashboard' },
            { src: '/Projects/ExamSprint/class.jpg', alt: 'Class Management' },
            { src: '/Projects/ExamSprint/ai.jpg', alt: 'AI Study Assistant' }
        ],
        demoLink: null,
        architecture: 'Clean architecture with separation of concerns, integrating Gemini AI for intelligent features and Firebase for backend services.',
        hackathon: null,
        team: null
    },
    {
        id: 'skipsmart',
        title: 'SkipSmart',
        subtitle: 'Attendance Bunk Calculator',
        status: 'deployed',
        category: 'mobile',
        featured: false,
        thumbnail: '/Projects/SkipSmart/Home.png',
        problem: 'Students need to track their attendance and calculate how many classes they can skip while maintaining the required attendance percentage.',
        description: 'SkipSmart is a clever attendance management app that helps students calculate safe bunking limits based on their timetable and holiday schedules.',
        features: [
            'Timetable Integration',
            'Holiday Calendar',
            'Bunk Limit Calculator',
            'Attendance Tracking',
            'Minimal UI Design'
        ],
        techStack: [
            { name: 'Flutter', color: '#02569B' },
            { name: 'Dart', color: '#0175C2' },
            { name: 'Local Storage', color: '#607D8B' }
        ],
        screenshots: [
            { src: '/Projects/SkipSmart/Login.jpg', alt: 'Login Screen' },
            { src: '/Projects/SkipSmart/Home.png', alt: 'Home Dashboard' },
            { src: '/Projects/SkipSmart/TimeTable.jpg', alt: 'Timetable View' }
        ],
        demoLink: null,
        architecture: 'Lightweight local-first architecture with efficient state management.',
        hackathon: null,
        team: null
    },
    {
        id: 'zeno',
        title: 'Zeno',
        subtitle: 'Digital Experiences Portfolio',
        status: 'deployed',
        category: 'web',
        featured: true,
        thumbnail: '/Projects/Zeno/home.png',
        problem: 'Designers and agencies need a stunning, modern platform to showcase their portfolio work and digital experiences in a way that reflects their design expertise and creativity.',
        description: 'Zeno is a premium design portfolio website featuring cutting-edge UI/UX work, showcasing digital experiences with minimalist aesthetics, spatial computing concepts, and modern design principles. Built with a focus on visual excellence and user experience.',
        features: [
            'Immersive Portfolio Showcase',
            'Minimalist & Brutalist Design Elements',
            'Spatial Computing Demonstrations',
            'Project Case Studies',
            'Responsive Design System',
            'Smooth Animations & Transitions'
        ],
        techStack: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Vite', color: '#646CFF' },
            { name: 'CSS3', color: '#1572B6' },
            { name: 'JavaScript', color: '#F7DF1E' }
        ],
        screenshots: [
            { src: '/Projects/Zeno/home.png', alt: 'Zeno Homepage' }
        ],
        demoLink: 'https://zeno.ideon2026.me',
        liveUrl: 'https://zeno.ideon2026.me',
        architecture: 'Modern frontend architecture with React and Vite, featuring advanced CSS animations, responsive layouts, and optimized performance for a premium user experience.',
        hackathon: null,
        team: null
    },
    {
        id: 'aura',
        title: 'Aura',
        subtitle: 'Winter 2026 Fashion Platform',
        status: 'deployed',
        category: 'web',
        featured: true,
        thumbnail: '/Projects/Aura/home.png',
        problem: 'Fashion brands need a cutting-edge digital presence that reflects their bold, futuristic vision while creating immersive shopping experiences for Gen-Z audiences.',
        description: 'AURA is a premium, futuristic fashion e-commerce platform showcasing modern streetwear and high-tech winter collections. Built with a cyberpunk-inspired UI featuring dark mode aesthetics, neon accents, and smooth animations that create an immersive brand experience.',
        features: [
            'Futuristic Techwear Collections',
            'Vapor Tech - Lightweight Puffers',
            'Core System - Premium Wool Coats',
            'Nebula Knits - Comfort Essentials',
            'Interactive Spatial UI Design',
            'Cyberpunk Terminal Aesthetics',
            'Smooth Framer Motion Animations'
        ],
        techStack: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Tailwind CSS', color: '#06B6D4' },
            { name: 'Framer Motion', color: '#FF0055' },
            { name: 'JavaScript', color: '#F7DF1E' }
        ],
        screenshots: [
            { src: '/Projects/Aura/home.png', alt: 'Aura Homepage - Winter x Gen-Z Hero' },
            { src: '/Projects/Aura/artifacts.png', alt: 'Aura Artifacts - Techwear Collections' },
            { src: '/Projects/Aura/manifesto.png', alt: 'Aura Manifesto - Brand Vision' }
        ],
        demoLink: 'https://aura-tau-two.vercel.app',
        liveUrl: 'https://aura-tau-two.vercel.app',
        architecture: 'Modern frontend architecture with React and Tailwind CSS, featuring Framer Motion animations, dark mode aesthetics with neon lime accents, and responsive layouts optimized for a premium fashion brand experience.',
        hackathon: null,
        team: null
    }
];

export const getProjectById = (id) => {
    return projects.find(project => project.id === id);
};

export const getFeaturedProjects = () => {
    return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category) => {
    if (!category || category === 'all') return projects;
    return projects.filter(project => project.category === category);
};
