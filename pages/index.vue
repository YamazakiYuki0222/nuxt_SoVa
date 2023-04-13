<script setup lang="ts">
import consolaGlobalInstance from "consola";
import type { TFlyer, TFlyers } from "~~/types/flyer";
import { useFlyerStore } from "@/store/flyers/index";
const flyerStore = useFlyerStore();
const title = ref<string>("");
const editor = ref<string>("");
const order = ref<number>(0);
const openFlg = ref<number>(0);

const flyers = ref<TFlyers>();
const waiting = ref<boolean>(true);

//1. useAsyncDataを使う場合本来はconst {data} で受け取らないといけない
const { data } = await useAsyncData("getFlyer", async () => {
  await flyerStore.getFlyers();
  flyers.value = flyerStore.flyers;
});
</script>

<template>
  <div>
    <section id="card" v-for="(flyer, index) in flyers" :key="flyer.id">
      <h3>{{ flyer.title }}</h3>
      <p>{{ flyer.editor }}</p>
    </section>
  </div>
</template>

<style>
#card {
  width: 80%;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#card h3 {
  width: 150px;
}
#card p {
  margin-left: 60px;
}
#card:first-child {
  margin-top: 16px;
}
</style>
