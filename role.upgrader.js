var roleUpgrader = {

/** @param {Creep} creep **/
run: function(creep) {
    if(creep.store.getFreeCapacity() == 0){
        creep.memory.working = true
    }
    if(creep.store.getUsedCapacity() == 0){
        creep.memory.working = false
    }
    
    if(creep.memory.working){
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    else {
        var targetLink = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{
            filter: (i) => (i.structureType == STRUCTURE_LINK) &&
                            i.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });
        var anothertarget = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER||
                            s.structureType == STRUCTURE_STORAGE) &&
                            s.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity()
        });
        if(targetLink && creep.withdraw(targetLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetLink);
        }
        else if(creep.withdraw(anothertarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(anothertarget, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

}

};

module.exports = roleUpgrader;