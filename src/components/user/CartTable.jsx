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
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import Checkout from "../../pages/user/Checkout";
import { Link, PrefetchPageLinks } from "react-router-dom";

function CartTable() {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUserId(user.uid);
          getCart(user.uid);
        }
        else {
          setLoading(false);
        }
      }
    );
    return () => unsubscribe();
  }, []);
  const getCart = async (uid) => {
    try {
      const q = query(
        collection(db, "cart"),
        where("userId", "==", uid)
      );
      const snapshot = await getDocs(q);
      const cartItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCart(cartItems);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  const increase = async (item) => {
    try {
      if (item.quantity >= item.stock) {
        toast.warning(
          "Only available stock can be added"
        );
        return;
      }
      await updateDoc(
        doc(db, "cart", item.id),
        {
          quantity: item.quantity + 1,
          total:
            (item.quantity + 1) *
            item.price
        }
      );
      getCart(userId);
    }
    catch (error) {
      console.log(error);
    }
  };
  const decrease = async (item) => {
    try {
      if (item.quantity <= 1) {
        toast.warning(
          "Minimum quantity is 1"
        );
        return;
      }
      await updateDoc(
        doc(db, "cart", item.id),
        {
          quantity: item.quantity - 1,
          total:
            (item.quantity - 1) *
            item.price
        }
      );
      getCart(userId);
    }
    catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (id) => {
    try {
      await deleteDoc(
        doc(db, "cart", id)
      );
      getCart(userId);
      toast.success(
        "Item removed"
      );
    }
    catch (error) {
      console.log(error);
    }
  };
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>
          Loading...
        </h4>
      </div>
    );
  }
  
  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>
                Image
              </th>
              <th>
                Product
              </th>
              <th>
                Price
              </th>
              <th>
                Quantity
              </th>
              <th>
                Total
              </th>
              <th>
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      width="100"
                    />
                  </td>
                  <td>
                    {item.title}
                  </td>
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
              ))
            }
          </tbody>
        </table>
        <div className="text-end mt-4">
          <div class="row">
            <div class="col-md-6">
              <div class="row mb-5">
                <div class="col-md-6">
                  <button class="btn btn-outline-black btn-sm btn-block">Continue Shopping</button>
                </div>
              </div>
            </div>
            <div class="col-md-6 pl-5">
              <div class="row justify-content-end">
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12 text-right border-bottom mb-5">
                      <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <span class="text-black">
                        Subtotal :
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div class="col-md-6 text-right">
                      <strong class="text-black">
                        Total :
                        ₹{subtotal.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <Link class="btn btn-black btn-lg py-3 btn-block" to="/Checkout">Proceed To Checkout</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartTable;