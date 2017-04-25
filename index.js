import React,{ Component } from 'react'
import { render } from 'react-dom'

import router from './harryblog/app/routes'

render(
    router,
    document.getElementById('root')
)