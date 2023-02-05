function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;

  books.forEach((book) => {
    if (!book.borrows[0].returned) borrowedBooks++;
  });
  return borrowedBooks;
}

function getMostCommonGenres(books) {
  const result = books.reduce((accum, book) => {
    const genre = book.genre;
    const genreInfo = accum.find((element) => element.name === genre);
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      genreInfo.count++;
    }

    return accum;
  }, []);
  result.sort((genreA, genreB) => genreB.count - genreA.count);
  result.splice(5);

  return result;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);

  return topFive(popularBooks);
}
function topFive(array) {
  let popularBooks = array

    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);

  return popularBooks;
}
function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];

  for (let author of authors) {
    const authorName = `${author.name.first} ${author.name.last}`;
    let count = 0;
    for (let book of books) {
      if (author.id === book.authorId) {
        count += book.borrows.length;
      }
    }
    const authorObject = { name: authorName, count: count };
    popularAuthors.push(authorObject);
  }

  return topFive(popularAuthors);
}
function getBooksByAuthorId(books, authorid) {
  const totalBorrows = booksByAuthor.reduce(
    (accum, book) => accum + book.borrows.length,
    0
  );
  const newAuthorInfo = {
    name: fullName,
    count: totalBorrows,
  };

  return newAuthorInfo;
  result.sort((authorA, authorB) => authorB.count - authorA.count);
  result.splice(5);

  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
