import z from 'zod'

// routerParamsのスキーマ
const routerParamsSchema = z.object({
    name: z.string(),
})

// スキーマから型取り出し
export type PokemonParams = z.infer<typeof routerParamsSchema>

// routerParams Validation
export const validatePokemonParams = (routerParams: unknown): PokemonParams => {
    return routerParamsSchema.parse(routerParams)
}