"use client";

import { useQuery } from 'react-query';
import axios from 'axios';

// Import the useProduct custom hook
import useProduct from './useProduct';

// Custom hook to search for a product by title
const useSearch = (title: any) => {
  // Use react-query's useQuery to fetch a product by title
  return useQuery(['product', title], () => fetchProductByID(title), {
    enabled: !!title, // Enable the query when title is truthy
  });
};

// Function to fetch a product by its title
const fetchProductByID = async (title: any) => {
  console.log(title);
  // Make an HTTP GET request to the API to fetch a product by its title
  const response = await axios.get(`https://fakestoreapi.com/products/${title}`);
  return response.data; // Return the fetched product data
};

export default useSearch;
