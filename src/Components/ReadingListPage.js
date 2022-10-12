import { PropTypes } from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    homePage: {},
  });

function ReadingListPage({ booksInfo }) {
  return (
    <div>
      <h2>AJ's Reading List</h2>

      <div>
        <h4>Currently Reading</h4>
        <ul>
          {booksInfo.current.map((book) => (
            <li>
              <i>"{book.title}",</i> by {book.author}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Previously Read</h4>
        <ul>
          {booksInfo.previous.map((book) => (
            <li>
              <i>"{book.title}",</i> by {book.author}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>To Read Next</h4>
        <ul>
          {booksInfo.future.map((book) => (
            <li>
              <i>"{book.title}",</i> by {book.author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReadingListPage.propTypes = {
  booksInfo: {
    current: [
      {
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      },
    ],
    previous: [
      {
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      },
    ],
    future: [
      {
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      },
    ],
  },
};

export default ReadingListPage;
