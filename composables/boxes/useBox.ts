import { ref, computed } from 'vue';
import { array } from 'zod';

// dummyBoxes = [
//     [pokemon1, pokemon2, ..., pokemon30], // 1つ目のボックス
//     [pokemon31, ..., pokemon60],          // 2つ目のボックス
//     ...
// ]
// const boxNum = 30
// const dummyBoxes = [
//     Array(boxNum).fill(null).map((_, i) => ({
//         number: 1,
//         name: "hoge",
//         gender: "male",
//         types: {
//             type1: "poison",
//             type2: "leaf",
//         },
//         sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
//     }))
// ]

const boxNum = 30
// ボックス構造の改善版
const dummyBoxes = ref([
    {
        id: 1,
        name: "ボックス１",
        slots: [
            {
                id: 1,
                pokedex_number: 61,
                name: "ニョロゾ",
                level: 28,
                gender: "male",
                types: { type1: "water", type2: null },
                sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png"
            },
            null,
            {
                id: 2,
                pokedex_number: 7,
                name: "ゼニガメ",
                level: 15,
                gender: "male",
                types: { type1: "water", type2: null },
                sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
            },
            null, null, null,
            {
                id: 3,
                pokedex_number: 1,
                name: "フシギダネ",
                level: 14,
                gender: "female",
                types: { type1: "grass", type2: "poison" },
                sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            },
            // 残りのスロットはnull または ポケモンオブジェクトで埋める（合計30スロット）
            ...Array(23).fill(null)
        ]
    },
    {
        id: 2,
        name: "ボックス２",
        slots: [
            {
                id: 31,
                pokedex_number: 133,
                name: "イーブイ",
                level: 15,
                gender: "female",
                types: { type1: "normal", type2: null },
                sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
            },
            // 残りのスロットはnull または ポケモンオブジェクトで埋める（合計30スロット）
            ...Array(29).fill(null)
        ]
    },
    // 空のボックス3〜30
    ...Array.from({ length: boxNum - 2 }, (_, i) => ({
        id: i + 3,
        name: `ボックス${i + 3}`,
        slots: Array(30).fill(null)
    }))
]);


// boxes	全ボックスのデータ（2次元配列）
// currentBoxIndex	現在表示中のボックス番号
// selectedPokemonIndex	現在選択中のポケモン（左側の詳細表示に使用）
// currentBox	現在のボックス（表示用、computedで自動更新）
// selectPokemon()	クリックされたポケモンを選択するための関数
export function useBox() {
    const boxes = ref(dummyBoxes)
    const currentBoxIndex = ref(0)
    const selectedSlotIndex = ref(0)

    // 現在選択中のボックス
    const currentBox = computed(() => boxes.value[currentBoxIndex.value])

    // 選択中のポケモン
    const selectedPokemon = computed(() => {
        if (selectedSlotIndex.value === null) return null;
        return currentBox.value.slots[selectedSlotIndex.value] || null;
    });

    // ポケモン選択
    const selectPokemon = (index: number) => {
        selectedSlotIndex.value = index
    }

    const nextBox = () => {
        currentBoxIndex.value = (currentBoxIndex.value + 1) % boxNum
    }
    const prevBox = () => {
        currentBoxIndex.value = (currentBoxIndex.value + boxNum - 1) % boxNum
    }

    return {
        currentBoxIndex,
        selectedSlotIndex,
        currentBox,
        selectedPokemon,
        selectPokemon,
        nextBox,
        prevBox,
    }
}
