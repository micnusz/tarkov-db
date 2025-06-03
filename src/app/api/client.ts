import {
  GET_ALL_WEAPONS,
  GET_AMMO,
  GET_BACKPACK_ID,
  GET_BACKPACKS,
  GET_ITEM_ID,
  GET_TRADERS,
  GET_WEAPON_ID,
} from "@/lib/queries";
import {
  AmmoProperties,
  BackpackItem,
  GetAmmoResponse,
  GetBackpacksResponse,
  GetItemsResponse,
  GetTradersResponse,
  GetWeaponResponse,
  Item,
  Trader,
  WeaponItem,
} from "./types";
import { graphqlClient } from "@/lib/graphql-client";

export const client = {
  async getItem(id: string): Promise<Item[]> {
    const data = await graphqlClient.request<GetItemsResponse>(GET_ITEM_ID, {
      ids: [id],
    });
    return data.items;
  },

  async getAmmo(): Promise<AmmoProperties[]> {
    const data = await graphqlClient.request<GetAmmoResponse>(GET_AMMO);
    return data.ammo;
  },

  async getWeapons(): Promise<WeaponItem[]> {
    const data = await graphqlClient.request<GetWeaponResponse>(
      GET_ALL_WEAPONS
    );
    return data.items;
  },

  async getWeapon(id: string): Promise<WeaponItem[]> {
    const data = await graphqlClient.request<GetWeaponResponse>(GET_WEAPON_ID, {
      ids: [id],
    });
    return data.items;
  },

  async getTraders(): Promise<Trader[]> {
    const data = await graphqlClient.request<GetTradersResponse>(GET_TRADERS);
    return data.traders;
  },

  async getBackpacks(): Promise<BackpackItem[]> {
    const data = await graphqlClient.request<GetBackpacksResponse>(
      GET_BACKPACKS
    );
    return data.items;
  },
  async getBackpack(id: string): Promise<BackpackItem[]> {
    const data = await graphqlClient.request<GetBackpacksResponse>(
      GET_BACKPACK_ID,
      {
        ids: [id],
      }
    );
    return data.items;
  },
};
