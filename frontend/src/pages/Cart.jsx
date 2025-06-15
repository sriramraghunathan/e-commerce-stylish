import axios from 'axios'

const Cart = ({ cart, setCart }) => {
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const localBackendUrl = "http://localhost:5000/api/payment"; 

  const handleBuyNow= async()=>{
    const {data}= await axios.post(`${localBackendUrl}/orders`,{amount: total});
    initPayment(data);
  };

  const initPayment=(orderData)=>{
    const options = {
      key: "rzp_test_mXPERjodj0tlJu",
      amount: orderData.data.amount,
      currency: orderData.data.currency,
      description: "Test Payment method",
      order_id:orderData.data.id,
      handler:async (res)=>{
        await axios.post(`${localBackendUrl}/verify`,res).then((res)=>{
          if(res.status === 200){
            alert('Payment Verified...')
          }else{
            alert('Payment Failed..')
          }
        })

      },
      theme:{
        color:'#3399cc'
      }
    };
    const razorpay_popup =new window.Razorpay(options);
    razorpay_popup.open();
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="p-4  sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4 ">
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

      {cart.length > 0 && (
        <div className=" flex flex-col mb-10 sm:flex-row items-center justify-between px-4 sm:px-6 mt-6 gap-4">
          <p className="text-3xl sm:text-4xl font-bold">Total: ₹{total}</p>
          <button onClick={handleBuyNow} className="bg-green-500 hover:bg-green-600 text-white text-xl sm:text-2xl font-bold px-6 py-3 rounded-lg transition-all duration-200">
            Pay Now
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
