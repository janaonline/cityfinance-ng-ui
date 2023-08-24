

export interface ResourceListResponse {
    status: boolean
    message: string
    data: CategoryWiseResource[]
  }
  
  export interface CategoryWiseResource {
    _id: string
    documents: Document[]
    name: string
  }
  
  export interface Document {
    url: string
    name: string
    createdAt: string
  }
  