<template>
  <div class="reservations">
    <div class="reservations__header">
      <h1 class="reservations__header__title">Reservaciones</h1>
      <div class="reservations__header__loading" :class="{ 'reservations__header__loading--show': reservations_store.loading }">
        <div class="reservations__header__loading__bar"></div>
      </div>
    </div>
    <div class="reservations__container">
      <div class="reservations__list" v-if="!reservations_store.loading || reservations_store.reservations.length">
        <ReservationComponent
          v-for="reservation in reservations_store.reservations"
          :key="reservation._id"
          :extended="is_auth"
          :custom_class="'reservations__list__reservation'"
          :reservation="reservation"
          :edit="open_edit_popup"
          :remove="remove_reservation"
        />
        <h4 class="reservations__list__no-length" v-if="!reservations_store.reservations.length">No hay reservaciones de este día</h4>
      </div>
    </div>
    <div class="reservations__bottom">
      <button class="reservations__bottom__btn reservations__bottom__btn--add" @click="popup_store.open_popup('create')" v-if="is_auth">
        Agregar
        <svg class="reservations__bottom__btn__icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.095 0.644998V7.395H17.665V10.815H11.095V17.52H7.315V10.815H0.79V7.395H7.315V0.644998H11.095Z" fill="black"/>
        </svg>
      </button>
      
      <button class="reservations__bottom__btn reservations__bottom__btn--auth" v-if="is_auth === false" @click="popup_store.open_popup('login')">
        Registrarse
        <svg class="reservations__bottom__btn__icon" width="29" height="14" viewBox="0 0 29 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-4.80825e-07 6.99999L27 6.99999M27 6.99999L21.4286 12.5M27 6.99999L21.4286 1.49998" stroke="black" stroke-width="1.5"/>
        </svg>
      </button>
    </div>
    <PopupComponent
      v-if="popup_store.types.edit"
      :custom="true"
      >
      <ReservationPopupComponent
        :title="'Editar'"
        :description="''"
        :reservation="reservations_store.selected_reservation"
        :submit_btn_text="'enviar'"
        :submit_callback="edit_reservation"
        :close_btn_text="'cerrar'"
        :close_callback="() => popup_store.close_popup('edit')"
      />
    </PopupComponent>
    <PopupComponent
      v-if="popup_store.types.create"
      :custom="true"
      >
      <ReservationPopupComponent
        :title="'Agregar'"
        :description="''"
        :submit_btn_text="'agregar'"
        :submit_callback="create_reservation"
        :close_btn_text="'cerrar'"
        :close_callback="() => popup_store.close_popup('create')"
      />
    </PopupComponent>
    <PopupComponent
      v-if="popup_store.types.login"
      :custom="true"
    >
      <LoginPopupComponent
        :title="'Registrarse'"
        :description="''"
        :submit_btn_text="'registrarse'"
        :submit_callback="login_employee"
        :close_btn_text="'cerrar'"
        :close_callback="() => popup_store.close_popup('login')"
      />
    </PopupComponent>
  </div>
</template>

