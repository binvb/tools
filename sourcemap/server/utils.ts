export function getFileName(url:string):string {
  return (url.match(/[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.js/) as RegExpMatchArray)[0]
}