import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addProduct, fetchProduct, updateProduct } from '@/utils/api'
import type { Product } from '@/types/product'

export const useProductStore = defineStore('product', () => {
  const product = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  const createProduct = async (newProduct: Product) => {
    loading.value = true
    error.value = null
    success.value = null

    try {
      const data = await addProduct(newProduct)
      success.value = 'Product added successfully'
      return data
    } catch (err) {
      error.value = 'Failed to add product'
      console.error('Error adding product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getProduct = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const data = await fetchProduct(id)
      product.value = data
      return data
    } catch (err) {
      error.value = 'Failed to fetch product'
      console.error('Error fetching product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const editProduct = async (id: number, updatedProduct: Product) => {
    loading.value = true
    error.value = null
    success.value = null

    try {
      const data = await updateProduct(id, updatedProduct)
      success.value = 'Product updated successfully'
      return data
    } catch (err) {
      error.value = 'Failed to update product'
      console.error('Error updating product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetState = () => {
    product.value = null
    error.value = null
    success.value = null
  }

  return {
    product,
    loading,
    error,
    success,
    createProduct,
    getProduct,
    editProduct,
    resetState,
  }
})
