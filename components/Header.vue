<style lang="scss">
h1 {
  margin-top: -10px;

  a {
    padding-left: 80px;
    color: #3B75B9;
    background: no-repeat url("/teh-128px.png") left;
    background-size: 64px 64px;
    display: inline-block;
    height: 64px;
    line-height: 76px;
  }
}
</style>

<template>
  <header>
    <h1>
      <NuxtLink to="/">Million Solana Homepage</NuxtLink>
    </h1>
    <h2>1,000,000 pixels &middot; 1 SOL per pixel &middot; Own a piece of the history of the fastest Blockchain!</h2>
    <slot></slot>
  </header>
</template>
