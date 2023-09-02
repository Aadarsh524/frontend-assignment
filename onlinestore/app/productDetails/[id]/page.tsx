"use client";

import React from 'react';
import Image from 'next/image';
import useSearch from '@/hooks/useSearch';
import { useRecoilState } from 'recoil';
import { cartState } from '@/atoms/cart';

function ProductDetail({ params }: { params: { id: string } }) {
    // Fetch product details using the useSearch hook
    const { data: product, isLoading, isError, error } = useSearch(params.id);
    const [cart, setCart] = useRecoilState(cartState);
    let isCartItem: boolean = false;

    // Display loading message while fetching product details
    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    // Handle and display errors if there is an issue fetching product details
    if (isError) {
        const errorMessage = error as Error;
        return (
            <div className="text-center mt-8 text-red-500">
                Error: {errorMessage.message}
            </div>
        );
    }

    // Check if the product is already in the cart
    isCartItem = cart.some((item) => item.id === product.id);

    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
    };

    // Function to handle removing the product from the cart
    const handleRemoveFromCart = (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
    };

    // Render the product details with buttons to add/remove from cart
    return (
        <div className="bg-white border p-3 max-w-md rounded-lg overflow-hidden shadow-md">
            <div className="relative h-48 w-full">
                <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-t-lg"
                />
            </div>
            <div className="px-4 py-2">
                <h2 className="text-2xl font-extrabold text-gray-800">{product.title}</h2>
                <p className="text-gray-700 text-lg">${product.price}</p>
                <p className="text-gray-600 mt-4">{product.description}</p>
                <div className="flex items-center mt-4">
                    <div className="text-gray-600">
                        Rating: {product.rating.rate} / 5
                    </div>
                    <div className="ml-4 text-gray-600">
                        Category: {product.category}
                    </div>
                </div>
                <div className="px-4 py-2">
                    {isCartItem ? (
                        <button
                            onClick={() => handleRemoveFromCart(product.id)}
                            className="block w-full bg-red-500 hover:bg-red-700 text-white font-semibold text-lg py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Remove from Cart
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                            className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
