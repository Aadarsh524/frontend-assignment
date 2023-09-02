"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";

// Define props for the ProductContent component
interface ProductContentProps {
    product: Product[]; // An array of products to be displayed
}

// ProductContent component receives an array of products and renders them using ProductCard
const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {/* Map through each product and render a ProductCard component for each */}
            {product.map((item: any) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    );
}

export default ProductContent;
