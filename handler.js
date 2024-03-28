const { nanoid } = require('nanoid')
const books = []

const addBook = (request, h) => {
  const id = nanoid()
  const finished = false
  const insertedAt = new Date().toISOString()
  const updatedAt = new Date().toISOString()
  const { name, year, author, summary, publisher, pageCount, readPage } = request.payload
  const readPageInt = parseInt(readPage)
  const pageCountInt = parseInt(pageCount)
  const yearInt = parseInt(year)
  const reading = Boolean(request.payload.reading)

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPageInt > pageCountInt) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  const newBook = {
    id,
    name,
    year: yearInt,
    author,
    summary,
    publisher,
    pageCount: pageCountInt,
    readPage: readPageInt,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  books.push(newBook)
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  })
  response.code(201)
  return response
}

const getBooks = () => {
  const book = []
  for (let i = 0; i < books.length; i++) {
    const { id, name, publisher } = books[i]
    book.push({ id, name, publisher })
  }
  return {
    status: 'success',
    data: {
      books: book
    }
  }
}

const getBookById = (request, h) => {
  const id = request.params.bookId
  const book = books.find((book) => book.id === id)
  const bookIsFound = book !== undefined
  if (bookIsFound) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const editBook = (request, h) => {
  const id = request.params.bookId
  const { name, year, author, summary, publisher, pageCount, readPage } = request.payload
  const readPageInt = parseInt(readPage)
  const pageCountInt = parseInt(pageCount)
  const yearInt = parseInt(year)
  const reading = Boolean(request.payload.reading)
  const bookIndex = books.findIndex((book) => book.id === id)
  const found = bookIndex !== -1
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  } else if (readPageInt > pageCountInt) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  } else if (!found) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }
  books[bookIndex].name = name
  books[bookIndex].year = yearInt
  books[bookIndex].author = author
  books[bookIndex].summary = summary
  books[bookIndex].publisher = publisher
  books[bookIndex].pageCount = pageCountInt
  books[bookIndex].readPage = readPageInt
  books[bookIndex].reading = reading
  books[bookIndex].updatedAt = new Date().toISOString()
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  })
  response.code(200)
  return response
}

const deleteBook = (request, h) => {
  const id = request.params.bookId
  const book = books.findIndex((book) => book.id === id)
  const bookIsFound = book !== -1
  if (bookIsFound) {
    books.splice(book, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addBook, getBooks, getBookById, editBook, deleteBook }
