<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__header__arrow calendar__header__arrow--prev" @click="change_month(-1)">
        <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2L3 9.5L10 17" stroke="black" stroke-width="3"/>
        </svg>
      </div>
      <h2 class="calendar__header__date">{{ date_store.getFormatedDate }}</h2>
      <div class="calendar__header__arrow calendar__header__arrow--next" @click="change_month(1)">
        <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 17L9 9.5L2 2" stroke="black" stroke-width="3"/>
        </svg>
      </div>
    </div>
    <table class="calendar__table">
      <thead class="calendar__table__week">
        <client-only>
          <tr v-if="!adapt_weekdays">
            <th class="calendar__table__week__day">Lun</th>
            <th class="calendar__table__week__day">Mar</th>
            <th class="calendar__table__week__day">Mie</th>
            <th class="calendar__table__week__day">Jue</th>
            <th class="calendar__table__week__day">Vie</th>
            <th class="calendar__table__week__day">Sab</th>
            <th class="calendar__table__week__day">Dom</th>
          </tr>
        </client-only>
        <client-only>
          <tr v-if="adapt_weekdays">
            <th class="calendar__table__week__day">Ln</th>
            <th class="calendar__table__week__day">Mr</th>
            <th class="calendar__table__week__day">Mi</th>
            <th class="calendar__table__week__day">Ju</th>
            <th class="calendar__table__week__day">Vi</th>
            <th class="calendar__table__week__day">Sb</th>
            <th class="calendar__table__week__day">Dm</th>
          </tr>
        </client-only>
      </thead>
      <tbody class="calendar__table__days">
        <tr class="calendar__table__days__week" v-for="(week, index) in calendar" :key="index">
          <td
            class="calendar__table__days__week__day"
            :class="{
              'calendar__table__days__week__day--active': day.active,
              'calendar__table__days__week__day--selected': day.selected,
              'calendar__table__days__week__day--disabled': day.disabled,
              'calendar__table__days__week__day--saturday': day.saturday,
              'calendar__table__days__week__day--sunday': day.sunday
            }"
            @click="change_date(day)"
            v-for="(day, index) in week.days" :key="index">
            {{ day.value.format('D') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
  @import '~/assets/scss/modules/colors';

  .calendar {
    display: flex;
    flex-direction: column;
    max-width: max-content;
    padding: 40px;
    background-color: #fff;
    border: 1px solid $primary_gray;
    border-radius: 5px;

    @media screen and (max-width: 1125px){
      align-self: center;
    }
    @media screen and (max-width: 370px) {
      padding: 30px 20px;
    }

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &__date {
        font-size: 35px;
        font-weight: 500;

        @media screen and (max-width: 800px){
          font-size: 30px;
        }

        &__year {
          font-weight: 300;
        }
      }

      &__arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $primary_yellow;
        width: 30px;
        height: 30px;
        padding: 5px;
        border-radius: 4px;
        cursor: pointer;

        &--prev {
          margin-right: 15px;
        }

        &--next {
          margin-left: 15px;
        }
      }
    }

    &__table {
      &__week {
        // display: flex;
        // justify-content: space-around;
        // align-items: center;
        border-bottom: 1px solid $primary_light_gray;
  
        &__day {
          color: #616161;
          font-size: 18px;
          font-weight: 400;
          padding: 7px;
  
          &:last-child {
            margin-right: 0;
          }
        }
      }

      &__days {
        text-align: center;

        &__week {
          margin-bottom: 10px;

          &__day {
            font-size: 18px;
            width: 25px;
            height: 25px;
            border-radius: 4px;
            padding: 7px 0 7px 0;
            cursor: pointer;
            transition: .2s;
            
            &--active {
              color: #fff;
              background-color: $primary_red;
            }

            &--disabled {
              color: #ccc;
              opacity: 0.7;
              
              &:hover {
                background-color: lighten($primary_light_gray, 10) !important;
              }
            }

            &--selected {
              background-color: $primary_yellow;
              color: #000 !important;
            }

            &--saturday {
              color: #6392F1;

            }

            &--sunday {
              color: #FF4446;
            }
              
            &:hover {
              background-color: lighten($primary_light_gray, 5);
            }
          }
        }
      }
    }
  }
</style>

<script setup>
import { useDateStore } from '../store/date';

const date_store = useDateStore();
date_store.init();

let calendar = ref([]);
let adapt_weekdays = computed(() => {
  if(import.meta.client) return window.innerWidth <= 800
});

const generate = (now) => {
  const start_day = now.clone().startOf('month').startOf('week')
  const end_day = now.clone().endOf('month').endOf('week')

  // console.log(now, start_day, end_day);

  const date = start_day.clone().subtract(1, 'day')

  const generated = [];

  while (date.isBefore(end_day, 'day')) {
    generated.push({
      days: Array(7)
        .fill(0)
        .map(() => {
          const value = date.add(1, 'day').clone();
          const active = now.isSame(value, 'date');
          const disabled = !now.isSame(value, 'month');
          const selected = now.isSame(value, 'date');
          const saturday = date.day() === 6;
          const sunday = date.day() === 0;
          
          return {
            value, active, disabled, selected, saturday, sunday
          }
        })
    });
  }

  return generated;
}

calendar.value = generate(date_store.date);

const change_month = (dir) => {
  date_store.change_month(dir);
}

const change_date = (day) => {
  date_store.change_date(day);
}

date_store.$onAction(({ name, store, after }) => {
  after((result) => {
    calendar.value = generate(date_store.date);
  });
});
</script>

// <script>
// import moment from 'moment';
// import { useDateStore } from '~/store/date';

// export default {
//   data(){
//     return {
//       date: moment().locale('es', { week: { dow: 1 } }),
//       calendar: []
//     }
//   },
//   filters: {
//     format(date, format) {
//       return moment(date).locale('es').format(format);
//     }
//   },
//   setup(){
//     const date_store = useDateStore();
    
//     console.log(date_store.getDate);

//     return { date_store };
//   },
//   methods: {
//     generate(now){
//       const start_day = now.clone().startOf('month').startOf('week')
//       const end_day = now.clone().endOf('month').endOf('week')

//       const date = start_day.clone().subtract(1, 'day')

//       const calendar = [];

//       while (date.isBefore(end_day, 'day')) {
//         calendar.push({
//           days: Array(7)
//             .fill(0)
//             .map(() => {
//               const value = date.add(1, 'day').clone();
//               const active = moment().isSame(value, 'date');
//               const disabled = !now.isSame(value, 'month');
//               const selected = now.isSame(value, 'date');
//               const saturday = date.day() === 6;
//               const sunday = date.day() === 0;

              
//               return {
//                 value, active, disabled, selected, saturday, sunday
//               }
//             })
//         })
//       }

//       this.calendar = calendar;
//     }
//   },
//   mounted(){
//     this.generate(this.date);

//     console.log(this.date);
//   }
// }
// </script>