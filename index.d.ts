/**
 * Plugin to resize images using the markdown image syntax.
 *
 */

export type TransformerArgs = {
  src?: string
  alt?: string
}

export type TransformerResult =
  | {
      width?: string
      height?: string
      alt?: string
    }
  | null
  | undefined

export type Options = {
  transformer: (args: TransformerArgs) => TransformerResult
}

export default function rehypeResizeImage(options?: Options): any
// TODO: Man idk the return type for it.
