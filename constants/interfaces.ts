export interface Folder {
  name: string
  id: string
  data: any[]
}

export interface Family {
  id: string
  name: string
  users: string[]
  admin: string
  password: string
  folder: Folder[]
}

export interface User {
  name: string
  email: string
  familiesId?: string[]
  currentFamilyId?: string
}
