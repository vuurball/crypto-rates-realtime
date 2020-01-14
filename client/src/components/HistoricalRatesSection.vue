<template>
  <header class="masthead p-5">
    <div class="overlay"></div>
    <section class="pricing py-5">
      <div class="container">
        <div class="row">
          <div v-for="(pair,i) in historicalData" :key="i" class="col-lg-6">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <h5 class="card-price text-center mb-4">{{ pair.source }}</h5>
                <table v-if="pair.rates.length > 0" class="table">
                  <thead>
                    <tr>
                      <th scope="col">Timestamp</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(r,k) in pair.rates" :key="k">
                      <td scope="row">{{ r.created_at | date }}</td>
                      <th>
                        <i
                          class="m-auto font-weight-bold"
                          :class="{ 'icon-arrow-up text-success': isPriceUp(pair.rates, k),
                                'icon-arrow-down text-danger': !isPriceUp(pair.rates, k) }"
                        ></i>
                        {{ parseFloat(r.price).toFixed(2) }}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <p v-else class="text-center mt-5">Data Unavailable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
import moment from "moment";

export default {
  name: "HistoricalRatesSection",
  props: ["historicalData", "selectedPair"],
  filters: {
    date(originalDate) {
      return moment(originalDate).format("Y-MM-DD H:mm:ss");
    }
  },
  methods: {
    /** comparing prices for class color */
    isPriceUp(rates, current_k) {
      if (rates[current_k + 1]) {
        const previousPrice = rates[current_k + 1].price;
        const currentPrice = rates[current_k].price;
        if (currentPrice >= previousPrice) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style scoped>
.pricing .card {
  border: none;
  border-radius: 1rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.pricing hr {
  margin: 1.5rem 0;
}

.pricing .card-title {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
}

.pricing .card-price {
  font-size: 3rem;
  margin: 0;
}

.pricing .card-price .period {
  font-size: 0.8rem;
}

.pricing ul li {
  margin-bottom: 1rem;
}

.pricing .text-muted {
  opacity: 0.7;
}

.pricing .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  opacity: 0.7;
  transition: all 0.2s;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
  .pricing .card:hover {
    margin-top: -0.25rem;
    margin-bottom: 0.25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }
  .pricing .card:hover .btn {
    opacity: 1;
  }
}
</style>