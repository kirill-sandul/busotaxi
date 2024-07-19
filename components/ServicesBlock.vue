<template>
  <section class="services" id="services">
    <div class="services__wrapper">
      <div class="services__list">
        <div class="services__list__item">
          <div class="services__list__item__line"></div>
          <h2 class="services__list__item__name">
            <span class="services__list__item__name__fragment" v-for="fragment in splitted_text.list[0]" :key="fragment">
              <span class="services__list__item__name__fragment__text" ref="service_fragment">{{ fragment }}</span>
            </span>
          </h2>
        </div>
        <div class="services__list__item">
          <div class="services__list__item__line"></div>
          <h2 class="services__list__item__name">
            <span class="services__list__item__name__fragment" v-for="fragment in splitted_text.list[1]" :key="fragment">
              <span class="services__list__item__name__fragment__text" ref="service_fragment">{{ fragment }}</span>
            </span>
          </h2>
        </div>
        <div class="services__list__item">
          <div class="services__list__item__line"></div>
          <h2 class="services__list__item__name">
            <span class="services__list__item__name__fragment" v-for="fragment in splitted_text.list[2]" :key="fragment">
              <span class="services__list__item__name__fragment__text" ref="service_fragment">{{ fragment }}</span>
            </span>
          </h2>
        </div>
      </div>
      <div class="services__img__wrapper">
        <div class="services__img" style="background-image: url('/images/car.jpg')" ref="img"></div>
      </div>
      <div class="services__text">
        <div class="services__text__arrow">
          <svg width="19" height="96" viewBox="0 0 19 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.39433 96L9.39433 4M9.39433 4L16.7886 10.8479M9.39433 4L2.00009 10.8479" stroke="black"
              stroke-width="5" />
          </svg>
        </div>
        <h1 class="services__text__title extra-title" style="font-weight: 300;">
          <span class="services__text__title__fragment" v-for="(fragment, index) in splitted_text.title" :key="index">
            <span class="services__text__title__fragment__text">{{ fragment }}</span>
          </span>
        </h1>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  @import '~/assets/scss/modules/colors';

  .services {
    &__wrapper {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      grid-template-areas:
        "list img"
        "text text"
      ;

      @media screen and (max-height: 550px){
        min-height: 200vh !important;
      }

      @media screen and (max-width: 750px) {
        display: flex;
        flex-direction: column;
        height: 100vh;
        min-height: 150vh;
        max-height: 170vh;
      }

      @media screen and (min-width: 1500px){
        min-height: 80vh;
      }
    }

    &__img {
      width: 100%;
      height: 0%;
      grid-area: img;
      background-size: 120%;
      background-repeat: no-repeat;
      background-position: center center;

      &__wrapper {
        height: 100%;
      }
    
      @media screen and (max-width: 900px) {
        background-size: cover !important;
      }
    }

    &__list {
      grid-area: list;

      &__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 17px;
        font-weight: 600;
        padding: 50px;
        height: 33.33333%;
        background-color: $primary_light_yellow;
        transform: scaleY(0);
        transform-origin: bottom;
        
        @media screen and (max-width: 750px) {
          padding: 40px;
        }
        
        @media screen and (min-width: 1500px){
          font-size: 25px;
        }

        &__line {
          width: 20px;
          height: 3px;
          background-color: #000;
          margin-right: 30px;
          transform: scaleX(0);
        }

        &__name {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          &__fragment {
            display: block;
            overflow: hidden;
            margin-right: 7px;

            &:last-child {
              margin-right: 0;
            }

            &__text {
              display: block;
              transform: translateY(100%);
            }
          }
        }
      }
    }

    &__text {
      display: flex;
      flex-direction: row;
      justify-content: right;
      align-items: center;
      grid-area: text;
      width: 100%;
      padding: 50px;

      @media screen and (max-width: 500px) {
        &__title {
          margin-left: 50px !important;
        }
        
        &__arrow {
          transform: translateX(100%) rotate(0deg) !important;
        }
      }

      @media screen and (max-height: 655px) and (max-width: 700px) {
        flex-direction: row-reverse;

        &__title {
          font-size: 40px !important;
          margin-left: 0 !important;

          &__fragments {
            margin-right: 10px;
          }
        }
      }
      
      &__arrow {
        opacity: 0;
        transform: translateX(100%) rotate(-90deg);

        
      }

      &__title {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 100px;

        &__fragment {
          display: block;
          margin-right: 20px;
          overflow: hidden;

          &:last-child {
            margin-right: 0;
          }

          &__text {
            display: block;
            transform: translateY(100%);
          }
        }
      }
    }
  }
</style>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    text: {
      title: '',
      list: []
    },
  },
  data(){
    return {
      splitted_text: {
        title: [],
        list: []
      }
    }
  },
  mounted(){
    this.splitted_text.title = this.text.title.split(' ');
    this.text.list.forEach(service => {
      this.splitted_text.list.push(service.split(' '));
    });
  },
  updated(){
    const name_fragments = document.querySelectorAll('.services__list__item__name__fragment__text');
    const items_lines = document.querySelectorAll('.services__list__item__line');
    const items = document.querySelectorAll('.services__list__item');
    const title_fragments = document.querySelectorAll('.services__text__title__fragment__text');
    const title_arrow = document.querySelector('.services__text__arrow');
    const img = this.$refs.img;

    const main_tl = gsap.timeline({ scrollTrigger: '.services' });
    const title_tl = gsap.timeline({ scrollTrigger: '.services__text__title' });
    const ease = 'expo.out';
    const duration = 0.8;

    main_tl
      .to(items, { scaleY: 1, stagger: 0.1, duration, ease }, 0.7)
      .to(items_lines, { scaleX: 1, duration, ease }, 1)
      .to(img, { height: '100%', backgroundSize: '100%', duration: 1.2, ease }, 1.4)
      .to(name_fragments, { y: 0, duration, stagger: 0.1, ease }, 1.7);
    
    title_tl
      .to(title_arrow, { x: 0, opacity: 1, ease, duration }, 1)
      .to(title_fragments, { y: 0, duration, stagger: 0.1, ease });
  }
}
</script>