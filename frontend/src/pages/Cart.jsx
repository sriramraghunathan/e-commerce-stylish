import { useState } from "react";
import axios from "axios";

const Cart = ({ cart, setCart }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [purchasedItems, setPurchasedItems] = useState([]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const localBackendUrl = "https://e-commerce-stylish.onrender.com";

  const handleBuyNow = async () => {
    try {
      const { data } = await axios.post(
        `${localBackendUrl}/api/payment/orders`,
        {
          amount: total,
        }
      );
      initPayment(data);
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment initiation failed.");
    }
  };

  const initPayment = (orderData) => {
    const options = {
      key: "rzp_test_mXPERjodj0tlJu",
      amount: orderData.data.amount,
      currency: orderData.data.currency,
      description: "Test Payment method",
      order_id: orderData.data.id,
      handler: async (res) => {
        try {
          const verifyRes = await axios.post(
            `${localBackendUrl}/api/payment/verify`,
            res
          );
          if (verifyRes.status === 200) {
            setPaymentSuccess(true);
            setPaymentDetails({
              orderId: orderData.data.id,
              paymentId: res.razorpay_payment_id,
              deliveryAddress: "123, Stylish Street, Fashion City, India",
              estimatedDelivery: new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
              ).toDateString(),
            });
            setPurchasedItems(cart); // Save purchased items
            setCart([]); // Clear cart after payment
          } else {
            alert("Payment verification failed.");
          }
        } catch (err) {
          console.error(err);
          alert("Error verifying payment.");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpay_popup = new window.Razorpay(options);
    razorpay_popup.open();
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          Your Cart
        </h2>

        {paymentSuccess ? (
          <div className="text-center mt-10 bg-green-50 border border-green-200 rounded-lg p-6 shadow-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              🎉 Payment Successful!
            </h3>
            <p className="text-lg mb-2">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="mt-4 text-left text-gray-800">
              <p>
                <strong>📦 Order ID:</strong> {paymentDetails.orderId}
              </p>
              <p>
                <strong>💳 Payment ID:</strong> {paymentDetails.paymentId}
              </p>
              <p>
                <strong>🏠 Delivery Address:</strong>{" "}
                {paymentDetails.deliveryAddress}
              </p>
              <p>
                <strong>🚚 Estimated Delivery:</strong>{" "}
                {paymentDetails.estimatedDelivery}
              </p>
            </div>

            {/* Purchased Items */}
            <div className="mt-6 text-left">
              <h4 className="text-xl font-bold text-gray-700 mb-3">
                🛍️ Purchased Items
              </h4>
              {purchasedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 border rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                  />
                  <span className="text-base sm:text-lg">
                    {item.name} - ₹{item.price}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-white bg-red-600 hover:bg-red-400 w-8 h-8 sm:w-10 sm:h-10 text-lg sm:text-xl rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && !paymentSuccess && (
        <div className="flex flex-col mb-10 sm:flex-row items-center justify-between px-4 sm:px-6 mt-6 gap-4">
          <p className="text-3xl sm:text-4xl font-bold">Total: ₹{total}</p>
          <button
            onClick={handleBuyNow}
            className="bg-green-500 hover:bg-green-600 text-white text-xl sm:text-2xl font-bold px-6 py-3 rounded-lg transition-all duration-200"
          >
            Pay Now
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
