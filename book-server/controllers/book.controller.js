const Book = require("../models/book.model")
const fs = require('fs');
const path = require('path'); 
const User = require("../models/user.model");

const getAllPosts = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    const books = await Book.find();
    const postedByUserIds = books.map(book => book.posted_by);
    
    const postedByUsers = await User.find(
      { _id: { $in: postedByUserIds } },
      'name following'
    );

    const currentUserFollowingMap = {};
    const currentUser = await User.findById(currentUserId);
    currentUser.following.forEach(followedUserId => {
      currentUserFollowingMap[followedUserId] = true;
    });

    const booksWithUserInfo = books.map(book => {
      const postedByUser = postedByUsers.find(user =>
        user._id.equals(book.posted_by)
      );
      const currentUserFollowing = currentUserFollowingMap[postedByUser._id];

      return {
        ...book.toObject(),
        postedByUser,
        currentUserFollowing,
        currentUserLiked: book.liked_by.includes(currentUserId),
      };
    });

    res.status(200).json(booksWithUserInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching posts.' });
  }
};


const createBook = async (req, res) => {

  const { title, author, genre, review, image } = req.body;
  const userId = req.user.userId; 
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

const toggleLikeBook = async (req, res) => {
  const { bookId } = req.params;
  const currentUserId = req.user.userId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    const likedIndex = book.liked_by.indexOf(currentUserId);

    if (likedIndex === -1) {
      book.liked_by.push(currentUserId);
      await book.save();
      res.status(200).json({ message: 'Book liked successfully.' });
    } else {
      book.liked_by.splice(likedIndex, 1);
      await book.save();
      res.status(200).json({ message: 'Book unliked successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while toggling the book like.' });
  }
};

const searchBooks = async (req, res) => {
  const searchText = req.params.searchText;
  const currentUserId = req.user.userId;
  
  try {
    const foundBooks = await Book.find({
      $or: [
        { title: { $regex: searchText, $options: 'i' } },
        { author: { $regex: searchText, $options: 'i' } },
        { genre: { $regex: searchText, $options: 'i' } },
        { review: { $regex: searchText, $options: 'i' } },
      ],
    });

    const postedByUserIds = foundBooks.map(book => book.posted_by);
    const postedByUsers = await User.find({ _id: { $in: postedByUserIds } }, 'name following');

    const currentUserFollowingMap = {};
    const currentUser = await User.findById(currentUserId);
    currentUser.following.forEach(followedUserId => {
      currentUserFollowingMap[followedUserId] = true;
    });

    const booksWithUserInfo = foundBooks.map(book => {
      const postedByUser = postedByUsers.find(user =>
        user._id.equals(book.posted_by)
      );
      const currentUserFollowing = currentUserFollowingMap[postedByUser._id];

      return {
        ...book.toObject(),
        postedByUser,
        currentUserFollowing,
        currentUserLiked: book.liked_by.includes(currentUserId),
      };
    });

    res.status(200).json(booksWithUserInfo);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while searching for books.' });
  }
};

const getFeed = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    const currentUser = await User.findById(currentUserId);
    const followingUserIds = currentUser.following;

    const postsByFollowedUsers = await Book.find({ posted_by: { $in: followingUserIds } });

    const postedByUserIds = postsByFollowedUsers.map(book => book.posted_by);
    const postedByUsers = await User.find({ _id: { $in: postedByUserIds } }, 'name following');

    const currentUserFollowingMap = {};
    currentUser.following.forEach(followedUserId => {
      currentUserFollowingMap[followedUserId] = true;
    });

    const booksWithUserInfo = postsByFollowedUsers.map(book => {
      const postedByUser = postedByUsers.find(user => user._id.equals(book.posted_by));
      const currentUserFollowing = currentUserFollowingMap[postedByUser._id];

      return {
        ...book.toObject(),
        postedByUser,
        currentUserFollowing,
        currentUserLiked: book.liked_by.includes(currentUserId),
      };
    });

    res.status(200).json(booksWithUserInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching followed users posts.' });
  }
};


module.exports = {
  createBook,
  getAllPosts,
  toggleLikeBook,
  getFeed,
  searchBooks
}