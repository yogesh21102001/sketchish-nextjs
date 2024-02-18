//import Pathformer from './Pathfinder';
import VivusInstant from './vivus';
import ViewerController from './ViewerCtrl';
/**
 * AnimateController class
 * Dirty controller to display the extra
 * options when necessary and output the
 * data into a simple object.
 * It takes a DOM element as parameter which is
 * supposed to content all the required fields of
 * a Vivus option object.
 *
 * Funny enough, we have crazy new features
 * in ES2015(& more)/HTML5/CSS3 and other
 * experiments. But it's still not possible
 * to serialise a form with one method...
 * (please tell me I'm wrong in an issue)
 *
 * @param {DOMelement} el Option dom element
 * @param {ViewerController} viewer Viewer controller
 */
let options = {
  duration: "1000",
  loop: true,
  loopEnd: "1000",
  loopStart: "200",
  loopTransition: "100",
  pathTimingFunction: "linear",
  start: "autostart",
  triggerClass: "start",
  type: "async"
}
function AnimateController(fileName, elementId) {
  this.fileName = fileName
  this.elementId = elementId
  this.viewer = null
  this.vivus = null
  // if (elementId) {
  //   this.viewer = new ViewerController(document.getElementById(elementId), fileName);
  //   new Pathformer(this.viewer.svgTag);
  //   this.vivus = new VivusInstant(this.viewer.svgTag, { ...options, ..._options });
  // }
  // this.draw({ ...options, ..._options });
}
/**
 * Take the values of the options and generate/refresh
 * the SVG
 */
AnimateController.prototype.draw = function (_options = {}) {
  if (this.elementId) {
    this.viewer = new ViewerController(document.getElementById(this.elementId), this.fileName);
    this.vivus = new VivusInstant(this.viewer.svgTag, { ...options, ..._options });
    this.viewer.refreshSVG();
    this.vivus.setOptions({ ...options, ..._options });
    this.vivus.render();
  }
};
/**
 * Trigger the download
 */
AnimateController.prototype.download = function () {
  if (this.viewer) {
    this.viewer.download();
  }
};
/**
 * Trigger the download
 */
AnimateController.prototype.copy = function () {
  if (this.viewer) {
    this.viewer.copy();
  }
};



export default AnimateController;