import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, LabelList
} from 'recharts';
import { getCatApi, getGenderApi } from '../services/allApi';

function DashboardCharts() {
  const [gender, setGender] = useState([]);
  const [category, setCategory] = useState([]);

  const COLORS = ['#00BF63', '#F6BA23', '#5271FF'];

  const totalGender = gender.reduce((sum, entry) => sum + entry.value, 0);
  const renderLegend = (value, entry, index) => {
    const percent = totalGender ? ((gender[index].value / totalGender) * 100).toFixed(1) : 0;
    return `${value} (${percent}%)`;
  };

  const totalCategory = category.reduce((sum, item) => sum + item.value, 0);
  const catLegend = category.map(item => ({
    ...item,
    percentage: totalCategory ? ((item.value / totalCategory) * 100).toFixed(1) + '%' : '0%'
  }));

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const genderResult = await getGenderApi();
        setGender(genderResult.data);

        const catResult = await getCatApi();
        setCategory(catResult.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row g-4">
        <div className="col-md-5">
          <div id="box">
            <div id="innerBox" className="p-md-4 px-0">
              <h5 className="text-center text-success fw-bold mb-4">Gender Details</h5>
              <div style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
                <ResponsiveContainer width="100%" height={300} className="no-focus" tabIndex={-1}>
                  <PieChart>
                    <Pie
                      data={gender}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={renderLabel}
                    >
                      {gender.map((entry, index) => (
                        <Cell key={`gender-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend formatter={renderLegend} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div id="box">
            <div id="innerBox" className="p-md-4">
              <h5 className="text-center text-success fw-bold mb-4">Registration Category</h5>
              <ResponsiveContainer className="w-100" height={300}>
                <BarChart data={category} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend
                    payload={catLegend.map((item, index) => ({
                      value: `${item.name} (${item.percentage})`,
                      type: 'circle',
                      id: item.name,
                      color: COLORS[index % COLORS.length]
                    }))}
                  />
                  <Bar dataKey="value" fill="#00C49F">
                    {catLegend.map((entry, index) => (
                      <Cell key={`cat-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <LabelList dataKey="value" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;
