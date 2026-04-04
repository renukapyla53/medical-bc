import React from 'react';
import { Brain, Dumbbell, Apple, Heart, ArrowRight, TrendingUp } from 'lucide-react';

type StudentTab = 'home' | 'resources' | 'programs' | 'support' | 'tracker';

export default function StudentHome({ onNavigate }: { onNavigate: (tab: StudentTab) => void }) {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to Your Wellness Hub</h2>
        <p className="text-lg text-blue-50 mb-6">
          Access comprehensive health resources, join wellness programs, and track your progress
        </p>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => onNavigate('resources')}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Browse Resources
          </button>
          <button
            onClick={() => onNavigate('programs')}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Join Programs
          </button>
        </div>
      </div>

      {/* Quick Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Explore by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard
            title="Mental Health"
            description="Stress management, mindfulness, counseling"
            icon={Brain}
            color="purple"
            onClick={() => onNavigate('resources')}
          />
          <CategoryCard
            title="Fitness"
            description="Exercise programs, yoga, sports activities"
            icon={Dumbbell}
            color="green"
            onClick={() => onNavigate('programs')}
          />
          <CategoryCard
            title="Nutrition"
            description="Meal planning, healthy recipes, dietary advice"
            icon={Apple}
            color="orange"
            onClick={() => onNavigate('resources')}
          />
          <CategoryCard
            title="General Wellness"
            description="Sleep hygiene, lifestyle tips, self-care"
            icon={Heart}
            color="pink"
            onClick={() => onNavigate('tracker')}
          />
        </div>
      </div>

      {/* Featured Resources */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Featured Resources</h3>
          <button
            onClick={() => onNavigate('resources')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeaturedCard
            title="Managing Stress and Anxiety"
            category="Mental Health"
            views={1234}
            imageUrl="https://images.unsplash.com/photo-1764192114257-ae9ecf97eb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3MlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzE2NjM1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          />
          <FeaturedCard
            title="Yoga for Beginners"
            category="Fitness"
            views={892}
            imageUrl="https://images.unsplash.com/photo-1641971215245-b4ac37f97bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIweW9nYSUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3MTYwNDAzMnww&ixlib=rb-4.1.0&q=80&w=1080"
          />
          <FeaturedCard
            title="Nutrition Guide for Students"
            category="Nutrition"
            views={756}
            imageUrl="https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbnV0cml0aW9uJTIwZm9vZHxlbnwxfHx8fDE3NzE2NTIxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Track Your Progress</h4>
              <p className="text-sm text-gray-600">Monitor your wellness journey</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('tracker')}
            className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
          >
            Open Wellness Tracker
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Heart size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Need Support?</h4>
              <p className="text-sm text-gray-600">Connect with our wellness team</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('support')}
            className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            Access Support Services
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    green: 'bg-green-100 text-green-600 hover:bg-green-200',
    orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
    pink: 'bg-pink-100 text-pink-600 hover:bg-pink-200',
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all text-left group"
    >
      <div className={`inline-flex p-3 rounded-lg mb-4 transition-colors ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon size={24} />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}

function FeaturedCard({
  title,
  category,
  views,
  imageUrl,
}: {
  title: string;
  category: string;
  views: number;
  imageUrl: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600">{category}</span>
        <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-xs text-gray-500 mt-2">{views.toLocaleString()} views</p>
      </div>
    </div>
  );
}
