import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Renders an on-screen (or off-screen) DOM element to a paginated, printable
 * PDF and triggers a browser download.
 *
 * The element is captured as a single tall raster image (via html2canvas)
 * and then sliced into as many A4 pages as required, so long reports such as
 * the Financial Diagnosis report are not squeezed onto - or cropped by - a
 * single page.
 *
 * @param element   The element to capture. It should have a fixed, print-friendly
 *                  width (e.g. ~800px) so text/tables reflow the same way every time,
 *                  regardless of the viewer's actual screen width.
 * @param fileName  File name for the downloaded PDF, without the ".pdf" extension.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  fileName: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2, // Render at 2x for crisp text/lines instead of a blurry screenshot.
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidthPt = pdf.internal.pageSize.getWidth();
  const pageHeightPt = pdf.internal.pageSize.getHeight();

  // How many source canvas pixels correspond to one PDF page, once the
  // canvas width is scaled down to fill the PDF page width.
  const pxPerPage = (pageHeightPt * canvas.width) / pageWidthPt;

  const pageCanvas = document.createElement("canvas");
  const pageCtx = pageCanvas.getContext("2d");
  if (!pageCtx) {
    throw new Error("Could not get a 2D canvas context to paginate the PDF.");
  }
  pageCanvas.width = canvas.width;

  let renderedPx = 0;
  let pageIndex = 0;

  while (renderedPx < canvas.height) {
    const sliceHeightPx = Math.min(pxPerPage, canvas.height - renderedPx);
    pageCanvas.height = sliceHeightPx;

    pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
    pageCtx.drawImage(
      canvas,
      0,
      renderedPx,
      canvas.width,
      sliceHeightPx,
      0,
      0,
      canvas.width,
      sliceHeightPx
    );

    const sliceHeightPt = (sliceHeightPx * pageWidthPt) / canvas.width;

    if (pageIndex > 0) {
      pdf.addPage();
    }
    // JPEG (vs. PNG) keeps the file a few MB instead of tens of MB for a
    // report this size, with no visible loss on text/tables at this quality.
    pdf.addImage(
      pageCanvas.toDataURL("image/jpeg", 0.92),
      "JPEG",
      0,
      0,
      pageWidthPt,
      sliceHeightPt
    );

    renderedPx += sliceHeightPx;
    pageIndex++;
  }

  pdf.save(`${fileName}.pdf`);
}
