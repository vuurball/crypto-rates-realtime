<template>
  <div>
    <HistoricalRatesSection 
      :historicalData=historicalData
      :selectedPair=selectedPair
    ></HistoricalRatesSection>
    <MarketPricesSection 
      :pairIsALink=true
      v-on:pair-changed="selectActivePair($event)"
    ></MarketPricesSection>
  </div>
</template>

<script>
import HistoricalRatesSection from '@/components/HistoricalRatesSection.vue'
import MarketPricesSection from '@/components/MarketPricesSection.vue'
import axios from 'axios';

export default {
  name: 'HistoricalRates',
  components: {
    HistoricalRatesSection,
    MarketPricesSection
  },
  data() {
    return {
      selectedPair: '',
      historicalData: '',
      serverUrl: process.env.VUE_APP_SERVER_URL, 
    }
  },
  methods: {
    selectActivePair($event) {
      this.selectedPair = $event;
      this.getHistoricalRatesForSelectedPair();
    },
    getHistoricalRatesForSelectedPair() {
      const path = this.serverUrl + 'historical-rates/' + this.selectedPair;
        axios.get(path)
        .then((res) => {
          this.historicalData = res.data;
        })
        .catch((error) => {
          this.historicalData = '';
        });
    },
  },
}
</script>