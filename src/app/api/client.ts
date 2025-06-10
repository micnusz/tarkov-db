import {
  GET_ALL_WEAPONS,
  GET_AMMO,
  GET_BACKPACK_ID,
  GET_BACKPACKS,
  GET_BARTER_ITEMS,
  GET_BARTERS,
  GET_CONTAINERS_ITEMS,
  GET_ITEM_ID,
  GET_ITEM_ID_NAME,
  GET_ITEMS,
  GET_ITEMS_SEARCH_BAR,
  GET_TASKS,
  GET_TRADERS,
  GET_WEAPON_ID,
} from "@/lib/queries";
import {
  GetAmmoCaliber,
  GetBackpackById,
  GetBackpacks,
  GetBarterItems,
  GetBarters,
  GetContainerItems,
  GetItemById,
  GetItems,
  GetItemsSearchBar,
  GetOnlyWeapons,
  GetTasks,
  GetTraders,
  GetWeaponById,
} from "./types";
import { graphqlClient } from "@/lib/graphql-client";

export const client = {
  async getItems(): Promise<GetItems["items"]> {
    const data = await graphqlClient.request<GetItems>(GET_ITEMS);
    return data.items;
  },

  async getItem(id: string): Promise<GetItemById["items"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_ID, {
      ids: [id],
    });
    return data.items;
  },
  async getItemIdName(id: string): Promise<GetItemById["items"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_ID_NAME, {
      ids: [id],
    });
    return data.items;
  },

  async getItemsSearchBar(name: string): Promise<GetItemsSearchBar["items"]> {
    const data = await graphqlClient.request<GetItemsSearchBar>(
      GET_ITEMS_SEARCH_BAR,
      {
        name: name,
      }
    );
    return data.items;
  },

  async getAmmo(): Promise<GetAmmoCaliber["ammo"]> {
    const data = await graphqlClient.request<GetAmmoCaliber>(GET_AMMO);
    return data.ammo;
  },

  async getWeapons(): Promise<GetOnlyWeapons["items"]> {
    const data = await graphqlClient.request<GetOnlyWeapons>(GET_ALL_WEAPONS);
    return data.items;
  },

  async getWeapon(id: string): Promise<GetWeaponById["items"]> {
    const data = await graphqlClient.request<GetWeaponById>(GET_WEAPON_ID, {
      ids: [id],
    });
    return data.items;
  },

  async getTraders(): Promise<GetTraders["traders"]> {
    const data = await graphqlClient.request<GetTraders>(GET_TRADERS);
    return data.traders;
  },

  async getBackpacks(): Promise<GetBackpacks["items"]> {
    const data = await graphqlClient.request<GetBackpacks>(GET_BACKPACKS);
    return data.items;
  },

  async getBackpack(id: string): Promise<GetBackpackById["items"]> {
    const data = await graphqlClient.request<GetBackpackById>(GET_BACKPACK_ID, {
      ids: [id],
    });
    return data.items;
  },

  async getTasks(): Promise<GetTasks["tasks"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASKS);
    return data.tasks;
  },

  async getBarterItems(): Promise<GetBarterItems["items"]> {
    const data = await graphqlClient.request<GetBarterItems>(GET_BARTER_ITEMS);
    return data.items;
  },

  async getContainersItems(): Promise<GetContainerItems["items"]> {
    const data = await graphqlClient.request<GetContainerItems>(
      GET_CONTAINERS_ITEMS
    );
    return data.items;
  },

  async getBarters(): Promise<GetBarters["barters"]> {
    const data = await graphqlClient.request<GetBarters>(GET_BARTERS);
    return data.barters;
  },
};
