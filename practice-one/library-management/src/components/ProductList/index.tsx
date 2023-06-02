import React, { useState, useCallback, useRef } from 'react'

// Importing the EmptyProductList, Pagination, Typography, Card and Button components
import EmptyProductList from '../EmptyProductList/index'
import Pagination from '../Pagination/index'
import Typography from '../Typography'
import Card from '../Card'
import Button from '../Button'
import Modal from '../Modal'

// Importing the Icon from the React-icons library
import { AiOutlineFileAdd } from 'react-icons/ai'

// Importing the Book type
import { type Book } from '../../types/book'

// Importing the CSS file for styling
import './product-list.css'

// Define the props for the Card List component
interface CardListProps {
  bookList: Book[]
}

const ProductList: React.FC<CardListProps> = ({ bookList }) => {
  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add')
  const [previousScrollPosition, setPreviousScrollPosition] = useState<number>(0)
  const productSectionRef = useRef<HTMLDivElement>(null)

  // Function to handle renting a book
  const handleRentBook = useCallback((id: string): void => {
    console.log(`${id} was rented`)
  }, [])

  // Function to handle editing, or deleting a book
  const handleBookAction = useCallback((id: string, action: 'add' | 'edit' | 'delete'): void => {
    setIsOpenModal(true)
    setModalType(action)
    if (action === 'edit' || action === 'delete') {
      setPreviousScrollPosition(window.scrollY)
      productSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setPreviousScrollPosition(window.scrollY)
    }
  }, [])

  // Function to handle add new book
  const handleAddNewBook = useCallback((): void => {
    handleBookAction('', 'add')
  }, [handleBookAction])

  // Function to handle close the modal
  const handleCloseModal = useCallback(() => {
    setIsOpenModal(!isOpenModal)
    window.scrollTo({ top: previousScrollPosition, behavior: 'smooth' })
    console.log('close modal re-render')
  }, [isOpenModal])

  // Calculate the total number of pages
  const totalPages = Math.ceil(bookList.length / itemsPerPage)

  // Function to get the current books and pagination range based on the current page
  const getBooksAndPaginationRange = (): {
    currentBooks: Book[]
    paginationRange: Book[]
  } => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentBooks = bookList.slice(0, endIndex)
    const paginationRange = bookList.slice(startIndex, endIndex + 1)
    return { currentBooks, paginationRange }
  }

  // Get the current books and pagination range
  const { currentBooks, paginationRange } = getBooksAndPaginationRange()

  // Function to handle showing more books
  const handleShowMore = useCallback((): void => {
    setCurrentPage((prevPage) => prevPage + 1)
  }, [])

  return (
    <>
      {/* Check if there are books in the list */}
      {bookList.length > 0 ? (
        <>
          <section className="product-list-section" ref={productSectionRef}>
            {/* The product list title */}
            <Typography variant="h2" className="product-list-title">
              popular books
            </Typography>
            <div className="product-list-controls">
              {/* Add new book button */}
              <Button
                size="large"
                variant="primary"
                className="add-new-btn"
                ariaLabel="Add new book button"
                onClick={handleAddNewBook}
              >
                Add new book <AiOutlineFileAdd size={30} />
              </Button>
            </div>
            <ul className="product-list">
              {/* Render cards for current books */}
              {currentBooks.map((book) => (
                <Card
                  key={`book-${book.bookId}`}
                  book={book}
                  onRent={handleRentBook}
                  onEdit={() => {
                    handleBookAction(book.bookId, 'edit')
                  }}
                  onDelete={() => {
                    handleBookAction(book.bookId, 'delete')
                  }}
                />
              ))}
            </ul>
            {/* Check if there are more pages to show */}
            {currentPage < totalPages && (
              <>
                {/* Pagination */}
                <Pagination
                  list={paginationRange}
                  activeIndex={currentPage - 1}
                />
                <div className="product-list-controls">
                  {/* Show more button */}
                  <Button
                    size="large"
                    variant="primary"
                    className="show-more-btn"
                    ariaLabel="Show more button"
                    onClick={handleShowMore}
                  >
                    View more products
                  </Button>
                </div>
              </>
            )}
            {/* Modal */}
            <Modal
              modalType={modalType}
              showModal={isOpenModal}
              closeModal={handleCloseModal}
            />
          </section>
        </>
      ) : (
        // Empty product list
        <EmptyProductList errorMessage="We couldn't find any books at the moment" />
      )}
    </>
  )
}

export default ProductList