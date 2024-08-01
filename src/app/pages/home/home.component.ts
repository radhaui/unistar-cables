import { Component } from '@angular/core';
import { PdfService } from '../../servicess/pdfServices';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private pdfService: PdfService) {}

  public async downloadPDF() {
    const accordion = document.querySelectorAll('.accordion-collapse');
    this.toggleAccordian(accordion);
    const url = await this.pdfService.captureScreen("contentToConvert");
    if (url) {
      window.open(url);
    }
    this.toggleAccordian(accordion);
  }
  toggleAccordian(accordion: NodeListOf<Element>){
    accordion.forEach(content => {
      content.classList.toggle('show');
    });
  }
}
