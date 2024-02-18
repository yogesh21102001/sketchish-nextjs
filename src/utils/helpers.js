import { Buffer } from "buffer";
import jwt_decode from 'jwt-decode';

export function isEmpty(arg) {
  return (
    arg == null || // Check for null or undefined
    arg.length === 0 || // Check for empty String (Bonus check for empty Array)
    (typeof arg === "object" && Object.keys(arg).length === 0) // Check for empty Object or Array
  );
}

export function isAuthenticated() {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.token) return user;
    else return false;
  } else return false;
}

export function convertToOutlineStroke(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const image = new Image();

      image.onload = () => {
        const svg = image.contentDocument;
        const path = svg.getElementsByTagName("path")[0];
        const length = path.getTotalLength();

        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        const svgString = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml" });

        resolve(svgBlob);
      };

      image.onerror = () => {
        reject("Failed to load SVG image.");
      };

      image.src = dataUrl;
    };

    reader.readAsDataURL(blob);
  });
}

export function decodeSvgBuffer(
  data,
  fill,
  stroke,
  strokeColor,
  backgroundColor
) {
  const buff = new Buffer.from(data);
  // const base64data = buff.toString("base64");

  const processedSvg = processSimpSVG(
    buff.toString(),
    fill,
    stroke,
    strokeColor,
    backgroundColor
  );

  const processedBuff = new Buffer.from(processedSvg);

  return `data:image/svg+xml;base64,${processedBuff.toString("base64")}`;
}

export function processSimpSVG(
  svg,
  fill,
  stroke,
  strokeColor,
  backgroundColor
) {
  const colors = new Set();
  // Create a temporary element to parse the SVG string
  const tempElement = document.createElement("div");
  tempElement.innerHTML = svg;

  // Find the SVG element within the temporary element
  const svgElement = tempElement.querySelector("svg");
  const pathElements = tempElement.querySelectorAll("path");
  const elements = tempElement.querySelectorAll("[fill], [stroke]");

  elements.forEach((el) => {
    const fill = el.getAttribute("fill");
    const stroke = el.getAttribute("stroke");
    if (fill && fill !== "none") colors.add(fill);
    if (stroke && stroke !== "none") colors.add(stroke);
  });

  if (fill && fill !== "notset")
    pathElements.forEach((element) => {
      const pathData = element.getAttribute("d");
      const isClosed = pathData.endsWith("Z") || pathData.endsWith("z");

      if (isClosed) element.setAttribute("fill", fill);
    });

  if (stroke && stroke !== 2)
    pathElements.forEach((element) =>
      element.setAttribute("stroke-width", stroke)
    );

  if (strokeColor && strokeColor !== "#000000")
    pathElements.forEach((element) =>
      element.setAttribute("stroke", strokeColor)
    );

  if (backgroundColor && backgroundColor !== "notset")
    svgElement.setAttribute("style", `background-color: ${backgroundColor}`);

  // Convert the modified SVG element back to a string
  const modifiedSVG = svgElement.outerHTML;

  // Return the modified SVG string
  return modifiedSVG;
}

export function replaceSpacesWithHyphens(inputString = "") {
  return inputString?.replace(/\s+/g, '-');
}

export function replaceHyphensWithSpaces(inputString = "") {
  return inputString?.replace(/-/g, ' ');
}


export function isBufferValidSVG(buffer) {
  const svgRegex = /<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>/;
  const str = buffer.toString();
  return svgRegex.test(str);
}


export function filterUniqueByObjectId(arr = []) {
  const uniqueMap = new Map();
  arr.forEach(item => {
    if (!uniqueMap.has(item.label)) {
      uniqueMap.set(item.label, item);
    }
  });
  console.log(Array.from(uniqueMap.values()));
  return Array.from(uniqueMap.values());
}

export function objectToQueryString(obj, prefix) {
  let str = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      let key = prefix ? `${prefix}[${prop}]` : prop;
      let value = obj[prop];
      if (value !== null && typeof value === 'object') {
        str.push(objectToQueryString(value, key));
      } else {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }
  return str.join('&');
}

export const isTokenExpired = () => {
  const user = localStorage.getItem('user');
  const navigate = () => window.location.href = '/'

  if (user) {
    const decodedToken = jwt_decode(JSON.parse(user)?.token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decodedToken.exp < currentTime){
      navigate()
    }

    return decodedToken.exp < currentTime;
  }

  return true; // No token found, consider it as expired
};

export function formatDate(inputDateString) {
  // Create a Date object from the input string
  const inputDate = new Date(inputDateString);

  // Define month names for formatting
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Extract day, month, and year from the Date object
  const day = inputDate.getDate();
  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear().toString().slice(-2);

  // Format the date string
  const formattedDateString = `${day} ${month}, ${year}`;

  // Return the formatted date string
  return formattedDateString;
}

export function formatDateByMonth(inputDate) {
  const dateParts = inputDate.split('/');
  const month = parseInt(dateParts[0]);
  const day = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formattedDate = `${months[month - 1]} ${day}, ${year}`;
  return formattedDate;
}