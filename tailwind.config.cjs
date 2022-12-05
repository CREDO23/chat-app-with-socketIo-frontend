/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.tsx', './src/*.tsx'],
    theme: {
        extend: {
            colors: {
                bleu: '#263A96',
                jaune: '#F8CF33',
                textbleu: '#000F55',
                'bleu-4': 'rgba(0,15,85,.6)',
            },
            backgroundImage: {
                bgApp: "url('./public/background-chat.jpg')",
                bgLogin: "url('./public/backgroundLogin.jpg')",
            },
            fontFamily: {
                Poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