<style lang="scss">
  @import '~/assets/scss/modules/colors';

  @keyframes name {
    0% {
      opacity: 1;
      width: 70%;
      transform: translateX(-100%);
    }

    100% {
      opacity: 0;
      width: 150%;
      transform: translateX(200%);
    }
  }

  .reservations {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid $primary_light_gray;
    border-radius: 5px;
    background-color: #fff;
    width: fit-content;
    height: 100%;
    max-height: 75vh;
    overflow: auto;

    @media screen and (max-width: 1125px){
      align-self: center;
    }

    &__container {
      // display: flex;
      // justify-content: center;
    }

    &__header {
      position: relative;
      border-bottom: 1px solid $primary_light_gray;
      padding: 20px 50px;

      &__title {
        font-weight: 300;
      }

      &__loading {
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: $primary_light_gray;
        overflow: hidden;
        opacity: 0;
        transition: .2s;

        &--show {
          opacity: 1;
        }

        &__bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 70%;
          height: 100%;
          background-color: $primary_yellow;
          animation: name 1s linear infinite;
        }
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 20px 50px;

      @media screen and (max-width: 400px){
        padding: 20px 30px;
      }

      &__no-length {
        color: darken($primary_gray, 15%);
        font-weight: 400;
      }
        
      &__reservation {
        display: flex;
        border: 1px solid $primary_light_gray;
        border-radius: 5px;
        margin-bottom: 15px;
        width: 100%;
        transition: .2s;

        &__time {
          display: flex;
          background-color: $primary_yellow;
          align-items: center;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          font-size: 18px;
          font-weight: 600 !important;
          padding: 0 15px;
        }

        &__container {
          display: flex;
          flex-direction: row;
          width: 100%;
          
          @media screen and (max-width: 440px) {
            flex-direction: column;
          }
        }

        &__props {
          display: flex;
          align-items: center;
          // justify-content: center;
          padding: 12px;
          width: 100%;

          @media screen and (max-width: 440px) {
            flex-direction: column;
            align-items: flex-start;

            &__span {
              margin-right: 0;
              margin-bottom: 10px;
            }
          }

          span {
            position: relative;
            font-size: 17px;
            font-weight: 300;
            margin-right: 10px;

            @media screen and (max-width: 1400px){
              margin-right: 15px;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }

          &__text {
            width: 100%;
            text-align: center;
            margin-right: 0 !important;
          }

          &__path {
            display: flex;
            align-items: center;
            margin-right: 10px;
  
  
            @media screen and (max-width: 1300px) {
              flex-direction: column;
              align-items: flex-start;
  
              &__to {
                margin-left: 0 !important;
              }
              
              svg {
                display: none;
              }
            }
  
            &__from {
              margin-right: 10px;
            }
  
            &__to {
              margin-left: 10px;
            }
          }
  
          &__name, &__phone {
            font-weight: 500 !important;
          }
        }

        &__options {
          display: flex;

          @media screen and (max-width: 1300px) {
            flex-direction: column;
          }

          @media screen and (max-width: 440px){
            flex-direction: row;

            &__option {
              width: 100%;
            }
          }
            
          &__option {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 14px;
            cursor: pointer;
            transition: .2s;

            svg {
              transition: .2s;
            }

            &--edit {
              background-color: #003197;
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;

              @media screen and (max-width: 1300px) {
                flex-direction: column;
                border-top-right-radius: 5px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
              }

              &:hover {
                background-color: darken(#003197, 10);
              }
            }

            &--remove {
              background-color: $primary_red;
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;

              @media screen and (max-width: 1300px) {
                flex-direction: column;
                border-bottom-right-radius: 5px;
                border-top-right-radius: 0;
              }

              &:hover {
                background-color: darken($primary_red, 10);
              }
            }
          }
        }

      }
    }

    &__bottom {
      display: flex;
      justify-content: flex-end;
      
      &__btn {
        display: flex;
        justify-content: center;
        font-weight: 600;
        padding: 17px 20px;
        text-transform: uppercase;
        background-color: $primary_yellow;
        cursor: pointer;
        border-bottom-right-radius: 4px;
        transition: .2s;

        &:hover {
          background-color: darken($primary_yellow, 5);
        }

        &:active {
          transform: scale(0.9);
        }

        &__icon {
          margin-left: 15px;
        }
      }
    }
  }
</style>

<script setup>
import { useDateStore } from '~/store/date';
import { useReservationsStore } from '~/store/reservations';
import { usePopupStore } from '~/store/popup';
import { useAuthStore } from '~/store/auth';
import PopupComponent from '~/components/PopupComponent.vue';
import LoginPopupComponent from './LoginPopupComponent.vue';
import ReservationPopupComponent from './ReservationPopupComponent.vue';
import ReservationComponent from './ReservationComponent.vue';

const date_store = useDateStore();
const reservations_store = useReservationsStore();
const popup_store = usePopupStore();
const auth_store = useAuthStore();

const is_auth = ref(null);

const get_list = async (date) => {
  await reservations_store.fetch_reservations(date.format('DD.MM.YYYY'));
}

onMounted(() => {
  get_list(date_store.date);

  let employee_data = auth_store.get_storage();

  if(employee_data && employee_data.token) {
    auth_store.set_storage(employee_data.token, employee_data.employee_id);
    is_auth.value = !!auth_store.token;

    return;
  }

  is_auth.value = false;
});

const open_edit_popup = (r) => {
  popup_store.open_popup('edit');
  reservations_store.select_reservation(r);
}

const create_reservation = async (popup_form) => {
  const create_data = popup_form.controls;
  const date = date_store.date.format('DD.MM.YYYY');

  const res = await reservations_store.create_reservation({ date, ...create_data }, auth_store.token);
  await reservations_store.fetch_reservations(date_store.date.format('DD.MM.YYYY'));

  return res;
}

const edit_reservation = async (popup_form) => {  
  const r_id = reservations_store.selected_reservation._id;
  const edit_data = popup_form.controls;
  const date = date_store.date.format('DD.MM.YYYY');

  const res = await reservations_store.edit_reservation(r_id, { date, ...edit_data }, auth_store.token);
  await reservations_store.fetch_reservations(date_store.date.format('DD.MM.YYYY'));

  return res;
}

const remove_reservation = async (id) => {
  const res = await reservations_store.remove_reservation(id, auth_store.token);
  await reservations_store.fetch_reservations(date_store.date.format('DD.MM.YYYY'));

  return res;
}

const login_employee = async (popup_form) => {
  const { login, password } = popup_form.controls;

  const res = await auth_store.login({ login, password });
  
  return res;
}


date_store.$onAction(({ name, store, after }) => {
  if(name !== 'change_date' && name !== 'change_month') return;

  after(() => {
    get_list(store.date);
  });
});
</script>