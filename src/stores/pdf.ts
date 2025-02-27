import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPdf = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  try {
    // Use html2canvas to capture the full height of the element
    const canvas = await html2canvas(element, {
      scale: 2, // Increase resolution
      useCORS: true, // Allow cross-origin images
      windowWidth: element.scrollWidth, // Set width to include all content
      windowHeight: element.scrollHeight, // Set height to include all content
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    // Split content into multiple pages if it exceeds one page
    let yOffset = 0;
    while (yOffset < canvas.height) {
      const pageCanvas = document.createElement("canvas");
      const pageContext = pageCanvas.getContext("2d")!;
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(canvas.height - yOffset, canvas.width * (297 / 210)); // A4 aspect ratio (mm)

      pageContext.drawImage(
        canvas,
        0,
        yOffset,
        canvas.width,
        pageCanvas.height,
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      );

      const pageImgData = pageCanvas.toDataURL("image/png");
      pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, (pageCanvas.height * pdfWidth) / pageCanvas.width);

      yOffset += pageCanvas.height;

      if (yOffset < canvas.height) {
        pdf.addPage();
      }
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
  }
};
