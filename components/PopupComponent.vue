<template>
  <div class="popup">
    <slot v-if="custom" />
    <div class="popup__container" v-if="!custom">
      <div class="popup__text">
        <h1 class="popup__text__title">{{ title }}</h1>
        <p class="popup__text__description">{{ description }}</p>
      </div>
      <div class="popup__buttons">
        <slot />
        <button class="popup__buttons__button popup__buttons__button--close" @click="close()">
          <span class="popup__buttons__button__text">{{ close_btn_text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '~/assets/scss/modules/colors';

  .popup {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // opacity: 0;
    z-index: 9999;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 60vw;
      height: fit-content;
      color: #fff;
      background-color: $primary_dark_gray;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      transform: scale(0);
      opacity: 0;

      @media screen and (max-width: 600px){
        width: 80vw;
      }

      @media screen and (max-width: 380px) {
        width: 100vw;
      }
    }
    
    
    &__text {
      padding: 40px 0 0 40px;
      margin-bottom: 20px;

      &__title {
        font-size: 40px;
        font-weight: 700;
        // margin-bottom: 20px;
        // transform: translateY(150%);

      }

      &__description {
        font-size: 20px;
        font-weight: 300;
        margin-left: 15px;
        margin-top: 20px;
        // transform: translateY(100%);
      }

    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: right;

      &__button {
        display: flex;
        position: relative;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.5px;
        color: #fff;
        background-color: #000;
        cursor: pointer;
        padding: 13px 34px;
        // transform: translateX(-100%);

        &__text {
          z-index: 2;
        }

        &--close {
          background-color: $primary_red;

          &::before {
            background-color: $primary_light_red !important;
          }
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: $primary_yellow;
          transform: scaleY(2%);
          transform-origin: bottom;
          transition: .2s;
        }

        &:hover {
          &::before {
            transform: scaleY(100%);
          }
        }
      }
    }

    &__form {
      display: flex;
      flex-wrap: wrap;

      @media screen and (max-width: 940px){
        justify-content: center;
      }

      @media screen and (min-width: 810px){
        padding: 0 40px;
      }

      &__control {
        &__input {
          background-color: transparent;
          border: 1px solid $primary_gray;
          border-radius: 2px;
          color: #fff;
          padding: 10px 17px;
          outline: none;
          margin-right: 20px;
          margin-bottom: 20px;
          transition: border-color .2s;

          &::-webkit-input-placeholder {
            font-weight: 700;
            text-transform: uppercase;
          }

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          &:focus {
            border-color: $primary_yellow;
          }
        }
      }
    }

    &__error {
      color: $primary_error_red;
      margin-left: 40px;
      margin-bottom: 20px;
    }
  }
</style>

<script>
import gsap from 'gsap';

export default {
  props: ['custom', 'name', 'title', 'description', 'submit_btn_text', 'submit_callback', 'close_callback', 'close_btn_text'],
  methods: {
    close(){
      gsap.set('body', { overflowY: 'scroll' });
      
      const tl = gsap.timeline({ onComplete: () => this.close_callback() });

      tl
      // .to(['.popup__text__title', '.popup__text__description', '.popup__buttons__button'], { opacity: 0, ease: 'expo.inOut' }, 0)
      // .to(['.popup__text__title', '.popup__text__description'], { y: '100%', stagger: 0.1, ease: 'expo.in', duration: 0.7 }, 0)
      // .to('.popup__buttons__button', { x: '-100%', stagger: 0.1, ease: 'expo.in', duration: 0.5 }, 0)
      .to('.popup__container', { opacity: 0, scale: 0, ease: 'strong.inOut' }, 0.2)
      .to('.popup', { opacity: 0, ease: 'strong.out' }, 0.4)
    },
    async submit(form){
      const response = await this.submit_callback(form);

      if(response.error) return response.error;
      if(response.message) {
        this.close();
        return '';
      }

      return false;
    }
  },
  mounted(){
    gsap.set('body', { overflowY: 'hidden' });

    const tl = gsap.timeline();

    tl
      // .to('.popup', { opacity: 1, ease: 'strong.out' }, 0)
      .to('.popup__container', { opacity: 1, scale: 1, ease: 'strong.inOut', duration: 0.7 }, 0)
      // .to(['.popup__text__title', '.popup__text__description'], { y: 0, stagger: 0.1, ease: 'expo.out', duration: 0.7 }, 0.2)
      // .to('.popup__buttons__button', { x: 0, stagger: 0.1, ease: 'expo.out', duration: 0.7 }, 0.25);
  }
}
</script>