var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    Extras = PIXI.extras,
    debug = new Debug(true),
    Debug = debug,
    Console = console;

WebFontConfig = {
  custom: {
    families: ["Permanent Marker"],
  },
  active: function() {
  }
};

(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
  '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

function Debug(db){
  this.debug = db;
  this.log = function(string){
    if(this.debug){
      console.log(string);
    }
  }
}
