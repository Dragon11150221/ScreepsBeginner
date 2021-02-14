var offensiveCreep = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var enermyCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    var enermyStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
      filter: (i) => (i.structureType != STRUCTURE_CONTROLLER &&
        i.structureType != STRUCTURE_STORAGE &&
        i.structureType != STRUCTURE_EXTENSION &&
        i.structureType != STRUCTURE_TERMINAL&&
        i.structureType != STRUCTURE_RAMPART)
    });
    var tower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_TOWER
    })

    var enermySpawns = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
    var attackflag = Game.flags.attackFlag;

    if (enermyStructure && creep.attack(enermyStructure) == ERR_NOT_IN_RANGE) {
      creep.moveTo(enermyStructure)
    } else if (enermyCreep && creep.attack(enermyCreep) == ERR_NOT_IN_RANGE) {
      creep.moveTo(enermyCreep)
    } else if (creep.attack(enermySpawns) == ERR_NOT_IN_RANGE) {
      creep.moveTo(enermySpawns)
    } else {
      creep.moveTo(attackflag)
    }
  }
};

module.exports = offensiveCreep;