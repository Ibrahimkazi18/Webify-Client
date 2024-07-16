import axios from 'axios';
import Image from 'next/image';

const generateQrCode = async (text : string) => {
    const options = {
        method: 'POST',
        url: 'https://qrcode-monkey.p.rapidapi.com/qr/custom',
        headers: {
            'x-rapidapi-key': '360683f78cmshf4edf64798a5b47p15be20jsn1fdf1b0bcb9c',
            'x-rapidapi-host': 'qrcode-monkey.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            data: text,
            config: {
                body: 'rounded-pointed',
                eye: 'frame14',
                eyeBall: 'ball16',
                erf1: [],
                erf2: ['fh'],
                erf3: ['fv'],
                brf1: [],
                brf2: ['fh'],
                brf3: ['fv'],
                bodyColor: '#5C8B29',
                bgColor: '#FFFFFF',
                eye1Color: '#3F6B2B',
                eye2Color: '#3F6B2B',
                eye3Color: '#3F6B2B',
                eyeBall1Color: '#60A541',
                eyeBall2Color: '#60A541',
                eyeBall3Color: '#60A541',
                gradientColor1: '#5C8B29',
                gradientColor2: '#25492F',
                gradientType: 'radial',
                gradientOnEyes: false,
                logo: ''
            },
            size: 300,
            download: false,
            file: 'png'
        }
    };
    try {
        const response = await axios.post(options.url, options.data, { headers: options.headers });
        console.log(response.data); // Assuming response.data is the binary image data
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        console.log(base64Image); // Base64 representation of the image
        return base64Image
          // Return Base64 image URL or data
    } catch (error) {
        console.error('Error generating qr', error);
        return ""
    }
    
};

export default generateQrCode;
