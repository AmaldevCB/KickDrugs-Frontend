import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { getCatApi, getGenderApi } from '../services/allApi';



function DashboardCharts() {

  const [gender, setgender] = useState([])
  const renderLabel = ({ name, value }) => `${name} ${value}`;
  const total = gender.reduce((sum, entry) => sum + entry.value, 0);
  const renderLegend = (value, entry, index) => {
    const percent = ((gender[index].value / total) * 100).toFixed(1);
    return `${value} (${percent}%)`;
  };


  const [category, setCategory] = useState([])
  const catTotal = category.reduce((sum, item) => sum + item.value, 0);
  const catLegend = category.map(item=>({
    ...item,
    percentage:((item.value/catTotal)*100).toFixed(1)+'%'
  }))

  const COLORS = ['#00BF63', '#F6BA23', '#5271FF'];

  const getData = async ()=>{
    const result = await getGenderApi()
    setgender(result.data)
    console.log(gender);

    const res = await getCatApi()
    setCategory(res.data)
    console.log(category);
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <div className="container mt-3">
      <div className="row g-4">
        {/* Gender Details */}
        <div className="col-md-5">
          <div id='box' >
            <div id='innerBox' className="p-md-4">
              <h5 className="text-center text-success fw-bold mb-4">Gender Details</h5>
              <ResponsiveContainer width="100%" height={300}>
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
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend formatter={renderLegend} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Registration Category */}
        <div className="col-md-7">
          <div id='box'>
            <div id='innerBox' className="p-md-4 ">
              <h5 className="text-center text-success fw-bold mb-4">Registration Category</h5>
              <ResponsiveContainer className='w-100' height={300}>
                <BarChart data={category} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend
                    payload={catLegend.map((item, index) => ({
                      value: `${item.name} (${item.percentage})`,
                      type: 'circle',
                      id: item.name,
                      color: COLORS[index]
                    }))}
                  />                  
                  <Bar dataKey="value" fill="#00C49F">
                    {catLegend.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
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

export default DashboardCharts
