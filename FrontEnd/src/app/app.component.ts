import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';

  // api del backedn
  private api : string = 'http://localhost:3000/api/'

  // llamar api en consola
  constructor() {
    console.log(this.api)
  }

}
