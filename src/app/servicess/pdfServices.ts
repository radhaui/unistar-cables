// pdf.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  public async captureScreen(elementId: string): Promise<string> {
    const data = document.getElementById(elementId);
    if (data) {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const options = {
        scale: 2,
      };

      const canvas = await html2canvas(data, options);
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 190; // A4 width in mm minus margins (210 - 2*10)
      const pageHeight = 297; // A4 height in mm
      const margin = 10; // Margin size in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = margin;

      // First page
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - 2 * margin);

      // Additional pages
      while (heightLeft >= 0) {
        position = margin - heightLeft; // Reset position to top margin for new page
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - 2 * margin);
      }

      // Convert the pdf to Blob and create a URL
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      return pdfUrl;
    }
    return '';
  }
}
