// モデルからクエリの型をインポート
import { PokemonsQuery } from "~/server/domains/models/pokemons"
// インフラからPokeAPIの一覧の型をインポート
import type { Pokemons as PokemonsFromPokeApi, Pokemon as PokemonFromPokeApi } from "~/server/infrastructures/pokeapi"
// インフラからポケモン一覧取得処理をインポート
import {
    getPokemons as getPokemonsFromPokeApi,
    getPokemon as getPokemonFromPokeApi
} from "~/server/infrastructures/pokeapi"

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
export const getPokemon = async (name: string): Promise<PokemonFromPokeApi> => {
    const pokemon = await getPokemonFromPokeApi(name)
    return pokemon
}

// ポケモン一覧取得処理の抽象化
export const getPokemons = async (query: PokemonsQuery): Promise<PokemonsFromPokeApi> => {
    const pokemons = await getPokemonsFromPokeApi(createQuery(query))
    return pokemons
}