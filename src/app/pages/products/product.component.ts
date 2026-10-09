import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { NavbarComponent } from '../components/navbar.component';
import { ModalPaymentComponent } from '../components/modal_payment/modal_payment.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    imports: [NavbarComponent, ModalPaymentComponent]
})

export class ProductComponent {
    protected readonly productoParaPagar = signal<Product | null>(null);
    protected readonly submissionNotice = signal(false);
    private readonly whatsapp = "51923780483";
    private readonly categorias: { id: Category | 'todos'; label: string; icono: string }[] = [
        { id: 'todos', label: 'Todos', icono: '🍦' },
        { id: 'bases', label: 'Bases', icono: '🥛' },
        { id: 'conos', label: 'Conos y barquillos', icono: '🍦' },
        { id: 'envases', label: 'Envases', icono: '🥤' },
        { id: 'toppings', label: 'Toppings', icono: '🍫' },
        { id: 'accesorios', label: 'Accesorios', icono: '🥄' },
    ];

    private readonly productos: Product[] = [
        // Bases
        { id: 'b1', nombre: 'Vainilla 2.0', categoria: 'bases', presentacion: 'Bolsa de 1.100 kg', duracion: '18 meses', precioNormal: 23, precioSocio: 21, nuevo: true },
        { id: 'b2', nombre: 'Chocolate Premium', categoria: 'bases', presentacion: 'Bolsa de 1.100 kg', duracion: '18 meses', precioNormal: 25, precioSocio: 23 },
        { id: 'b3', nombre: 'Base soft clásica (Fresa, Coco, Lúcuma y más)', categoria: 'bases', presentacion: 'Bolsa de 1.100 kg', duracion: '18 meses', precioNormal: 23, precioSocio: 21 },
        { id: 'b4', nombre: 'Base soft especial (Maracuyá, Mango, Mora y más)', categoria: 'bases', presentacion: 'Bolsa de 1.100 kg', duracion: '18 meses', precioNormal: 24, precioSocio: 22 },
        { id: 'b5', nombre: 'Base neutro soft', categoria: 'bases', presentacion: 'Bolsa de 1.100 kg', duracion: '18 meses', precioNormal: 23, precioSocio: 21 },
        { id: 'b6', nombre: 'Rendidor (Lúcuma, Fresa, Vainilla)', categoria: 'bases', presentacion: 'Bolsa de 1.460 kg', duracion: '18 meses', precioNormal: 28, precioSocio: 26 },
        { id: 'b7', nombre: 'Base frito neutro', categoria: 'bases', presentacion: 'Bolsa de 1.500 kg', duracion: '18 meses', precioNormal: 28, precioSocio: 27 },
        { id: 'b8', nombre: 'Base frito neutro', categoria: 'bases', presentacion: 'Bolsa de 1.000 kg', duracion: '18 meses', precioNormal: 23, precioSocio: 22 },

        // Conos y barquillos
        { id: 'c1', nombre: 'Cono americano vainilla Alem', categoria: 'conos', presentacion: 'Caja de 450 unds', duracion: '10 meses', precioNormal: 65, precioSocio: 63 },
        { id: 'c2', nombre: 'Cono americano chocolate Alem', categoria: 'conos', presentacion: 'Caja de 450 unds', duracion: '10 meses', precioNormal: 68, precioSocio: 66, agotado: true },
        { id: 'c3', nombre: 'Mini cono americano vainilla Alem', categoria: 'conos', presentacion: 'Caja de 475 unds', duracion: '10 meses', precioNormal: 69, precioSocio: 67 },
        { id: 'c4', nombre: 'Cono italiano Alem', categoria: 'conos', presentacion: 'Caja de 275 unds', duracion: '10 meses', precioNormal: 87, precioSocio: 85, nuevo: true },
        { id: 'c5', nombre: 'Megacono', categoria: 'conos', presentacion: 'Caja de 48 unds', duracion: '4 meses', precioNormal: 23, precioSocio: 21 },
        { id: 'c6', nombre: 'Waflines', categoria: 'conos', presentacion: 'Bolsa de 50 unds', duracion: '8 meses', precioNormal: 14, precioSocio: 12 },

        // Envases
        { id: 'e1', nombre: 'Container de 8 oz', categoria: 'envases', presentacion: '100 unds · Polipapel', precioNormal: 27, precioSocio: 25 },
        { id: 'e2', nombre: 'Container de 6 oz', categoria: 'envases', presentacion: '100 unds · Polipapel', precioNormal: 25, precioSocio: 23 },
        { id: 'e3', nombre: 'Container de 4 oz', categoria: 'envases', presentacion: '100 unds · Polipapel', precioNormal: 21, precioSocio: 19.5 },
        { id: 'e4', nombre: 'Vaso escalonado 6.5 oz', categoria: 'envases', presentacion: '100 unds · Acrílico', precioNormal: 34, precioSocio: 32 },
        { id: 'e5', nombre: 'Cucharitas acrílicas', categoria: 'envases', presentacion: '100 unds', precioNormal: 7.5, precioSocio: 6.5 },

        // Toppings
        { id: 't1', nombre: 'Fudge Musa', categoria: 'toppings', presentacion: 'Frasco de 550 g', duracion: '1 año', precioNormal: 14.5, precioSocio: 14 },
        { id: 't2', nombre: 'Dulce de leche Musa', categoria: 'toppings', presentacion: 'Frasco de 550 g', duracion: '1 año', precioNormal: 15.5, precioSocio: 15 },
        { id: 't3', nombre: 'Jaleas pulpa de frutas', categoria: 'toppings', presentacion: 'Bolsa de 1 kg', duracion: '8 meses', precioNormal: 17.5, precioSocio: 17 },
        { id: 't4', nombre: 'Palitos de colores', categoria: 'toppings', presentacion: 'Peso 1 kg', duracion: '12 meses', precioNormal: 22.5, precioSocio: 18 },
        { id: 't5', nombre: 'Oreo en trozos', categoria: 'toppings', presentacion: 'Peso 500 g', duracion: '12 meses', precioNormal: 16, precioSocio: 14 },
        { id: 't6', nombre: 'Chocochips semiamargos', categoria: 'toppings', presentacion: 'Peso 1 kg', duracion: '8 meses', precioNormal: 33, precioSocio: 31.5, oferta: 25 },

        // Accesorios
        { id: 'a1', nombre: 'Batidora de inmersión Thomas 600 W', categoria: 'accesorios', presentacion: 'Color blanco', precioNormal: 209 },
        { id: 'a2', nombre: 'Vaselina pura', categoria: 'accesorios', presentacion: 'Frasco de 80 g', precioNormal: 10.5 },
        { id: 'a3', nombre: 'Espátula de silicona Eco', categoria: 'accesorios', presentacion: 'Marca Alcosa', precioNormal: 18, precioSocio: 16 },
        { id: 'a4', nombre: 'Cucharón dosificador 1 oz', categoria: 'accesorios', presentacion: '29 ml · Mr. Cremoso', precioNormal: 21.5, precioSocio: 20.5 },
    ]

