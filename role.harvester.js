var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    const containers = creep.room.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_CONTAINER
    });

    const found = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);

    if (found.length) {
      for (let order in found) {
        structure = found[order]
        if (structure == containers[creep.memory.source]) {
          creep.memory.oncontainer = true
        }
        else{
          creep.memory.oncontainer = false
        }
        if (structure == containers[creep.memory.source] && structure.store.getFreeCapacity() < creep.getActiveBodyparts(WORK) * 2) {
          creep.memory.working = false
        } else {
          creep.memory.working = true
        }
      }
    }
    if (creep.memory.oncontainer != true) {
      creep.moveTo(containers[creep.memory.source])
    } else if (creep.memory.working) {
      var source = creep.pos.findInRange(FIND_SOURCES,1)
      if (source.length == 0){
        var source = creep.pos.findInRange(FIND_MINERALS,1)
      }
      action = creep.harvest(source[0])
    }
  }
}

module.exports = roleHarvester;
