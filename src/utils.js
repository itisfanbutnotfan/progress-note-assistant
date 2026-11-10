// 把一段文字拆成句子：偶数位是句子，奇数位是句子之间的空白
export const sentences = (text) => text.split(/(?<=[.\]])(\s+)/);
export const sentenceList = (text) => sentences(text).filter((_, k) => k % 2 === 0);

// 找出第 i 句对应的来源记录。src 为 null 表示这句话被医生改过，不再有来源
export function findSource(section, i) {
  const text = sentenceList(section.text)[i];
  if (text === undefined) return null;
  const m = section.sents.find((x) => x.text === text);
  return { text, src: m ? m.src : null };
}
