import { defineStore } from "pinia";
import http from "~/assets/http.util";
// import { useDateStore } from './date';

// const date_store = useDateStore();

export const useReservationsStore = defineStore('reservations', {
  state: () => ({ reservations: [], selected_reservation: {}, loading: false }),
  actions: {
    select_reservation(reservation){
      this.selected_reservation = reservation;
    },
    async fetch_reservations(date) {
      this.loading = true;
        
      const response = await http(`http://localhost:5000/api/reservations/get/${date}`, {
        method: 'GET'
      });
      
      this.reservations = response.found_list;
      this.loading = false;
    },
    async create_reservation(create_data, token){
      this.loading = true;

      const response = await http('http://localhost:5000/api/reservations/create', {
        method: 'POST',
        headers: {
          Auth: `Bearer ${token}`
        },
        body: {
          ...create_data
        }
      });

      this.loading = false;

      return response;
    },
    async edit_reservation(id, edit_data, token) {
      this.loading = true;

      const response = await http('http://localhost:5000/api/reservations/edit', {
        method: 'PUT',
        headers: {
          Auth: `Bearer ${token}`
        },
        body: {
          id,
          ...edit_data
        }
      });

      this.loading = false;

      return response;
    },
    async remove_reservation(id, token) {
      this.loading = true;

      const response = await http(`http://localhost:5000/api/reservations/remove`, {
        method: 'DELETE',
        headers: {
          Auth: `Bearer ${token}`
        },
        body: {
          id
        }
      });

      this.loading = false;

      return response;
    }
  }
});