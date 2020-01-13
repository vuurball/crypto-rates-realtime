<template>
  <header class="masthead text-white text-center">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-xl-9 mx-auto">
          <h2 class="mb-2">{{ this.jokes[this.displayedJokeIndex].ques }}</h2>
          <h3>{{ this.jokes[this.displayedJokeIndex].ans }}</h3>
        </div>
        <div class="container col-md-10 col-lg-8 col-xl-7 mx-auto mt-5">
          <div class="row">
            <div class="col text-center">
              <button @click=nextJoke() class="btn btn-lg btn-primary">{{ this.jokesButtonText }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  name: 'MainSection',
  data() {
    return {
      displayedJokeIndex: 0,
      jokesButtonText: "lolz, another one!", 
      jokes: [
        {"ques":"Why do bitcoin investors want a Lambo?", "ans":"Because they know Ferarri is owned by Fiat"},
        {"ques":"What do you call a Bitcoin that lost weight?", "ans":"a lite coin"},
        {"ques":"How do you become a Bitcoin millionare?", "ans":"bit by bit"},
        {"ques":"What do you call someone with no bitcoin?", "ans":"a bit poor"},
      ]
    }
  },
  methods: {
    nextJoke() {
      if(this.displayedJokeIndex < this.jokes.length - 1){
        this.displayedJokeIndex++;
      }else{
        this.displayedJokeIndex = 0;
      }
    }
  },
};
</script>

