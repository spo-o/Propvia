import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Building2, Upload, Mail, Phone, User, Briefcase, Book, Code, Brain, Check } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Help us revolutionize commercial real estate analysis through technology and innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Software Engineer',
                icon: Code,
                description: 'Build and maintain our core platform features',
                requirements: ['React', 'TypeScript', 'Node.js', '3+ years experience']
              },
              {
                title: 'Data Scientist',
                icon: Brain,
                description: 'Develop ML models for property analysis',
                requirements: ['Python', 'TensorFlow', 'SQL', '2+ years experience']
              },
              {
                title: 'Product Manager',
                icon: Briefcase,
                description: 'Lead product strategy and development',
                requirements: ['Product management', 'Agile', '4+ years experience']
              },
              {
                title: 'Content Writer',
                icon: Book,
                description: 'Create engaging real estate content',
                requirements: ['Content writing', 'SEO', '2+ years experience']
              }
            ].map((position, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <position.icon className="w-6 h-6 text-brand mr-3" />
                  <h3 className="text-xl font-semibold">{position.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{position.description}</p>
                <ul className="space-y-2">
                  {position.requirements.map((req, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Apply Now</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('firstName', { required: true })}
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('lastName', { required: true })}
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  {...register('phone', { required: true })}
                  className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role You're Applying For
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  {...register('role', { required: true })}
                  className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                >
                  <option value="">Select a role</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Content Writer">Content Writer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <div className="relative">
                <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  {...register('experience', { required: true })}
                  className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                >
                  <option value="">Select experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter / Additional Information
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume
              </label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-brand transition-colors"
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {resume ? resume.name : 'Drag & drop your resume, or click to select'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, or DOCX (max 5MB)
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}