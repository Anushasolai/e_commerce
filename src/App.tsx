import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import { Product } from "./components/ProductCard";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
                query {
                  products {
                    id
                    title
                    category
                    price
                    rating
                    image
                  }
                }
              `,
          }),
        });
        const { data } = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.category === selectedCategory : true) &&
      (searchText
        ? product.title.toLowerCase().includes(searchText.toLowerCase())
        : true)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar setSearchText={setSearchText} />
      <Sidebar
        onCategoryChange={handleCategoryChange}
        onProductAdd={handleProductAdd}
      />
      <main>
        <ProductList products={filteredProducts} />
      </main>
    </>
  );
};

export default App;
