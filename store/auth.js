import { defineStore } from "pinia";
import Cookies from 'js-cookie';
import http from '~/assets/http.util';

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '', employee_id: '' }),
  actions: {
    set_storage(token, employee_id){
      this.token = token;
      this.employee_id = employee_id;
      
      // localStorage.setItem('busotaxi:employee_data', JSON.stringify({ employee_id, token }));
      // const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
        
      Cookies.set('busotaxi:employee_data:id', employee_id, { expires: 2 });
      Cookies.set('busotaxi:employee_data:token', token, { expires: 2 });
    },
    get_storage(){
      const employee_id = Cookies.get('busotaxi:employee_data:id');
      const token = Cookies.get('busotaxi:employee_data:token');

      if(!employee_id || !token){
        return null;
      }

      return {
        employee_id,
        token
      }
    },
    remove_storage(){
      this.token = '';
      this.employee_id = '';

      localStorage.removeItem('busotaxi:employee_data');
    },
    async login({ login, password }){
      const response = await http('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: {
          login, password
        }
      });

      const { token, employee_id } = response;

      this.set_storage(token, employee_id);

      return response;
    }
  },
});