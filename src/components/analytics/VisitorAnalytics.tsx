
import React, { useState, useEffect } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp } from 'lucide-react';

const VisitorAnalytics: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [dailyData, setDailyData] = useState([
    { day: 'Sen', visitors: 45 },
    { day: 'Sel', visitors: 52 },
    { day: 'Rab', visitors: 38 },
    { day: 'Kam', visitors: 67 },
    { day: 'Jum', visitors: 84 },
    { day: 'Sab', visitors: 91 },
    { day: 'Min', visitors: 73 }
  ]);

  useEffect(() => {
    // Get visitor count from localStorage or initialize
    const stored = localStorage.getItem('visitorCount');
    const currentCount = stored ? parseInt(stored) : 1247;
    
    // Increment count for new visit (simple implementation)
    const newCount = currentCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem('visitorCount', newCount.toString());
  }, []);

  const chartConfig = {
    visitors: {
      label: "Pengunjung",
      color: "#0F766E",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-islamic-navy/20">
      {/* Visitor Counter */}
      <div className="bg-islamic-navy/5 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="text-islamic-gold" size={16} />
          <h4 className="font-display text-sm font-medium text-islamic-navy">Statistik Pengunjung</h4>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-islamic-slate">Total:</span>
            <span className="font-bold text-sm text-islamic-teal">{visitorCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-islamic-slate">Hari Ini:</span>
            <span className="font-semibold text-xs text-islamic-navy">127</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-islamic-slate">
            <TrendingUp size={10} className="text-green-500" />
            <span className="text-xs">+15%</span>
          </div>
        </div>
      </div>

      {/* Visitor Chart */}
      <div className="bg-islamic-navy/5 rounded-lg p-3">
        <h4 className="font-display text-sm font-medium text-islamic-navy mb-2">7 Hari Terakhir</h4>
        <ChartContainer config={chartConfig} className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <YAxis hide />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'rgba(15, 118, 110, 0.1)' }}
              />
              <Bar 
                dataKey="visitors" 
                fill="var(--color-visitors)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default VisitorAnalytics;
