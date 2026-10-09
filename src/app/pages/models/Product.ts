import { Category } from "./Category";

export interface Product {
    id: string;
    nombre: string;
    categoria: Category;
    presentacion: string;
    duracion?: string;
    precioNormal: number;
    precioSocio?: number;
    nuevo?: boolean;
    agotado?: boolean;
    oferta?: number;
    imagen?: string; //ruta traida desde la base de datos
}
