import PriceDisplay from "./PriceDisplay";

function ShopItem({ product, onClick }) {

  const uri = "https://axi88wcqsfqf.objectstorage.mx-queretaro-1.oci.customer-oci.com/n/axi88wcqsfqf/b/bucket-catalog-web-app/o/";

  const handleOnClick = () => {
    onClick(product.id);
  }

  return (
    <div onClick={handleOnClick} className="hover:cursor-pointer group w-[200px] h-[270px] flex flex-col justify-evenly rounded-xl shadow-md scale-95 hover:scale-100 transition">
      <div className="flex w-full items-center justify-center">
        <img
          src={uri + product.Images[0].url}
          alt=""
          className="object-cover rounded-t-xl" />
      </div>
      <PriceDisplay product={product} />
      <div className="mb-3 group-hover:text-mag group-hover:font-semibold px-4 text-lg line-clamp-1">
        {product.name}
      </div>
    </div>
  );
};

export default ShopItem;