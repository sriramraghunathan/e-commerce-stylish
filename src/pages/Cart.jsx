const Cart = ({ cart, setCart }) => {
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-2 p-4 gap-20">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <span>
                    {item.name} - ₹{item.price}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-white bg-red-600 text-3xl hover:bg-red-400 p-3 text-center rounded-full"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex mb-10">
        <p className="mt-4 p-5 text-4xl font-bold">Total: ₹{total}</p>
        <button className="mt-4 ml-20 border-black rounded-lg text-center bg-green-300 p-5 text-4xl font-bold">Pay Now</button>
      </div>
    </>
  );
};

export default Cart;
