import { Component, computed, signal } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { NavbarComponent } from "../components/navbar.component";

@Component({
    selector: "app-recetas",
    templateUrl: "./recetas.component.html",
    styleUrl: "./recetas.component.css",
    standalone: true,
    imports: [NavbarComponent]
})

export class RecetasComponent {
    private readonly recetas: Recipe[] = [
        {
            id: 'lucuma',
            titulo: 'Helado con pulpa de lúcuma',
            base: 'Base Soft Neutro',
            descripcion: 'La receta del mes: un helado soft cremoso con el sabor de la lúcuma.',
            ingredientes: [
                { nombre: 'Base Soft neutro', gramos: 367 },
                { nombre: 'Agua', gramos: 700 },
                { nombre: 'Pulpa de lúcuma', gramos: 320 },
                { nombre: 'Leche descremada', gramos: 35 },
            ],
            pasos: [
                'Mezcla la base para helados con la pulpa, la leche descremada y el agua.',
                'Vierte la mezcla en la tolva de la máquina soft y espera hasta que esté lista.',
                'Sirve el helado.',
                'Decora con el topping de tu preferencia.',
            ],
        },
    ];

    private readonly whatsapp = "51923780483";
    private readonly multiplicadores = [1, 2, 3, 5];
    private readonly seleccion = signal(0);
    private readonly multiplicador = signal(1);

    private readonly receta = computed(() => this.recetas[this.seleccion()]);

    private readonly ingredients = computed(() =>
        this.receta().ingredientes.map((i) => ({
            nombre: i.nombre,
            gramos: Math.round(i.gramos * this.multiplicador() * 10) / 10,
        })),
    );

    private readonly totalGramos = computed(() =>
        this.ingredients().reduce((total, i) => total + i.gramos, 0),
    );

    elegir(indice: number) {
        this.seleccion.set(indice);
        this.multiplicador.set(1);
    }

    escalar(m: number) {
        this.multiplicador.set(m);
    }

    formato(gramos: number): string {
        return gramos >= 1000
            ? (gramos / 1000).toLocaleString('es-PE', { maximumFractionDigits: 2 }) + ' kg'
            : gramos.toLocaleString('es-PE', { maximumFractionDigits: 1 }) + ' g';
    }

    linkWhatsapp(): string {
        const texto = `Hola, quiero pedir los insumos para la receta: ${this.receta().titulo} (${this.receta().base})`;
        return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(texto)}`;
    }

}
