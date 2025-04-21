<!-- <template>
  <div class="flex flex-col md:flex-row gap-4 p-4">
    <PokemonInfo :pokemon="selectedPokemon" class="w-full md:w-1/3" />
    <div class="w-full md:w-2/3"> -->
      <!-- <BoxNavigator :boxNumber="boxNumber" @prev="prevBox" @next="nextBox" /> -->
      <!-- <PokemonBox :pokemons="currentBox" @select="selectPokemon" />
    </div>
  </div>
</template> -->

<!-- <script setup lang="ts">
</script> -->


<template>
  <div class="flex flex-col md:flex-row bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
    <!-- 左側のポケモン概要 -->
    <PokemonInfo :pokemon="selectedPokemon" class="w-full md:w-1/3" />

    <!-- 右側：ポケモンボックス -->
    <div class="w-full md:w-2/3 bg-white p-2 mt-4 md:mt-0 md:ml-4 rounded-lg">
      <!-- ボックス切り替えコントロール -->
      <div class="flex justify-between mt-2">
        <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="prevBox">
          前へ
        </button>
          <!-- ボックス名 -->
        <div class="bg-green-200 p-2 mb-2 rounded-lg flex items-center justify-center border-2 border-green-300">
          <h2 class="text-lg font-bold">ボックス{{ currentBoxIndex }}</h2>
        </div>
          <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="nextBox">
          次へ
        </button>
      </div>

      <!-- ポケモン一覧グリッド -->
      <PokemonBox
        :box="currentBox"
        :selectedSlotIndex="selectedSlotIndex"
        @select="selectPokemon"
      />
    </div>
  </div>
</template>

<script setup>
import { useBox } from '~/composables/boxes/useBox'
import PokemonBox from './components/PokemonBox.vue'
import PokemonInfo from './components/PokemonInfo.vue'
// import BoxNavigator from './components/BoxNavigator.vue'

const {  currentBoxIndex, selectedSlotIndex, selectedPokemon, selectPokemon, currentBox, nextBox, prevBox,} = useBox()



// import { ref, computed } from 'vue';

// // ポケモンボックスのデータ
// const boxes = ref([
//   {
//     name: "ボックス１",
//     pokemons: [
//       { id: 1, name: "ニョロゾ", level: 28, gender: "male", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
//       { id: 2, name: "ゼニガメ", level: 15, gender: "male", imageUrl: "/squirtle.png" },
//       { id: 3, name: "フシギダネ", level: 14, gender: "female", imageUrl: "/bulbasaur.png" },
//       { id: 4, name: "ヒトカゲ", level: 16, gender: "male", imageUrl: "/charmander.png" },
//       { id: 5, name: "ピカチュウ", level: 20, gender: "male", imageUrl: "/pikachu.png" },
//       { id: 6, name: "コダック", level: 18, gender: "female", imageUrl: "/psyduck.png" },
//       // 残りのポケモンデータをここに追加（最大30匹）
//     ]
//   },
//   {
//     name: "ボックス２",
//     pokemons: [
//       { id: 101, name: "イーブイ", level: 15, gender: "female", imageUrl: "/eevee.png" },
//       { id: 102, name: "プリン", level: 12, gender: "female", imageUrl: "/jigglypuff.png" },
//       // 残りのポケモンデータ
//     ]
//   }
// ]);

// // 現在のボックスインデックス
// const currentBoxIndex = ref(0);

// // 選択されたポケモンのインデックス
// const selectedPokemonIndex = ref(0);

// // 現在のボックス
// const currentBox = computed(() => boxes.value[currentBoxIndex.value]);

// // 選択中のポケモン
// const selectedPokemon = computed(() => {
//   if (selectedPokemonIndex.value === null) return null;
//   return currentBox.value.pokemons[selectedPokemonIndex.value] || null;
// });

// // ポケモンを選択
// function selectPokemon(index) {
//   selectedPokemonIndex.value = index;
// }

// // 前のボックスへ
// function prevBox() {
//   if (currentBoxIndex.value > 0) {
//     currentBoxIndex.value--;
//     selectedPokemonIndex.value = null;
//   }
// }

// // 次のボックスへ
// function nextBox() {
//   if (currentBoxIndex.value < boxes.value.length - 1) {
//     currentBoxIndex.value++;
//     selectedPokemonIndex.value = null;
//   }
// }

// // コンポーネント初期化時に最初のポケモンを選択
// selectedPokemonIndex.value = currentBox.value.pokemons.length > 0 ? 0 : null;
</script>