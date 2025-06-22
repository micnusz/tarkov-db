import { gql } from "graphql-request";

//Item /FleaMarket
export const GET_ITEMS = gql`
  query GetItems(
    $limit: Int
    $offset: Int
    $name: String
    $categoryNames: [ItemCategoryName!]
  ) {
    items(
      limit: $limit
      offset: $offset
      name: $name
      categoryNames: $categoryNames
    ) {
      name
      id
      gridImageLink
      wikiLink
      category {
        parent {
          name
        }
        name
      }

      sellFor {
        vendor {
          name
        }
        price
        priceRUB
      }
      avg24hPrice
      low24hPrice
      high24hPrice
    }
  }
`;

export const GET_ITEMS_CATEGORIES = gql`
  query GetCaregories {
    itemCategories {
      name
      id
      parent {
        name
        id
        children {
          name
          id
        }
      }
    }
  }
`;

export const GET_ITEMS_SEARCH_BAR = gql`
  query GetItemsSearchBar($name: String) {
    items(name: $name) {
      id
      name
    }
  }
`;

//Used in item/[id] dynamic title
export const GET_ITEM_ID_TITLE = gql`
  query GetItemId($id: ID!) {
    item(id: $id) {
      id
      name
    }
  }
`;
//Item Base, item/[id]
export const GET_ITEM_BASE_ID = gql`
  query GetItemBaseId($id: ID!) {
    item(id: $id) {
      id
      name
      shortName
      description
      basePrice
      wikiLink
      image512pxLink
    }
  }
`;
//Item Variants, item/[id]
export const GET_ITEM_ID_VARIANTS = gql`
  query GetItemIdVariants($id: ID!) {
    item(id: $id) {
      id
      properties {
        __typename
        ... on ItemPropertiesPreset {
          baseItem {
            id
            name
            description
            inspectImageLink
            properties {
              ... on ItemPropertiesWeapon {
                presets {
                  id
                  name
                }
              }
            }
          }
        }
        ... on ItemPropertiesWeapon {
          presets {
            id
            name
          }
        }
      }
    }
  }
`;
//Item Task, item/[id]
export const GET_ITEM_ID_TASK = gql`
  query GetItemIdTask($id: ID!) {
    item(id: $id) {
      id
      receivedFromTasks {
        id
        name
        finishRewards {
          items {
            count
            item {
              id
              name
            }
          }
        }
      }
      usedInTasks {
        id
        name
        kappaRequired
        lightkeeperRequired
        trader {
          name
          imageLink
        }
      }
    }
  }
`;
//Item Price, item/[id]
export const GET_ITEM_ID_PRICES = gql`
  query GetItemIdPrices($id: ID!) {
    item(id: $id) {
      id
      buyFor {
        vendor {
          name
        }
        price
        priceRUB
      }
      sellFor {
        vendor {
          name
        }
        price
        priceRUB
      }
    }
  }
`;
//Item Barter, item/[id]
export const GET_ITEM_ID_BARTERS = gql`
  query GetItemIdBarters($id: ID!) {
    item(id: $id) {
      id
      bartersFor {
        level
        trader {
          name
          imageLink
        }
        requiredItems {
          count
          quantity
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          quantity
          count
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
      }
      bartersUsing {
        level
        trader {
          name
          imageLink
        }
        requiredItems {
          quantity
          count
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          quantity
          count
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
      }
    }
  }
`;
//Item Crafting, item/[id]
export const GET_ITEM_ID_CRAFTING = gql`
  query GetItemIdCrafts($id: ID!) {
    item(id: $id) {
      id
      craftsUsing {
        duration
        level
        station {
          id
          name
        }
        taskUnlock {
          id
          name
          trader {
            name
          }
        }
        requiredItems {
          count
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          count
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
      }
      craftsFor {
        duration
        level
        station {
          id
          name
        }
        taskUnlock {
          id
          name
          trader {
            name
          }
        }
        requiredItems {
          count
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          count
          item {
            avg24hPrice
            id
            name
            gridImageLink
          }
        }
      }
    }
  }
`;

