type FileUploadArgs = {
  selectedImage?: any
  imageLink?: string
  altText?: string
  fileName?: string
} & ({ selectedImage: any } | { imageLink: string })

type AssetUploadArgs = {
  selectedAsset?: any
  assetLink?: string
  fileName?: string
} & ({ selectedAsset: any } | { assetLink: string })

type AssetUploadRes = {
  imageName: string
  altText: string
  imageURL: string
  extension: string
}[]

type UserGroups = string
interface BagelUser {
  userID?: string
  email?: string
  createdDate?: string
  lastLoggedIn?: string
  userGroups?: UserGroups[]
}

type BagelStorageType =
  | Storage
  | {
      getItem: <T>(key: string, callback?: (err: any, value: T | null) => void) => Promise<T | null>

      setItem: <T>(key: string, value: T, callback?: (err: any, value: T) => void) => Promise<T>

      removeItem: (key: string, callback?: (err: any) => void) => Promise<void>

      clear?: (callback?: (err: any) => void) => Promise<void>

      length?: (callback?: (err: any, numberOfKeys: number) => void) => Promise<number>

      key?: (keyIndex: number, callback?: (err: any, key: string) => void) => Promise<string>

      keys?: (callback?: (err: any, keys: string[]) => void) => Promise<string[]>

      iterate?: <T, U>(
        iteratee: (value: T, key: string, iterationNumber: number) => U,
        callback?: (err: any, result: U) => void,
      ) => Promise<U>
    }

interface BagelConfigOptions {
  [key: string]: any
  isServer?: boolean
  customStorage?: BagelStorageType
  baseEndpoint?: string
  enableDebug?: boolean
}

type DateQuery = `Date(${number}${number}${number}${number}-${number}${number}-${number}${number})`

export type {
  AssetUploadArgs,
  AssetUploadRes,
  BagelConfigOptions,
  BagelStorageType,
  BagelUser,
  DateQuery,
  FileUploadArgs as fileUploadArgs,
  FileUploadArgs,
  UserGroups,
}
