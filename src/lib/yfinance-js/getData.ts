
export async function getData()  {
    const data = await fetch('https://api.vercel.app/blog')
    const posts = await data.json()
    return posts;
}