export const GET_ITEM_ID_NAME = gql`
  query GetItemIdName($ids: [ID]) {
    items(ids: $ids) {
      id
      name
    }
  }
`;

export const GET_AMMO = gql`
  query getAmmoCaliber {
    ammo {
      __typename
      caliber
      penetrationPower
      damage
      armorDamage
      accuracyModifier
      recoilModifier
      fragmentationChance
      initialSpeed
      ricochetChance
      penetrationChance
      item {
        id
        name
        iconLink
      }
    }
  }
`;
//items/weapons, Weapons
export const GET_ALL_WEAPONS = gql`
  query GetWeapons {
    items(type: preset, categoryNames: Weapon) {
      id
      name
      category {
        name
        parent {
          name
        }
      }
      types
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesPreset {
          recoilVertical
          recoilHorizontal
          ergonomics
          moa
          baseItem {
            name
            id
            properties {
              ... on ItemPropertiesWeapon {
                caliber
                fireRate
                effectiveDistance
              }
            }
          }
        }
      }
    }
  }
`;

//Traders
export const GET_TRADERS = gql`
  query GetTraders {
    traders {
      imageLink
      id
      name
    }
  }
`;
// Items/Backpacks
export const GET_BACKPACKS = gql`
  query GetBackpacks {
    items(type: backpack) {
      id
      name
      wikiLink
      weight
      gridImageLink
      category {
        name
        parent {
          name
        }
      }
      avg24hPrice
      properties {
        __typename
        ... on ItemPropertiesBackpack {
          turnPenalty
          ergoPenalty
          speedPenalty
          capacity
          grids {
            width
            height
          }
        }
      }
    }
  }
`;

// Items/body-armors | Armored vests
export const GET_ARMORED_VESTS = gql`
  query GetArmorVests {
    items(categoryNames: ArmoredEquipment, type: armor) {
      id
      name
      weight
      wikiLink
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesArmor {
          speedPenalty
          class
          ergoPenalty
          material {
            name
          }
          durability
          turnPenalty
          armorType
        }
      }
    }
  }
`;

// Items/body-armors | Armored Chest Rigs
export const GET_ARMORED_RIGS = gql`
  query GetArmoredRigs {
    items(categoryNames: ChestRig, type: armor) {
      id
      name
      weight
      wikiLink
      types
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesChestRig {
          speedPenalty
          class
          ergoPenalty
          material {
            name
            id
          }
          durability
          turnPenalty
          armorType
        }
      }
    }
  }
`;

// Items/armor-plates
export const GET_ARMOR_PLATES = gql`
  query GetArmorPlates {
    items(types: armorPlate) {
      id
      name
      weight
      wikiLink
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesArmorAttachment {
          armorType
          class
          material {
            name
          }
          durability
          speedPenalty
          turnPenalty
          ergoPenalty
        }
      }
    }
  }
`;

//Tasks, Data-table
export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      name
      minPlayerLevel
      kappaRequired
      lightkeeperRequired
      wikiLink
      taskRequirements {
        task {
          id
          name
        }
      }
      objectives {
        maps {
          name
          id
        }
      }
      map {
        name
        id
      }
      trader {
        id
        name
        imageLink
      }
    }
  }
`;
//Task, dynamic title
export const GET_TASK_ID_TITLE = gql`
  query GetTaskIdBase($id: ID!) {
    task(id: $id) {
      id
      name
    }
  }
`;
//Task base, task/[id]
export const GET_TASK_ID_BASE = gql`
  query GetTaskIdBase($id: ID!) {
    task(id: $id) {
      id
      kappaRequired
      taskImageLink
      name
      experience
      minPlayerLevel
      lightkeeperRequired
      wikiLink
      map {
        name
        id
      }
      trader {
        id
        name
        imageLink
      }
    }
  }
`;
//Task requirements, task/[id]
export const GET_TASK_ID_REQUIREMENTS = gql`
  query GetTaskIdRequirements($id: ID!) {
    task(id: $id) {
      taskRequirements {
        task {
          id
          name
          minPlayerLevel
        }
      }
    }
  }
