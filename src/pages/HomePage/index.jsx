import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { productApi } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const HomePage = ({ setVisible, isVisible }) => {
  const localCart = localStorage.getItem("@CART_LIST");

  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);

  const [cartList, setCartList] = useState(
    localCart ? JSON.parse(localCart) : []
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await productApi.get("/products", {
          params: { search },
        });
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [search]);

  useEffect(() => {
    localStorage.setItem("@CART_LIST", JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (product) => {
    const hasProduct = cartList.some((cart) => cart.id === product.id);

    if (!hasProduct) {
      setCartList([...cartList, product]);
      toast.success("Produto adicionado ao carrinho");
    } else {
      toast.error("Este produto já foi adicionado");
    }
  };

  const removeToCart = (productId) => {
    const newProducts = cartList.filter((cart) => cart.id !== productId);
    setCartList(newProducts);
  };

  const removeAllProducts = () => {
    localStorage.clear();
    setCartList([]);
  };

  return (
    <>
      <Header
        search={search}
        cartList={cartList}
        setSearch={setSearch}
        setVisible={setVisible}
      />
      <main>
        <ProductList productList={productList} addToCart={addToCart} />
        {isVisible ? (
          <CartModal
            removeAllProducts={removeAllProducts}
            removeToCart={removeToCart}
            setVisible={setVisible}
            cartList={cartList}
          />
        ) : null}
      </main>
    </>
  );
};
