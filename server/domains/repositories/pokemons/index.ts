// モデルからクエリの型をインポート
import { PokemonsQuery } from "~/server/domains/models/pokemons"
// インフラからPokeAPIの一覧の型をインポート
import type { Pokemons as PokemonsFromPokeApi } from "~/server/infrastructures/pokeapi"
// インフラからポケモン一覧取得処理をインポート
import { getPokemons as getPokemonFromPokeApi } from "~/server/infrastructures/pokeapi"

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


// ポケモン一覧取得処理の抽象か
export const getPokemons = async (query: PokemonsQuery): Promise<PokemonsFromPokeApi> => {
    const pokemons = await getPokemonFromPokeApi(createQuery(query))
    return pokemons
}