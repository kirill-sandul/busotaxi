<template>
  <section class="calculator" id="calculator">
    <div class="calculator__wrapper">
      <h1 class="calculator__title extra-title" style="font-weight: 300;">
        <span class="calculator__title__fragment" v-for="fragment in splitted_text.title" :key="fragment">
          <span class="calculator__title__fragment__text">{{ fragment }}</span>
        </span>
      </h1>
      <div class="calculator__main" ref="main">
        <div class="calculator__main__header">
          <button :class="
            ['calculator__main__header__button',
            form.time === 'day' ? 'calculator__main__header__button--active' : '',
            'calculator__main__header__button--day']
          "
            ref="time_button_day"
            @click="select_time('day')"
          >
            {{ text.main.header.modes.day }}
          </button>
          <button :class="['calculator__main__header__button',
            form.time === 'night' ? 'calculator__main__header__button--active' : '',
            'calculator__main__header__button--night']"
            ref="time_button_night"
            @click="select_time('night')">
            {{ text.main.header.modes.night }}
          </button>
        </div>
        <form class="calculator__main__form" @submit="e => e.preventDefault()">
          <div class="calculator__main__form__container">
            <div class="calculator__main__form__wrapper">
              <div
                class="calculator__main__form__control"
                v-bind:class="{ 'calculator__main__form__control--invalid': form.errors.origin }"
              >
                <label for="origin" class="calculator__main__form__control__label font-secondary">{{ text.main.form.controls.from.label }}</label>
                <input
                  type="text"
                  id="origin"
                  class="calculator__main__form__control__input font-secondary"
                  v-model="form.origin"
                  ref="origin_input"
                />
              </div>
              <p
                class="calculator__main__form__control__error"
                v-if="form.errors.origin">{{ text.main.form.controls.from.error }}
              </p>
            </div>
            <button class="calculator__main__form__change-icon" ref="change_icon" @click="change()">
              <svg width="45" height="16" viewBox="0 0 45 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0154 13.8345L5.98866 9.59629H39.0113L34.9846 13.8345L37.3992 16L45 8L37.3992 8.36251e-07L34.9846 2.16547L39.0113 6.40371L5.98866 6.40371L10.0154 2.16547L7.60081 0L0 8L7.60081 16L10.0154 13.8345Z" fill="black"/>
              </svg>
            </button>
            <div class="calculator__main__form__wrapper">
              <div
                class="calculator__main__form__control"
                v-bind:class="{ 'calculator__main__form__control--invalid': form.errors.destination }"
              >
                <label for="destination" class="calculator__main__form__control__label font-secondary">{{ text.main.form.controls.to.label }}</label>
                <input
                  type="text"
                  id="destination"
                  class="calculator__main__form__control__input font-secondary"
                  v-model="form.destination"
                  ref="destination_input"
                />
              </div>
              <p
                class="calculator__main__form__control__error"
                v-if="form.errors.destination">{{ text.main.form.controls.to.error }}
              </p>
            </div>
          </div>
          <p class="calculator__main__form__coincidence_error" v-if="form.errors.coincidence">{{ text.main.form.coincidence_error }}</p>
        </form>
        <div class="calculator__main__bottom">
          <h2 class="calculator__main__bottom__distance" ref="result_distance">~{{ form.result.distance }}km</h2>
          <button
            class="calculator__main__bottom__calculate-btn font-secondary"
            ref="result_btn"
            @click="calculate()"
          >{{ text.main.bottom.calculate_btn }}</button>
          <h2 class="calculator__main__bottom__price" ref="result_price">{{ form.result.price }}€</h2>
        </div>
        <div class="calculator__main__contact-block">
          <div class="calculator__main__contact-block__item">
            <h3 class="calculator__main__contact-block__item__title font-secondary">Instagram</h3>
            <p class="calculator__main__contact-block__item__link font-secondary">instagram.com/busotaxi</p>
          </div>
          <div class="calculator__main__contact-block__item">
            <h3 class="calculator__main__contact-block__item__title font-secondary">{{ text.main.phone_btn }}</h3>
            <p class="calculator__main__contact-block__item__link font-secondary">622 26 79 65</p>
          </div>
        </div>
      </div>
    </div>
    <div class="calculator__bg"></div>
    <PopupComponent
      v-if="popup_state"
      :title="text.popup.title"
      :description="text.popup.description"
      :close_callback="() => popup_state = false"
      :close_btn_text="text.popup.close_btn"
    >
      <a href="tel:+34622267965">
        <button class="popup__buttons__button popup__buttons__button--custom">
          <span class="popup__buttons__button__text">{{ text.popup.button }} 622 26 79 65</span>
        </button>
      </a>
    </PopupComponent>
  </section>
