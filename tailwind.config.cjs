/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.tsx', './src/*.tsx' , './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bleu: '#263A96',
                jaune: '#F8CF33',
                textbleu: '#000F55',
                'bleu-4': 'rgba(0,15,85,.6)',
            },
            backgroundImage: {
                bgApp: "url('./src/assets/background-chat.jpg')",
                bgLogin: "url('./src/assets/backgroundLogin.jpg')",
            },
            fontFamily: {
                Poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms') , require('flowbite/plugin')],
};
