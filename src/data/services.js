// Services data for Ideon - Professional version
export const services = [
    {
        id: 'web-development',
        icon: 'webDev',
        title: 'Web Development',
        description: 'Modern, responsive web applications built with the latest technologies. From landing pages to complex web apps.',
        techStack: ['React', 'Next.js', 'Node.js', 'MongoDB']
    },
    {
        id: 'mobile-apps',
        icon: 'mobile',
        title: 'Mobile Applications',
        description: 'Cross-platform mobile apps with native-like performance. We build for both iOS and Android.',
        techStack: ['Flutter', 'React Native', 'Firebase']
    },
    {
        id: 'ai-ml',
        icon: 'ai',
        title: 'AI / ML Projects',
        description: 'Intelligent solutions powered by machine learning. From chatbots to predictive analytics.',
        techStack: ['Python', 'TensorFlow', 'OpenAI', 'Gemini']
    },
    {
        id: 'backend-systems',
        icon: 'backend',
        title: 'Backend Systems',
        description: 'Scalable backend architectures and APIs. Database design, authentication, and cloud deployment.',
        techStack: ['Node.js', 'Python', 'PostgreSQL', 'AWS']
    },
    {
        id: 'academic-projects',
        icon: 'academic',
        title: 'Academic Projects',
        description: 'Complete project solutions for college submissions. Mini, major, and final year projects.',
        techStack: ['Full Stack', 'Documentation', 'Deployment']
    },
    {
        id: 'ui-ux',
        icon: 'design',
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive user interfaces. Modern design principles with attention to user experience.',
        techStack: ['Figma', 'Prototyping', 'Design Systems']
    }
];

export const getServiceById = (id) => {
    return services.find(service => service.id === id);
};
