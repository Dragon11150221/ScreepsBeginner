
require('prototype.spawn');
require('prototype.creep');
var structureTower = require('structure.tower');
var structureFactory = require('structure.factory');

module.exports.loop = function() {

  Game.getObjectById('5dce354d72824577314daf7f').transferEnergy(Game.getObjectById('5dd768414ece56816add93da'))
  Game.getObjectById('5ddf79b36ed42c7aac047e65').transferEnergy(Game.getObjectById('5dd768414ece56816add93da'))
  var mineralList = [];
  var spawns = _.filter(Game.spawns, (spawn) => spawn.memory.priority)
  

  for (let spawnName in spawns) {
    let spawn = spawns[spawnName];
    spawn.spawnBasicCreeps();
  }

  var attackflag = Game.flags.attackFlag;
  var numberOfAttacker = _.sum(Game.creeps, (creep) => creep.memory.role == 'attacker');
  for (let spawnName in Game.spawns) {
    let spawn = Game.spawns[spawnName]
    if (attackflag && numberOfAttacker < 20) {
      console.log('Attacker number: ' + numberOfAttacker);
      spawn.createCustomCreep(spawn.room.energyCapacityAvailable, 'attacker')
    }
  }


  // flags
  var claimflag = Game.flags.claimFlag;
  if (claimflag) {
    let creep = Game.creeps.claimer;
    if (creep) {
      if (creep.pos.roomName === claimflag.pos.roomName) {
        var room_controller = claimflag.room.controller
        if (creep.claimController(room_controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(room_controller)
        }
        Game.creeps.claimer.signController(Game.creeps.claimer.room.controller, 'Grapefruit!!!')
      } else {
        creep.moveTo(claimflag)
      }
      if (room_controller.my) {
        claimflag.remove()
      }
    } else {
      Game.spawns.Spawn2.createCreep([CLAIM, MOVE], "claimer")
    }
  };





  var transit = 0;
  for (var pnname in Game.creeps) {
    var creep = Game.creeps[pnname];
    if (creep.memory.role == 'pioneer') {
      creep.memory.source = 0
      var transit = transit + 1
      if (transit > 6) {
        creep.memory.source = 1
      }
    }
  }

  // towers
  for (id in Game.structures) {
    if (Game.structures[id].structureType == STRUCTURE_TOWER) {
      let tower = Game.structures[id];
      structureTower.run(tower)
    }
    if (Game.structures[id].structureType == STRUCTURE_FACTORY) {
      let factory = Game.structures[id];
      structureFactory.run(factory)
    }
  };

  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  var sourceFlag = Game.flags.sourceFlag;
  if (sourceFlag) {
    let creep = Game.creeps.sourceHarvester;
    if (!creep) {
      Game.spawns.Spawn3.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'sourceHarvester')
    } else {
      if (creep.pos.roomName != sourceFlag.pos.roomName) {
        creep.moveTo(sourceFlag)
      } else {
        let source = creep.room.find(FIND_DEPOSITS)[0];
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source)
        }
      }
    }
  }

  for (var spawnname in Game.spawns) {
    let spawn = Game.spawns[spawnname];
    if (spawn.spawning) {
      let spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y, {
          align: 'left',
          opacity: 0.8
        });
    }
  };
  
  for (let name in Game.creeps){
    Game.creeps[name].runRole();
  }

}