import z from 'zod'
// インフラからPokeAPIの一覧の型をインポート
import type { Pokemon as PokemonFromPokeApi } from "~/server/infrastructures/pokeapi"

// ポケモン一覧ドメインモデルのスキーマ
const pokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    types: z.string().array(),
})


// スキーマから型取り出し
export type Pokemon = z.infer<typeof pokemonSchema>

// クエリのスキーマ
const querySchema = z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number(),
}).partial()


// スキーマから型取り出し
export type PokemonsQuery = z.infer<typeof querySchema>

// クエリのバリデーション
export const validatePokeomonsQuery = (query: unknown): PokemonsQuery => {
    return querySchema.parse(query)
}

// pokeAPIから受け取ったデータをポケモン一覧ドメインモデルへ変換
export const convert = (pokemon: PokemonFromPokeApi): Pokemon => {
    return pokemonSchema.parse({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: pokemon.types.map(type => type.type.name),
    })
}