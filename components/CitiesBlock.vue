<template>
  <section class="cities" id="cities">
    <div class="cities__city">
      <div class="cities__city__bg" style="background-image: url('/images/busot.jpg')"></div>
      <div class="cities__city__text">
        <h1 class="cities__city__text__title">Busot</h1>
        <div class="cities__city__text__bg"></div>
      </div>
    </div>
    <div class="cities__city">
      <div class="cities__city__bg" style="background-image: url('/images/benidorm.jpg')"></div>
      <div class="cities__city__text">
        <h1 class="cities__city__text__title">Benidorm</h1>
        <div class="cities__city__text__bg"></div>
      </div>
    </div>
    <div class="cities__city">
      <div class="cities__city__bg" style="background-image: url('/images/barcelona.jpg')"></div>
      <div class="cities__city__text">
        <h1 class="cities__city__text__title">Barcelona</h1>
        <div class="cities__city__text__bg"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  @import '~/assets/scss/modules/colors';

  .cities {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 120vh;

    @media screen and (min-width: 1500px) {
      min-height: 110vh;

      &__city {
        &__text {
          &__title {
            font-size: 40px;
          }
        }
      }
    }

    @media screen and (max-width: 1350px) and (min-height: 750px) {
      min-height: 80vh;
    }

    @media screen and (max-width: 950px){
      flex-direction: column;

      &__city {
        height: 100%;
        width: 100% !important;

        &__bg {
          min-height: 50vh;
        }
      }
    }
    
    &__city {
      position: relative;
      width: 33.333333%;
      cursor: pointer;
      overflow: hidden;

      &__text {
        position: absolute;
        left: 30px;
        bottom: 30px;
        color: #000;
        padding: 5px 15px;
        overflow: hidden;
        z-index: 10;

        &__title {
          transform: translateY(102%);
        }

        &__bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: $primary_yellow;
          transform: scaleY(0);
          transform-origin: bottom;
          z-index: -1;
        }
      }

      &__bg {
        width: 0;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transform: scale(1.4);
        z-index: -4;
      }
    }
  }
</style>

<script lang="ts">
import gsap from 'gsap';

export default {
  mounted(){
    const city_item_bg = document.querySelectorAll('.cities__city__bg');
    const city_item_title = document.querySelectorAll('.cities__city__text__title');
    const city_item_title_bg = document.querySelectorAll('.cities__city__text__bg');

    const img_tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cities',
        start: 'top 60%'
      }
    });
    const text_tl = gsap.timeline({ scrollTrigger: '.cities__city__text' });
    const ease = 'expo.out';

    img_tl
      .to(city_item_bg, { width: '100%', scale: 1, stagger: 0.3, ease, duration: 1 }, 0.5)
    
    text_tl
      .to(city_item_title_bg, { scaleY: 1, stagger: 0.1, duration: 0.9, ease }, 0.5)
      .to(city_item_title, { y: 0, stagger: 0.1, duration: 0.5, ease });
  }
}
</script>
