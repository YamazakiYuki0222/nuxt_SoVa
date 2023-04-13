<script setup lang="ts">
import consolaGlobalInstance from "consola";

const title = ref<string>("");
const editor = ref<string>("");
const order = ref<number>(0);
const openFlg = ref<number>(0);

type flyer = {
  id: number;
  createdAt: string;
  title: string;
  editor: string;
  status: number;
  type: number;
  order: number;
};
const flyers = ref<[flyer]>();
const waiting = ref<boolean>(true);

//1. useAsyncDataを使う場合本来はconst {data} で受け取らないといけない
const { data } = await useAsyncData("getFlyer", async () => {
  const response = await fetch(
    "https://62fe320941165d66bfbabe7e.mockapi.io/apt/v1/foods"
  );

  if (response.ok) {
    console.log(response.json);
    const flyerData = await response.json();
    flyers.value = flyerData.sort(
      (val1: flyer, val2: flyer) => val1.order - val2.order
    );
  }
});
/*
*
const { data } = await useAsyncData<{ flyers: [flyer | undefined] }>(
  "getFlyer",
  async () => {
    let flyers = [];
    const response = await fetch(
      "https://62fe320941165d66bfbabe7e.mockapi.io/apt/v1/foods"
    );

    if (response.ok) {
      console.log(response.json);
      const flyerData = await response.json();
      flyers = flyerData;
    }
    return { flyers };
  }
);
2. この形がuseAcyncDataの本来の形
*/

const updateFlyerList = (updatedData) => {
  flyers.value = updatedData;
};
</script>
<template>
  <div id="content">
    <div class="create_content">
      <section>
        <h3>タイトル</h3>
        <p><input type="text" name="title" v-model="title" /></p>
      </section>
      <section>
        <h3>一言</h3>
        <textarea name="editor" v-model="editor"> </textarea>
      </section>
      <section>
        <h3>順番</h3>
        <input type="text" name="order" v-model="order" />
      </section>
      <section>
        <h3>表示</h3>
        <input
          type="checkbox"
          name="openFlg"
          v-model="openFlg"
          :value="openFlg"
        />
      </section>

      <section>
        <button>作成</button>
      </section>
    </div>
    <div class="view_content" v-if="flyers">
      <FlyerItem
        :updateFlyerList="updateFlyerList"
        :flyers="flyers"
        :waiting="waiting"
      />
    </div>
  </div>
</template>

<style>
#content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.view_content {
  flex: 1;
  background-color: rgba(255, 11, 24, 0.2);
}
.create_content {
  padding: 32px;
  text-align: center;
}
.create_content section {
  margin-bottom: 32px;
}

.create_content section textarea {
  width: 400px;
  height: 360px;
}

section button {
  border: none;
  border-radius: 50px;
  box-shadow: 0 6px 0 #c0392b;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  padding: 12px 24px;
  text-align: center;
  text-shadow: 0 1px 0 #b23e35;
  background-color: #e74c3c;
  cursor: pointer;
  transition: all 0.15s ease;
}
section button:hover {
  box-shadow: 0 4px 0 #c0392b;
  top: 2px;
}
section button:active {
  box-shadow: 0 2px 0 #c0392b;
  top: 6px;
}

.view_content {
  text-align: center;
}
.view_content section {
  border: 1px solid #aaa;
  padding: 16px;
  margin-bottom: 16px;
}

.view_content section:last-child {
  border: none;
}
</style>
