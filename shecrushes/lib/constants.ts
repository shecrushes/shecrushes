const env = process.env.NEXT_PUBLIC_ENV

let BASE_URL = '';

if(env === 'development') {
    BASE_URL = 'http://localhost:3001' //http://localhost:3001
} else {
    BASE_URL = 'https://api.shecrushes.com'
}
export { BASE_URL }