import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import { ArrowUpRight, ArrowDownRight, Wallet, History, CheckCircle2 } from 'lucide-react';

const portfolioData = [
  { name: 'Bonds', value: 40000, color: '#1d4ed8' },
  { name: 'Mutual Funds', value: 35000, color: '#3b82f6' },
  { name: 'FDs', value: 15000, color: '#60a5fa' },
  { name: 'ETFs', value: 10000, color: '#93c5fd' },
];

const recentOrders = [
  { id: 'ORD-001', product: 'HDFC Bank Senior Bond', date: '2024-03-10', amount: 10000, status: 'Completed' },
  { id: 'ORD-002', product: 'Axis Bluechip Fund', date: '2024-03-08', amount: 5000, status: 'Processing' },
  { id: 'ORD-003', product: 'SBI Tax Saving FD', date: '2024-02-28', amount: 15000, status: 'Completed' },
];

export const Dashboard = () => {
  const totalValue = portfolioData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Portfolio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Summary Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Investment Value</p>
                <h2 className="text-3xl font-bold text-gray-900">{formatCurrency(totalValue)}</h2>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <ArrowUpRight size={16} /> +12.5% Returns
              </div>
            </div>
            
            <div className="h-64 w-full flex items-center">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={portfolioData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {portfolioData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip formatter={(value: number) => formatCurrency(value)} />
                 </PieChart>
               </ResponsiveContainer>
               <div className="ml-8 space-y-2">
                 {portfolioData.map(item => (
                   <div key={item.name} className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                     <span className="text-sm text-gray-600">{item.name}</span>
                     <span className="text-sm font-semibold text-gray-900 ml-auto">{formatCurrency(item.value)}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-blue-700 p-6 rounded-xl text-white shadow-lg shadow-blue-200">
              <Wallet className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="text-lg font-bold mb-2">Add Funds</h3>
              <p className="text-blue-100 text-sm mb-4">Top up your wallet to invest instantly.</p>
              <button className="w-full bg-white text-blue-700 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                Add Money
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold mb-4">KYC Status</h3>
              <div className="flex items-center gap-3 text-green-600 bg-green-50 p-3 rounded-lg">
                <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="font-bold text-sm">Verified</p>
                  <p className="text-xs text-green-700">You are ready to invest</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <History size={20} className="text-gray-400" /> Recent Transactions
            </h3>
            <button className="text-blue-700 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 font-medium">{formatCurrency(order.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        order.status === 'Completed' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      )}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
