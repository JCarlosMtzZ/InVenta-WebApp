import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import SearchBar from '../components/SearchBar.jsx';
import ShopItem from "../components/ShopItem.jsx";
import ShopItemButtons from "../components/ShopItemButtons.jsx";

function Sale() {


  const uri = "https://axi88wcqsfqf.objectstorage.mx-queretaro-1.oci.customer-oci.com/n/axi88wcqsfqf/b/bucket-catalog-web-app/o/";

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const handleEmptyCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const currentCart = cart;
    setTotal(getTotal(currentCart));
  }, [cart]);

  const getTotal = (items) => {
    let total = 0;
    for (let item of items)
      total = total + (item.unitPrice * item.quantity);
    return total.toFixed(2);
  };

  const getFinalPrice = (item) => {
    const unitPrice = item.unitPrice;
    const hasDiscount = item.Discounts.length > 0;
    let isPercentage;
    let discount;
    let finalPrice;

    if (hasDiscount) {
      discount = item.Discounts[0];
      if ((discount.amount && discount.percentage) || discount.percentage) {
        isPercentage = true;
        finalPrice = unitPrice * (1 - discount.percentage);
      } else {
        isPercentage = false;
        finalPrice = unitPrice - discount.amount;
      }
    } else {
      finalPrice = unitPrice;
    }
    finalPrice = finalPrice.toFixed(2);
    return finalPrice;
  };

    return (
      <div className="flex w-full h-[89.8%]">
        <div className="flex flex-col border-2 h-full w-[30%]">
          <div className="px-4 py-4 flex justify-between items-center shadow-lg">
            <div className="flex flex-col">
              <p
                className="text-sm"
                >
                {cart.length + (cart.length != 1 ? ' productos agregados' : ' producto agregado')}
              </p>
              <p
                className="text-xl font-semibold"
                >
                {cart.length > 0 ? 'Carrito de venta' : 'Carrito vacío'}
              </p>
            </div>
            <button
              type="button"
              className="hover:scale-105 transition"
            >
              <IoCloseCircleOutline size='2rem' />
            </button>
          </div>
          <div className="flex flex-col w-full overflow-auto flex-grow">
            {cart.length > 0 &&
              cart.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className='px-2 py-4 w-full flex items-center justify-evenly shadow-md'
                >
                  <img
                    src={uri + cartItem.Images[0].url}
                    alt=""
                    className='shadow-lg object-cover w-[50px] h-[50px] rounded-[50%]'
                  />
                  <div className="flex flex-col">
                    <p className='line-clamp-1 ml-[9px]'>
                      {cartItem.name}
                    </p>
                    <div className="scale-90">
                      <ShopItemButtons
                        product={cartItem}
                        cart={cart}
                        setCart={setCart}
                        isOnCart={true}
                      />
                    </div>
                  </div>
                  <p className="font-semibold text-lg">
                    {'$ ' + (getFinalPrice(cartItem) * cartItem.quantity).toFixed(2)}
                  </p>

                </div>
              ))
            }
          </div>
          <div className="bg-purp-dark/5 p-4 flex flex-col w-full gap-2">
            <div className="text-2xl flex items-center justify-between">
              <p>Total</p>
              <p className="font-semibold">{`$ ${total}`}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-purp-dark text-white hover:text-black hover:bg-white hover:border-2 transition h-10 w-fit px-4 rounded-lg"
              >
                Confirmar venta
              </button>
              <button
                type="button"
                onClick={handleEmptyCart}
                className="bg-purp-dark text-white hover:text-black hover:bg-white hover:border-2 transition h-10 w-fit px-4 rounded-lg"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
        <div className="border-2 border-warn-red flex flex-col items-center h-full w-[70%]">
          <div className="my-2">
            <SearchBar
              externalProducts={products}
              setExternalProducts={setProducts}
              hasDropdown={false}  
            />
          </div>
          {products.length > 0 && 
            <div className="pb-4 w-full flex flex-wrap justify-center overflow-auto gap-x-2 gap-y-4">
              {products.map((product) => (
                <ShopItem
                  key={product.id}
                  product={product}
                  showButtons={true}
                  cart={cart}
                  setCart={setCart}
                />
              ))}
            </div>
          }
        </div>
      </div>
    );
  };
  
  export default Sale;