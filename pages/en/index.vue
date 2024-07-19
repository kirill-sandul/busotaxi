<template>
  <div class="index">
    <HeaderComponent ref="header" :text="translates.en.header.index_page" :selected_lang="'EN'" />
    <main>
      <HeroBlock :title="translates.en.hero.title" />
      <ServicesBlock :text="translates.en.services" />
      <CitiesBlock />
      <CalculatorBlock :text="translates.en.calculator" />
    </main>
  </div>
</template>

<style>
  main {
    margin-top: 50px;
  }
</style>

<script>
  import HeaderComponent from '~/components/HeaderComponent.vue';
  import HeroBlock from '~/components/HeroBlock.vue';
  import ServicesBlock from '~/components/ServicesBlock.vue';
  import CitiesBlock from '~/components/CitiesBlock.vue';
  import CalculatorBlock from '~/components/CalculatorBlock.vue';
  import translates from '~/assets/translates';

  export default {
    name: 'IndexPage',
    components: { HeaderComponent, HeroBlock, ServicesBlock, CitiesBlock, CalculatorBlock },
    data(){
      return {
        translates
      }
    },
    head(){
      return {
        script: [
          {
            innerHTML: `
              function initMap(){}
            `,
            body: true
          },
          {
            src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAAo338cJNyNbQb_m-JH7NBajWMHq_5yxk&callback=initMap",
            body: true,
            async: true,
            defer: true
          }
        ]
      }
    }
  }
</script>
