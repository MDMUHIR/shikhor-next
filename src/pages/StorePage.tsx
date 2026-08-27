import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StoreSection, { type ProductCategory } from '../components/StoreSection';

export default function StorePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cat = (searchParams.get('category') || 'All') as ProductCategory;
  const { products, handleBuyProduct } = useApp();

  return (
    <StoreSection
      products={products}
      filterCategory={cat}
      onSelectProduct={(product) => navigate(`/store/${product.id}`)}
      onBuyProduct={(prod) => {
        handleBuyProduct(prod);
      }}
    />
  );
}
