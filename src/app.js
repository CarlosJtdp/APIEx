import express from 'express'
import cors from 'cors';
import autenticacionRoutes from './routes/autenticacion.routes.js'
import partidoadminRoutes from './routes/partidoadmin.routes.js'
import pronosticoRoutes from './routes/pronostico.routes.js'
import resultadoRoutes from './routes/resultado.routes.js'
import listadoRoutes from './routes/listado.routes.js'
import ganadorRoutes from './routes/ganadores.routes.js'


const app=express();
const corsOptions={
    origin:'*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api',autenticacionRoutes)
app.use('/api',partidoadminRoutes)
app.use('/api',pronosticoRoutes)
app.use('/api',resultadoRoutes)
app.use('/api',listadoRoutes)
app.use('/api',ganadorRoutes)


app.use((req,res,next)=>{
    res.status(400).json({
        message:'Endpoint not found'
    })
})
export default app;