var roleTransfer = require('role.transfer');
var roleBuilder = require('role.builder');
var roleRepaier = {

  /** @param {Creep} creep **/
  run: function(creep) {
    let exploitflag = Game.flags.exploitFlag;
    if (!exploitflag) {
      roleTransfer.run(creep)
    }
    if (exploitflag && creep.pos.roomName === exploitflag.pos.roomName) {
      if (creep.carry.energy == 0) {
        creep.memory.transfer = false
      }
      if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.transfer = true
      }
      if (creep.memory.transfer == false) {
        const downresource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (downresource) {
          if (creep.pickup(downresource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(downresource);
          }
        } else {
          var source = creep.room.find(FIND_SOURCES)[creep.memory.source];
          if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
          } else {
            creep.moveTo(source)
          }
        }
      } else {
          var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity ||
                structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity ||
                structure.structureType == STRUCTURE_TOWER && structure.energy < 950);
            }
          });
          if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          } else {
            creep.buildingAndUpgrading();
          }
      }
    } else if (exploitflag) {
      creep.moveTo(exploitflag)
    }
  }
};

module.exports = roleRepaier;
