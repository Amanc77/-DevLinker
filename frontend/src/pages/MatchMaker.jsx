import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommunityCard from '../components/CommunityCard';

const MatchMaker = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    skillLevel: '',
    goals: [],
    preferredFormat: '',
    techStack: [],
    location: '',
  });
  const [showResults, setShowResults] = useState(false);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const goals = ['Learn new skills', 'Build projects', 'Network', 'Get job help', 'Mentorship'];
  const formats = ['Online', 'Local/In-person', 'Hybrid'];
  const techOptions = ['React', 'Node.js', 'Python', 'Vue', 'Angular', 'Django', 'Flask', 'Machine Learning'];

  const matchedCommunities = [
    {
      id: 1,
      name: 'React Developers',
      description: 'A vibrant community of React developers sharing knowledge, best practices, and helping each other grow.',
      members: '12.5k',
      tags: ['React', 'JavaScript', 'Frontend'],
      matchScore: 95,
    },
    {
      id: 2,
      name: 'Node.js Enthusiasts',
      description: 'Connect with Node.js developers worldwide. Share projects, get help, and learn together.',
      members: '8.3k',
      tags: ['Node.js', 'Backend', 'JavaScript'],
      matchScore: 88,
    },
    {
      id: 3,
      name: 'Python Learners',
      description: 'Perfect for beginners and experts alike. Learn Python, share code, and build amazing projects.',
      members: '15.2k',
      tags: ['Python', 'Programming', 'Learning'],
      matchScore: 92,
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleTechToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.skillLevel !== '';
      case 2:
        return formData.goals.length > 0;
      case 3:
        return formData.preferredFormat !== '';
      case 4:
        return formData.techStack.length > 0;
      default:
        return false;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => setShowResults(false)}
              className="flex items-center space-x-2 text-muted-dark dark:text-muted-dark hover:text-primary mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to questionnaire</span>
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Matched Communities
            </h1>
            <p className="text-muted-dark dark:text-muted-dark">
              Based on your preferences, we found {matchedCommunities.length} communities that match your profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-dark dark:text-muted-dark">
              Step {step} of 4
            </span>
            <span className="text-sm font-medium text-muted-dark dark:text-muted-dark">
              {Math.round((step / 4) * 100)}%
            </span>
          </div>
          <div className="w-full bg-dark-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What's your skill level?
              </h2>
              <p className="text-muted-dark dark:text-muted-dark mb-6">
                Help us find communities that match your experience level.
              </p>
              <div className="space-y-3">
                {skillLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleInputChange('skillLevel', level)}
                    className={`w-full text-left px-6 py-4 rounded-lg border transition-all ${
                      formData.skillLevel === level
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-dark-border text-gray-900 dark:text-white hover:border-primary/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What are your goals?
              </h2>
              <p className="text-muted-dark dark:text-muted-dark mb-6">
                Select all that apply. You can choose multiple options.
              </p>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`w-full text-left px-6 py-4 rounded-lg border transition-all ${
                      formData.goals.includes(goal)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-dark-border text-gray-900 dark:text-white hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{goal}</span>
                      {formData.goals.includes(goal) && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Preferred format?
              </h2>
              <p className="text-muted-dark dark:text-muted-dark mb-6">
                How do you prefer to engage with communities?
              </p>
              <div className="space-y-3">
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => handleInputChange('preferredFormat', format)}
                    className={`w-full text-left px-6 py-4 rounded-lg border transition-all ${
                      formData.preferredFormat === format
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-dark-border text-gray-900 dark:text-white hover:border-primary/50'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your tech stack
              </h2>
              <p className="text-muted-dark dark:text-muted-dark mb-6">
                Select the technologies you work with or want to learn.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {techOptions.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleTechToggle(tech)}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      formData.techStack.includes(tech)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-dark-border text-gray-900 dark:text-white hover:border-primary/50'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-border">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                step === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-dark-card dark:bg-dark-card border border-dark-border text-gray-900 dark:text-white hover:border-primary'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                canProceed()
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'opacity-50 cursor-not-allowed bg-gray-400'
              }`}
            >
              {step === 4 ? 'Find Matches' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchMaker;

