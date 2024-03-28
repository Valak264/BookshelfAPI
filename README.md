Project Submission untuk Kelulusan Course "Belajar Membuat Aplikasi Back-End untuk Pemula"

Project ini dibangun menggunakan Javascript (Node.JS) dengan menggunakan framework Hapi.JS. 
Project ini memiliki fitur diantaranya sebagai berikut :
- Menyimpan data buku dalam bentuk JSON (di dalam sebuah array bernama "books")
- Mengambil data buku secara keseluruhan (menampilkan hanya properti id, name, dan publisher)
- Mengambil detail buku berdasarkan id
- Mengubah data buku berdasarkan id
- Menghapus data buku berdasarkan id

API Endpoint

- Menyimpan buku : /books (Method POST), input diambil dari body request (name, year, author, summary, publisher, pageCount, readPage, dan reading)
- Mengambil data buku secara keseluruhan : /books (Method GET)
- Mengambil detail buku berdasarkan id : /books/:bookId (Method GET) (bookId : id dari buku)
- Mengubah data buku berdasarkan id : /books/:bookId (Method PUT), input diambil dari body request (name, year, author, summary, publisher, pageCount, readPage, dan reading)
- Menghapus data buku berdasarkan id : /books/:bookId (Method DELETE)
