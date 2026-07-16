import React, { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

function CartTable() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "cart"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const cartItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCart(cartItems);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const increase = async (item) => {
    await updateDoc(doc(db, "cart", item.id), {
      quantity: item.quantity + 1,
      total: (item.quantity + 1) * item.price,
    });

    getCart();
  };

  const decrease = async (item) => {
    if (item.quantity === 1) return;

    await updateDoc(doc(db, "cart", item.id), {
      quantity: item.quantity - 1,
      total: (item.quantity - 1) * item.price,
    });

    getCart();
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(db, "cart", id));

    getCart();
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.total,
    0
  );

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">

        <table className="table">

          <thead>

            <tr>

              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>

            </tr>

          </thead>

          <tbody>

            {cart.map((item) => (

              <tr key={item.id}>

                <td>

                  <img
                    src={item.image}
                    alt={item.title}
                    width="100"
                  />

                </td>

                <td>{item.title}</td>

                <td>
                  ₹{item.price}
                </td>

                <td>

                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => decrease(item)}
                  >
                    -
                  </button>

                  <span className="mx-3">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => increase(item)}
                  >
                    +
                  </button>

                </td>

                <td>
                  ₹{item.total}
                </td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.id)}
                  >
                    X
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="text-end mt-4">

          <h4>
            Subtotal : ₹{subtotal.toLocaleString()}
          </h4>

          <h3>
            Total : ₹{subtotal.toLocaleString()}
          </h3>

          <button className="btn btn-dark">
            Proceed To Checkout
          </button>

        </div>

      </div>
    </div>
  );
}

export default CartTable;