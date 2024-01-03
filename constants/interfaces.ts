export interface Family {
  id: string
  name: string
  users: any[]
}

export interface User {
  name: string
  email: string
  familiesId?: string[]
}
