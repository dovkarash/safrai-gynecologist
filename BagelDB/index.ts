import axios, { type AxiosResponse } from 'axios'
import type FormData from 'form-data'
import type { AssetUploadArgs, AssetUploadRes, FileUploadArgs } from './interfaces'

const axiosInstance = axios.create({
  baseURL: 'https://api.bagelstudio.co/api/public/collection',
})

const isServerEnv = () => typeof window === 'undefined'

export class Bagel {
  constructor(token: string) {
    this.token = token
  }

  token = ''

  _perPage = Number.NaN

  headers() {
    return {
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Bearer ${this.token}`,
      },
    }
  }

  _item = ''

  _collection = ''

  item(id: string) {
    this._item = id
    return this
  }

  _query: Record<string, any>[] = []

  _everything = false

  everything() {
    this._everything = true
    return this
  }

  perPage(p: number) {
    this._perPage = p
    return this
  }

  query(slug: string, comparator: string, value: string) {
    this._query.push({ slug, comparator, value })
    return this
  }

  collection(col: string) {
    this._collection = col
    return this
  }

  // perPage

  async get() {
    // Snapshot current state and reset immediately so parallel calls don't interfere
    const collection = this._collection
    const item = this._item
    const everything = this._everything
    const perPage = this._perPage
    const query = this._query
    this._collection = ''
    this._item = ''
    this._everything = false
    this._perPage = Number.NaN
    this._query = []

    let url = `/${collection}/items`
    if (item) url += `/${item}`
    const queryParams = []
    if (everything) queryParams.push('everything=true')
    if (!Number.isNaN(perPage)) queryParams.push(`perPage=${perPage}`)
    if (query.length) {
      const q = query.map((q) => `${q.slug}:${q.comparator}:${q.value}`).join('%2B')
      queryParams.push(`query=${q}`)
    }
    if (queryParams.length) url += `?${queryParams.join('&')}`
    return axiosInstance.get(url, this.headers())
  }

  async post(data: Record<string, any>) {
    return axiosInstance.post(`/${this._collection}/items`, data, this.headers())
  }

  async put(data: Record<string, any>) {
    if (!this._item) throw new Error('No item id provided')
    return axiosInstance.put(`/${this._collection}/items/${this._item}`, data, this.headers())
  }

  async set(data: Record<string, any>) {
    if (!this._item) throw new Error('No item id provided')
    return axiosInstance.put(
      `/${this._collection}/items/${this._item}?set=true`,
      data,
      this.headers(),
    )
  }

  async delete() {
    if (!this._item) throw new Error('No item id provided')
    return axiosInstance.delete(`/${this._collection}/items/${this._item}`, this.headers())
  }

  async uploadImage(
    imageSlug: string,
    { selectedImage, imageLink, altText, fileName }: FileUploadArgs,
  ): Promise<AxiosResponse<any, any>> {
    const form = new globalThis.FormData()

    if (altText) form.append('altText', altText)

    if (imageLink) {
      form.append('imageLink', imageLink)
    } else {
      form.append('imageFile', selectedImage, fileName)
    }

    const url = `/${this._collection}/items/${this._item}/image?imageSlug=${imageSlug}`
    const res = await axiosInstance.put(url, form, this.headers())
    return res
  }

  async uploadAssets(
    assets: Partial<AssetUploadArgs & FileUploadArgs>[],
  ): Promise<AxiosResponse<AssetUploadRes, any>> {
    const form = new globalThis.FormData()

    for (let idx = 0; idx < assets.length; idx++) {
      const { selectedAsset, assetLink, fileName, imageLink, selectedImage } = assets[idx]

      const imageOrAssetLink = assetLink || imageLink
      if (imageOrAssetLink) {
        form.append('urlAssets', imageOrAssetLink)
      } else {
        form.append('fileAssets', selectedAsset || selectedImage, fileName)
      }
    }

    const url = `${this._collection}/assets`
    let formHeaders: FormData.Headers | undefined

    if (isServerEnv()) formHeaders = (form as unknown as FormData).getHeaders()
    const headers = { ...this.headers().headers, ...formHeaders }
    return axiosInstance.post(url, form, { headers })
  }
}
