import styles from "./style.module.scss";

export const ProductCard = ({ product, addToCart }) => {
  const { img, name } = product;
  return (
    <section className={styles.card}>
      <li>
        <img src={img} alt={name} />
        <div>
          <h3 className="heading three">{product.name}</h3>
          <p className="paragrath caption">{product.category}</p>
          <span className="paragrath bodyBold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="btn small"
          >
            Adicionar
          </button>
        </div>
      </li>
    </section>
  );
};
