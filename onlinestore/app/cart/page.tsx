"use client";

import { cartState } from '@/atoms/cart';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useRecoilState } from 'recoil';

const Cart: React.FC = () => {
    // Get the cart state and the function to set the cart state from Recoil
    const [cart, setCart] = useRecoilState(cartState);

    // Get the Next.js router instance
    const router = useRouter();

    // Function to handle the checkout process
    const handleCheckout = () => {
        // Redirect to the homepage when checking out
        router.push('/');
        // Clear the cart by setting it to an empty array
        setCart([]);
    }

    return (
        <div className="shadow-md pl-5 pt-2">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                    {/* Map through the cart items and render a ProductCard component for each */}
                    {cart.map((item: any) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            )}
            <div className='mt-5'>
                {/* Button to initiate the checkout process */}
                <button onClick={handleCheckout} className="block bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    CheckOut
                </button>
            </div>
        </div>
    );
};

export default Cart;
