const Book = require("../models/book.model")
const fs = require('fs');
const path = require('path'); 
const User = require("../models/user.model");

// const getAllPosts = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.status(200).json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while fetching posts.' });
//   }
// }

const getAllPosts = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const books = await Book.find();

    const likedByUserIds = books.flatMap(book => book.liked_by);

    const postedByUserIds = books.map(book => book.posted_by);
    const postedByUsers = await User.find({ _id: { $in: postedByUserIds } }, 'name following');

    const currentUserFollowingMap = {};
    postedByUsers.forEach(user => {
      currentUserFollowingMap[user._id] = user.following.includes(currentUserId);
    });

    const booksWithUserInfo = books.map(book => ({
      ...book.toObject(),
      postedByUser: postedByUsers.find(user => user._id.equals(book.posted_by)),
      currentUserFollowing: currentUserFollowingMap[book.posted_by],
      currentUserLiked: likedByUserIds.includes(currentUserId),
    }));

    res.status(200).json(booksWithUserInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching posts.' });
  }
};



const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Book.findById(postId).populate("author");
    if (!post) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.send(post);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the post.' });
  }
}

const createBook = async (req, res) => {

  const { title, author, genre, review, image } = req.body;
  const userId = req.user._id; 
    let imagePath = null;

  if (image) {
    const uploadDir = path.join(__dirname, '../images');
    const extension = 'png';
    const imageName = `${Date.now()}.${extension}`;
    const imageBuffer = Buffer.from(image, 'base64');
    const imageFilePath = path.join(uploadDir, imageName);
    fs.writeFileSync(imageFilePath, imageBuffer);
    imagePath = `images/${imageName}`;
    const post = new Book({
      title,
      author,
      image: imagePath,
      review,
      genre,
      posted_by: userId,
    })
    try {
      const savedBook = await post.save();
      return res.status(201).json(savedBook);
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while posting the book.' });
    }
  }else{
    return res.status(400).json({ message: 'File missing in request!.' });
  }
}

const likeBook = async (req, res) => {
  const { bookId } = req.params;
  const currentUser = req.user; 

  try {
    const book = await Book.findById(bookId);
    console.log(book)
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    book.liked_by.push(currentUser._id);
    await book.save();

    res.status(200).json({ message: 'Book liked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while liking the book.' });
  }
};


const unlikeBook = async (req, res) => {
  const { bookId } = req.params;
  const currentUser = req.user; 

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    book.liked_by = book.liked_by.filter(id => id.toString() !== currentUser._id.toString());
    await book.save();

    res.status(200).json({ message: 'Book unliked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while unliking the book.' });
  }
};

const checkIfBookIsLiked = async (req, res) => {
  const currentUser = req.user;
  const bookId = req.params.bookId;

  try {
    const likedBooks = await Book.find({ _id: bookId, liked_by: currentUser._id });
    const isLiked = likedBooks.length > 0;
    res.status(200).json({ isLiked });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while checking if the book is liked.' });
  }
};


const getFeed = async (req, res) => {
  const currentUser = req.user; 
  try {
    const followingIds = currentUser.following;
    const feed = await Book.find({ posted_by: { $in: followingIds } })
      .populate("posted_by") 
      .populate("liked_by")   
      

    return res.status(200).json(feed);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the feed.' });
  }
};

const getRecommendedBooks = async (req, res) => {
  const currentUser = req.user; 

  try {
    const followingIds = currentUser.following;
    const recommendedBooks = await Book.find({ author: { $in: followingIds } }).populate("author");
    res.status(200).json(recommendedBooks);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching recommended books.' });
  }
};

const searchBooks = async (req, res) => {
  const { genre, author, keywords } = req.query;

  try {
    const query = {};
    if (genre) {
      query.genre = genre;
    }
    if (author) {
      query.author = author;
    }
    if (keywords) {
      query.$text = { $search: keywords };
    }
    
    const searchResults = await Book.find(query);
    return res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching for books:", error);
    return res.status(500).json({ message: 'An error occurred while searching for books.' });
  }
};

module.exports = {
  createBook,
  getAllPosts,
  getPost,
  likeBook,
  unlikeBook,
  checkIfBookIsLiked,
  getFeed,
  getRecommendedBooks,
  searchBooks
}