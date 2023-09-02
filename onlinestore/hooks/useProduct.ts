"use client";

import { useQuery } from 'react-query';
import axios from 'axios';

// Define an asynchronous function to fetch products from the API
const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data; // Return the data received from the API
};

// Custom hook that uses react-query's useQuery to fetch products
const useProduct = () => {
  return useQuery('products', fetchProducts); // 'products' is the query key, and it fetches products using the fetchProducts function
};

export default useProduct;
