import { Buffer } from "buffer";
import { isBufferValidSVG } from "../../utils/helpers";

export default function useProductProcessor() {
  function changeStrokeWidth(element, strokeWidth) {
    if (strokeWidth && strokeWidth !== 2) {
      const elementsWithStroke = ["line", "polyline", "polygon", "rect", "circle", "ellipse", "path", "text", "tspan", "textPath", "use", "image"];
      elementsWithStroke.forEach((child) => {
        const childElements = element.querySelectorAll(child);
        if (childElements) {
          childElements.forEach((element) => element.setAttribute("stroke-width", strokeWidth));
        }
      });
    }
  }


  function processSimpSVG(
    svg,
    backgroundColor,
    strokeWidth,
    oldColors,
    newColors
  ) {
    try {
      const svgStr = new Buffer.from(svg).toString();
      const extractcolors = new Set();
      // Create a temporary element to parse the SVG string
      const tempElement = document.getElementById("IconPage_iconWraper_svg");
      tempElement.innerHTML = svgStr;

      // Find the SVG element within the temporary element
      const svgElement = tempElement.querySelector("svg");
      const elements = tempElement.querySelectorAll("[fill], [stroke]");

      elements.forEach((el) => {
        const fill = el.getAttribute("fill");
        const stroke = el.getAttribute("stroke");
        if (fill && fill !== "none") extractcolors.add(fill);
        if (stroke && stroke !== "none") extractcolors.add(stroke);
      });

      changeStrokeWidth(tempElement, strokeWidth);

      if (backgroundColor && backgroundColor !== "notset")
        svgElement.setAttribute("style", `background-color: ${backgroundColor}`);

      // Convert the modified SVG element back to a string
      let modifiedSVG = svgElement?.outerHTML;

      if (newColors && newColors.length > 0) {
        modifiedSVG = replaceColorsInSVG(modifiedSVG, oldColors, newColors);
      }

      return {
        svg: `data:image/svg+xml;base64,${new Buffer.from(modifiedSVG).toString(
          "base64"
        )}`,
        oldColor: Array.from(extractcolors),
      };
    } catch (error) {
      return {
        svg: ``,
        oldColor: [],
      };
    }

  }

  function replaceColorsInSVG(svgString, oldColors, newColors) {
    let newSvgString = svgString;
    oldColors.forEach((oldColor, index) => {
      const newColor = newColors[index];
      newSvgString = newSvgString?.replaceAll(oldColor, newColor);
    });
    return newSvgString;
  }

  return {
    processSimpSVG,
  };
}
