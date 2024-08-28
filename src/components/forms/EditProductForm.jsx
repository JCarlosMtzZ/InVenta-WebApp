import { useState } from 'react';

import FormFieldWarning from '../FormFieldWarning.jsx';
import EditingFormButtons from '../buttons/EditingFormButtons.jsx';
import DropdownButton from '../buttons/DropdownButton.jsx';
import EditFormInput from '../inputs/EditFormInput.jsx';

import { updateProduct } from '../../services/productsService.js';
import { updateProductDiscount, deleteProductDiscount } from '../../services/productDiscountsService.js';
import { addProductDiscount } from '../../services/productDiscountsService.js';
import { getProductCategoryImagesDiscountsById } from '../../services/productsService.js';

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
              <EditFormInput
                name='name'
                id='name'
                type='text'
                value={newProductData.name}
                isValue={isNewProductData.isName}
                onChange={handleInputChange}
                style='w-full'
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
            <EditFormInput
              name="description"
              id='description'
              type='text'
              value={newProductData.description}
              isValue={isNewProductData.isDescription}
              onChange={handleInputChange}
              style='w-full'
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
          <DropdownButton
            name='newDiscountId'
            id='newDiscountId'
            value={newDiscountId}
            isValue={true}
            onChange={handleDiscountChange}
            defaultOption={<option value='none'>Ninguno</option>}
            data={discounts}
            isDiscountsData={true}
          />
        </div>
        <div className='mb-2 flex justify-between flex-wrap gap-4'>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <label htmlFor="unitPrice">
                <p className='mr-1'>
                  Precio: $
                </p>
              </label>
              <EditFormInput
                type="number"
                name='unitPrice'
                id='unitPrice'
                value={newProductData.unitPrice}
                isValue={isNewProductData.isUnitPrice}
                onChange={handleInputChange}
                style='text-center w-[60px]'
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
              <EditFormInput
                type="number"
                name='stock'
                id='stock'
                value={newProductData.stock}
                isValue={isNewProductData.isStock}
                onChange={handleInputChange}
                style='text-center w-[60px]'
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
          <EditFormInput
            type="text"
            name='brand'
            value={newProductData.brand}
            isValue={isNewProductData.isBrand}
            onChange={handleInputChange}
            style='text-center w-[75px]'
          /> 
        </div>
        <div className="w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
          <p>Tamaño:</p>
          <EditFormInput
            type="text"
            name='size'
            value={newProductData.size}
            isValue={isNewProductData.isSize}
            onChange={handleInputChange}
            style='text-center w-[75px]'
          />
        </div>
        <div className="w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
          <p className='mb-1'>Categoría:</p>
          <DropdownButton
            name='categoryId'
            id='categoryId'
            value={newProductData.categoryId}
            isValue={true}
            onChange={handleInputChange}
            data={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;