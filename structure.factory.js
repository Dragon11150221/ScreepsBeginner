var structureFactory = {


  run: function(factory) {
    if (factory.cooldown == 0) {
      factory.produce(RESOURCE_UTRIUM_BAR)
      factory.produce(RESOURCE_LEMERGIUM_BAR)
      factory.produce(RESOURCE_ZYNTHIUM_BAR)
      factory.produce(RESOURCE_KEANIUM_BAR)
      factory.produce(RESOURCE_GHODIUM_MELT)
      factory.produce(RESOURCE_OXIDANT)
      factory.produce(RESOURCE_REDUCTANT)
      factory.produce(RESOURCE_PURIFIER)
    }
  }
};

module.exports = structureFactory;