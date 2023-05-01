
export interface Client {
  id: number,
  nombre: string,
  apellido: string,
  telefono: string,
  email: string,
}


export interface Response {
  codigo: number,
  mensaje: string,
  data: Client,
  page: number,
  pages: number,
  records: number,
  rows: number
  error: any,
  warning: any,
}
