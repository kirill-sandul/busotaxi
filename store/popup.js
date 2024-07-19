import { defineStore } from "pinia";

export const usePopupStore = defineStore('popup', {
  state: () => ({ types: {
    edit: false,
    remove: false,
    create: false,
    login: false,
    spec_travels: false
  }}),
  actions: {
    open_popup(type){
      this.types[type] = true;
    },
    close_popup(type){
      this.types[type] = false;
    }
  }
});