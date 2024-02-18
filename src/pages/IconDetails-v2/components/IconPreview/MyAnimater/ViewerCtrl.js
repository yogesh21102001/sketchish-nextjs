/**
 * ViewerController class
 * Cheap controller for the viewer.
 * It takes a DOM element as parameter which is
 * supposed to content all the required items of
 * a viewer :
 * - an input:checkbox as theme switcher
 * - an .introbox to welcome people (no, I won't rename it Consuela, noooo...)
 *
 * @param {DOM} el Viewer element
 */
function ViewerController(el, fileName) {
  this.el = el;
  this.fileName = fileName;
  this.svgTag = null;
  this.svgFileName = null;
  this.newSvgCb = null;
  this.downloadAnchor = document.createElement('a');
  this.downloadAnchor.style = 'display: none';
  document.body.appendChild(this.downloadAnchor);
  this.buildSVG()
}

/**
 * SVG content type
 * This is what we are looking for.
 * @type {String}
 */
ViewerController.prototype.SVG_CONTENT_TYPE = 'image/svg+xml';

/**
 * Set up the SVG contained in the 'load' event.
 * And make sure it's valid.
 * @param  {event} event Load event
 */
ViewerController.prototype.buildSVG = function () {

  var svgTags = this.el?.querySelectorAll('svg');
  if (svgTags.length === 0) {
    //throw new Error('Cannot find the SVG tag in your file. You sure it\'s an SVG and not a cat picture?');
  }
  else if (svgTags.length > 1) {
    //throw new Error('Wow! Wait a minute! There\'s more than one SVG in your file. Sorry the rule is one person per ticket.');
  }
  if (svgTags && svgTags.length > 0 && svgTags[0].querySelector('style[data-made-with="openstorke-instant"]')) {
    //throw new Error('This SVG cannot be modified because it was generated with Vivus-instant. Please use the original SVG.')
  }

  this.svgTag = svgTags[0];
  this.newSvgCb && this.newSvgCb(this.svgTag);
};

/**
 * Dirty trick to refresh the SVG animation.
 * The idea is simple, it wait the next browser
 * rendering frame to hide the SVG. Then wait the
 * following one to display it again.
 * TA-DAHHH!!
 * The animation restart!
 * Dirty, right?
 *
 * What if there's a race conditi... shhhhhhhhush!
 */
ViewerController.prototype.refreshSVG = function () {
  var svgTag = this.svgTag;
  requestAnimationFrame(function () {
    svgTag.style.display = 'none';
    requestAnimationFrame(function () {
      svgTag.style.display = '';
    });
  });
};

/**
 * Simulate download to provide the SVG.
 * It shouldn't destroy the content, thats why
 * it's using a div wrap. If there's some extra
 * DOM elements (like Illustrator signature
 * or other stuff..) it will be kept in the output.
 */
ViewerController.prototype.download = function () {
  //const svgWrap = document.getElementById('svgWrap')
  var blob = new Blob([this.el?.innerHTML], { type: this.SVG_CONTENT_TYPE }),
    url = window.URL.createObjectURL(blob);
  this.downloadAnchor.href = url;
  this.downloadAnchor.download = this.fileName + '_animated.svg'
  this.downloadAnchor.click();
  window.setTimeout(function () {
    window.URL.revokeObjectURL(url);
  }, 10);
};
ViewerController.prototype.copy = async function () {
  //const svgWrap = document.getElementById('svgWrap')
  var blob = new Blob([this.el?.innerHTML], { type: "text/plain" });
  await navigator.clipboard.write([
    new window.ClipboardItem({
      [blob.type]: blob,
    }),
  ]);

};

export default ViewerController;