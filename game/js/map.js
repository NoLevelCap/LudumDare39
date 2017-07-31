
var currentNode, visitNode;

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
      for (var i = 0; i < this.segments.length-1; i++) {
        if(this.segments[i].nodes.length > this.segments[i+1].nodes.length){
          if(this.segments[i].nodes.length % this.segments[i+1].nodes.length == 0){
              if(this.segments[i+1].nodes.length != 1){
                this.segments[i].nodes[0].addConnection(this.segments[i+1].nodes[0]);
                this.segments[i].nodes[1].addConnection(this.segments[i+1].nodes[0]);
                this.segments[i].nodes[2].addConnection(this.segments[i+1].nodes[1]);
                this.segments[i].nodes[3].addConnection(this.segments[i+1].nodes[1]);
              } else {
                for (var n = 0; n < this.segments[i].nodes.length; n++) {
                  this.segments[i].nodes[n].addConnection(this.segments[i+1].nodes[0]);
                }
              }
          } else {
              this.segments[i].nodes[0].addConnection(this.segments[i+1].nodes[0]);
              this.segments[i].nodes[1].addConnection(this.segments[i+1].nodes[getRandomInt(0, 2)]);
              this.segments[i].nodes[2].addConnection(this.segments[i+1].nodes[1]);
              if(this.segments[i+1].nodes.length > 2){
                this.segments[i].nodes[3].addConnection(this.segments[i+1].nodes[2]);
              }
          }
        } else if(this.segments[i].nodes.length < this.segments[i+1].nodes.length){
          if(this.segments[i+1].nodes.length % this.segments[i].nodes.length == 0){
            if(this.segments[i].nodes.length != 1){
                this.segments[i].nodes[0].addConnection(this.segments[i+1].nodes[0]);
                this.segments[i].nodes[0].addConnection(this.segments[i+1].nodes[1]);
                this.segments[i].nodes[1].addConnection(this.segments[i+1].nodes[2]);
                this.segments[i].nodes[1].addConnection(this.segments[i+1].nodes[3]);
            } else {
              for (var n = 0; n < this.segments[i+1].nodes.length; n++) {
                this.segments[i].nodes[0].addConnection(this.segments[i+1].nodes[n]);
              }
            }
          } else {
              this.segments[i].nodes[0].addConnection(this.segments[i+1].nodes[0]);
              this.segments[i].nodes[1].addConnection(this.segments[i+1].nodes[2]);
              this.segments[i].nodes[getRandomInt(0, 2)].addConnection(this.segments[i+1].nodes[1]);
              if(this.segments[i].nodes.length > 2){
                this.segments[i].nodes[2].addConnection(this.segments[i+1].nodes[3]);
              }
          }
        } else {
          for (var n = 0; n < this.segments[i].nodes.length; n++) {
            this.segments[i].nodes[n].addConnection(this.segments[i+1].nodes[n]);
          }
        }
      }
    }

    this.showMap = function(){
      this.mapContainer.visible = true;
    }

    this.hideMap = function(){
      this.mapContainer.visible = false;
    }

    this.mapContainer = new Container();
    container.addChild(this.mapContainer);

    this.back = new Extras.TilingSprite(Tex_Main['EventBack.png'], 1280, 580);
    this.mapContainer.addChild(this.back);

    this.map = new Container();
    this.map.x = 640 - 320;
    this.map.y = 50;
    this.mapContainer.addChild(this.map);

    for (var i = 0; i < 32; i++) {
      embossTop = new Sprite(Tex_Main['Trim.png']);
      embossTop.x = i * 40;
      embossTop.y = 0;
      this.mapContainer.addChild(embossTop);
    }

    for (var i = 0; i < 32; i++) {
      embossTop = new Sprite(Tex_Main['Trim.png']);
      embossTop.x = i * 40;
      embossTop.y = 570;
      this.mapContainer.addChild(embossTop);
    }

    this.generateMap();
    this.createConnections();

    currentNode = this.segments[0].nodes[0];
    currentNode.setVisted();

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
      node.Sprite.x = 160/2;
      node.Sprite.y = (480/(this.nodes.length))/2 + (i*(480/(this.nodes.length)));


    }
  }
}

function Node(container){
  this.parent = container;
  this.genX = container.segment.x;
  this.Sprite = new Sprite(Tex_Main["WrittenCircle.png"]);
  this.Sprite.x = 0;
  this.Sprite.y = 0;
  this.Sprite.width = 64;
  this.Sprite.height = 64;
  this.Sprite.anchor.set(0.5, 0.5);
  this.Sprite.p = this;
  this.Sprite.interactive = true;

  this.visited = false;

  this.floating = false;
  this.sy = 0;

  this.Sprite.on('mouseover', function(){
    this.p.floating = true;
    this.p.sy = this.y;
  })
  .on('mouseout', function(){
    this.p.floating = false;
    this.y = this.p.sy;
  })
  .on('mouseup', function(){
    if(!this.p.visited){
      for (var i = 0; i < this.p.connections.length; i++) {
        if(this.p.connections[i].startNode === currentNode){
          if(visitNode != null && !visitNode.visited){
            visitNode.Sprite.texture = Tex_Main["WrittenCircle.png"];
          }
          visitNode = this.p;
          visitNode.Sprite.texture = Tex_Main["WrittenDoubleCircle.png"];
        }
      }
    }
  });

  this.animate = function(){
    if(this.floating && !this.visited){
        this.Sprite.y += 0.4 * Math.sin(Date.now() / 64);
    }
  };
  animatables.push(this);

  this.setVisted = function(){
    this.Sprite.texture = Tex_Main["WrittenCircleScored.png"];
    this.visited = true;
  }


  container.segment.addChild(this.Sprite);

  this.connections = new Array();
  this.addConnection = function(node){
    this.connections.push(new Connection(this, node));
  }

}

function Connection(Node1, Node2){
  this.startNode = Node1;
  this.endNode = Node2;

  this.endNode.connections.push(this);

  dy = (this.startNode.Sprite.y - this.endNode.Sprite.y) * -1;
  cw = Math.hypot(160, dy) * 0.8;
  var shiftfactor = 128/cw * 32;
  this.line = new Extras.TilingSprite(Tex_Main["WrittenLine.png"], cw, 8);
  this.line.height = 8;
  this.line.anchor.set(0, 0.5);
  this.line.width = cw; //use pythagoras to get width;
  dx = 160;
  var angleRadians = Math.atan2(dy, 160);
  mx = (dx/cw) * 0.8;
  my = (dy/cw) * 0.8;
  //console.log("Delta y: " + dy + "/ dx: " + dx + " = " + mx + "/" + my + "cw" + cw + "sf" + shiftfactor)
  val = angleRadians;
  this.line.position.set(this.line.width/2 + mx*shiftfactor, this.startNode.Sprite.y + my*shiftfactor);
  this.line.rotation = val;
  this.startNode.parent.segment.addChild(this.line);


}