`;
//Task, failure/[id]
export const GET_TASK_ID_FAILURE = gql`
  query GetTaskIdFailure($id: ID!) {
    task(id: $id) {
      failureOutcome {
        traderStanding {
          standing
          trader {
            name
            id
          }
        }
      }
    }
  }
`;
//Task, reward/[id]
export const GET_TASK_ID_REWARD = gql`
  query GetTaskIdReward($id: ID!) {
    task(id: $id) {
      startRewards {
        items {
          quantity
          count
          item {
            name
            id
          }
        }
      }
      finishRewards {
        craftUnlock {
          level
          station {
            name
            id
          }
        }
        traderUnlock {
          name
          id
        }
        offerUnlock {
          level
          trader {
            id
            name
          }
          item {
            bartersFor {
              trader {
                name
              }
            }
            buyFor {
              price
              currency
              vendor {
                name
              }
            }
            types
            name
            id
          }
        }
        items {
          quantity
          count
          item {
            id
            name
          }
        }
        skillLevelReward {
          name
          level
        }
        traderStanding {
          standing
          trader {
            name
            id
          }
        }
      }
    }
  }
`;
//Task, obejctives/[id]
export const GET_TASK_ID_OBJECTIVES = gql`
  query GetTaskIdObjectves($id: ID!) {
    task(id: $id) {
      objectives {
        maps {
          name
          id
        }
        optional
        description
        id
        optional
      }
    }
  }
`;
//Task, traders/[id]
export const GET_TASK_ID_TRADERS = gql`
  query GetTaskIdObjectves($id: ID!) {
    task(id: $id) {
      trader {
        id
        name
        imageLink
      }
    }
  }
`;

// items/barter-items
export const GET_BARTER_ITEMS = gql`
  query GetBarterItems {
    items(types: [barter]) {
      id
      name
      shortName
      category {
        name
        id
      }
      types
      basePrice
      image8xLink
      gridImageLink
      wikiLink
      category {
        parent {
          name
          id
        }
        name
        id
      }
      buyFor {
        vendor {
          name
        }
        price
        priceRUB
      }
      sellFor {
        vendor {
          name
        }
        price
        priceRUB
      }
      avg24hPrice
    }
  }
`;

//items/containers
export const GET_CONTAINERS_ITEMS = gql`
  query GetContainerItems {
    items(types: [container]) {
      id
      name
      wikiLink
      category {
        name
        id
        parent {
          name
        }
      }
      basePrice
      gridImageLink
      buyFor {
        vendor {
          name
        }
        price
        priceRUB
      }
      sellFor {
        vendor {
          name
        }
        price
        priceRUB
      }
      avg24hPrice
      properties {
        __typename
        ... on ItemPropertiesContainer {
          capacity
          grids {
            width
            height
          }
        }
      }
    }
  }
`;
// items/face-covers
export const GET_FACE_COVERS = gql`
  query GetFaceCovers {
    items(categoryNames: [FaceCover]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        parent {
          name
        }
        name
      }
      properties {
        __typename
        ... on ItemPropertiesHelmet {
          deafening
          class
          material {
            name
          }
          ricochetY
          headZones
          blocksHeadset
          armorType
          durability
          __typename
          turnPenalty
          ergoPenalty
          speedPenalty
        }
      }
    }
  }
`;

// /Barter
export const GET_BARTERS = gql`
  query GetBarters {
    barters {
      buyLimit
      taskUnlock {
        name
      }
      level
      requiredItems {
        item {
          wikiLink
          avg24hPrice
          category {
            name
            parent {
              name
            }
          }
          gridImageLink
          name
          id
          avg24hPrice
        }
        quantity
        count
      }
      rewardItems {
        item {
          wikiLink
          avg24hPrice
          category {
            name
            parent {
              name
            }
          }
          gridImageLink
          name
          id
          avg24hPrice
        }
        quantity
        count
      }
      trader {
        name
        imageLink
      }
    }
  }
