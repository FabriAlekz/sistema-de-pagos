import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../components/navbar.component';

@Component({
    selector: 'app-contacto',
    standalone: true,
    imports: [ReactiveFormsModule, NavbarComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent {
    private readonly fb = inject(FormBuilder);

    readonly areas = [
        { id: 'ventas', label: 'Ventas', numero: '51923780483' },
        { id: 'cliente', label: 'Atención al cliente', numero: '51947295946' },
    ];

    readonly intereses = [
        'Bases para helado soft',
        'Bases para helado frito',
        'Conos y barquillos',
        'Envases y complementos',
        'Toppings y coberturas',
        'Accesorios y equipos',
        'Precios al por mayor / socio',
        'Otro',
    ];

    readonly form = this.fb.nonNullable.group({
        area: ['ventas', Validators.required],
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
        ciudad: [''],
        interes: ['', Validators.required],
        mensaje: ['', Validators.maxLength(500)],
    });

    enviado = false;

    campoInvalido(nombre: 'nombre' | 'telefono' | 'interes'): boolean {
        const c = this.form.controls[nombre];
        return c.invalid && (c.touched || this.enviado);
    }

    enviar() {
        this.enviado = true;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const v = this.form.getRawValue();
        const area = this.areas.find((a) => a.id === v.area) ?? this.areas[0];

        const datos = [
            `Nombre: ${v.nombre.trim()}`,
            `Teléfono: ${v.telefono}`,
            v.ciudad.trim() ? `Ciudad: ${v.ciudad.trim()}` : '',
            `Me interesa: ${v.interes}`,
            v.mensaje.trim() ? `Mensaje: ${v.mensaje.trim()}` : '',
        ].filter(Boolean);

        const texto = ['Hola, quiero hacer una consulta.', '', ...datos].join('\n');
        const url = `https://wa.me/${area.numero}?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank', 'noopener');
    }
}
