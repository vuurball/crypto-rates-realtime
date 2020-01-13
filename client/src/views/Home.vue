<template>
  <div>
    <MainSection/>
    <MarketPricesSection/>
  </div>
</template>

<script>
import MainSection from '@/components/MainSection.vue'
import MarketPricesSection from '@/components/MarketPricesSection.vue'

export default {
  name: 'home',
  components: {
    MainSection,
    MarketPricesSection
  },
}
</script>
