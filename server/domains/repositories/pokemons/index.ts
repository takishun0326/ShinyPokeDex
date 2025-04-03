// モデルからクエリの型とポケモン詳細ドメインモデル型をインポート
import type { Pokemon } from "~/server/domains/models/pokemons/pokemon"
// ポケモン一覧ドメインモデル型をインポート
import { PokemonsQuery, Pokemon as PokemonListItem } from "~/server/domains/models/pokemons"

// インフラからポケモン一覧取得処理をインポート
import {
    getPokemons as getPokemonsFromPokeApi,
    getPokemon as getPokemonFromPokeApi
} from "~/server/infrastructures/pokeapi"

// ポケモン一覧ドメインモデルへの変換処理をインポート
import { convert as convertListItem } from "~/server/domains/models/pokemons"
// ポケモン詳細ドメインモデルへの変換処理をインポート
import { convert } from "~/server/domains/models/pokemons/pokemon"

// クエリ生成メソッド 不要なクエリを除外
const createQuery = ({ offset, limit }: PokemonsQuery) => {
    return Object.entries({
        offset,
        limit,
    })
        .filter(([_, value]) => value !== undefined)
        .reduce((obj, [key, value]) => {
            return Object.assign(obj, { [key]: value })
        }, {})
}

// reduceメモ
// array.reduce((累積値, 現在の値) => { 処理 }, 初期値)


// ポケモン詳細取得処理の抽象化
export const getPokemon = async (name: string): Promise<Pokemon> => {
    const pokemon = await getPokemonFromPokeApi(name)
    return convert(pokemon)
}

// ポケモン一覧取得処理の抽象化
export const getPokemons = async (query: PokemonsQuery): Promise<PokemonListItem[]> => {
    const pokemonsFromPokeApi = await getPokemonsFromPokeApi(createQuery(query))
    const pokemons = await Promise.all(
        pokemonsFromPokeApi.results.map(async (pokemon) => {
            // ポケモン名からポケモン詳細取得
            const response = await getPokemonFromPokeApi(pokemon.name)

            return convertListItem(response)
        }),
    )
    return pokemons
}