`;

// items/grenades
export const GET_GRENADES = gql`
  query GetGrenades {
    items(types: [grenade]) {
      id
      name
      wikiLink
      gridImageLink
      weight
      properties {
        __typename
        ... on ItemPropertiesGrenade {
          type
          fuse
          fragments
          minExplosionDistance
          maxExplosionDistance
          contusionRadius
        }
      }
    }
  }
`;
// items/headsets
export const GET_HEADSETS = gql`
  query GetHeadsets {
    items(types: [headphones]) {
      id
      name
      wikiLink
      gridImageLink
      weight
      properties {
        __typename
        ... on ItemPropertiesHeadphone {
          ambientVolume
          distanceModifier
          distortion
        }
      }
    }
  }
`;

//items/helmets
export const GET_HELMETS = gql`
  query GetHelmets {
    items(types: [helmet]) {
      id
      name
      wikiLink
      gridImageLink
      weight
      properties {
        __typename
        ... on ItemPropertiesHelmet {
          durability
          class
          blocksHeadset
          ricochetY
          material {
            name
          }
          turnPenalty
          ergoPenalty
          speedPenalty
        }
      }
    }
  }
`;
//items /keys
export const GET_KEYS = gql`
  query GetKeys {
    items(types: [keys]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      category {
        name
        id
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesKey {
          uses
        }
      }
    }
  }
`;

//weapon-mods/scopes, Scopes
export const GET_SCOPES = gql`
  query GetScopes {
    items(categoryNames: Scope) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      properties {
        __typename
        ... on ItemPropertiesScope {
          ergonomics
          zoomLevels
          sightModes
          sightingRange
        }
      }
    }
  }
`;

//weapon-mods/vital-parts, barrels
export const GET_BARRELS = gql`
  query GetBarrels {
    items(types: [mods], categoryNames: Barrel) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesBarrel {
          recoilModifier
          ergonomics
        }
      }
    }
  }
`;
//weapon-mods/vital-parts, Gas blocs
export const GET_GAS_BLOCKS = gql`
  query GetGasBlocks {
    items(types: [mods], categoryNames: GasBlock) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          recoilModifier
          ergonomics
        }
      }
    }
  }
