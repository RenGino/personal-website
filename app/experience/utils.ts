import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  location: string
  startDate: string
  endDate: string
  summary: string
  skills: string[]
  image?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    return { metadata: {} as Metadata, content: fileContent.trim() }
  }

  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    if (!key) return
    
    let trimmedKey = key.trim()
    let value = valueArr.join(': ').trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayItems = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"](.*)['"]$/, '$1'))
        .filter(Boolean)

      metadata[trimmedKey as keyof Metadata] = arrayItems as any
    } else {
      value = value.replace(/^['"](.*)['"]$/, '$1')
      metadata[trimmedKey as keyof Metadata] = value as any
    }
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getDevPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'experience', 'posts'))
}

export function formatDate(date?: string, includeRelative = false) {
  if (!date) return ''

  if (!date.includes('T')) {
    const parts = date.split('-')
    if (parts.length === 2) {
      date = `${date}-01`
    } else if (parts.length === 1) {
      date = `${date}-01-01`
    }
    date = `${date}T00:00:00`
  }
  
  let targetDate = new Date(date)

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'short',
    // day: 'numeric',
    year: 'numeric',
  })
  
  return fullDate
}