import { Ingredient } from "./Ingredient";

export interface Recipe {
    id: string;
    titulo: string;
    base: string;
    descripcion?: string;
    ingredientes: Ingredient[];
    pasos: string[];
    imagen?: string; // ej: 'assets/recetas/helado-lucuma.png'
    videoUrl?: string; // enlace del QR "Video de la receta"
}
