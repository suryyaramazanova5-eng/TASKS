import { createRoot } from 'react-dom/client'
import "./index.css"

function BookName() {
  return <h1 className='text-2xl text-blue-600'>Anatomy</h1>
}
function BookPrice() {
  return <p>Qiymet: 25 AZN</p>
}

function BookAuthor() {
  return <h2 className='text-amber-900 text-3xl'>Andreas Vesalius</h2>
}
function Book() {
  return (
    <>
      <BookName />
      <BookAuthor />
      <BookPrice />
    </>
  )
}




createRoot(document.getElementById('root')).render(
  <Book />
)
