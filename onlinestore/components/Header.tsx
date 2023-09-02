import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';
import { Badge } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { cartState } from '@/atoms/cart';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import qs from 'query-string';

const Header = () => {
    // Initialize the Next.js router
    const router = useRouter();

    // State to hold the input value for search
    const [value, setValue] = useState<string>('');

    // Get the cart items from Recoil state
    const cart = useRecoilValue(cartState);

    // Create a separate debounced value state for the input
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');

    // Update debouncedInputValue when the input value changes with a delay
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedInputValue(value);
        }, 500);

        // Clear the timer if the component unmounts or the value changes again
        return () => clearTimeout(debounceTimer);
    }, [value]);

    // Update the URL when debouncedInputValue changes
    useEffect(() => {
        if (debouncedInputValue.trim() === '') {
            return; // Avoid making empty search queries
        }

        const query = {
            title: debouncedInputValue,
        };

        // Construct the URL with the search query
        const url = qs.stringifyUrl({
            url: '/search',
            query,
        });

        // Update the route to perform the search
        router.push(url);
    }, [debouncedInputValue, router]);

    return (
        <div className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Link to the home page */}
                <Link href="/">
                    <div className="text-2xl font-extrabold text-white">Online Store</div>
                </Link>
                <div className="relative flex items-center">
                    {/* Search input */}
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search for products"
                        className="border rounded-lg pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-400"
                    />
                    <div className="absolute left-3 top-2 text-gray-500">
                        {/* Search icon */}
                        <AiOutlineSearch size={24} color="gray" />
                    </div>
                </div>
                <div className="text-white">
                    {/* Link to the shopping cart page with a badge for cart item count */}
                    <Link href="/cart">
                        <Badge badgeContent={cart.length} color="primary">
                            <AiOutlineShoppingCart size={28} />
                        </Badge>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
