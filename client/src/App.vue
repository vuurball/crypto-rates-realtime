<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark nav-bg">
      <div class="container">
        <a class="navbar-brand" href="#">CRYPTORATES</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse mt-1" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/historical-rates">Historical Rates</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
.nav-bg {
  background-color: #1f2254;
}

#nav a.router-link-exact-active {
  color: rgb(255, 217, 0);
}
</style>
