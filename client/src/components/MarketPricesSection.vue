<template>
  <section class="features-icons bg-light text-center">
    <div class="container">
      <div class="row">
        <div v-for="(pair,i) in pairs" :key="i" class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
              <h1
                @click="$emit('pair-changed', pair.base + '/' + pair.quote)"
                class="m-auto text-primary"
                :class="{ 'pair-link': pairIsALink }"
              >{{ pair.symbol}}{{ parseFloat(pair.market_price).toFixed(0) }}</h1>
            </div>
            <h2
              :class="{'text-muted' : selectedPair != pair.base + '/' + pair.quote}"
            >{{ pair.base }}/{{ pair.quote }}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "MarketPricesSection",
  props: ["pairIsALink", "selectedPair"],
  data() {
    return {
      pairs: "",
      serverUrl: process.env.VUE_APP_SERVER_URL
    };
  },
  sockets: {
    connect: function() {
      //console.log("connected to server socket");
    },
    /** listening for incoming "marketPrices" event */
    marketPrices: function(data) {
      this.pairs.forEach(pair => {
        if (
          pair.base == data.base &&
          pair.quote == data.quote &&
          pair.market_price != data.market_price
        ) {
          pair.market_price = data.market_price;
          console.log("updated market price");
        }
      });
    }
  },
  methods: {
    getPairs() {
      const path = this.serverUrl + "pairs";
      axios
        .get(path)
        .then(res => {
          this.pairs = res.data;
          this.$emit(
            "pair-changed",
            this.pairs[0].base + "/" + this.pairs[0].quote
          );
          if (this.pairIsALink) {
            this.pairs[0].selected = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getPairs();
  }
};
</script>

<style scoped>
.pair-link {
  cursor: pointer;
}
</style>