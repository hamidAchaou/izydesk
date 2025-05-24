import React from "react";
import "./CartItem.css";

const CartItem = ({ item, onRemove, onChangeQuantity }) => {
  console.log(item);

  return (
    <div className="cart-item-container">
      <button
        className="remove-btn-top-right"
        onClick={() => onRemove(item.id)}
        title="Supprimer l'article"
      >
        ×
      </button>

      <div className="cart-item">
        <div className="cart-item-img">
          <img src={item.image} alt={item.name} />
        </div>

        <div className="cart-item-info">
          <p className="item-category">{item.category}</p>
          <h4 className="item-name">{item.name}</h4>
        </div>

        <div className="cart-item-quantity">
          <button onClick={() => onChangeQuantity(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onChangeQuantity(item.id, 1)}>+</button>
        </div>

        <div className="cart-item-price">
          <p>€{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
