export const trainingModules: { [key: string]: any } = {
  culture: {
    id: 'culture',
    icon: '🎯',
    title: 'Company Culture 101',
    duration: '30 min',
    slides: [
      {
        title: 'Welcome to Our Culture',
        subtitle: 'Understanding what makes us unique',
        content: [
          {
            type: 'text',
            text: 'Welcome to AI for Everyone! Our culture is the foundation of everything we do. It shapes how we work, collaborate, and democratize AI technology for the world.'
          },
          {
            type: 'highlight',
            icon: '💡',
            title: 'Our Mission',
            text: 'To make artificial intelligence accessible, understandable, and beneficial for everyone - from students to enterprises, regardless of technical background.'
          },
          {
            type: 'text',
            text: 'In this module, you\'ll learn about our core values, work environment, and the principles that guide our daily decisions as we revolutionize AI education and implementation.'
          }
        ]
      },
      {
        title: 'Our Core Values',
        subtitle: 'The principles that drive us',
        content: [
          {
            type: 'text',
            text: 'Our values aren\'t just words on a wall - they\'re the compass that guides every decision we make as we democratize AI.'
          },
          {
            type: 'card-grid',
            cards: [
              {
                icon: '🌍',
                title: 'Accessibility',
                description: 'We make AI understandable and usable for everyone, regardless of technical expertise.'
              },
              {
                icon: '🚀',
                title: 'Innovation',
                description: 'We push boundaries in AI education and create tools that empower users.'
              },
              {
                icon: '🤝',
                title: 'Collaboration',
                description: 'We believe diverse perspectives create the best AI solutions for humanity.'
              },
              {
                icon: '⚖️',
                title: 'Responsible AI',
                description: 'We build ethical, transparent, and fair AI systems that benefit society.'
              }
            ]
          },
          {
            type: 'text',
            text: 'These values inform how we interact with each other, our users, and the global AI community we serve.'
          }
        ]
      }
    ]
  },

  tools: {
    id: 'tools',
    icon: '🛠️',
    title: 'Tools & Systems',
    duration: '45 min',
    slides: [
      {
        title: 'Your AI Toolkit',
        subtitle: 'Essential tools for AI development',
        content: [
          {
            type: 'text',
            text: 'Welcome to your AI toolkit! These tools will help you build, collaborate, and democratize AI technology.'
          },
          {
            type: 'highlight',
            icon: '🔑',
            title: 'Getting Started',
            text: 'You should have received login credentials for all AI tools and platforms. If not, reach out to IT support immediately!'
          }
        ]
      }
    ]
  },

  team: {
    id: 'team',
    icon: '👥',
    title: 'Working with Your Team',
    duration: '25 min',
    slides: [
      {
        title: 'Welcome to the AI Team',
        subtitle: 'Collaboration in AI development',
        content: [
          {
            type: 'text',
            text: 'Great AI doesn\'t happen in isolation. It\'s built on collaboration, diverse perspectives, and shared learning.'
          },
          {
            type: 'highlight',
            icon: '🎯',
            title: 'Our AI Team Philosophy',
            text: 'We build AI together. Every model is a team effort, every breakthrough is celebrated collectively, every ethical concern is addressed together.'
          }
        ]
      }
    ]
  },

  role: {
    id: 'role',
    icon: '🚀',
    title: 'Role-Specific Training',
    duration: '60 min',
    slides: [
      {
        title: 'Your AI Role & Impact',
        subtitle: 'What success looks like in your position',
        content: [
          {
            type: 'text',
            text: 'Welcome to your AI role training! This module helps you understand how you contribute to democratizing AI for everyone.'
          },
          {
            type: 'highlight',
            icon: '🎯',
            title: 'Your AI Impact',
            text: 'Every role at AI for Everyone is crucial. Your work directly helps make AI accessible and beneficial for millions of users worldwide.'
          }
        ]
      }
    ]
  }
};
