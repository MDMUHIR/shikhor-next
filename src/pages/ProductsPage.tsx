import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductsSection from '../components/ProductsSection';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('category') as any || 'All';
  const { handleBuyProduct } = useApp();

  return (
    <ProductsSection
      filterCategory={cat}
      onBuyProduct={(prod) => {
        handleBuyProduct(prod);
      }}
    />
  );
}