    constructor(route: ActivatedRoute) {
        this.submissionNotice.set(route.snapshot.queryParamMap.get('correo') === 'ok');
    }

    private readonly categoryActive = signal<Category | 'todos'>('todos');
    private readonly busqueda = signal('');

    private readonly filtrados = computed(() => {
        const cat = this.categoryActive();
        const q = this.busqueda().toLowerCase();

        return this.productos.filter(p => (cat === 'todos' || p.categoria === cat) && p.nombre.toLowerCase().includes(q));
    });

    seleccionar(cat: Category | 'todos') {
        this.categoryActive.set(cat);
    }

    protected abrirPago(producto: Product): void {
        this.productoParaPagar.set(producto);
    }

    protected cerrarPago(): void {
        this.productoParaPagar.set(null);
    }

    buscar(e: Event) {
        this.busqueda.set((e.target as HTMLInputElement).value);
    }

    icono(cat: Category | 'todos') {
        return this.categorias.find((c) => c.id === cat)?.icono ?? '🍦';
    }

    precio(valor: number): string {
        return 'S/.' + valor.toFixed(2);
    }

    linkWhatsapp(p: Product): string {
        const texto = `Hola, quiero consultar por: ${p.nombre} (${p.presentacion})`;
        return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(texto)}`;
    }

}
