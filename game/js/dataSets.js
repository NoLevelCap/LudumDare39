var ShipNames, PortNames;

function loadDataArray(dataset){
  rawData = PIXI.loader.resources[dataset].data;
  rawData = rawData.split("\n");
  rawData.pop();
  return rawData;
}

function drawRandomArray(array){
  return array[getRandomInt(0, array.length)];
}
