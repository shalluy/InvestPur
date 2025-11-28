import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Info, CheckCircle2, Clock, TrendingUp, AlertTriangle, Calendar, ChevronRight, Minus, Plus, FileText, Download } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { products, providers } from '../data/mockData';
import { formatCurrency, formatPercentage, cn } from '../lib/utils';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const provider = providers.find(p => p.id === product?.providerId);
  
  // State for calculator
  const [units, setUnits] = useState(1);
  const [activeTab, setActiveTab] = useState('highlights');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  const unitPrice = product.minInvestment;
  const investmentAmount = units * unitPrice;
  // Simplified return calculation: Investment + (Investment * Yield * (Tenure/12))
  // If tenure is missing, assume 1 year for calculation display
  const tenureYears = (product.tenureMonths || 12) / 12;
  const totalReturns = investmentAmount + (investmentAmount * (product.expectedYield || 0) / 100 * tenureYears);
  
  const raised = product.raisedAmount || 0;
  const goal = product.totalGoal || raised * 2 || 10000000;
  const progressPercentage = Math.min(100, Math.round((raised / goal) * 100));

  const handleInvest = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <Link to="/explore" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium">
          <ArrowLeft size={16} className="mr-1" /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN - Product Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {provider && (
                      <div className="w-14 h-14 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden bg-white shadow-sm">
                        <img src={provider.logo} alt={provider.name} className="w-10 h-10 object-contain" />
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{provider?.name || product.title}</h1>
                      <p className="text-sm text-gray-500">{product.title}</p>
                    </div>
                  </div>
                  
                  {product.creditRating && (
                     <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                           <div className="relative w-8 h-4 overflow-hidden">
                             {/* Simple gauge visual */}
                             <div className="absolute bottom-0 w-8 h-8 rounded-full border-4 border-t-transparent border-l-green-500 border-r-green-500 border-b-green-500 opacity-20"></div>
                             <div className="absolute bottom-0 w-8 h-8 rounded-full border-4 border-transparent border-t-green-600 transform -rotate-45"></div>
                           </div>
                           <div className="text-right">
                             <span className="block text-xs text-gray-400 font-medium uppercase">Rating</span>
                             <span className="block text-sm font-bold text-gray-900">{product.creditRating}</span>
                           </div>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1">Moderate Risk</span>
                     </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs uppercase font-semibold mb-1">
                      YTM <Info size={12} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatPercentage(product.expectedYield || 0)}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs uppercase font-semibold mb-1">
                      Remaining Tenure
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{product.tenureMonths} Months</div>
                  </div>
                   <div className="hidden md:block">
                    <div className="flex items-center gap-1 text-gray-500 text-xs uppercase font-semibold mb-1">
                      Min Investment
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(product.minInvestment)}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                   <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                         <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Clock size={10} /> Sell Anytime
                         </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                         <span className="text-blue-700">{formatCurrency(raised).replace('₹', '')}</span> 
                         <span className="text-gray-400"> / {formatCurrency(goal).replace('₹', '')}</span>
                      </div>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                   </div>
                   <div className="text-right text-xs text-gray-500 font-medium">{progressPercentage}% Completed</div>
                </div>
              </div>
            </div>

            {/* Info Grid: Reasons & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Reasons to Invest */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reasons to Invest</h3>
                     <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                  <ul className="space-y-4">
                     {product.reasonsToInvest?.map((reason, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                           <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-gray-300"></div>
                           <p className="text-sm text-gray-600 leading-relaxed">{reason}</p>
                        </li>
                     )) || (
                        <li className="text-sm text-gray-500">Detailed investment reasons loading...</li>
                     )}
                  </ul>
                  <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">See more</button>
               </div>

               {/* Key Highlights */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Highlights</h3>
                     <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                     {product.keyHighlights?.map((highlight, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                           <p className={cn(
                              "text-xl font-bold mb-1",
                              highlight.color === 'green' ? 'text-green-600' : 
                              highlight.color === 'purple' ? 'text-purple-600' : 'text-blue-600'
                           )}>
                              {highlight.value}
                           </p>
                           <p className="text-xs font-bold text-gray-700 uppercase mb-1">{highlight.label}</p>
                           {highlight.subtext && <p className="text-xs text-gray-500">{highlight.subtext}</p>}
                        </div>
                     )) || (
                        <div className="text-sm text-gray-500">Highlights loading...</div>
                     )}
                  </div>
               </div>
            </div>

            {/* Repayment Structure */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Repayment Structure</h3>
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex gap-8">
                     <div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded uppercase">Interest</span>
                        <p className="text-sm font-medium text-gray-900 mt-1">{product.repaymentSchedule?.interest || 'Monthly'}</p>
                     </div>
                     <div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded uppercase">Principal</span>
                        <p className="text-sm font-medium text-gray-900 mt-1">{product.repaymentSchedule?.principal || 'Monthly'}</p>
                     </div>
                  </div>
                  <button className="w-full sm:w-auto bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                     View Returns Schedule
                  </button>
               </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-8">
               <div className="flex overflow-x-auto gap-6 border-b border-gray-200 pb-1 no-scrollbar">
                  {['Deal Highlights', 'Key Strengths', 'About The Issuer', 'Risks and Other Disclosures'].map((tab) => {
                     const id = tab.toLowerCase().replace(/ /g, '-');
                     const isActive = activeTab === id || (id === 'deal-highlights' && activeTab === 'highlights');
                     return (
                        <button
                           key={id}
                           onClick={() => setActiveTab(id)}
                           className={cn(
                              "whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors",
                              isActive ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                           )}
                        >
                           {tab}
                        </button>
                     );
                  })}
               </div>
               
               <div className="py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Deal Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-blue-50 p-6 rounded-xl flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-blue-600">
                           <TrendingUp size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">High Yield</h3>
                        <p className="text-sm text-gray-600">Superior returns compared to traditional fixed deposits.</p>
                     </div>
                     <div className="bg-green-50 p-6 rounded-xl flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-green-600">
                           <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Secured Asset</h3>
                        <p className="text-sm text-gray-600">Backed by tangible assets or government guarantees.</p>
                     </div>
                     <div className="bg-purple-50 p-6 rounded-xl flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-purple-600">
                           <Clock size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Short Tenure</h3>
                        <p className="text-sm text-gray-600">Optimal maturity periods for better liquidity management.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sticky Invest Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg sticky top-24 p-6">
               <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Invest now</h2>
                  <div className="text-right">
                     <p className="text-sm font-bold text-gray-900">{formatCurrency(unitPrice)} / Unit</p>
                     <p className="text-xs text-gray-500">Purchase Amount</p>
                  </div>
               </div>

               {/* Calculation Display */}
               <div className="flex items-center justify-between mb-6 relative">
                  <div>
                     <p className="text-xs text-gray-500 mb-1">Investment</p>
                     <p className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 border-dashed pb-1 inline-block">
                        {formatCurrency(investmentAmount)}
                     </p>
                  </div>
                  <div className="bg-green-100 rounded-full p-1 text-green-600 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                     <TrendingUp size={16} />
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-gray-500 mb-1">Returns</p>
                     <p className="text-lg font-bold text-green-600 border-b-2 border-green-200 border-dashed pb-1 inline-block">
                        {formatCurrency(totalReturns)}
                     </p>
                  </div>
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -z-0"></div>
               </div>

               {/* Unit Selector */}
               <div className="mb-6">
                  <label className="block text-xs font-bold text-blue-800 mb-2">No of Units</label>
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 bg-white">
                     <span className="text-xl font-bold text-gray-900 pl-2">{units}</span>
                     <div className="flex gap-2">
                        <button 
                           onClick={() => setUnits(Math.max(1, units - 1))}
                           className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        >
                           <Minus size={16} />
                        </button>
                        <button 
                           onClick={() => setUnits(units + 1)}
                           className="w-8 h-8 flex items-center justify-center bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors"
                        >
                           <Plus size={16} />
                        </button>
                     </div>
                  </div>
               </div>

               {/* Quick Select Pills */}
               <div className="flex justify-center gap-3 mb-6">
                  {[2, 3, 4].map(num => (
                     <button 
                        key={num}
                        onClick={() => setUnits(num)}
                        className={cn(
                           "px-4 py-1 rounded-full text-xs font-medium border transition-all relative",
                           units === num 
                              ? "bg-blue-50 border-blue-200 text-blue-700" 
                              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                     >
                        {num === 3 && (
                           <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-100 text-yellow-800 text-[8px] px-1.5 rounded-sm font-bold uppercase">
                              Popular
                           </span>
                        )}
                        {num} Units
                     </button>
                  ))}
               </div>

               <button className="w-full flex items-center justify-center gap-2 text-blue-600 font-medium text-sm mb-6 hover:underline">
                  <Calendar size={16} /> Visualise Returns
               </button>

               <button 
                  onClick={handleInvest}
                  className="w-full bg-blue-900 text-white py-3.5 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
               >
                  Complete KYC
               </button>

               {showSuccess && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
                     <CheckCircle2 size={16} /> Process Initiated!
                  </div>
               )}
            </div>

            {/* Document Downloads */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
               <h3 className="font-semibold mb-3 text-sm">Documents</h3>
               <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2.5 border border-gray-100 rounded-lg hover:bg-gray-50 text-sm text-gray-600 transition-colors">
                     <span className="flex items-center gap-2"><FileText size={14} className="text-blue-600"/> Fact Sheet</span>
                     <Download size={14} className="text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2.5 border border-gray-100 rounded-lg hover:bg-gray-50 text-sm text-gray-600 transition-colors">
                     <span className="flex items-center gap-2"><FileText size={14} className="text-blue-600"/> Term Sheet</span>
                     <Download size={14} className="text-gray-400" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
