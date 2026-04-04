import React, { useState } from 'react';
import { Search, Eye, Heart, Clock, BookOpen } from 'lucide-react';
import { initialResources } from '../../data/mockData';
import { HealthResource } from '../../types';

export default function ResourceBrowser() {
  const [resources] = useState<HealthResource[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<HealthResource | null>(null);

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'general', label: 'General Wellness' },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Resources</h2>
        <p className="text-gray-600">Explore our comprehensive collection of wellness resources</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => setSelectedResource(resource)}
          />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}

      {/* Resource Detail Modal */}
      {selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </div>
  );
}

function ResourceCard({
  resource,
  onClick,
}: {
  resource: HealthResource;
  onClick: () => void;
}) {
  const categoryColors = {
    'mental-health': 'bg-purple-100 text-purple-700',
    fitness: 'bg-green-100 text-green-700',
    nutrition: 'bg-orange-100 text-orange-700',
    general: 'bg-blue-100 text-blue-700',
  };

  const categoryLabels = {
    'mental-health': 'Mental Health',
    fitness: 'Fitness',
    nutrition: 'Nutrition',
    general: 'General',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
    >
      <img
        src={resource.imageUrl}
        alt={resource.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              categoryColors[resource.category]
            }`}
          >
            {categoryLabels[resource.category]}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {resource.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} />
              {resource.likes}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {resource.date}
          </span>
        </div>
      </div>
    </div>
  );
}

function ResourceDetailModal({
  resource,
  onClose,
}: {
  resource: HealthResource;
  onClose: () => void;
}) {
  const categoryColors = {
    'mental-health': 'bg-purple-100 text-purple-700',
    fitness: 'bg-green-100 text-green-700',
    nutrition: 'bg-orange-100 text-orange-700',
    general: 'bg-blue-100 text-blue-700',
  };

  const categoryLabels = {
    'mental-health': 'Mental Health',
    fitness: 'Fitness',
    nutrition: 'Nutrition',
    general: 'General',
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                categoryColors[resource.category]
              }`}
            >
              {categoryLabels[resource.category]}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{resource.title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span>By {resource.author}</span>
            <span>•</span>
            <span>{resource.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {resource.views} views
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart size={16} />
              {resource.likes} likes
            </span>
          </div>
          <p className="text-lg text-gray-700 mb-6">{resource.description}</p>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{resource.content}</p>
          </div>
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Resource
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              <Heart size={18} />
              Like
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
