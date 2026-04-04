import React, { useState } from 'react';
import { Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import { initialPrograms } from '../../data/mockData';
import { WellnessProgram } from '../../types';

export default function ProgramBrowser() {
  const [programs] = useState<WellnessProgram[]>(initialPrograms);
  const [enrolledPrograms, setEnrolledPrograms] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = [
    { value: 'all', label: 'All Programs' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  const filteredPrograms = programs.filter((program) => {
    return selectedType === 'all' || program.type === selectedType;
  });

  const handleEnroll = (programId: string) => {
    if (enrolledPrograms.includes(programId)) {
      setEnrolledPrograms(enrolledPrograms.filter((id) => id !== programId));
    } else {
      setEnrolledPrograms([...enrolledPrograms, programId]);
    }
  };

  const myEnrolledPrograms = programs.filter((p) => enrolledPrograms.includes(p.id));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wellness Programs</h2>
        <p className="text-gray-600">Join structured programs to achieve your wellness goals</p>
      </div>

      {/* My Enrolled Programs */}
      {myEnrolledPrograms.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">My Enrolled Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEnrolledPrograms.map((program) => (
              <EnrolledProgramCard
                key={program.id}
                program={program}
                onUnenroll={() => handleEnroll(program.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Programs */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Available Programs</h3>
        
        {/* Type Filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {types.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isEnrolled={enrolledPrograms.includes(program.id)}
              onEnroll={() => handleEnroll(program.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramCard({
  program,
  isEnrolled,
  onEnroll,
}: {
  program: WellnessProgram;
  isEnrolled: boolean;
  onEnroll: () => void;
}) {
  const typeColors = {
    'mental-health': 'bg-purple-100 text-purple-700',
    fitness: 'bg-green-100 text-green-700',
    nutrition: 'bg-orange-100 text-orange-700',
    lifestyle: 'bg-blue-100 text-blue-700',
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={program.imageUrl}
        alt={program.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[program.type]}`}>
            {program.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[program.difficulty]}`}>
            {program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{program.description}</p>
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="flex flex-col">
            <span className="text-gray-500 flex items-center gap-1">
              <Calendar size={12} />
              Duration
            </span>
            <span className="font-medium text-gray-900">{program.duration}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 flex items-center gap-1">
              <Users size={12} />
              Participants
            </span>
            <span className="font-medium text-gray-900">{program.participants}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Sessions</span>
            <span className="font-medium text-gray-900">{program.sessions}</span>
          </div>
        </div>
        <button
          onClick={onEnroll}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
            isEnrolled
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
}

function EnrolledProgramCard({
  program,
  onUnenroll,
}: {
  program: WellnessProgram;
  onUnenroll: () => void;
}) {
  const [progress] = useState(Math.floor(Math.random() * 80) + 10);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm p-5 border-2 border-blue-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{program.name}</h3>
          <p className="text-sm text-gray-600">{program.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
        </div>
        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
          <CheckCircle size={20} />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-500">Duration</span>
            <p className="font-medium text-gray-900">{program.duration}</p>
          </div>
          <div>
            <span className="text-gray-500">Sessions</span>
            <p className="font-medium text-gray-900">{program.sessions}</p>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Continue
          </button>
          <button
            onClick={onUnenroll}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Unenroll
          </button>
        </div>
      </div>
    </div>
  );
}
