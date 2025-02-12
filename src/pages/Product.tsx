import { motion } from "framer-motion";
import { Star, Download, Check, Shield, Wind, Leaf, Sun } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  name: string;
  description: string;
  features: string[];
  rating: number;
  price: string;
  image: string;
  icon: React.ReactNode;
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
      image: "/products/asphalt-shingles.jpg",
      icon: <Shield className="w-8 h-8 text-roofing-orange" />
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
      image: "/products/metal-roofing.jpg",
      icon: <Wind className="w-8 h-8 text-roofing-orange" />
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
      image: "/products/slate-tiles.jpg",
      icon: <Leaf className="w-8 h-8 text-roofing-orange" />
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
    <main className="min-h-screen pt-32 pb-16 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent mb-6">
            Premium Roofing Solutions
          </h1>
          <p className="text-lg text-gray-800">
            Discover our premium roofing solutions designed to protect your home and enhance its value.
          </p>
        </motion.div>

        {/* Product Catalog */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-center gap-4 mb-6">
                {product.icon}
                <h2 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
                  {product.name}
                </h2>
              </div>

              <p className="text-gray-800 mb-6">{product.description}</p>

              <ul className="space-y-3 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-800">
                    <Check className="w-5 h-5 text-roofing-orange" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-roofing-orange fill-current" />
                  <span className="text-gray-800 font-medium">{product.rating}</span>
                </div>
                <span className="font-medium text-roofing-orange">{product.price}</span>
              </div>

              <Link 
                to="/estimate"
                className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <Sun className="w-8 h-8 text-roofing-orange" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
              Product Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-gray-800">Feature</th>
                  <th className="text-center py-4 text-roofing-orange">Asphalt</th>
                  <th className="text-center py-4 text-roofing-orange">Metal</th>
                  <th className="text-center py-4 text-roofing-orange">Slate</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-white/20' : ''}>
                    <td className="py-3 text-gray-800 font-medium">{row.feature}</td>
                    <td className="text-center py-3 text-gray-800">{row.asphalt}</td>
                    <td className="text-center py-3 text-gray-800">{row.metal}</td>
                    <td className="text-center py-3 text-gray-800">{row.slate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 text-center"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Contact us today for a free consultation and detailed quote for your roofing project.
          </p>
          <Link 
            to="/estimate"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Request a Quote
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Product;