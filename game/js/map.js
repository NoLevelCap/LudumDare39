
function Map(container){
    this.generateMap = function(map){

    }

    this.showMap = function(){
      this.mapContainer.visible = true;
    }

    this.hideMap = function(){
      this.mapContainer.visible = false;
    }

    this.mapContainer = new Container();
    container.addChild(this.mapContainer);

    this.back = new Sprite(Tex_Main["break.png"]);
    this.back.width = 1280;
    this.back.height = 960;
    this.mapContainer.addChild(this.back);

    this.map = new Container();
    this.map.x = 640 - 480;
    this.map.y = 480 - 240;
    this.mapContainer.addChild(this.map);

    back = new Extras.TilingSprite(Tex_Main['EventBack.png'], 960, 480);
    back.x = 0;
    back.y = 0;
    this.map.addChild(back);

    for (var i = 0; i < 24; i++) {
      embossTop = new Sprite(Tex_Main['Trim.png']);
      embossTop.x = i * 40;
      embossTop.y = -10;
      this.map.addChild(embossTop);
    }

    for (var i = 0; i < 24; i++) {
      embossTop = new Sprite(Tex_Main['Trim.png']);
      embossTop.x = i * 40;
      embossTop.y = 480;
      this.map.addChild(embossTop);
    }

    this.hideMap();
}
