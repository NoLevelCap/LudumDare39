
function Map(container){
    this.segments = new Array();

    this.generateMap = function(map){
      for (var i = 0; i < 6; i++) {
        ms = new MapSegment(160*i);
        ms.createNode();
        if(i>1&&i<5){
          for (var b = 0; b < getRandomInt(0, 4); b++) {
            ms.createNode();
          }
        }
        this.map.addChild(ms.segment);
        ms.positionNodes();
        this.segments.push(ms);
      }
    }

    this.createConnections = function(){
      console.log(this.segments);
      this.segments[0].nodes[0].addConnection(this.segments[1].nodes[0]);
      this.segments[1].nodes[0].addConnection(this.segments[2].nodes[0]);
      this.segments[2].nodes[0].addConnection(this.segments[3].nodes[0]);
      this.segments[3].nodes[0].addConnection(this.segments[4].nodes[0]);
      this.segments[4].nodes[0].addConnection(this.segments[5].nodes[0]);
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

    this.generateMap();
    this.createConnections();

    this.hideMap();
}

function MapSegment(x){
  this.nodes = new Array();

  this.segment = new Container();
  this.segment.x = x;
  this.segment.y = 0;

  this.createNode = function(){
    this.nodes.push(new Node(this));
  };

  this.positionNodes = function(){
    for (var i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];
      node.Sprite.x = 160/2 - node.Sprite.width/2;
      node.Sprite.y = (480/(this.nodes.length))/2 - node.Sprite.height/2 + (i*(480/(this.nodes.length)));


    }
  }
}

function Node(container){
  this.parent = container;
  this.genX = container.segment.x;
  this.Sprite = new Sprite(Tex_Main["circle.png"]);
  this.Sprite.x = 0;
  this.Sprite.y = 0;
  this.Sprite.width = 48;
  this.Sprite.height = 48;
  this.Sprite.p = this;
  container.segment.addChild(this.Sprite);

  this.connections = new Array();
  this.addConnection = function(node){
    this.connections.push(new Connection(this, node));
  }

}

function Connection(Node1, Node2){
  this.startNode = Node1;
  this.endNode = Node2;

  this.line = new Sprite(Tex_Main["break.png"]);
  this.line.position.set(this.startNode.Sprite.x, this.startNode.Sprite.y);
  this.line.height = 5;
  dy = (this.startNode.Sprite.y - this.endNode.Sprite.y) * -1;
  this.line.width = Math.hypot(160, dy); //use pythagoras to get width;
  dx = 160;
  /*if(dy > 160){
    dx = dy;
    dy = 160;
  }*/

  console.log("Delta y: " + dy + "/ dx: " + dx + " = " + Math.tan(dy/dx))

  val =  Math.tan((dy/dx)/(Math.PI/2));
  /*if(dy > 0){
    val = Math.tan((dy/dx));
  }*/
  //this.line.rotation = 90 * (Math.PI/180);
  this.line.rotation = val;
  this.startNode.parent.segment.addChild(this.line);

  this.gr = new Graphics();
  this.gr.position.set(this.startNode.Sprite.x, this.startNode.Sprite.y);
  this.gr.lineStyle(5, 0xffffff)
       .moveTo(0, 0)
       .lineTo(this.endNode.Sprite.x + 160, this.endNode.Sprite.y-this.startNode.Sprite.y);

  this.startNode.parent.segment.addChild(this.gr);


}
