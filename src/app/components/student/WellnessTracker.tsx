import React, { useState } from 'react';
import { Activity, Moon, Droplets, Heart, TrendingUp, Plus, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WellnessEntry {
  date: string;
  mood: number;
  sleep: number;
  exercise: number;
  water: number;
  stress: number;
}

export default function WellnessTracker() {
  const [entries, setEntries] = useState<WellnessEntry[]>([
    { date: '2026-02-15', mood: 7, sleep: 7, exercise: 30, water: 6, stress: 4 },
    { date: '2026-02-16', mood: 8, sleep: 8, exercise: 45, water: 8, stress: 3 },
    { date: '2026-02-17', mood: 6, sleep: 6, exercise: 20, water: 5, stress: 6 },
    { date: '2026-02-18', mood: 9, sleep: 8, exercise: 60, water: 9, stress: 2 },
    { date: '2026-02-19', mood: 7, sleep: 7, exercise: 40, water: 7, stress: 4 },
    { date: '2026-02-20', mood: 8, sleep: 8, exercise: 50, water: 8, stress: 3 },
    { date: '2026-02-21', mood: 9, sleep: 9, exercise: 45, water: 10, stress: 2 },
  ]);

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [todayEntry, setTodayEntry] = useState<WellnessEntry>({
    date: new Date().toISOString().split('T')[0],
    mood: 5,
    sleep: 7,
    exercise: 0,
    water: 0,
    stress: 5,
  });

  const latestEntry = entries[entries.length - 1];
  const averages = {
    mood: Math.round(entries.reduce((sum, e) => sum + e.mood, 0) / entries.length),
    sleep: Math.round(entries.reduce((sum, e) => sum + e.sleep, 0) / entries.length),
    exercise: Math.round(entries.reduce((sum, e) => sum + e.exercise, 0) / entries.length),
    water: Math.round(entries.reduce((sum, e) => sum + e.water, 0) / entries.length),
  };

  const handleAddEntry = () => {
    setEntries([...entries, todayEntry]);
    setShowAddEntry(false);
    setTodayEntry({
      date: new Date().toISOString().split('T')[0],
      mood: 5,
      sleep: 7,
      exercise: 0,
      water: 0,
      stress: 5,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wellness Tracker</h2>
          <p className="text-gray-600">Monitor your daily wellness metrics and track your progress</p>
        </div>
        <button
          onClick={() => setShowAddEntry(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Log Today
        </button>
      </div>

      {/* Today's Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Mood"
          value={`${latestEntry.mood}/10`}
          icon={Heart}
          color="pink"
          average={averages.mood}
        />
        <MetricCard
          title="Sleep"
          value={`${latestEntry.sleep}h`}
          icon={Moon}
          color="purple"
          average={averages.sleep}
        />
        <MetricCard
          title="Exercise"
          value={`${latestEntry.exercise}min`}
          icon={Activity}
          color="green"
          average={averages.exercise}
        />
        <MetricCard
          title="Hydration"
          value={`${latestEntry.water} cups`}
          icon={Droplets}
          color="blue"
          average={averages.water}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood & Stress Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Mood & Stress Levels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={entries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [`${value}/10`, '']}
              />
              <Line type="monotone" dataKey="mood" stroke="#ec4899" strokeWidth={2} name="Mood" />
              <Line type="monotone" dataKey="stress" stroke="#f97316" strokeWidth={2} name="Stress" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep & Exercise */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sleep & Exercise</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={entries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Bar dataKey="sleep" fill="#9333ea" name="Sleep (hours)" />
              <Bar dataKey="exercise" fill="#22c55e" name="Exercise (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SummaryItem
            label="Average Mood"
            value={`${averages.mood}/10`}
            trend="+12%"
            positive={true}
          />
          <SummaryItem
            label="Average Sleep"
            value={`${averages.sleep}h`}
            trend="+5%"
            positive={true}
          />
          <SummaryItem
            label="Total Exercise"
            value={`${entries.reduce((sum, e) => sum + e.exercise, 0)}min`}
            trend="+18%"
            positive={true}
          />
          <SummaryItem
            label="Daily Water"
            value={`${averages.water} cups`}
            trend="+8%"
            positive={true}
          />
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar size={28} />
                Log Today's Wellness
              </h2>
              <div className="space-y-6">
                <SliderInput
                  label="Mood"
                  value={todayEntry.mood}
                  onChange={(value) => setTodayEntry({ ...todayEntry, mood: value })}
                  min={1}
                  max={10}
                  unit="/10"
                  color="pink"
                />
                <SliderInput
                  label="Sleep"
                  value={todayEntry.sleep}
                  onChange={(value) => setTodayEntry({ ...todayEntry, sleep: value })}
                  min={0}
                  max={12}
                  unit="hours"
                  color="purple"
                />
                <SliderInput
                  label="Exercise"
                  value={todayEntry.exercise}
                  onChange={(value) => setTodayEntry({ ...todayEntry, exercise: value })}
                  min={0}
                  max={120}
                  step={5}
                  unit="minutes"
                  color="green"
                />
                <SliderInput
                  label="Water Intake"
                  value={todayEntry.water}
                  onChange={(value) => setTodayEntry({ ...todayEntry, water: value })}
                  min={0}
                  max={15}
                  unit="cups"
                  color="blue"
                />
                <SliderInput
                  label="Stress Level"
                  value={todayEntry.stress}
                  onChange={(value) => setTodayEntry({ ...todayEntry, stress: value })}
                  min={1}
                  max={10}
                  unit="/10"
                  color="orange"
                />
              </div>
              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  onClick={handleAddEntry}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Entry
                </button>
                <button
                  onClick={() => setShowAddEntry(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  color,
  average,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  average: number;
}) {
  const colorClasses = {
    pink: 'bg-pink-100 text-pink-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className={`inline-flex p-2 rounded-lg mb-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">Avg: {average}</p>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  trend,
  positive,
}: {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
}) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <div className={`flex items-center justify-center gap-1 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
        <TrendingUp size={14} />
        {trend}
      </div>
    </div>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  color,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  color: string;
}) {
  const colorClasses = {
    pink: 'accent-pink-600',
    purple: 'accent-purple-600',
    green: 'accent-green-600',
    blue: 'accent-blue-600',
    orange: 'accent-orange-600',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-lg font-bold text-gray-900">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${colorClasses[color as keyof typeof colorClasses]}`}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
