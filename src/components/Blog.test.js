import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



test('renders title and author but not likes or url', () => {
    const blog = {
        author: 'Testaaja',
        title: 'Testaajan Blogi',
        url: 'www.testaaja.com',
        user: 'Testaaja'
    }

    const component = render(
        <Blog blog={blog} />
    )

    const div = component.container.querySelector('.hiddenView')

    //    component.debug()
    //    component.debug(div)

    expect(div).toHaveTextContent(
        'Testaaja'
    )

    expect(div).toHaveTextContent(
        'Testaajan Blogi'
    )

    expect(div).not.toHaveTextContent(
        'likes'
    )
    expect(div).not.toHaveTextContent(
        'www.testaaja.com'
    )
})

test('clicking the view button shows url and likes', async () => {
    const blog = {
        author: 'Testaaja',
        title: 'Testaajan Blogi',
        url: 'www.testaaja.com',
        likes: 2,
        user: 'Testaaja'
    }

    const setVisibility = jest.fn()

    const component = render(
        <Blog blog={blog} setVisibility={setVisibility(true)} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)


    expect(setVisibility.mock.calls).toHaveLength(1)
    expect(component.container).toHaveTextContent(
        'www.testaaja.com'
    )
    expect(component.container).toHaveTextContent(
        'likes 2'
    )
})

test('clicking like button twice calls event handler also twice', async () => {
    const blog = {
        author: 'Testaaja',
        title: 'Testaajan Blogi',
        url: 'www.testaaja.com',
        likes: 2,
        user: 'Testaaja'
    }

    const updateLikes = jest.fn()

    const component = render(
        <Blog blog={blog} updateLikes={updateLikes} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)


    expect(updateLikes.mock.calls).toHaveLength(2)
})