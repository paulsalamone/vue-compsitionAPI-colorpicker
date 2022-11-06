<template>
  <div>
    <p>Count {{ count }} <button @click.prevent="handleCount">+</button></p>
    <h2>Color Picker (add tests!)</h2>
    <form action="" type="submit" @submit.prevent="handleColor()">
      <input type="text" placeholder="enter color name" v-model="color1" />
      <input type="text" placeholder="enter color name" v-model="color2" />
      <button>submit</button>
    </form>
    <div class="container" :style="{ backgroundColor: `${colorBG1}` }">
      <div class="container" :style="{ backgroundColor: `${colorBG2}` }"></div>
    </div>
    <p v-show="colorBG1 && colorBG2">{{ message2 }} / {{ message }}</p>
    <div>
      <div class="grid">
        <div class="entry" v-for="(entry, index) in colorsList" :key="index">
          <span
            class="name"
            :style="{
              backgroundColor: `${entry.name}`,
            }"
            >{{ entry.name }}:</span
          >
          <span class="tally">{{ entry.tally }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect, watch } from "vue";
import useCounter from "./use/counter.js";

export default {
  setup() {
    // COUNTER
    const { count, handleCount } = useCounter();

    // COLOR
    const color1 = ref("");
    const color2 = ref("");

    const colorBG1 = ref("");
    const colorBG2 = ref("");

    function handleColor() {
      colorBG1.value = color1.value;
      colorBG2.value = color2.value;
      color1.value = "";
      color2.value = "";

      for (let i = 0; i < colorsList.value.length; i++) {
        // tallyRepeats(colorsList.value[i], colorBG1.value);
        // tallyRepeats(colorsList.value[i], colorBG2.value);
        addColorsAndTally(colorsList.value[i], [
          colorBG1.value,
          colorBG2.value,
        ]);
      }

      // if no repeats, add new object with tally (put in separate method)
    }

    function addColorsAndTally(entry, colorPair) {


      
    }

    function tallyRepeats(entry, color) {
      if (entry["name"] === color) {
        entry["tally"]++;
      }
    }

    // MESSAGING & WATCHERS
    const message = ref("");
    const message2 = computed(() => {
      return `computed: ${colorBG1.value} + ${colorBG2.value}`;
    });
    watchEffect(() => {
      message.value = `watchEffect: ${colorBG1.value} + ${colorBG2.value}`;
    });

    watch(
      [count, message],
      ([newCount, oldCount], [newMessage, oldMessage]) => {
        console.log("Watch count:", newCount, oldCount);
        console.log("Watch message:", newMessage, oldMessage);
      }
    );

    // COLOR TALLY
    const colorsList = ref([
      { name: "tan", tally: 1 },
      { name: "red", tally: 2 },
    ]);

    // EXPORT ALL
    return {
      count,
      handleCount,
      color1,
      color2,
      colorBG1,
      colorBG2,
      handleColor,
      message,
      message2,
      colorsList,
    };
  },
};
</script>

<style>
input,
button {
  margin: 3px;
  padding: 3px 6px;
}
.container {
  margin: 10px;
  padding: 20px;
  width: 70%;
  height: 100%;
  border: 5px solid black;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
}

/* can you alternate BG colors? */
.entry {
  margin: 10px;
  list-style: none;
  width: 100%;
  display: flex;
}

.name,
.tally {
  border: 1px solid white;
  padding: 5px 8px;
  width: 50%;
}
.name {
  background-color: #ccc;
}

.tally {
  background-color: #eee;
}
</style>