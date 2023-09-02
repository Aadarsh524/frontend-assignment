"use client";

import ProductContent from '@/components/productContent';
import useProduct from '@/hooks/useProduct';

const Home = () => {
  // Fetch products using the useProduct hook
  const { data: products, isLoading, isError, error } = useProduct();

  // Display loading message while fetching products
  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  // Handle and display errors if there is an issue fetching products
  if (isError) {
    const errorMessage = error as Error;
    return (
      <div className="text-center mt-8">
        Error: {errorMessage.message}
      </div>
    );
  }

  // Render the product content component with the fetched products
  return (
    <div>
      <ProductContent product={products} />
    </div>
  );
}

export default Home;
