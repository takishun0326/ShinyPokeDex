import z from 'zod'

// PokeAPIから返却されるデータのスキーマ
const rawPokemonsSchema = z.object({
    results: z.object({
        name: z.string(),
    }).array(),
})

// スキーマから型取り出し
export type Pokemons = z.infer<typeof rawPokemonsSchema>

// クエリ部分のスキーマ, 任意だからpartial()
const querySchema = z.object({
    offset: z.number(),
    limit: z.number(),
}).partial()

// スキーマから型取り出し
type PokemonsQuery = z.infer<typeof querySchema>

// PokeAPIからポケモンの Resource Lists データを取得
export const getPokemons = async (query: PokemonsQuery = {}): Promise<Pokemons> => {
    // runtimeConfig から PokeAPI の baseURL を取得する
    const { pokeapi: { baseURL } } = useRuntimeConfig()
    // APIリクエスト
    const response = await $fetch('/pokemon', {
        baseURL,
        query,
    })
    // レスポンスデータのバリデーションを行い、型安全なデータとして返却する
    return rawPokemonsSchema.parse(response)
}