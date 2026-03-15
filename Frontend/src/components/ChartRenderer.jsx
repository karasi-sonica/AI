import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ChartRenderer = ({ chartType, data }) => {
  if (!data || data.length === 0) return <div className="text-gray-500 italic">No data available for chart.</div>;

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(26, 27, 34, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#f1f5f9', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }} 
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(26, 27, 34, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#f1f5f9', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }} 
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(26, 27, 34, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#f1f5f9', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }} 
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              innerRadius={60}
              paddingAngle={2}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return <p className="text-red-500">Unsupported chart type: {chartType}</p>;
    }
  };

  return (
    <div className="w-full h-80 min-h-[320px] mt-6 mb-4 bg-[#14151a]/50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartRenderer;
