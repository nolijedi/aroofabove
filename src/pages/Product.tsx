import { motion } from "framer-motion";
import { Star, Download, Check } from "lucide-react";

interface Product {
  name: string;
  description: string;
  features: string[];
  rating: number;
  price: string;
  image: string;
}

const Product = () => {
  const products: Product[] = [
    {
      name: "Premium Asphalt Shingles",
      description: "High-quality asphalt shingles with superior durability and aesthetic appeal.",
      features: [
        "50-year warranty",
        "Wind resistance up to 130 mph",
        "Algae-resistant",
        "Energy Star certified"
      ],
      rating: 4.8,
      price: "Starting at $4.50/sq ft",
      image: "/products/asphalt-shingles.jpg"
    },
    {
      name: "Metal Roofing System",
      description: "Modern metal roofing solution combining durability with energy efficiency.",
      features: [
        "Lifetime warranty",
        "Wind resistance up to 160 mph",
        "Energy efficient",
        "100% recyclable"
      ],
      rating: 4.9,
      price: "Starting at $8.00/sq ft",
      image: "/products/metal-roofing.jpg"
    },
    {
      name: "Slate Tiles",
      description: "Natural slate tiles offering timeless beauty and exceptional longevity.",
      features: [
        "100+ year lifespan",
        "Fire resistant",
        "Zero maintenance",
        "Environmentally friendly"
      ],
      rating: 4.7,
      price: "Starting at $15.00/sq ft",
      image: "/products/slate-tiles.jpg"
    }
  ];

  const comparisons = [
    {
      feature: "Lifespan",
      asphalt: "25-30 years",
      metal: "50+ years",
      slate: "100+ years"
    },
    {
      feature: "Wind Resistance",
      asphalt: "130 mph",
      metal: "160 mph",
      slate: "110 mph"
    },
    {
      feature: "Maintenance",
      asphalt: "Moderate",
      metal: "Low",
      slate: "Very Low"
    },
    {
      feature: "Energy Efficiency",
      asphalt: "Good",
      metal: "Excellent",
      slate: "Very Good"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Products</h1>
        <p className="text-lg text-gray-600">
          Discover our premium roofing solutions designed to protect your home and enhance its value.
        </p>
      </motion.div>

      {/* Product Catalog */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-2 text-gray-600">{product.rating}/5.0</span>
              </div>
              <ul className="space-y-2 mb-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-gray-900">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Product Comparison</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Asphalt</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Metal</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Slate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisons.map((row) => (
                <tr key={row.feature}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.asphalt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.metal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.slate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Downloads Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product) => (
            <a
              key={product.name}
              href="#"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Download className="w-5 h-5 text-roofing-orange" />
              <span className="text-sm font-medium text-gray-900">
                {product.name} Guide
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Product;