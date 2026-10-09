import { Component } from "@angular/core";
import { NavbarComponent } from "../components/navbar.component";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrl: "./about.component.css",
    standalone: true,
    imports: [NavbarComponent],
})

export class AboutComponent {

}
