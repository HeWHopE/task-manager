import {render, screen, cleanup} from '@testing-library/react'  

import CreateBB from '../createBB.tsx'

test('test', () => {
    render(<CreateBB />);
    const linkElement = screen.getByTestId('createBB');
    expect (linkElement).toBeInTheDocument();


})