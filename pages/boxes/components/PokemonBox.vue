<template>
  <div class="grid grid-cols-6 grid-rows-5 gap-1 bg-green-100 p-2 rounded-lg">
    <div
      v-for="(_, index) in 30"
      :key="index"
      class="aspect-square cursor-pointer p-1 transition-all duration-200 rounded"
      :class="{ 'bg-blue-200': selectedSlotIndex === index }"
      @click="selectPokemonSlot(index)"
    >
      <div v-if="getPokemonAtPosition(index)" class="w-full h-full">
        <img
          :src="getPokemonAtPosition(index)?.sprite"
          :alt="getPokemonAtPosition(index)?.name"
          class="w-full h-full object-contain"
        />
      </div>
      <div v-else class="w-full h-full bg-green-50 rounded"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 型定義
interface PokemonType {
  type1: string;
  type2: string | null;
}

interface Pokemon {
  id: number;
  pokedex_number: number;
  name: string;
  level: number;
  gender: 'male' | 'female' | 'unknown';
  types: PokemonType;
  sprite: string;
}

interface Box {
  id: number;
  name: string;
  slots: (Pokemon | null)[];
}

// props定義
const props = defineProps<{
  box: Box;
  selectedSlotIndex: number | null;
}>();

// emits定義
const emit = defineEmits<{
  (e: 'select', index: number): void;
}>();

// 指定位置のポケモンを取得
const getPokemonAtPosition = (index: number): Pokemon | null => {
  return props.box.slots[index];
};

// ポケモンスロット選択
const selectPokemonSlot = (index: number): void => {
  emit('select', index);
};
</script>