// CartItem.jsx
import React from "react";

const CartItem = ({ item, onRemove, onChangeQuantity }) => {
  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={item.img} alt={item.name} />
        </div>
        <div className="col">
          <div className="row text-muted">{item.category}</div>
          <div className="row">{item.name}</div>
        </div>
        <div className="col">
          <button onClick={() => onChangeQuantity(item.id, -1)}>-</button>
          <span className="border">{item.quantity}</span>
          <button onClick={() => onChangeQuantity(item.id, 1)}>+</button>
        </div>
        <div className="col">
          €{item.price} <button className="close" onClick={() => onRemove(item.id)}>&#10005;</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
