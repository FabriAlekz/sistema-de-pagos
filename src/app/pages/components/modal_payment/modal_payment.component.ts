import { Component, computed, EventEmitter, Input, Output, signal } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Product } from "../../models/Product";

@Component({
    selector: "app-modal-payment",
    templateUrl: './modal_payment.component.html',
    styleUrl: './modal_payment.component.css',
    standalone: true,
    imports: [DecimalPipe]
})

export class ModalPaymentComponent {
    @Input({ required: true }) product!: Product;
    @Output() closed = new EventEmitter<void>();

    protected readonly quantity = signal(1);
    protected readonly unitPrice = computed(() => this.product.oferta ?? this.product.precioNormal);
    protected readonly total = computed(() => this.unitPrice() * this.quantity());

    protected updateQuantity(event: Event): void {
        const value = Number((event.target as HTMLInputElement).value);
        this.quantity.set(Number.isInteger(value) && value > 0 ? Math.min(value, 99) : 1);
    }

    protected close(): void {
        this.closed.emit();
    }

    protected prepareFormSubmit(event: SubmitEvent): void {
        const form = event.currentTarget as HTMLFormElement;
        const nextUrl = form.elements.namedItem('_next');

        if (nextUrl instanceof HTMLInputElement) {
            const returnUrl = new URL(window.location.href);
            returnUrl.searchParams.set('correo', 'ok');
            nextUrl.value = returnUrl.toString();
        }
    }

    protected closeOnBackdrop(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }
}
