export interface Error {
  Code: string
  Message: string?
}

export interface Result<T = any> {
  Status: boolean
  Error: Error
  Data: T
}

export interface PageRequest {
  PageIndex: number
  PageSize: number
}

export interface PageResponse<T = any> {
  Total: number
  Rows: List<T>
}
