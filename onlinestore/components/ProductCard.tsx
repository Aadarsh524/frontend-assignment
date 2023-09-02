import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { cartState } from '@/atoms/cart';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

// Define props for the ProductCard component
interface ProductCardProps {
    product: Product;
    isCartItem?: boolean; // Optional boolean prop to indicate if the product is in the cart
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isCartItem }) => {
    // Get cart state and setCart function from Recoil state
    const [cart, setCart] = useRecoilState(cartState);

    // Initialize the Next.js router
    const router = useRouter();

    // Check if the product is in the cart based on its ID
    isCartItem = cart.some((item) => item.id === product.id);

    // Function to add the product to the cart
    const handleAddToCart = () => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
    };

    // Function to remove the product from the cart
    const handleRemoveFromCart = (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
    };

    // Function to navigate to the product detail page
    const navigateToProductDetail = () => {
        router.push(`/productDetails/${product.id}`);
    };

    return (
        <div
            className="bg-white border p-3 max-w-md rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            onClick={navigateToProductDetail} // Clicking the card navigates to the product detail page
            style={{ cursor: 'pointer' }}
        >
            <div className="relative h-48 w-full">
                <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain" // Use "contain" to fit the image without cropping
                    className="rounded-t-lg"
                />
            </div>
            <div className="px-4 py-2">
                <h2 className="text-xl font-extrabold text-gray-800">{product.title}</h2>
                <p className="text-gray-700 text-lg">${product.price}</p>
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
                            e.stopPropagation(); // Prevent card click event propagation
                            handleAddToCart();
                        }}
                        className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
