import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Briefcase, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather dashboard with interactive maps and forecasts',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'Tailwind CSS', 'Git', 'Docker', 'AWS', 'REST APIs', 'GraphQL'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-4">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Developer Portfolio</h1>
        <p className="text-lg text-gray-600 mb-6">Full-Stack Web Developer</p>

        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>
      </div>

      <Card title="About Me" className="mb-8">
        <p className="text-gray-700 leading-relaxed">
          Passionate full-stack developer with expertise in modern web technologies.
          I specialize in building scalable, user-friendly applications using React, Node.js,
          and cloud technologies. With a strong focus on clean code and best practices,
          I strive to create solutions that make a difference.
        </p>
      </Card>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} hoverable className="overflow-hidden p-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Project
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card title="Skills & Technologies">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-gray-800 font-medium rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      <Card className="mt-8">
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
          <p className="text-gray-600 mb-6">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Button size="lg">
            <Mail className="w-5 h-5 mr-2" />
            Get in Touch
          </Button>
        </div>
      </Card>
    </div>
  );
};
