<script setup lang="ts">
import { Tester } from "anymatch";
import consolaGlobalInstance from "consola";
import type { TFlyer, TFlyers } from "~~/types/flyer";
const title = ref<string>("");
const editor = ref<string>("");
const order = ref<Number>();
const status = ref<boolean>();

const targetId = ref<Number>();
const showEditBoxFlg = ref<boolean>(false);

const changeText = (flyerId: Number): void => {
  if (flyerId) {
    const cloneFlyer = flyers.filter((val: TFlyer) => val.id === flyerId);
    console.log(cloneFlyer[0]?.title);
    title.value = cloneFlyer[0].title;
    editor.value = cloneFlyer[0].editor;
    order.value = cloneFlyer[0].order;
    status.value = cloneFlyer[0].status;
    targetId.value = flyerId;
    console.log(showEditBoxFlg.value);
    showEditBoxFlg.value = !showEditBoxFlg.value;
  }
};
const { updateFlyerList, flyers, waiting } = defineProps<{
  updateFlyerList: Function;
  flyers: TFlyers;
  waiting: boolean;
}>();
const selected = ref<boolean>(false);
const updateTitle = async (flyerId: Number) => {
  const response = await fetch(
    `https://62fe320941165d66bfbabe7e.mockapi.io/apt/v1/foods/${flyerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        editor: editor.value,
        order: order.value,
        status: status.value,
      }),
    }
  );
  if (response.ok) {
    console.log("updated successfully!");
    showEditBoxFlg.value = !showEditBoxFlg.value;
    const response = await fetch(
      "https://62fe320941165d66bfbabe7e.mockapi.io/apt/v1/foods"
    );

    if (response.ok) {
      console.log(response.json);
      const flyers = await response.json();
      updateFlyerList(flyers);
    }
  } else {
    console.log("Failed to update menu.");
  }
};
</script>
<template>
  <section v-for="(flyer, index) in flyers" :key="flyer?.id">
    <div @click="changeText(flyer?.id)" v-if="!showEditBoxFlg">
      <h3>{{ flyer?.title }}</h3>
      <p>{{ flyer?.editor }}</p>
      <p>{{ flyer?.order }}</p>
      <p>{{ flyer?.status }}</p>
    </div>
    <div v-if="targetId == flyer?.id && showEditBoxFlg">
      <h3>タイトル<input type="text" v-model="title" /></h3>
      <p>本文<input type="text" v-model="editor" /></p>
      <p>順番<input type="text" v-model="order" /></p>
      <p>表示する？(1/0)<input type="text" v-model="status" /></p>
      <button @click="updateTitle(targetId)">更新</button>
      <button @click="showEditBoxFlg = !showEditBoxFlg">戻る</button>
    </div>
  </section>
</template>
