# rehype-image-resize

This is a rehype plugin that allows you to resize images in markdown files like
Obsidian.

## Installation

```bash
npm install rehype-image-resize
```

```bash
yarn add rehype-image-resize
```

## Usage

This plugin exposes a required options called `transformer` which is a function.

It takes in a `src` or `alt` and it must return an object with the `width` and
`height` of the image.

```js
const rehypeImageResize = require('rehype-image-resize')

const transformer = ({ src, alt }) => {
  //  perform any logic here to get the width and height

  return {
    width: width,
    height: height
    alt: "optional alt text" // optional
  }
}

rehype().use(rehypeImageResize, { transformer }).processSync(markdown)
```

### TypeScript

```ts
import rehypeImageResize from 'rehype-image-resize'
import type { TransformerArgs, TransformerResult } from 'rehype-image-resize'

const transformer = ({ src, alt }: TransformerArgs): TransformerResult => {
  // do something with the src or alt and get the width and height

  return {
    width,
    height
  }
}
```

## Examples

1. Using with `next-mdx-remote` in Next.JS and `next/image`

```tsx
import { InferGetServerSidePropsType } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Image from 'next/future/image'
import rehypeImageResize from 'rehype-image-resize'
import type { TransformerArgs, TransformerResult } from 'rehype-image-resize'

function Home({
  mdxSource
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <MDXRemote
        {...mdxSource}
        components={{
          img: (props) => (
            <Image
              src={props.src}
              alt={props.alt || ''}
              width={props.width}
              height={props.height}
            />
          )
        }}
      />
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const transformer = ({ src, alt }: TransformerArgs): TransformerResult => {
    if (!src || !alt) return null
    const dimensionsRegex = /\[\[(.*?)\]\]/
    const dimensions = alt?.match(dimensionsRegex)
    if (dimensions) {
      if (!dimensions?.[1].includes(' x ')) return
      const [width, height] = dimensions?.[1]?.split(' x ')
      return {
        width,
        height,
        alt: alt.replace(dimensionsRegex, '').trim()
      }
    }
  }

  const mdxSource = await serialize(
    '![Image [[100 x 300]]](https://source.unsplash.com/random)',
    {
      mdxOptions: {
        rehypePlugins: [[rehypeImageResize, { transformer }]]
      }
    }
  )

  return {
    props: {
      mdxSource
    }
  }
}
```

## License

[MIT](LICENSE) © [Shubham Verma](https://shubhamverma.me)
