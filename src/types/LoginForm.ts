export type LoginRequestError = {
  errors?: {
    email?: {
      msg: string
    },        
    password?: {
      msg: string
    }
  },
  error?: string 
}

export type loginFormErrors = {
  email?: string,
  password?: string,
  general?: string
}