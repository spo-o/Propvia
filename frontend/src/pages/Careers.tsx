import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Building2, Upload, Mail, Phone, User, Briefcase, Book, Code, Brain, Check, MapPin, Users, TrendingUp, Heart } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

interface CareerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  message: string;
}

export default function Careers() {
  const showToast = useToastStore(state => state.showToast);
  const [resume, setResume] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CareerFormData>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setResume(acceptedFiles[0]);
    }
  });

  const onSubmit = async (data: CareerFormData) => {
    try {
      // Create form data
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (resume) {
        formData.append('resume', resume);
      }

      // In a real application, you would send this to your server
      // For now, we'll simulate sending an email
      const emailBody = `
        New Job Application
        ------------------
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        Phone: ${data.phone}
        Role: ${data.role}
        Experience: ${data.experience}
        Message: ${data.message}
      `;

      // Send email using mailto
      window.location.href = `mailto:hello@propvia.com?subject=Job Application - ${data.role}&body=${encodeURIComponent(emailBody)}`;

      showToast('Application submitted successfully!', 'success');
      reset();
      setResume(null);
    } catch (error) {
      showToast('Error submitting application', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-700 via-brand to-brand-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-brand-900/80"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-semibold rounded-full text-sm backdrop-blur-sm border border-accent/30">
                🚀 Join Our Mission
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Build the Future of{' '}
              <span className="text-accent bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Property Tech
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Help us revolutionize commercial real estate analysis through innovative technology and AI-powered insights.
            </p>
          </div>
        </div>
      </div>

      {/* Company Culture Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">Why Work With Us?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join a team that's passionate about transforming Detroit's urban landscape
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand">Growth Focused</h3>
                <p className="text-gray-600">Continuous learning and career development opportunities</p>
              </div>
              
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand">Collaborative</h3>
                <p className="text-gray-600">Work with talented, passionate team members</p>
              </div>
              
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand">Meaningful Work</h3>
                <p className="text-gray-600">Make a real impact on Detroit's community development</p>
              </div>
              
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand">Detroit Based</h3>
                <p className="text-gray-600">Be part of the Motor City's tech renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Open Positions */}
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-600 rounded-xl flex items-center justify-center mr-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand">Open Positions</h2>
                </div>
                
                <div className="space-y-6">{[
                  {
                    title: 'Senior Software Engineer',
                    icon: Code,
                    type: 'Full-time',
                    location: 'Detroit, MI',
                    description: 'Build and maintain our core platform features using modern web technologies',
                    requirements: ['React & TypeScript', 'Node.js & Express', 'PostgreSQL', '3+ years experience'],
                    salary: '$80k - $120k'
                  },
                  {
                    title: 'Lead Data Scientist',
                    icon: Brain,
                    type: 'Full-time',
                    location: 'Detroit, MI',
                    description: 'Develop cutting-edge ML models for property analysis and market prediction',
                    requirements: ['Python & TensorFlow', 'Statistical Analysis', 'SQL & BigQuery', '4+ years experience'],
                    salary: '$90k - $140k'
                  },
                  {
                    title: 'Product Manager',
                    icon: Briefcase,
                    type: 'Full-time',
                    location: 'Detroit, MI / Remote',
                    description: 'Lead product strategy and development for our AI-powered platform',
                    requirements: ['Product Management', 'Agile Methodologies', 'Real Estate Knowledge', '4+ years experience'],
                    salary: '$85k - $130k'
                  },
                  {
                    title: 'Technical Content Writer',
                    icon: Book,
                    type: 'Contract',
                    location: 'Remote',
                    description: 'Create engaging content about real estate technology and market insights',
                    requirements: ['Technical Writing', 'SEO Optimization', 'Real Estate Knowledge', '2+ years experience'],
                    salary: '$50k - $70k'
                  }
                ].map((position, index) => (
                  <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <position.icon className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-brand mb-1">{position.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">{position.type}</span>
                            <span>{position.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-brand">{position.salary}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{position.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 text-sm">Requirements:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {position.requirements.map((req, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}</div>
              </div>

              {/* Application Form */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 h-fit sticky top-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand">Apply Now</h3>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('firstName', { required: 'First name is required' })}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm"
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('lastName', { required: 'Last name is required' })}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm"
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required', 
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                        })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        {...register('phone', { required: 'Phone is required' })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        {...register('role', { required: 'Please select a role' })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm appearance-none bg-white"
                      >
                        <option value="">Select a position</option>
                        <option value="Senior Software Engineer">Senior Software Engineer</option>
                        <option value="Lead Data Scientist">Lead Data Scientist</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Technical Content Writer">Technical Content Writer</option>
                      </select>
                    </div>
                    {errors.role && (
                      <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                    <div className="relative">
                      <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        {...register('experience', { required: 'Please select experience level' })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm appearance-none bg-white"
                      >
                        <option value="">Years of experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    {errors.experience && (
                      <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm resize-none"
                      placeholder="Tell us why you'd be a great fit for our team..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Resume</label>
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all duration-300"
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">
                        {resume ? (
                          <span className="text-green-600">✓ {resume.name}</span>
                        ) : (
                          'Drop your resume here or click to browse'
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-brand to-brand-600 text-white font-bold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}