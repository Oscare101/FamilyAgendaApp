export interface Family {
  id: string
  name: string
  users: string[]
  creator: string
}

export interface User {
  name: string
  email: string
  familiesId?: string[]
  currentFamilyId?: string
}