</template>

<style lang="scss">
  @import '~/assets/scss/modules/colors';

  .calculator {
    position: relative;
    overflow: hidden;

    @media screen and (max-width: 700px) {
      background-color: #000;
      
      &__wrapper {
        padding: 70px 0 0 0 !important;
      }

      &__title {
        font-size: 40px !important;
        margin-left: 40px;

        &__fragment {
          margin-right: 10px !important;
        }
      }

      &__bg {
        display: none;
      }
    }

    @media screen and (min-width: 1500px){
      &__main {
        padding: 70px;

        &__form {
          &__control {
            &__input, &__label {
              font-size: 18.5px;
            }
          }
        }

        &__bottom {
          &__distance, &__price {
            font-size: 30px;
          }

          &__calculate-btn {
            font-size: 21px !important;
          }
        }
      }
    }

    &__wrapper {
      padding: 100px 50px;
      padding-bottom: 0;
    }

    &__title {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      color: #fff;
      max-width: 550px;
      margin-bottom: 40px;

      
      &__fragment {
        display: block;
        overflow: hidden;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }

        &__text {
          display: block;
          transform: translateY(100%);
        }
      }
    }

    &__main {
      display: flex;
      flex-direction: column;
      width: min-content;
      background-color: $primary_yellow;
      padding: 50px;
      transform: scaleX(0);
      transform-origin: left;

      @media screen and (max-width: 750px) {
        width: 100% !important;
        align-items: center;
      }

      @media screen and (max-width: 1160px){
        padding: 50px 50px 0 50px;
      }

      &__header {
        display: flex;
        flex-direction: row;
        margin-bottom: 25px;

        &__button {
          color: #000;
          background-color: transparent;
          border: 1px solid #000;
          border-radius: 5px;
          font-family: 'Open Sans', sans-serif;
          font-size: 17px;
          font-weight: 700;
          padding: 5px 15px;
          text-transform: uppercase;
          cursor: pointer;
          margin-right: 20px;
          transition: .2s background-color;

          &:last-child {
            margin-right: 0;
          }

          &--active {
            color: #fff;
            background-color: #000;
          }
        }
      }

      &__form {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;

        &__container {
          display: flex;
          align-items: center;
          justify-content: center;

          @media screen and (max-width: 600px){
            flex-direction: column;
          }
        }

        &__coincidence_error {
          color: $primary_error_red;
          margin-top: 10px;
        }
        
        @media screen and (max-width: 600px) {
          flex-direction: column;

          &__wrapper {
            &:first-child {
              margin-bottom: 10px;
            }
            &:last-child {
              margin-top: 10px;
            }
          }

          &__change-icon {
            transform: rotate(90deg) !important;
          }
        }

        &__change-icon {
          display: flex;
          background-color: transparent;
          cursor: pointer;
          opacity: 0;
          transform: translateY(100%);
          margin: 0 22px;

          svg {
            width: 32px;
            height: 32px;
          }
        }

        &__control {
          width: min-content;
          border: 2px solid #000;
          border-radius: 5px;
          padding: 14px 16px;
          opacity: 0;
          transform: translateY(100%);

          &--invalid {
            border-color: $primary_error_red;
          }

          &--invalid &__input {
            color: $primary_error_red;
          }

          &__error {
            color: $primary_error_red;
            margin-top: 10px;
          }

          &__label {
            display: inline-flex;
            color: #5b5b5b;
            text-transform: uppercase;
            font-weight: 700;
            opacity: 0;
            transform: translateY(100%);
            margin-right: 14px;
          }

          &__input {
            border: none;
            font-weight: 600;
            text-transform: uppercase;
            background-color: transparent;
            max-width: 50%;
            opacity: 0;
            transform: translateY(100%);

          }
        }
      }

      &__bottom {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 400px) {
          flex-direction: column !important;

          &__calculate-btn {
            margin: 20px 0 !important;
          }
        }

        @media screen and (max-width: 1160px){
          margin-bottom: 50px;
        }

        &__calculate-btn {
          text-transform: uppercase;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #fff;
          background-color: #000;
          cursor: pointer;
          margin: 0 40px;
          padding: 13px 34px;
          opacity: 0;
          transform: translateX(-30%);
        }

        &__distance, &__price {
          font-weight: 400;
          opacity: 0;
          transform: translateX(-100%);
        }
      }

      &__contact-block {
        position: absolute;
        top: 25%;
        right: -100%;
        width: 100%;

        @media screen and (max-width: 440px) and (min-width: 370px) {
          width: auto;
        }

        @media screen and (max-width: 1160px){
          position: relative;
          top: 0;
          right: 0;

          &__item {
            min-width: 100%;
            max-width: 100% !important;
            margin-bottom: 0 !important;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: -50px;
              width: calc(100% + 100px);
              height: 100%;
              background-color: #000;
              z-index: -1;
            }
          }
        }

        &__item {
          display: flex;
          position: relative;
          align-items: center;
          background-color: #000;
          max-width: fit-content;
          padding: 15px 60px;
          margin-bottom: 20px;

          @media screen and (max-width: 600px){
            padding: 15px 0;
          }

          @media screen and (max-width: 370px){
            flex-direction: column;

            &__title {
              margin-right: 0 !important;
            }
          }
          
          &__title {
            color: #fff;
            font-size: 18px;
            text-transform: uppercase;
            margin-right: 40px;
          }

          &__link {
            color: $primary_yellow;
          }
        }
      }
    }

    &__bg {
      position: absolute;
      top: -27%;
      left: -40%;
      width: 1300px;
      height: 1300px;
      background-color: #000;
      border-radius: 100%;
      z-index: -99;

      @media screen and (min-width: 1500px) {
        width: 1700px;
        height: 1700px;
      }
    }
  }
