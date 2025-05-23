export const prompt = `
これからある医学生の臨床実習記録を元に、目標の内で医学生が実際に経験した目標をidを用いて抽出ください。

"# 目標" という見出しの下にidと項目を表形式で示します。"## 臨床手技"、"## 臨床・画像検査"、"## 症候"の3つのカテゴリーに分けて、それぞれのカテゴリーに属する目標を示します。
"# 臨床実習記録" という見出しの下に、医学生の臨床実習記録を示します。
臨床実習記録の内容から医学生が実際に関わったと判断できる目標のみを、カンマ区切りのidで出力してください。説明や確認は出力しないでください。

# 目標

## 臨床手技

| id | 項目 |
| - | - |
| JlAKx_k | 体位交換、移送 |
| Jub5cSY | 皮膚消毒 |
| Jub5cSc | 外用薬の貼付・塗布 |
| JlAKx_s | 気道内吸引 |
| Jub5dh8 | ネブライザー |
| JlAKx_w | 静脈採血 |
| JlAKx_0 | 末梢静脈の血管確保 |
| JlAKyAA | 胃管の挿入と抜去 |
| JlAKyAE | 尿道カテーテルの挿入と抜去 |
| JlAKyAI | 皮内注射 |
| JlAKyAQ | 皮下注射 |
| JlAKyAU | 筋肉注射 |
| JlAKyAY | 静脈内注射 |
| Jub5eUA | 尿検査(妊娠反応検査を含む) |
| JlAKyAc | 微生物学検査（Gram 染色を含む） |
| JlAKyAg | 12 誘導心電図の記録 |
| JlAKyAk | 臨床判断のための簡易エコー(FAST含む) |
| JlAKyAs | 病原体抗原の迅速検査 |
| JlAKyAw | 簡易血糖測定 |
| JlAKyA0 | 清潔操作 |
| JlAKyA4 | 手術や手技のための手洗い |
| JlAKyA8 | 手術室におけるガウンテクニック |
| JlAKyBA | 基本的な縫合と抜糸 |

## 臨床・画像検査

| id | 項目 |
| - | - |
| JkxirwY | 血算 |
| Jli6WW4 | 生化学検査 |
| Jli6WW8 | 凝固・線溶検査 |
| Jli6WXE | 免疫血清学検査 |
| Jli6WXI | 尿検査 |
| Jli6WXQ | 便検査 |
| Jkxir08 | 血液型（ABO、RhD）検査、血液交差適合（クロスマッチ）試験、不規則抗体検査 |
| JkxirxY | 動脈血ガス分析 |
| Jkxiryk | 妊娠反応検査 |
| JkxirxU | 細菌学検査（細菌の塗抹、培養、同定、薬剤感受性試験） |
| Jkxirxc | 脳脊髄液 |
| Jli6TOw | 胸水検査 |
| Jli6TO0 | 腹水検査 |
| Jkxirwk | 病理組織検査や細胞診検査（術中迅速診断を含む） |
| Jkxirwg | 遺伝子関連・染色体検査 |
| JkxirxQ | 心電図 |
| Jli6Y7U | 呼吸機能検査 |
| Jli6Y7Y | 内分泌・代謝機能検査 |
| Jli6Y7c | 脳波検査 |
| JkxirxA | 超音波検査 |
| Jkxirw4 | エックス線撮影 |
| Jli6aBM | CT検査 |
| Jli6aBU | MRI検査 |
| Jkxirxk | 核医学検査 |
| Jkxirw8 | 内視鏡検査 |

## 症候

| id | 項目 |
| - | - |
| JlAK6lk | 発熱 |
| JlAK6lo | 全身倦怠感 |
| JlAK6ls | 食思(欲)不振 |
| JlAK6lw | 体重減少 |
| JlAK6l0 | 体重増加 |
| JlAK6l4 | 意識障害 |
| JlAK6l8 | 失神 |
| JlAK6mA | けいれん |
| JlAK6mE | めまい |
| JlAK6mI | 浮腫 |
| JlAK6mM | 発疹 |
| JlAK6mQ | 咳・痰 |
| JlAK6mU | 血痰・喀血 |
| JlAK6mY | 呼吸困難 |
| JlAK6mc | 胸痛 |
| JlAK6mg | 動悸 |
| JlAK6mk | 嚥下困難 |
| JlAK6mo | 腹痛 |
| JlAK6ms | 悪心・嘔吐 |
| JlAK6mw | 吐血 |
| JlAK6m0 | 下血 |
| JlAK6m4 | 便秘 |
| JlAK6m8 | 下痢 |
| JlAK6nA | 黄疸 |
| JlAK6nE | 腹部膨隆・腫瘤 |
| JlAK6nI | リンパ節腫脹 |
| JlAK6nM | 尿量・排尿の異常 |
| JlAK6nQ | 血尿 |
| JlAK6nU | 月経異常 |
| JlAK6nY | 不安・抑うつ |
| JlAK6nc | 認知機能障害 |
| JlAK6ng | 頭痛 |
| JlAK6nk | 運動麻痺・筋力低下 |
| JlAK6no | 歩行障害 |
| JlAK6ns | 感覚障害 |
| JlAK6nw | 腰背部痛 |
| JlAK6n0 | 関節痛・関節腫脹 |

# 臨床実習記録

`
