const app = require('express')()

const PORT = process.env.PORT || 8000
app.listen(PORT,()=> console.log(`server running in port ${PORT}`))