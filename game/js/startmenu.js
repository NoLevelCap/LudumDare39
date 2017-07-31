var STARTMENU;

function loadStartMenu(){
  console.log("loading startmenu");
  STARTMENU = new Container();
  stage.addChild(STARTMENU);

  back = new Extras.TilingSprite(Tex_Main["EventBack.png"], 1280, 960);
  back.interactive = true;
  STARTMENU.addChild(back);

  shipName = new PIXI.Text("Ship Name:",{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'center'});
  shipName.x = 1280 - 32 -shipName.width - 8;
  shipName.y = 600 - shipName.height/2;
  STARTMENU.addChild(shipName);

  nt = new TextField("The Kobayashi Maru", 1280-32, 640, 512, 48);
  STARTMENU.textField = nt;
  STARTMENU.addChild(nt.field);

  subButton = new button("Sail!", Tex_Main["Button_UI.png"], 1280-144-32, 668, 144, 48, function(){startGame()});
  STARTMENU.addChild(subButton.Sprite);
}

function TextField(placeholder, x, y, w, h){
  this.field = new Container();
  this.field.position.set(x, y);

  this.text = new PIXI.Text(placeholder,{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'center'});
  this.background = new Sprite(Tex_Main["dis.png"]);
  this.background.width = w;
  this.background.height = h;
  this.background.anchor.set(1, 0.5);
  this.background.interactive = true;

  this.text.x = -this.text.width - 8;
  this.text.y = -this.text.height/2 - 4;

  this.field.addChild(this.background);
  this.field.addChild(this.text);

  _this = this;

  this.shift = false;
  this.placeholdered = true;
  this.mLength = 32;

  this.downHandler = function(event){
    if (event.keyCode >= 48 && event.keyCode <= 57 && _this.text.text.length < _this.mLength){
      if(_this.placeholdered){
        _this.text.text = _this.text.text.substring(0, 0);
        _this.placeholdered = false;
      }
      _this.text.text += event.key;
    } else if (event.keyCode >= 65 && event.keyCode <= 90 && _this.text.text.length < _this.mLength){
      if(_this.placeholdered){
        _this.text.text = _this.text.text.substring(0, 0);
        _this.placeholdered = false;
      }
      if(!_this.shift){
        _this.text.text += event.key;
      } else {
        _this.text.text += event.key.toUpperCase();
      }
    } else if (event.keyCode == 32){
      _this.text.text += " ";
    } else if (event.keyCode == 16){
      _this.shift = true;
    } else if (event.keyCode == 8){
      _this.text.text = _this.text.text.substring(0, _this.text.text.length-1);
    }
    _this.text.x = -_this.text.width - 8;
    _this.text.y = -_this.text.height/2 - 4;
  }

  this.upHandler = function(event){
    if (event.keyCode == 16){
      _this.shift = false;
    }
  }

  window.addEventListener(
    "keydown", _this.downHandler.bind(), false
  );
  window.addEventListener(
    "keyup", _this.upHandler.bind(), false
  );
}
