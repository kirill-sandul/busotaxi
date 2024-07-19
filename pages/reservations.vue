<template>
  <div class="reservations-page">
    <HeaderComponent :text="translates.es.header.reservations_page" :selected_lang="'ES'" />
    <main>
      <div class="container">
        <div class="container__section container__section--1">
          <div class="text">
            <h1 class="text__title">Hacer la reservaciо́n</h1>
          </div>
          <CalendarComponent />
        </div>
        <div class="container__section container__section--2">
          <ReservationsBlock />
        </div>
      </div>
    </main>
    <!-- <div class="bg">
      <div class="bg__circle"></div>
      <div class="bg__rect"></div>
    </div> -->
  </div>
</template>


<style lang="scss">
  @import '~/assets/scss/modules/colors';

  .container {
    display: flex;
    justify-content: space-between;
    padding: 120px 100px;

    &__section {
      display: flex;
      flex-direction: column;
    }

    @media screen and (max-width: 1125px) {
      flex-direction: column;
      padding: 100px 0;

      &__section--2 {
        margin-top: 50px;
      }
    }
  }

  .text {
    display: flex;
    margin-bottom: 50px;

    @media screen and (max-width: 1125px) {
      padding: 0 20px;

      &__title::before {
        width: 100% !important;
      }
    }

    &__title {
      position: relative;
      font-size: 50px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -10%;
        width: 140%;
        height: 70%;
        background-color: $primary_yellow;
        z-index: -99;
      }
    }

  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    &__circle {
      position: absolute;
      top: 50%;
      left: -10%;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: $primary_yellow;

      @media screen and (min-width: 1600px) {
        left: -20%;
        width: 800px;
        height: 800px;
      }
    }

    &__rect {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 600px;
      height: 300px;
      background-color: $primary_yellow;
      
      @media screen and (min-width: 1750px) {
        width: 750px;
        height: 400px;
      }
    }
  }
</style>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import CalendarComponent from '../components/CalendarComponent.vue';
import ReservationsBlock from '../components/reservations/ReservationsBlock.vue';
import translates from '~/assets/translates';

export default {
  components: { HeaderComponent, CalendarComponent, ReservationsBlock },
  data() {
    return {
      translates
    }
  }
}
</script>