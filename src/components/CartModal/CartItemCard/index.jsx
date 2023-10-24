import styles from "./style.module.scss";
import { MdDelete } from "react-icons/md";

export const CartItemCard = ({ product, removeToCart }) => {
  const { img, name, id, price } = product;
  return (
    <li className={styles.card}>
      <div className={styles.contentBox}>
        <img src={img} alt={name} />
        <div>
          <h3 className="heading three">{name}</h3>
          <span className="paragrath bodyBold">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
      <button
        onClick={() => removeToCart(id)}
        aria-label="delete"
        title="Remover item"
      >
        <MdDelete size={21} />
      </button>
    </li>
  );
};
