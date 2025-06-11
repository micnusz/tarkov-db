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

export const GET_ITEM_ID = gql`
  query GetItemById($ids: [ID]) {
    items(ids: $ids) {
      id
      name
      shortName
      description
      basePrice
      image8xLink
      wikiLink
      gridImageLink
      usedInTasks {
        kappaRequired
        lightkeeperRequired
        trader {
          name
          imageLink
        }
        name
        id
      }
      bartersFor {
        buyLimit
        taskUnlock {
          name
        }
        level
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
        trader {
          name
          imageLink
        }
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
  query GetOnlyWeapons {
    items(types: [gun]) {
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
      buyFor {
        vendor {
          name
        }
        price
      }
      sellFor {
        vendor {
          name
        }
        price
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

export const GET_TASK_ID = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
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
          minPlayerLevel
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