</style>

<script>
import gsap from 'gsap';
import PopupComponent from './PopupComponent.vue';
import { usePopupStore } from '~/store/popup';

export default {
  components: { PopupComponent },
  props: {
    text: {
      title: '',
      main: {
        header: {
          modes: {
            day: '',
            night: ''
          }
        },
        form: {
          controls: {
            from: {
              label: '',
              error: ''
            },
            to: {
              label: 'To',
              error: ''
            }
          },
          coincidence_error: ''
        },
        bottom: {
          calculate_btn: ''
        },
        phone_btn: ''
      },
      popup: {
        title: '',
        description: '',
        button: '',
        close_btn: ''
      },
    },
  },
  data(){
    return {
      form: {
        origin: 'Busot',
        destination: 'Alicante',
        time: 'day',
        modes: {
          day: {
            start: 3,
            path: 1.50
          },
          night: {
            start: 3.50,
            path: 1.60
          }
        },
        result: {
          distance: 0,
          price: 0
        },
        errors: {
          origin: false,
          destination: false,
          coincidence: false,
          methods: {
            empty({ origin, destination }){
              if(!origin.trim() && !destination.trim()) return { origin: true, destination: true };
              else if(!origin.trim()) return { origin: true, destination: false };
              else if(!destination.trim()) return { origin: false, destination: true };

              return false;
            },
            not_found(result, response){
              const responses = {
                origin: response.originAddresses[0],
                destination: response.destinationAddresses[0]
              }

              if(result.status === 'NOT_FOUND') {
                if(!responses.origin) return { origin: true }
                else if(!responses.destination) return { destination: true }
              }

              return false;
            },
            coincidence({ origin, destination }, response){
              const parsed_addresses = {
                origin: response.originAddresses[0].split(','),
                destination: response.destinationAddresses[0].split(',')
              }

              const origin_city = parsed_addresses.origin[parsed_addresses.origin.length - 2];
              const destination_city = parsed_addresses.destination[parsed_addresses.destination.length - 2];

              if(origin_city === destination_city || origin.toLowerCase() === destination.toLowerCase()) {
                return { coincidence: true }
              }

              return false;
            }
          }
        }
      },
      splitted_text: {
        title: []
      },
      popup_state: false
    }
  },
  methods: {
    select_time(name){
      this.form.time = name;

      this.calculate();
    },
    set_loading(){
      const { result_btn, result_distance, result_price } = this.$refs;

      gsap.to([result_distance, result_price, result_btn], { opacity: 0.5, duration: 0.4 });
      gsap.set(result_btn, { pointerEvents: 'none' });
    },
    remove_loading(){
      const { result_btn, result_distance, result_price } = this.$refs;

      gsap.to([result_distance, result_price, result_btn], { opacity: 1, duration: 0.4 });
      gsap.set(result_btn, { pointerEvents: 'auto' });
    },
    set_error(error_method_result){
      this.form.errors = { ...this.form.errors, ...error_method_result };
      this.remove_loading();
      return;
    },
    remove_errors(){
      this.form.errors = { ...this.form.errors, origin: false, destination: false, coincidence: false };
      this.remove_loading();
      return true;
    },
    calculate(){
      const form = this.form;

      this.set_loading();
      
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
          origins: [`${this.form.origin}, Spain`],
          destinations: [`${this.form.destination}, Spain`],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, callback);

      const self = this;

      function callback(response) {
        const result = response.rows[0].elements[0];

        const errors_check = () => {
          const { empty, not_found, coincidence } = form.errors.methods;
          
          if(empty(form)) return self.set_error(empty(form));
          else if(not_found(result, response)) return self.set_error(not_found(result, response));
          else if(coincidence(form, response)) return self.set_error(coincidence(form, response));
          else return self.remove_errors();
        }
        const check_result = errors_check();
        if(!check_result) return;

        // if(form.errors.origin || form.errors.destination || form.errors.coincidence) return;

        const normalized_distance = parseInt(result.distance.text.split('км')[0]);

        if(normalized_distance >= 50) {
          form.result = {
            distance: normalized_distance,
            price: 0
          }

          this.popup_state = true;
          self.remove_loading();

          return;
        }

        const result_price = {
          start: form.modes[form.time].start,
          path: normalized_distance * form.modes[form.time].path,
        }

        form.result = {
          distance: normalized_distance,
          price: Math.floor(result_price.start + result_price.path, 1)
        }

        self.remove_loading();
      }
    },
    change(){
      const origin = this.form.origin;
      const destination = this.form.destination;

      this.form.origin = destination;
      this.form.destination = origin;
    }
  },
  mounted(){
    this.splitted_text.title = this.text.title.split(' ');
  },
  updated(){
    const title_text_fragments = '.calculator__title__fragment__text';
    const form_control = '.calculator__main__form__control';
    const form_control_labels = '.calculator__main__form__control__label';
    const form_control_inputs = '.calculator__main__form__control__input';

    const main_block = this.$refs.main;
    const change_icon = this.$refs.change_icon;
    const result_distance = this.$refs.result_distance;
    const result_btn = this.$refs.result_btn;
    const result_price = this.$refs.result_price;

    const text_tl = gsap.timeline({ scrollTrigger: '.calculator__title' });
    const main_block_tl = gsap.timeline({ scrollTrigger: '.calculator__main' });

    const ease = 'expo.out';

    text_tl
      .to(title_text_fragments, { y: 0, stagger: 0.1, ease, duration: 0.7 }, 0.7);

    main_block_tl
      .to(main_block, { scaleX: 1, ease, duration: 1 }, 0.5)
      .to(form_control, { y: 0, opacity: 1, stagger: 0.1, ease, duration: 0.5 })
      .to(change_icon, { y: 0, opacity: 1, ease })
      .to(form_control_labels, { y: 0, opacity: 1, stagger: 0.1, ease })
      .to(form_control_inputs, { y: 0, opacity: 1, stagger: 0.1, ease, duration: 0.5 }, '-=0.5')
      .to([result_distance, result_btn, result_price], { x: 0, stagger: 0.1, opacity: 1, ease });

  }
}
</script>