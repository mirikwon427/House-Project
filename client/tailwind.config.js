/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        search: `url("data:image/svg+xml,%3Csvg id='ic_search' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect id='area' width='20' height='20' fill='%23ffadad' opacity='0'/%3E%3Cg id='타원_20' data-name='타원 20' transform='translate(1 1)' fill='none' stroke='%23181818' stroke-width='2'%3E%3Ccircle cx='8' cy='8' r='8' stroke='none'/%3E%3Ccircle cx='8' cy='8' r='7' fill='none'/%3E%3C/g%3E%3Cpath id='패스_633' data-name='패스 633' d='M1710.519,49.653l4,4' transform='translate(-1696.519 -35.653)' fill='none' stroke='%23181818' stroke-linecap='round' stroke-width='2'/%3E%3C/svg%3E%0A")' fill='none' stroke='%23181818' stroke-width='2'%3E%3Ccircle cx='8' cy='8' r='8' stroke='none'/%3E%3Ccircle cx='8' cy='8' r='7' fill='none'/%3E%3C/g%3E%3Cpath id='패스_633' data-name='패스 633' d='M1710.519,49.653l4,4' transform='translate(-1696.519 -35.653)' fill='none' stroke='%23181818' stroke-linecap='round' stroke-width='2'/%3E%3C/svg%3E%0A)`,
      },
    },
  },
  plugins: [],
  mode: 'jit',
};
