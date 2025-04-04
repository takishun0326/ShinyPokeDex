// 表示用の名前をフォーマットする
// すべて小文字に変換(toLowerCase())
// ハイフン(-) で単語を分割(split('-'))
// 各単語の先頭を大文字に(map(...))
// スペース(' ') で結合(join(' '))
export const formatName = (name: string): string => {
    return name
        .toLowerCase()
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}
