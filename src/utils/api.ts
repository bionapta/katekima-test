import axios from 'axios'
import type { BerryListResponse, BerryDetail } from '@/types/berry'
import type { Product } from '@/types/product'

const berryApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

const productApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export const fetchBerries = async (limit: number = 20, offset: number = 0) => {
  const response = await berryApi.get<BerryListResponse>(`/berry?limit=${limit}&offset=${offset}`)
  return response.data
}

export const fetchBerryDetail = async (id: string) => {
  const response = await berryApi.get<BerryDetail>(`/berry/${id}`)
  return response.data
}

export const addProduct = async (product: Product) => {
  const response = await productApi.post<Product>('/products', product)
  return response.data
}

export const fetchProduct = async (id: number) => {
  const response = await productApi.get<Product>(`/products/${id}`)
  return response.data
}

export const updateProduct = async (id: number, product: Product) => {
  const response = await productApi.put<Product>(`/products/${id}`, product)
  return response.data
}

export const deleteProduct = async (id: number) => {
  const response = await productApi.delete<Product>(`/products/${id}`)
  return response.data
}
