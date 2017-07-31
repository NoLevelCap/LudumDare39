function submitScore(scoreinfo){
  data = scoreinfo;
  console.log($.param( data ));

  request = $.ajax({
        url: "php/submit.php",
        type: "post",
        data: data
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
      // Log a message to the console
      loadScreen(JSON.parse(response));
  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
  });

  // Callback handler that will be called regardless
  // if the request failed or succeeded
  request.always(function () {
      // Reenable the inputs
  });
}

var statsLoaded = false, stats, FINALSCREEN;

function loadScreen(data){
  statsLoaded = true;
  stats = data;

  lsScreenData = handleStats(data);

  FINALSCREEN = new Container();
  stage.addChild(FINALSCREEN);

  back = new Extras.TilingSprite(Tex_Main["EventBack.png"], 1280, 960);
  FINALSCREEN.addChild(back);

  shift = 0
  for (var i = 0; i < lsScreenData.length; i++) {
    if(i%2==0){
      reward = new PIXI.Text(lsScreenData[i],{fontFamily : 'Permanent Marker', fontSize: 64, lineHeight: 56, fill : 0x000000, align : 'left'});
      reward.x = 32;
    }else{
      reward = new PIXI.Text(lsScreenData[i],{fontFamily : 'Permanent Marker', fontSize: 64, lineHeight: 56, fill : 0x000000, align : 'right'});
      reward.x = 1280 -reward.width  - 32;
    };

    reward.y = shift + 16;
    shift += reward.height;

    FINALSCREEN.addChild(reward);
  }

  iconContainer = new Container();
  boat = new Sprite(Tex_Main["boat.png"]);
  by = new Sprite(Tex_Main["by.png"]);
  by.x = 160;
  sn = new Sprite(Tex_Main["sn.png"]);
  tfp = new Sprite(Tex_Main["tfp.png"]);
  tfp.x = 4;
  tfp.y = -tfp.height - 8;
  sn.x = 160 * 2;
  iconContainer.addChild(boat);
  iconContainer.addChild(by);
  iconContainer.addChild(sn);
  iconContainer.addChild(tfp);
  iconContainer.x = 48 + 1280 - 896 ;
  iconContainer.y = 720 + 80;
  FINALSCREEN.addChild(iconContainer);

  console.log();

  stage.addChild(FINALSCREEN);
}

function handleStats(data){
  output = new Array();
  output.push("As captain of " + data.iden.shipname + ",\nyou conquered " + data.iden.areaname + "!");
  if(parseInt(data.iden.id) == parseInt(data.global_gold.id)){
    output.push("You are the richest pirate\nin the world\nwith " + data.global_gold.gold + " gold pieces!");
  } else if(parseInt(data.iden.id) == parseInt(data.local_gold.id)){
    output.push("You are the richest pirate\nin " + data.iden.areaname  + "\nwith " + data.local_gold.gold + " gold pieces!");
  }
  if(parseInt(data.iden.id) == parseInt(data.global_crew.id)){
    output.push("You are the friendliest pirate\nin the world\nwith " + data.global_crew.crew + " crewmen!");
  } else if(parseInt(data.iden.id) == parseInt(data.local_crew.id)){
    output.push("You are the friendliest pirate\nin " + data.iden.areaname  + "\nwith " + data.local_crew.crew + " crewmen!");
  }
  if(parseInt(data.iden.id) == parseInt(data.global_time.id)){
    output.push("You are the fastest pirate\nin the world\nwith " + data.global_time.time + " seconds taken!");
  } else if(parseInt(data.iden.id) == parseInt(data.local_time.id)){
    output.push("You are the fastest pirate\nin " + data.iden.areaname  + "\nwith " + data.local_time.time + " seconds taken!");
  }
  return output;
}

function ScoreInfo(shipname, areaname, gold, time, crew){
  this.shipname = shipname;
  this.areaname = areaname;
  this.gold = gold;
  this.time = time;
  this.crew = crew;
}
