<template>
  <div :class="custom_class">
    <span :class="`${custom_class}__time`">{{ reservation.time }}</span>
    <div :class="`${custom_class}__container`">
      <div :class="`${custom_class}__props`">
        <span :class="`${custom_class}__props__text`" v-if="!extended">reservado</span>
        <div :class="`${custom_class}__props__path`" v-if="extended">
          <span :class="`${custom_class}__props__path__from`">{{ reservation.from }}</span>
          <svg width="29" height="14" viewBox="0 0 29 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-4.80825e-07 6.99999L27 6.99999M27 6.99999L21.4286 12.5M27 6.99999L21.4286 1.49998" stroke="black" stroke-width="1.5"/>
          </svg>
          <span :class="`${custom_class}__props__path__to`">{{ reservation.to }}</span>
        </div>
        <span :class="`${custom_class}__props__name`" v-if="extended">{{ reservation.name }}</span>
        <span :class="`${custom_class}__props__phone`" v-if="extended">{{ reservation.phone }}</span>
      </div>
      <div :class="`${custom_class}__options`" v-if="extended">
        <button :class="`${custom_class}__options__option ${custom_class}__options__option--edit`" @click="edit(reservation)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.49074 12.6015L9.99487 3.38292L11.8352 5.07653L3.33112 14.2951L1 14.9333L1.49074 12.6015Z" fill="white"/>
            <path d="M11.53 1.51876L12.5 0.5L14.6648 2.33112L13.6648 3.33112L11.53 1.51876Z" fill="white"/>
            <path d="M1.49074 12.6015L9.99487 3.38292L11.8352 5.07653L3.33112 14.2951L1 14.9333L1.49074 12.6015Z" stroke="white" stroke-linejoin="round"/>
            <path d="M11.53 1.51876L12.5 0.5L14.6648 2.33112L13.6648 3.33112L11.53 1.51876Z" stroke="white" stroke-linejoin="round"/>
          </svg>
        </button>
        <button :class="`${custom_class}__options__option ${custom_class}__options__option--remove`" @click="remove(reservation._id)">
          <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0.945798C0.447715 0.945798 0 1.39351 0 1.9458V2.83742H10V1.9458C10 1.39351 9.55229 0.945798 9 0.945798H8.09524H5H1.90476H1Z" fill="white"/>
            <path d="M0 4.25614L1.53532 14.1533C1.61091 14.6405 2.0304 15 2.5235 15H7.4765C7.9696 15 8.38909 14.6405 8.46468 14.1533L10 4.25614H0Z" fill="white"/>
            <path d="M1.90476 0.945798H5H8.09524C8.09524 0.945798 6.04476 -1.52588e-05 5 -1.52588e-05C3.95525 -1.52588e-05 1.90476 0.945798 1.90476 0.945798Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
export default {
  props: ['custom_class', 'reservation', 'edit', 'remove', 'extended']
}
</script>