<template>
  <div class="index">
    <HeaderComponent ref="header" :text="translates.es.header.index_page" :selected_lang="'ES'" />
    <main>
      <HeroBlock :title="translates.es.hero.title" />
      <ServicesBlock :text="translates.es.services" />
      <CitiesBlock />
      <CalculatorBlock :text="translates.es.calculator" />
    </main>
  </div>
</template>

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
  data() {
    return {
      translates
    }
  }
}
</script>