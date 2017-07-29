
function getPoints(){
  ab = new Array();
  ab.push(getRandomInt(0, 5));
  ab.push(getRandomInt(5, 10));
  ab.push(getRandomInt(10, 15));
  return ab;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Level(){
  this.POI = 0;
  this.POI = getPoints();
}
