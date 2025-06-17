export interface ApiResponse<T> {
  data: {
    data: T[]
    meta: {
      total: number
    }
  }
}