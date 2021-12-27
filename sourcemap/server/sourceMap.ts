import sourceMap from 'source-map'
import { getFileName } from './utils'
const fs = require('fs')

export async function parseSource(source: string, lineno: number, colno: number) {
  const rawSouceMap = JSON.parse(await fs.readFileSync(`./sourcemapDir/${getFileName(source)}.map`).toString()) // 根据传入文件名获取对应的sourcemap文件
  const consumer = await new sourceMap.SourceMapConsumer(rawSouceMap); // 获取sourceMap consumer，我们可以通过传入打包后的代码位置来查询源代码的位置
  const originalPosition = consumer.originalPositionFor({ // 获取 出错代码 在 哪一个源文件及其对应位置
    line: lineno,
    column: colno,
  });
   // 根据源文件名寻找对应源文件
  const sourceIndex = consumer.sources.findIndex(
    (item) => item === originalPosition.source
  );
  const sourceContent = consumer.sourcesContent[sourceIndex];
  const contentRowArr = sourceContent.split("\n");

  consumer.destroy(); // 使用完后记得destroy

  return {
    errorCode: contentRowArr[originalPosition.line as number - 1], // 错误代码
    line: originalPosition.line, // 错误行
    column: originalPosition.column, // 错误列
    file: originalPosition.source // 错误文件
  }
}