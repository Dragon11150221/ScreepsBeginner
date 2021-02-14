var structureTower = {


  run: function(tower) {
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var closestinjuredcreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: (creep) => creep.hits < creep.hitsMax
    });
    var closestDamagedStructures = tower.room.find(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax &&
        structure.structureType != STRUCTURE_WALL &&
        structure.structureType != STRUCTURE_RAMPART
    });
    if (tower.room.storage && tower.room.storage.store.getUsedCapacity('energy') > 30000) {
      var closestDamagedStructures = tower.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
      });
      closestDamagedStructures.sort((a, b) => a.hits - b.hits);
    }
    if (closestHostile) {
      tower.attack(closestHostile);
    } else if (closestinjuredcreep) {
      tower.heal(closestinjuredcreep)
    } else if (closestDamagedStructures.length) {
      tower.repair(closestDamagedStructures[0]);
    }
  }
};

module.exports = structureTower;