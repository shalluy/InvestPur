import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { Product, providers } from '../data/mockData';
import { formatCurrency, formatPercentage, cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const provider = providers.find(p => p.id === product.providerId);

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {provider && (
               <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 overflow-hidden">
                 <img src={provider.logo} alt={provider.name} className="w-full h-full object-cover" />
               </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 leading-tight line-clamp-1">{product.title}</h3>
              <p className="text-xs text-gray-500">{provider?.name}</p>
            </div>
          </div>
          <span className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            product.risk === 'low' ? "bg-green-100 text-green-800" :
            product.risk === 'medium' ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          )}>
            {product.risk.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Returns</p>
            <p className="text-lg font-bold text-green-600">{formatPercentage(product.expectedYield || 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Min Investment</p>
            <p className="text-sm font-semibold text-gray-900">{formatCurrency(product.minInvestment)}</p>
          </div>
        </div>
        
        {!compact && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-100 p-3 bg-gray-50">
        <Link 
          to={`/product/${product.id}`}
          className="w-full flex items-center justify-center gap-2 text-blue-700 font-medium text-sm hover:text-blue-800"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
