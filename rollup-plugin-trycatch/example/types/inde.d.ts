declare interface Window {
  tryCatchHandle: (err: any, filePath: string, functionType: string, functionName: string) => void
}