import { useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineLoading } from "react-icons/ai";

import FormFieldWarning from '../FormFieldWarning.jsx';

import { updateProduct } from '../../services/productsService.js';
import { updateProductDiscount, deleteProductDiscount } from '../../services/productDiscountsService.js';
import { addProductDiscount } from '../../services/productDiscountsService.js';
import { getProductCategoryImagesDiscountsById } from '../../services/productsService.js';
import EditingFormButtons from '../buttons/EditingFormButtons.jsx';

function EditProductForm({
  product,
  setProduct,
  discounts,
  categories,
  handleClose,
  isWaitingResponse,
  setIsWaitingResponse }) {

  let discount;
  if (product.Discounts.length > 0)
    discount = product.Discounts[0].id;
  else
    discount = 'none';

  const [newProductData, setNewProductData] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    size: product.size,
    unitPrice: product.unitPrice,
    stock: product.stock,
    categoryId: product.categoryId
  });

  const [isNewProductData, setIsNewProductData] = useState({
    isName: true,
    isDescription: true,
    isBrand: true,
    isSize: true,
    isUnitPrice: true,
    isStock: true,
    isCategoryId: true
  });

  const [newDiscountId, setNewDiscountId] = useState(discount);

  const [priceFieldMessage, setPriceFieldMessage] = useState("Requerido");
  const [stockFieldMessage, setStockFieldMessage] = useState("Requerido");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({
      ...newProductData,
      [name]: value,
    });

    setIsNewProductData({
      ...isNewProductData,
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}`]: !!value
    })

    if (name === "unitPrice")
      if (!value) setPriceFieldMessage("Requerido");
    if (name === "stock")
      if (!value) setStockFieldMessage("Requerido");
  }

  const handleDiscountChange = (e) => {
    const discountId = e.target.value;
    setNewDiscountId(discountId);
  };

  const handleSubmit = async () => {
    setIsWaitingResponse(true);

    const currentIsNewProductData = {
      isName: !!newProductData.name,
      isDescription: !!newProductData.description,
      isBrand: !!newProductData.brand,
      isSize: !!newProductData.size,
      isUnitPrice: !!newProductData.unitPrice,
      isStock: !!newProductData.stock,
      isCategoryId: !!newProductData.categoryId
    }

    if (Object.values(currentIsNewProductData).some(value => !value)) {
      setIsNewProductData(currentIsNewProductData);
      setIsWaitingResponse(false);
      return;
    }

    const currentPrice = parseFloat(newProductData.unitPrice);
    const currentStock = parseFloat(newProductData.stock);
    let newIsNewProductData = { ...isNewProductData };
    let hasError = false;
    if (currentPrice <= 0 || currentStock <= 0) {
      if (currentPrice <= 0) {
        setPriceFieldMessage("Debe ser mayor a 0")
        newIsNewProductData.isUnitPrice = false;
        hasError = true;
      }
      if (currentStock <= 0) {
        setStockFieldMessage("Debe ser mayor a 0");
        newIsNewProductData.isStock = false;
        hasError = true;
      }
      if (hasError) {
        setIsNewProductData(newIsNewProductData);
        setIsWaitingResponse(false);
        return;
      }
    }
    
    try {
      await updateProduct(newProductData);
      if (newDiscountId === 'none' && product.Discounts.length > 0) {
        await deleteProductDiscount(product.Discounts[0].ProductDiscounts.id);
      }
      else if (newDiscountId !== 'none' && product.Discounts.length === 0) {
        await addProductDiscount({
          discountId: newDiscountId,
          productId: product.id
        });
      }
      else {
        await updateProductDiscount({
          id: product.Discounts[0].ProductDiscounts.id,
          discountId: newDiscountId
        })
      }
      const updatedProduct = await getProductCategoryImagesDiscountsById(product.id);
      setProduct(updatedProduct);
    } catch (error) {
      console.error('Error while updating Product', error);
    } finally {
      setIsWaitingResponse(false);
      handleClose();
    }
  };

  return (
    <div className="flex flex-col w-full border-b border-mag mb-3 pb-2">
      <div className="flex flex-col p-2 gap-6">
        <div className="flex justify-between items-center gap-2">
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <label
                htmlFor="name"
              >
                <p className='mr-1'>
                  Nombre:
                </p>
              </label>
              <input
                name='name'
                id='name'
                type="text"
                value={newProductData.name}
                onChange={handleInputChange}
                className={`${!isNewProductData.isName && 'border-2 border-warn-red rounded-lg bg-warn-red/20'} w-full p-1 focus:outline-none border-b-2`}
              />
            </div>
          </div>
          <EditingFormButtons
            isWaitingResponse={isWaitingResponse}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <label
              htmlFor="description"
            >
              <p className='text-md mr-1'>
                Descripción:
              </p>
            </label>
            <input
              name="description"
              id='description'
              type='text'
              value={newProductData.description}
              onChange={handleInputChange}
              className={`${!isNewProductData.isDescription && 'border-2 border-warn-red rounded-lg bg-warn-red/20'} w-full resize-none text-md p-1 focus:outline-none border-b-2`}
            />
          </div>
        </div>
        <div className='flex items-center'>
          <label
            htmlFor="newDiscountId"
          >
            <p className='mr-1 mb-1'>
              Descuento:
            </p>
          </label>
          <select
            name="newDiscountId"
            value={newDiscountId}
            onChange={handleDiscountChange}
            className='p-1 rounded-lg border-2 border-black w-full'
          >
            <option
              value="none"
            >
              Ninguno
            </option>
            {discounts.length > 0 && (
              discounts.map((discount) => (
                <option
                  key={discount.id}
                  value={discount.id}
                >
                  {`${discount.name} (${discount.percentage ? discount.percentage * 100 + '%' : '$' + discount.amount})`}
                </option>
              ))
            )}
          </select>
        </div>
        <div className='mb-2 flex justify-between flex-wrap gap-4'>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <label htmlFor="unitPrice">
                <p className='mr-1'>
                  Precio: $
                </p>
              </label>
              <input
                type="number"
                name='unitPrice'
                id='unitPrice'
                value={newProductData.unitPrice}
                onChange={handleInputChange}
                className={`${!isNewProductData.isUnitPrice && 'border-2 border-warn-red rounded-lg bg-warn-red/20'} text-center w-[60px] focus:outline-none border-b-2 p-1`}
              />
            </div>
            <FormFieldWarning
              hiddingDisplay='hidden'
              isFormField={priceFieldMessage === 'Requerido' ? true : isNewProductData.isUnitPrice}
              message={priceFieldMessage}
            />
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <label htmlFor="stock">
                <p className='mr-1'>
                  Inventario:
                </p>
              </label>
              <input
                type="number"
                name='stock'
                id='stock'
                value={newProductData.stock}
                onChange={handleInputChange}
                className={`${!isNewProductData.isStock && 'border-2 border-warn-red rounded-lg bg-warn-red/20'} text-center w-[60px] focus:outline-none border-b-2 p-1`}
              />
            </div>
            <FormFieldWarning
              hiddingDisplay='hidden'
              isFormField={stockFieldMessage === 'Requerido' ? true : isNewProductData.isStock}
              message={stockFieldMessage}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        <div className="w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
          <p>Marca:</p>
          <input
            type="text"
            name='brand'
            value={newProductData.brand}
            onChange={handleInputChange}
            className={`${!isNewProductData.isBrand && 'border-2 border-warn-red rounded-lg bg-warn-red/20 mt-1'} text-center w-[75px] focus:outline-none border-b-2 p-1`}
          /> 
        </div>
        <div className="w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
          <p>Tamaño:</p>
          <input
            type="text"
            name='size'
            value={newProductData.size}
            onChange={handleInputChange}
            className={`${!isNewProductData.isSize && 'border-2 border-warn-red rounded-lg bg-warn-red/20 mt-1'} text-center w-[75px] focus:outline-none border-b-2 p-1`}
          />
        </div>
        <div className="w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
          <p className='mb-1'>Categoría:</p>
          <select
            name="categoryId"
            value={newProductData.categoryId}
            onChange={handleInputChange}
            className='w-[80px] rounded-lg border-2 border-black p-1'
          >
          {categories.length > 0 && (
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))
          )}
        </select>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;