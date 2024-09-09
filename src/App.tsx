import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRatingChange = (productId: number, newRating: number) => {
    console.log(`Product ${productId} rating changed to ${newRating}`);
  };

  return (
    <>
      <Navbar setSearchText={setSearchText} />
      <Sidebar onCategoryChange={handleCategoryChange} />
      <main>
        <ProductList
          category={selectedCategory}
          searchText={searchText}
          onRatingChange={handleRatingChange}
        />
      </main>
    </>
  );
};

export default App;
