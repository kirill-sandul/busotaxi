<template>
  <div class="popup__container">
    <div class="popup__text">
      <h1 class="popup__text__title">{{ title }}</h1>
      <p class="popup__text__description">{{ description }}</p>
    </div>
    <form class="popup__form">
      <div class="popup__form__control">
        <input type="text" class="popup__form__control__input" v-model="form.controls.time" placeholder="tiempo" />
      </div>
      <div class="popup__form__control">
        <input type="text" class="popup__form__control__input" v-model="form.controls.from" placeholder="origen" />
      </div>
      <div class="popup__form__control">
        <input type="text" class="popup__form__control__input" v-model="form.controls.to" placeholder="destino" />
      </div>
      <div class="popup__form__control">
        <input type="text" class="popup__form__control__input" v-model="form.controls.name" placeholder="nombre" />
      </div>
      <div class="popup__form__control">
        <input type="text" class="popup__form__control__input" v-model="form.controls.phone" placeholder="telefono" />
      </div>
    </form>
    <span class="popup__error" v-if="form.error">{{ form_errors[form.error] ? form_errors[form.error] : '' }}</span>
    <div class="popup__buttons">
      <button class="popup__buttons__button popup__buttons__button--submit" @click="validate(form)">
        <span class="popup__buttons__button__text">{{ submit_btn_text }}</span>
      </button>
      <button class="popup__buttons__button popup__buttons__button--close" @click="close()">
        <span class="popup__buttons__button__text">{{ close_btn_text }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { usePopupStore } from '~/store/popup';
import form_errors from '~/assets/form_errors';
import FormPopupComponent from './FormPopupComponent.vue';

export default {
  extends: FormPopupComponent,
  props: ['title', 'description', 'reservation'],
  data(){
    return {
      form: {
        controls: {
          time: this.reservation ? this.reservation.time : '',
          from: this.reservation ? this.reservation.from : '',
          to: this.reservation ? this.reservation.to : '',
          name: this.reservation ? this.reservation.name : '',
          phone: this.reservation ? this.reservation.phone : ''
        },
        error: ''
      },
      form_errors
    }
  },
  setup() {
    const popup_store = usePopupStore();

    return { popup_store };
  }
}
</script>