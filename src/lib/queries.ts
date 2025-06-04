import { gql } from "graphql-request";

export const GET_ITEMS = gql`
  query GetItemFleaMarket {
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

export const GET_ITEM_ID = gql`
  query GetItemById($ids: [ID]) {
    items(ids: $ids) {
      id
      name
      shortName
      description
      basePrice
      image8xLink
      iconLink
      wikiLink
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

export const GET_ITEM_CATEGORIES = gql`
  query GetItemCategories {
    items {
      category {
        id
        name
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
      types
      basePrice
      image8xLink
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
      id
      kappaRequired
      taskImageLink
      name
      experience
      minPlayerLevel
      lightkeeperRequired
      wikiLink
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
        __typename
        skillLevelReward {
          name
          level
        }
      }
      objectives {
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
