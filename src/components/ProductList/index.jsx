import styles from "./style.module.scss";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ productList, addToCart }) => {
  return (
    <section className={styles.listBox}>
      <ul>
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </ul>
    </section>
  );
};
