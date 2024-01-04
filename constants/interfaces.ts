export interface Family {
  id: string
  name: string
  users: string[]
  admin: string
  password: string
}

export interface User {
  name: string
  email: string
  familiesId?: string[]
  currentFamilyId?: string
}
