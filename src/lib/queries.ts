import { gql } from "graphql-request";

export const GET_ITEMS = gql`
  query GetItems {
    items {
      name
      id
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
        priceRUB
        price
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
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          quantity
          count
          item {
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
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          quantity
          count
          item {
            id
            name
            gridImageLink
          }
        }
      }
    }
  }
`;

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
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          count
          item {
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
            id
            name
            gridImageLink
          }
        }
        rewardItems {
          count
          item {
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
      penetrationPowerDeviation

      item {
        id
        name
        basePrice
        iconLink
      }
    }
  }
`;

export const GET_ALL_WEAPONS = gql`
  query GetWeapons {
    items(type: preset, categoryNames: Weapon) {
      id
      name
      category {
        name
        id
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

export const GET_WEAPON_ID = gql`
  query GetWeaponById($ids: [ID]) {
    items(ids: $ids, types: [gun]) {
      id
      name
      shortName
      description
      category {
        name
        id
      }
      wikiLink
      types
      basePrice
      image8xLink
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
      properties {
        __typename
        ... on ItemPropertiesWeapon {
          caliber
          fireRate
          recoilVertical
          recoilHorizontal
          ergonomics
          effectiveDistance
        }
      }
    }
  }
`;

export const GET_TRADERS = gql`
  query GetTraders {
    traders {
      image4xLink
      id
      name
    }
  }
`;

export const GET_BACKPACKS = gql`
  query GetBackpacks {
    items(type: backpack) {
      id
      name
      shortName
      description
      wikiLink
      types
      basePrice
      weight
      image8xLink
      iconLink
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

export const GET_BACKPACK_ID = gql`
  query GetBackpackById($ids: [ID]) {
    items(type: backpack, ids: $ids) {
      id
      name
      shortName
      description
      wikiLink
      types
      basePrice
      weight
      image8xLink
      iconLink
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
//Tasks, table
export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      successMessageId
      id
      kappaRequired
      taskImageLink
      name
      experience
      minPlayerLevel
      lightkeeperRequired
      wikiLink
      taskRequirements {
        task {
          id
          name
        }
      }
      startRewards {
        items {
          quantity
          count
          item {
            name
          }
        }
      }
      finishRewards {
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
      }
      objectives {
        maps {
          name
          id
        }
        description
        id
        optional
      }
      map {
        name
        id
      }
      trader {
        id
        name
        imageLink
        image4xLink
        reputationLevels {
          __typename
        }
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

export const GET_CONTAINERS_ITEMS = gql`
  query GetContainerItems {
    items(types: [container]) {
      id
      name
      shortName
      wikiLink
      category {
        name
        id
      }
      types
      basePrice
      image8xLink
      gridImageLink
      category {
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
          }
          image8xLink
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
          }
          image8xLink
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
