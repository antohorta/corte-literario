interface ICart {
    isbn: string,
    titulo: string,
    autor: string,
    portada: string,
    precio: number,
    stock: number,
    descuento: number,
    cantidad: number,
}

export type { ICart }