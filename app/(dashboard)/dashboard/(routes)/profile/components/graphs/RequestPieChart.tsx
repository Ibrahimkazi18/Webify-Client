import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import renderActiveShape from './CustomActiveShape';

const COLORS = ['#0088FE', '#00C49F'];

interface CustomActiveShapeProps {
  requests: number;
  websites: number;
}

const CustomActiveShapePieChart = ({ requests, websites }: CustomActiveShapeProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    console.log('isClient set to true');
  }, []);

  const data = [
    { name: "Pending", value: requests },
    { name: "Completed", value: websites }
  ];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomActiveShapePieChart;
