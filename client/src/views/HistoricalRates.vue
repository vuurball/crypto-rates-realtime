<template>
  <div>
    <HistoricalRatesSection :historicalData="historicalData" :selectedPair="selectedPair"></HistoricalRatesSection>
    <MarketPricesSection
      :pairIsALink="true"
      :selectedPair="selectedPair"
      v-on:pair-changed="selectActivePair($event)"
    ></MarketPricesSection>
  </div>
</template>

<script>
import HistoricalRatesSection from "@/components/HistoricalRatesSection.vue";
import MarketPricesSection from "@/components/MarketPricesSection.vue";
import axios from "axios";

export default {
  name: "HistoricalRates",
  components: {
    HistoricalRatesSection,
    MarketPricesSection
  },
  data() {
    return {
      selectedPair: "",
      historicalData: "",
      serverUrl: process.env.VUE_APP_SERVER_URL
    };
  },
  sockets: {
    connect: function() {
      //alert("connected to server socket");
    },
    /** listening for incoming "rates" event */
    rates: function(data) {
      // listening to updates about the selected pair only
      if (this.selectedPair == data.pair) {
        this.historicalData = data.rates;
      }
    }
  },
  methods: {
    selectActivePair($event) {
      this.selectedPair = $event;
      this.getHistoricalRatesForSelectedPair();
    },
    /** initial load of prices data via rest api endpoint */
    getHistoricalRatesForSelectedPair() {
      const path = this.serverUrl + "historical-rates/" + this.selectedPair;
      axios
        .get(path)
        .then(res => {
          this.historicalData = res.data;
        })
        .catch(error => {
          this.historicalData = "";
        });
    }
  }
};
</script>