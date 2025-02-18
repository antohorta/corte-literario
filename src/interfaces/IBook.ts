interface IBook {
    isbn: string,
    titulo: string,
    autor: string,
    portada: string,
    resumen: string,
    paginas: number,
    precio: number,
    stock: number,
    genero: string,
    editorial: string,
    idioma: string,
    encuadernacion: string,
    publicacion: number,
    descuento: number,
    dimensiones: string,
    calificacion: number,
    novedad: boolean
}

export type {IBook}