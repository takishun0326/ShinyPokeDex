import z from 'zod'

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