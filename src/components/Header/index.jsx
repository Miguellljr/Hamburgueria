import styles from "./style.module.scss";
import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";

export const Header = ({ setVisible, cartList }) => {
  const [value, setValue] = useState("");

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo Kenzie Burguer" />
      <div>
        <button onClick={() => setVisible(true)}>
          <MdShoppingCart size={21} />
          <span className="heading caption">{cartList.length}</span>
        </button>
      </div>
    </header>
  );
};
