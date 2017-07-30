
var EventCollection = new Array();

function loadEvents(){
  rawData = PIXI.loader.resources["EventData"].data;
  lineSplits = rawData.split("\n");
  for (var i = 0; i < lineSplits.length; i++) {
    if(lineSplits[i] != ""){
      commaSplits = lineSplits[i].split(",");
      commaSplits[0] = commaSplits[0].replace(/"/g, "");
      commaSplits[1] = commaSplits[1].replace(/ /g, "");
      commaSplits[2] = commaSplits[2].replace(/ /g, "");
      commaSplits[2] = parseInt(commaSplits[2].replace(/ /g, ""));
      commaSplits[3] = commaSplits[3].replace(/"/g, "");
      commaSplits[4] = commaSplits[4].replace(/ /g, "");
      commaSplits[0] = commaSplits[0].replace(/{val}/g, "" + commaSplits[2]);
      commaSplits[0] = commaSplits[0].replace(/{invval}/g, "" + -commaSplits[2]);
      commaSplits[3] = commaSplits[3].replace(/{val}/g, "" + commaSplits[2]);
      commaSplits[3] = commaSplits[3].replace(/{invval}/g, "" + -commaSplits[2]);
      EventCollection.push(new EventData(commaSplits[0], commaSplits[1], commaSplits[2], commaSplits[3], (commaSplits[4] == 'true')));
    }
  }

  console.log(EventCollection);

  for (var i = 0; i < EventCollection.length; i++) {
    //EventCollection[i].fire();
  }
}

function EventData(text, type, vari, final, good){
  this.text = text;
  this.type = getEventEffectIden(type);
  this.vari = vari;
  this.final = final;
  this.good = good;

  this.fire = function(){
    this.type(vari);
  }
}

var EventEffects = {
  gold : function(val){IncreaseGold(val)},
  skip : function(val){skipToNextEvent()},
  lowest_stat : function(val){changeCrewmen(val); getLowestPowerBar().changePower(val);},
  all_stats : function(val){changeCrewmen(val*4); affectAllPowerBars(val);},
  health : function(val){HealShip(val)},
  highest_stat : function(val){changeCrewmen(val); getHighestPowerBar().changePower(val);},
  sails : function(val){changeCrewmen(val); sailsPB.changePower(val);},
  cannons : function(val){changeCrewmen(val); cannonPB.changePower(val);},
  cooks : function(val){changeCrewmen(val); cookingPB.changePower(val);},
  hull : function(val){changeCrewmen(val); hullPB.changePower(val);}
}

function getEventEffectIden(key) {
    return EventEffects[key];
}

function getLowestPowerBar(){
  lowest = hullPB;
  if(lowest.temp_value > cannonPB.temp_value){lowest = cannonPB}
  if(lowest.temp_value > sailsPB.temp_value){lowest = sailsPB}
  if(lowest.temp_value > cookingPB.temp_value){lowest = cookingPB}
  return lowest;
}

function getHighestPowerBar(){
  highest = hullPB;
  if(highest.temp_value < cannonPB.temp_value){highest = cannonPB}
  if(highest.temp_value < sailsPB.temp_value){highest = sailsPB}
  if(highest.temp_value < cookingPB.temp_value){highest = cookingPB}
  return highest;
}

function skipToNextEvent(){
  pause = false;
  posi = Math.floor(miniProgressShip.lastYard/100);
  nl = getEventPastPoint(posi) + 1;
  miniProgressShip.yards = (nl * 100) - 20;
}

function getEventPastPoint(loc){
  for (var i = 0; i < LOADEDLEVEL.POI.length; i++) {
    if(LOADEDLEVEL.POI[i] >= (loc + 1)){
      return LOADEDLEVEL.POI[i];
    }
  }
  return 15;
}

function affectAllPowerBars(val){
  hullPB.changePower(val);
  cannonPB.changePower(val);
  sailsPB.changePower(val);
  cookingPB.changePower(val);
}

function changeCrewmen(val){
  debug.log("Crewmen of change by " + val + " on " + crew);
  crew += val;
}
