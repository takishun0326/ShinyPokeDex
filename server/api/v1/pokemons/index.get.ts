import { validatePokeomonsQuery } from "~/server/domains/models/pokemons"

// レポジトリからポケモン一覧取得処理をインポート
import { getPokemons } from "~/server/domains/repositories/pokemons"

// APIリクエストの結果を サーバーサイドのメモリへキャッシュ
export default defineCachedEventHandler(
    async (event) => {
        try {
            // クエリのバリデーション，型安全なクエリとして返却
            const query = await getValidatedQuery(event, validatePokeomonsQuery)
            // クエリを元にポケモン一覧の取得
            const pokemons = await getPokemons(query)
            return pokemons
        } catch (error) {
            console.error('APIリクエスト中にエラーが発生しました。', error)
        }
    },
    {
        maxAge: 24 * 60 * 60, // キャッシュのmaxAgeを設定 (1日)
    },
)