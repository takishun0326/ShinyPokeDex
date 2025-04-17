import z from "zod"

// ポケモン詳細のスキーマ
const rawPokemonsSchema = z.object({
    id: z.number(),
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    abilities: z.object({
        ability: z.object({
            name: z.string(),
        }),
    }).array(),
    sprites: z.object({
        front_default: z.string(),
        front_shiny: z.string(),
    }),
    stats: z.object({
        stat: z.object({
            name: z.string(),
        }),
        base_stat: z.number(),
    }).array(),
    types: z.object({
        type: z.object({
            name: z.string(),
        }),
    }).array(),
})

// スキーマから型取り出し
export type Pokemon = z.infer<typeof rawPokemonsSchema>

// PokeAPIからポケモン詳細を取得
export const getPokemon = async (name: string): Promise<Pokemon> => {
    // runtimeConfig から PokeAPIの baseURLを取得する
    const { pokeapi: { baseURL } } = useRuntimeConfig()
    // PokeAPIからポケモン詳細を取得
    const response = await $fetch(`/pokemon/${name}`, {
        baseURL,
    })
    // レスポンスデータのバリデーションを行い、型安全なデータとして返却する
    return rawPokemonsSchema.parse(response)
}