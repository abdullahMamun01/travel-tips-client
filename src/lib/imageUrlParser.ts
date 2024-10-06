const baseUrl = 'https://res.cloudinary.com/db5a7lbio/image/upload/'

const imageUrlParser = (public_id: string, option?: string, format: string = 'webp'): string => {
    const optionPath = option ? `${option}/` : '';
    return `${baseUrl}${optionPath}${public_id}.${format}?q_auto`;
}

export default imageUrlParser