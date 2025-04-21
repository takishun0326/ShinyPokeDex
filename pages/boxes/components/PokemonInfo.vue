<!-- <template>
  <div class="border rounded-xl p-4 shadow-md bg-white min-h-[300px]">
    <div v-if="pokemon">
      <h2 class="text-xl font-bold mb-2">{{ pokemon.name }}</h2>
      <img :src="pokemon.sprite" alt="sprite" class="w-24 h-24 mb-2" /> -->
      <!-- <p>Level: {{ pokemon.level }}</p> -->
      <!-- <p>Gender: {{ pokemon.gender }}</p>
    </div>
    <div v-else class="text-gray-500">
      ポケモンを選択してください
    </div>
  </div>
</template> -->

<template>
  <div class="bg-blue-200 p-4 rounded-lg flex flex-col items-center">
    <div class="bg-green-300 w-full p-3 rounded-lg mb-4">
      <div v-if="pokemon" class="flex flex-col items-center h-40">
        <img :src="pokemon.sprite" alt="ポケモン画像" class="w-32 h-32 object-contain" />
      </div>
      <div v-else class="flex items-center justify-center h-40">
        <p class="text-gray-600">ポケモンを選択してください</p>
      </div>
    </div>
    <div class="w-full text-center">
      <div v-if="pokemon">
        <h3 class="text-lg font-bold mt-2">{{ pokemon.name }}</h3>
        <p class="text-base">Lv 10</p>
        <p v-if="pokemon.gender === 'female'" class="text-pink-600">♀</p>
        <p v-else-if="pokemon.gender === 'male'" class="text-blue-600">♂</p>
      </div>
      <div v-else>
        <p class="text-sm text-gray-700">タップしてポケモンを選択</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Object,
    default: null
  }
});
</script>