`;

//weapon-mods/vital-parts, Handguard
export const GET_HANDGUARD = gql`
  query GetHandguard {
    items(types: [mods], categoryNames: Handguard) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          recoilModifier
          ergonomics
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/vital-parts, Pistol grips
export const GET_PISTOL_GRIPS = gql`
  query GetPistolGrips {
    items(types: [mods], categoryNames: PistolGrip) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          recoilModifier
          ergonomics
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/vital-parts, Receivers
export const GET_RECEIVERS = gql`
  query GetReceivers {
    items(types: [mods], categoryNames: Receiver) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          recoilModifier
          ergonomics
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/gear-mods, Charging Handles
export const GET_CHARGING_HANDLES = gql`
  query GetChargingHandles {
    items(types: [mods], categoryNames: [ChargingHandle]) {
      id
      name
      wikiLink
      gridImageLink
      weight
      category {
        name
        parent {
          name
        }
      }
      avg24hPrice
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          recoilModifier
          ergonomics
        }
      }
    }
  }
`;
//weapon-mods/gear-mods, Magazines
export const GET_MAGAZINES = gql`
  query GetMagazines {
    items(types: [mods], categoryNames: [Magazine]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesMagazine {
          capacity
          ergonomics
          malfunctionChance
          loadModifier
          ammoCheckModifier
        }
      }
    }
  }
`;

//weapon-mods/gear-mods, Mounts
export const GET_MOUNTS = gql`
  query GetMounts {
    items(types: [mods], categoryNames: [Mount]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
        }
      }
    }
  }
`;

//weapon-mods/gear-mods, Stocks
export const GET_STOCKS = gql`
  query GetStocks {
    items(types: [mods], categoryNames: [Stock]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
        }
      }
    }
  }
`;

//weapon-mods/gear-mods, UBGL;
export const GET_UBGL = gql`
  query GetUBGL {
    items(types: [mods], categoryNames: [UBGL]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
        }
      }
    }
  }
`;

//weapon-mods/muzzle-devices, muzzleDevices;
export const GET_MUZZLE_DEVICES = gql`
  query GetMuzzleDevices {
    items(types: [mods], categoryNames: [MuzzleDevice]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        name
        parent {
          name
        }
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/functional-mods, Bipods;
export const GET_BIPODS = gql`
  query GetBipods {
    items(types: [mods], categoryNames: [Bipod]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        parent {
          name
        }
        name
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/functional-mods, Foregrips;
export const GET_FOREGRIPS = gql`
  query GetForegrips {
    items(types: [mods], categoryNames: [Foregrip]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        parent {
          name
        }
        name
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/functional-mods, Flashlights;
export const GET_FLASHLIGHTS = gql`
  query GetFlashlights {
    items(types: [mods], categoryNames: [Flashlight]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        parent {
          name
        }
        name
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/functional-mods, TacticalDevices;
export const GET_TACTICAL_DEVICES = gql`
  query GetTacticalDevice {
    items(types: [mods], categoryNames: [CombTactDevice]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        parent {
          name
        }
        name
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
          accuracyModifier
        }
      }
    }
  }
`;

//weapon-mods/functional-mods, Auxiliaries;
export const GET_AUXILIARIES = gql`
  query GetAuxiliaries {
    items(types: [mods], categoryNames: [AuxiliaryMod]) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        parent {
          name
        }
        name
      }
      properties {
        __typename
        ... on ItemPropertiesWeaponMod {
          ergonomics
          recoilModifier
          accuracyModifier
        }
      }
    }
  }
`;

//face-covers/ Glasses;
export const GET_GLASSES = gql`
  query GetGlasses {
    items(type: glasses) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      weight
      category {
        parent {
          name
        }
        name
      }
      properties {
        __typename
        ... on ItemPropertiesGlasses {
          material {
            name
          }
          blindnessProtection
          class
        }
      }
    }
  }
`;

//medical, Medical Items
export const GET_MEDICAL_ITEMS = gql`
  query GetMedicalItem {
    items(type: meds, categoryNames: MedicalItem) {
      id
      name
      weight
      wikiLink
      types
      category {
        name
        parent {
          name
        }
      }
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesSurgicalKit {
          useTime
          uses
          cures
        }
      }
      properties {
        __typename
        ... on ItemPropertiesMedicalItem {
          useTime
          uses
          cures
        }
      }
    }
  }
`;

//medical, Medkits
export const GET_MEDKITS = gql`
  query GetMedkits {
    items(type: meds, categoryNames: Medikit) {
      id
      name
      weight
      wikiLink
      types
      category {
        name
        parent {
          name
        }
      }
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesMedKit {
          useTime
          hitpoints
          cures
          maxHealPerUse
          hpCostLightBleeding
          hpCostHeavyBleeding
        }
      }
    }
  }
`;

//provisions, Food
export const GET_FOOD = gql`
  query GetFood {
    items(type: provisions, categoryNames: Food) {
      id
      name
      weight
      wikiLink
      types
      category {
        name
        parent {
          name
        }
      }
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesFoodDrink {
          energy
          hydration
          stimEffects {
            skillName
            duration
          }
          units
        }
      }
    }
  }
`;

//provisions, Drink
export const GET_DRINK = gql`
  query GetDrink {
    items(type: provisions, categoryNames: Drink) {
      id
      name
      weight
      wikiLink
      types
      category {
        name
        parent {
          name
        }
      }
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesFoodDrink {
          energy
          hydration
          stimEffects {
            skillName
            duration
          }
          units
        }
      }
    }
  }
`;

//chest-rigs, Chest Rigs
export const GET_CHEST_RIGS = gql`
  query GetChestRigs {
    items(categoryNames: ChestRig, type: rig) {
      id
      name
      weight
      wikiLink
      types
      category {
        name
        parent {
          name
        }
      }
      gridImageLink
      properties {
        __typename
        ... on ItemPropertiesChestRig {
          speedPenalty
          ergoPenalty
          material {
            name
            id
          }
          durability
          turnPenalty
          armorType
        }
      }
    }
  }
`;
