import {render} from '@testing-library/react'
import Home from './Home'; 

test('load and display home',() => {
    render(<Home />)

    screen.debug()
})