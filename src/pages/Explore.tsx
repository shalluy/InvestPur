import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { products, assetTypes, providers } from '../data/mockData';
import { cn } from '../lib/utils';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  
  const [selectedType, setSelectedType] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string[]>([]);
  const [providerFilter, setProviderFilter] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesType = selectedType === 'all' || product.assetType === selectedType;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRisk = riskFilter.length === 0 || riskFilter.includes(product.risk);
      const matchesProvider = providerFilter.length === 0 || providerFilter.includes(product.providerId);
      
      return matchesType && matchesSearch && matchesRisk && matchesProvider;
    });
  }, [selectedType, searchQuery, riskFilter, providerFilter]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
                <Filter size={20} /> Filters
              </div>
              
              {/* Asset Type Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Asset Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input 
                      type="radio" 
                      name="assetType" 
                      checked={selectedType === 'all'} 
                      onChange={() => setSelectedType('all')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    All Products
                  </label>
                  {assetTypes.map(type => (
                    <label key={type.id} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="radio" 
                        name="assetType" 
                        checked={selectedType === type.id} 
                        onChange={() => setSelectedType(type.id)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Risk Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Risk Level</h4>
                <div className="space-y-2">
                  {['low', 'medium', 'high'].map(risk => (
                    <label key={risk} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={riskFilter.includes(risk)}
                        onChange={() => toggleFilter(setRiskFilter, risk)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="capitalize">{risk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Provider Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Providers</h4>
                <div className="space-y-2">
                  {providers.map(p => (
                    <label key={p.id} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={providerFilter.includes(p.id)}
                        onChange={() => toggleFilter(setProviderFilter, p.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      {p.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex items-center gap-4">
              <Search className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by product name, tag, or keyword..." 
                className="flex-1 outline-none text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedType === 'all' ? 'All Investment Products' : assetTypes.find(t => t.id === selectedType)?.label}
                <span className="ml-2 text-sm font-normal text-gray-500">({filteredProducts.length} results)</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">Sort by:</span>
                <select className="bg-transparent border-none font-medium text-gray-900 focus:ring-0 cursor-pointer">
                  <option>Recommended</option>
                  <option>Yield (High to Low)</option>
                  <option>Min Investment (Low to High)</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
                <button 
                  onClick={() => {setSelectedType('all'); setSearchQuery(''); setRiskFilter([]); setProviderFilter([]);}}
                  className="mt-4 text-blue-700 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
