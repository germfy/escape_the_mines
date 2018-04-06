function solve(map, miner, exit){
  //Path variable to store miner's steps
  let path = [];

  //Current position the miner is on
  let currentPos = {x: miner.x, y: miner.y};

  //We have to know the size of the map, so the miner won't go outside boundaries
  let xSize = map.length;
  let ySize = map[0].length;

  //We have to also know where the exit is, so we know we're there!
  let strExit = JSON.stringify(exit);

  //To avoid infinite loops and/or avoid death ends, we'll keep track of the last square we successfully visited
  //So we'll start at the current miner's postion
  let lastVisited = {x: currentPos.x, y: currentPos.y};

  //Everytime we are about to take a step, we have to verify whether we already are at the exit
  //So we have to keep checking about we being at the exit, we don't want to go over the exit without noticing, right?
  while(JSON.stringify(currentPos) !== strExit){

    //We'll evaluate each surrounding squares to see if there's a place that's open and we can move to it
    //If either of the adjacent squares is true or open, we'll verify first that we are not coming from that square
    //After a successful verification, the miner moves to that position and the store in path the step the miner took
    if((currentPos.x+1 < xSize) && (map[currentPos.x+1][currentPos.y])) {
      if(!((lastVisited.x === currentPos.x+1) && (lastVisited.y === currentPos.y))){
        path.push("right");
        lastVisited = {x: currentPos.x, y: currentPos.y};
        currentPos.x++;
        continue;
      }
    }

    if((currentPos.x-1 > -1) && (map[currentPos.x-1][currentPos.y])){
      if(!((lastVisited.x === currentPos.x-1) && (lastVisited.y === currentPos.y))){
        path.push("left");
        lastVisited = {x: currentPos.x, y: currentPos.y};
        currentPos.x--;
        continue;
      }
    }

    if((currentPos.y+1 < ySize) && (map[currentPos.x][currentPos.y+1])){
      if(!((lastVisited.x === currentPos.x) && (lastVisited.y === currentPos.y+1))){
        path.push("down");
        lastVisited = {x: currentPos.x, y: currentPos.y};
        currentPos.y++;
        continue;
      }
    }

    if((currentPos.y-1 > -1) && (map[currentPos.x][currentPos.y-1])){
      if(!((lastVisited.y === currentPos.y-1) && (lastVisited.x === currentPos.x))){
        path.push("up");
        lastVisited = {x: currentPos.x, y: currentPos.y};
        currentPos.y--;
        continue;
      }
    }

  }
  //Finally after the miner has reached the exit, the path traversed is returned to the calling function.
  return path;
}
