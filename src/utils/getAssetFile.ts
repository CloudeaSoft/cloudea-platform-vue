const getImageUrl = (src: any) => {
  return new URL(`/src/assets/images/${src}`, import.meta.url).href
}

const getNovel = (src: any) => {
  return new URL(`/src/assets/novels/${src}`, import.meta.url).href
}

export { getImageUrl, getNovel }
