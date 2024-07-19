<template>
  <div class="popup__container">
    <div class="popup__text">
      <h1 class="popup__text__title">{{ title }}</h1>
      <p class="popup__text__description">{{ description }}</p>
    </div>
    <form class="popup__form">
      <div class="popup__form__control">
        <input type="text" class="popup__form__control__input" v-model="form.controls.login" placeholder="acceso" />
      </div>
      <div class="popup__form__control">
        <input type="password" class="popup__form__control__input" v-model="form.controls.password" placeholder="contraseña" />
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
import FormPopupComponent from './FormPopupComponent.vue';
import form_errors from '~/assets/form_errors';

export default {
  extends: FormPopupComponent,
  props: ['title', 'description'],
  data(){
    return {
      form: {
        controls: {
          login: '',
          password: '',
        },
        error: ''
      },
      form_errors
    }
  }
}
</script>