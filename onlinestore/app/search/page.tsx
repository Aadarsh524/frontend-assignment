"use client";

import useSearch from "@/hooks/useSearch";
import ProductCard from "@/components/ProductCard";

// Revalidate interval set to 0, which means no automatic revalidation
export const revalidate = 0;

// Define the props for the Search component
interface SearchProps {
    searchParams: { title: string }
};

const Search = ({ searchParams }: SearchProps) => {
    // Log the search parameters received
    console.log(searchParams);

    // Fetch products based on the search title using the useSearch hook
    const { data: products, isLoading, isError, error } = useSearch(searchParams.title);

    // Display a loading message while fetching products
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

    // Render the ProductCard component with the fetched products
    return (
        <div>
            <ProductCard product={products} />
        </div>
    );
}

export default Search;
