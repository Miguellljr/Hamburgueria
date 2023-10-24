import styles from "./style.module.scss";
import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";

export const CartModal = ({ cartList, setVisible, removeToCart, removeAllProducts }) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);

  return (
    <div role="dialog" className={styles.overlayBox}>
      <div className={styles.modalBox}>
        <div className={styles.headerBox}>
          <h2 className="heading four">Carrinho de compras</h2>
          <button
            onClick={() => setVisible(false)}
            className="btn close"
            aria-label="close"
            title="Fechar"
          >
            <MdClose size={21} />
          </button>
        </div>
        <div>
          <ul>
            {cartList.map((product) => (
              <CartItemCard
                key={product.id}
                product={product}
                removeToCart={removeToCart}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.totalBox}>
            <span className="paragrath headline">Total</span>
            <span id="" className="paragrath body">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button onClick={() => removeAllProducts()} className="btn">Remover todos</button>
        </div>
      </div>
    </div>
  );
};
