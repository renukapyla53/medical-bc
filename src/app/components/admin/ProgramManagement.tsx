import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Calendar } from 'lucide-react';
import { initialPrograms } from '../../data/mockData';
import { WellnessProgram } from '../../types';

export default function ProgramManagement() {
  const [programs, setPrograms] = useState<WellnessProgram[]>(initialPrograms);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Wellness Programs</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          Add Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showAddModal && (
        <AddProgramModal
          onClose={() => setShowAddModal(false)}
          onAdd={(newProgram) => {
            setPrograms([...programs, newProgram]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

function ProgramCard({
  program,
  onDelete,
}: {
  program: WellnessProgram;
  onDelete: (id: string) => void;
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
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[program.type]}`}>
            {program.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[program.difficulty]}`}>
            {program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{program.description}</p>
        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
          <div>
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
              <Calendar size={14} />
              Duration
            </div>
            <p className="text-sm font-medium">{program.duration}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
              <Users size={14} />
              Participants
            </div>
            <p className="text-sm font-medium">{program.participants}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Sessions</p>
            <p className="text-sm font-medium">{program.sessions}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(program.id)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AddProgramModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (program: WellnessProgram) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'fitness' as WellnessProgram['type'],
    description: '',
    duration: '',
    difficulty: 'beginner' as WellnessProgram['difficulty'],
    sessions: 0,
    imageUrl: 'https://images.unsplash.com/photo-1600096040587-f609e25ad970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwd2VsbG5lc3MlMjBjb2xsZWdlfGVufDF8fHx8MTc3MTY2ODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProgram: WellnessProgram = {
      id: Date.now().toString(),
      ...formData,
      participants: 0,
    };
    onAdd(newProgram);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Program</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as WellnessProgram['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="fitness">Fitness</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as WellnessProgram['difficulty'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 30 days"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sessions</label>
                <input
                  type="number"
                  required
                  value={formData.sessions}
                  onChange={(e) => setFormData({ ...formData, sessions: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Program
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
