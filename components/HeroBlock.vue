<template>
  <section class="hero" id="hero">
    <div class="hero__text">
      <h1 class="hero__text__title" ref="title">
        <span class="hero__text__title__fragment" v-for="fragment in splitted_title" :key="fragment">
          <span class="hero__text__title__fragment__text" ref="title_fragment">{{ fragment }}</span>
        </span>
      </h1>
      <div class="hero__text__bg" ref="text_bg"></div>
    </div>
    <div class="hero__bg">
      <div class="hero__bg__img"
      style="background-image: url('/images/europe-map.png');"
      ref="map"
      ></div>
      <div class="hero__bg__line"></div>
      <div class="hero__bg__name"
        ref="name"
      >
        <svg width="1918" height="546" viewBox="0 0 1918 546" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="hero__name__svg__path" d="M279.729 533V310.25H123.729V533H0.728519V13.25H123.729V214.25H279.729V13.25H402.729V533H279.729ZM710.24 0.499971C784.24 0.499971 841.74 24.25 882.74 71.75C924.24 119.25 944.99 186.25 944.99 272.75C944.99 329.25 935.49 378 916.49 419C897.99 460 870.99 491.5 835.49 513.5C800.49 535 758.74 545.75 710.24 545.75C661.74 545.75 619.99 535 584.99 513.5C549.99 492 522.99 461 503.99 420.5C485.49 379.5 476.24 330.25 476.24 272.75C476.24 216.75 485.49 168.25 503.99 127.25C522.99 86.25 549.99 55 584.99 33.5C619.99 11.5 661.74 0.499971 710.24 0.499971ZM710.24 90.5C674.74 90.5 648.24 105 630.74 134C613.74 162.5 605.24 208.75 605.24 272.75C605.24 336.75 613.99 383.25 631.49 412.25C648.99 441.25 675.24 455.75 710.24 455.75C746.24 455.75 772.74 441.5 789.74 413C807.24 384 815.99 337.25 815.99 272.75C815.99 208.25 807.24 161.75 789.74 133.25C772.24 104.75 745.74 90.5 710.24 90.5ZM1528.2 533H1407.45L1398.45 329.75C1395.95 281.25 1394.7 238 1394.7 200C1394.7 171 1395.45 143.5 1396.95 117.5L1316.7 478.25H1200.45L1114.95 117.5C1117.95 161 1119.45 202 1119.45 240.5C1119.45 269.5 1118.7 299.75 1117.2 331.25L1108.2 533H988.203L1027.2 13.25H1182.45L1260.45 365.75L1333.2 13.25H1489.2L1528.2 533ZM1920.55 13.25L1907.8 101H1724.8V225.5H1884.55V311.75H1724.8V444.5H1920.55V533H1601.8V13.25H1920.55Z" fill="#D3D3D3"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  @import '~/assets/scss/modules/colors';

  .hero {
    display: flex;
    position: relative;
    width: 100%;
    height: 100vh;

    @media screen and (max-width: 650px) {
      flex-direction: column-reverse;
      min-height: 120vh;

      &__text {
        padding: 70px 40px !important;

        &__title {
          font-size: 40px !important;

          &__fragment {
            margin-right: 10px;
          }
        }

        &__bg {
          width: 100% !important;
        }
      }

      &__bg {
        position: relative;
        width: 100%;
        height: 100%;
        
        &__img {
          background-size: cover !important;
        }
      }
    }

    &__bg {
      &__img {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right bottom;
        opacity: 0;
        transform: translateX(-20%);
        z-index: -3;
      }
  
      &__name {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position-y: center;
        color: $primary_gray;
        user-select: none;
        opacity: 0;
        transform: translateY(20%);
        z-index: -3;
  
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }

    &__text {
      position: relative;
      align-self: flex-end;
      width: 100%;
      padding: 120px 70px;

      @media screen and (min-width: 1500px) {
        padding: 150px 90px;

        &__title {
          font-size: 70px !important;
          max-width: 1200px !important;
        }
      }
      
      &__bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 43.4%;
        height: 100%;
        background-color: $primary_yellow;
        transform: scaleY(0);
        transform-origin: bottom;
        z-index: -2;
      }

      &__title {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 50px;
        font-weight: 300;
        letter-spacing: -1px;
        max-width: 770px;

        &__fragment {
          display: block;
          overflow: hidden;
          margin-right: 20px;

          &__text {
            display: block;
            transform: translateY(100%);
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>

<script>
import gsap from 'gsap';

export default {
  props: {
    title: ''
  },
  data(){
    return {
      splitted_title: []
    }
  },
  mounted(){
    this.splitted_title = this.title.split(' ');
  },
  updated(){
    const title = this.$refs.title;
    const text_bg = this.$refs.text_bg;
    const map = this.$refs.map;
    const name = this.$refs.name;
    const title_fragments = this.$refs.title_fragment;

    const tl = gsap.timeline();
    const ease = 'expo.out';

    tl
      .to(map, { x: 0, opacity: 1, ease, duration: 0.5 }, 0.7)
      .to(name, { y: 0, opacity: 0.7, ease, duration: 0.5 })
      .to(text_bg, { scaleY: 1, ease, duration: 0.7 })
      .to(title_fragments, { y: 0, stagger: 0.1, ease });
  }
};
</script>