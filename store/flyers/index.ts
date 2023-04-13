import { defineStore } from 'pinia'
import type { TFlyer, TFlyers } from "~~/types/flyer";
export const useFlyerStore = defineStore( 'flyer' , {
  state: () => ({
    flyers: [] as TFlyers
  }),
  /*
  getters: {
    getMenuById: (state) => (id: number) => {
      return state.menus.find(menu => menu.id === id)
    }
  },
  */
  actions: {
    async getFlyers(screen : string = 'admin') {
    const response = await fetch(
      "https://62fe320941165d66bfbabe7e.mockapi.io/apt/v1/foods"
    );
    if (response.ok) {
      const flyersDataRow = await response.json();
      let sortedFlyers = flyersDataRow
        .sort(
          (filter1: TFlyer, filter2: TFlyer) => filter1.order - filter2.order
        );
      if (screen == 'user') {
         sortedFlyers = sortedFlyers
        .filter((flyer : TFlyer) => flyer.status === true)
      }

      this.flyers = sortedFlyers;
      return "done"
    } else {
      console.log("Failed to fetch flyers.");
    }
  },
  }
})