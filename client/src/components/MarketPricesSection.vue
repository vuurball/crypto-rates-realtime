<template>
  <section class="features-icons bg-light text-center">
    <div class="container">
      <div class="row">
        <div v-for="(pair,i) in pairs" :key="i" class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
              <h1 @click="$emit('pair-changed', pair.base + '/' + pair.quote)" class="m-auto text-primary" :class="{ 'pair-link': pairIsALink }">
                {{ pair.symbol}}{{ parseFloat(pair.market_price).toFixed(0) }}
              </h1>
            </div>
            <h2>{{ pair.base }}/{{ pair.quote }}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'MarketPricesSection',
    props: ['pairIsALink'],
    data() {
      return {
        pairs: '',
        serverUrl: process.env.VUE_APP_SERVER_URL, 
      }
    },
    methods: {
      getPairs() {
        const path = this.serverUrl + 'pairs';
        axios.get(path)
        .then((res) => {
          this.pairs = res.data;
          this.$emit('pair-changed', this.pairs[0].base +'/' + this.pairs[0].quote);
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
    created() {
      this.getPairs();
    },
  }
</script>

<style scoped>
.pair-link {
  cursor: pointer;
}
</style>