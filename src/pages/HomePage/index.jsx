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

  // useEffect montagem - carrega os produtos da API e joga em productList
  // filtro de busca

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await productApi.get("/products", {
          params: { search },
        });
        setProductList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [search]);

  // useEffect atualização - salva os produtos no localStorage (carregar no estado)

  useEffect(() => {
    localStorage.setItem("@CART_LIST", JSON.stringify(cartList));
  }, [cartList]);

  // adição, exclusão, e exclusão geral do carrinho

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

  // renderizações condições e o estado para exibir ou não o carrinho

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
