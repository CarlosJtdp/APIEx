import {config}from 'dotenv'
config()

export const BD_HOST=process.env.BD_HOST || "b6dh0pblovgmnahwnfkb-mysql.services.clever-cloud.com"
export const BD_DATABASE=process.env.BD_DATABASE|| "b6dh0pblovgmnahwnfkb"
export const DB_USER=process.env.DB_USER|| "uvtxldpzkanrir1c"
export const DB_PASSWORD=process.env.DB_PASSWORD||"EDTBeNrD20ea3rvhxeJB"
export const DB_PORT=process.env.DB_PORT|| 3306
export const PORT= process.env.PORT|| 3000