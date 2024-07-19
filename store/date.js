import { defineStore } from 'pinia';
import moment from 'moment';
import 'moment/dist/locale/es';

moment.locale('es');

export const useDateStore = defineStore('date', {
  state: () => ({ date: null }),
  getters: {
    getFormatedDate: (state) => moment(state.date).format('MMMM YYYY'),
    getDate: (state) => state.date
  },
  actions: {
    init(){
      this.date = moment().locale('es', { week: { dow: 1 } });
    },
    change_month(dir){
      this.date = moment(this.date).add(dir, 'month');
    },
    change_date(date) {
      const date_ = date.value;

      this.date = moment(this.date).set({
        date: date_.date(),
        month: date_.month(),
        year: date_.year()
      });
    }
  }
});