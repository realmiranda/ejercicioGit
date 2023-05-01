
export interface Auto {
  id: number,
  codigo: string,
  marca: string,
  modelo: string,
  foto: string,
  anio: number,
  calificacion: number,
  usuario?: string,
  usuario_mod?: string,

  name?: string,
  color?: string,
  km?: string,
  price?: number,
}

export interface Header {
  id: string,
  label: string,
}

export interface Response {
  codigo: number,
  mensaje: string,
  data: Auto[] | Auto,
  page: number,
  pages: number,
  records: number,
  rows: number
  error: any,
  warning: any,
}
