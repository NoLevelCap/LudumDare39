
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
      commaSplits[3] = commaSplits[3].replace(/"/g, "");
      commaSplits[4] = commaSplits[4].replace(/ /g, "");
      ifGood = false;
      if (commaSplits[4] == "true")
      {
        ifGood = true;
      }
      EventCollection.push(new EventData(commaSplits[0], commaSplits[1], commaSplits[2], commaSplits[3], ifGood));
    }
  }

  console.log(EventCollection);

  for (var i = 0; i < EventCollection.length; i++) {
    //EventCollection[i].fire();
  }
}

function parseRanInt(input){
  debug.log(input);
  if(input.includes("{ran(")){
    input = input.replace(/{ran\(/g, "");
    input = input.replace(/\)}/g, "");
    input = input.split(":");
    return getRandomInt(parseInt(input[0]), parseInt(input[1]));
  } else {
    return parseInt(input);
  }
}

function DrawEvent(ignore){
  if(ignore){
    return EventCollection[getRandomInt(0, EventCollection.length)];
  }
  isGood = (Math.random() <= karma);
  debug.log("Is good? " + isGood + " with " + (karma*100) + "% chance.");
  while (true) {
    event = EventCollection[getRandomInt(0, EventCollection.length)];
//    event = EventCollection[6];
//    debug.log(event);
    debug.log(event.good + ", " + isGood);
    if(event.good == isGood){
      return event;
    }
  }
}

function EventData(text, type, vari, final, good){
  this.basetxt = text;
  this.basefinal = final;
  this.basevari = vari;

  debug.log(this);

  this.getText = function(){return this.basetxt.replace(/{val}/g, "" + this.vari).replace(/{invval}/g, "" + -this.vari).replace(/{nl}/g, "\n");};
  this.type = getEventEffectIden(type);
  this.getVari = function(){return parseRanInt(this.basevari)};
  this.getFinal = function(){return this.basefinal.replace(/{val}/g, "" + this.vari).replace(/{invval}/g, "" + -+ this.vari);};
  this.good = good;

  this.vari = this.getVari();
  this.text = this.getText();
  this.final = this.getFinal();

  this.fire = function(){
    this.vari = this.getVari();
    this.text = this.getText();
    this.final = this.getFinal();
    pause = false;
    this.type(this.vari);
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
  debug.log(val);
  hullPB.changePower(val);
  cannonPB.changePower(val);
  sailsPB.changePower(val);
  cookingPB.changePower(val);
  hullPB.submitPower();
  cannonPB.submitPower();
  sailsPB.submitPower();
  cookingPB.submitPower();
}

function changeCrewmen(val){
  debug.log("Crewmen of change by " + val + " on " + crew);
  crew += val;
}

function emptyEvent(text, description){
  this.text = text;
  this.final = description;
  this.fire = function(){pause=false;};
}

function looseEvent(text, description, func){
  this.text = text;
  this.final = description;
  this.fire = func;
}

function gameOverMessage(){
  this.text = "Your ship sunk!!";
  this.final = "Refresh to play again";
  this.fire = function(){EVENTWINDOW.showEvent(new gameOverMessage());pause=true;};
}
