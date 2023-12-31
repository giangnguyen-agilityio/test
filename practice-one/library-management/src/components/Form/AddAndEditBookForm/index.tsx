import React, {useState, useCallback, useEffect, memo} from 'react'
import Input from '@components/commons/Input'
import Button from '@components/commons/Button'
import {ERROR_MESSAGES, MODAL} from '@constants'
import {v4 as uuidv4} from 'uuid'
import {BookData, IBook} from 'types/book'
import '../form.css'

interface AddAndEditFormProps {
  id: string
  formType: MODAL.ADD | MODAL.EDIT
  onAdd: (formData: IBook) => void
  onEdit: (id: string, formData: IBook) => void
  onHandleToast: (message: string, status: boolean) => void
  bookData: BookData | undefined
}

const AddAndEditForm: React.FC<AddAndEditFormProps> = props => {
  const {id, formType, onAdd, onEdit, bookData} = props

  const [disableButton, setDisableButton] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: 0,
    description: '',
    availableQuantity: 0,
    totalQuantity: 0,
    image: '',
  })

  const [isFieldEmpty, setIsFieldEmpty] = useState(false)

  // Fetches book data when the component mounts or when formType or id changes
  useEffect(() => {
    if (formType === MODAL.EDIT && id !== '' && bookData) {
      setFormData({
        title: bookData.title,
        author: bookData.author,
        price: bookData.price,
        description: bookData.description,
        availableQuantity: bookData.availableQuantity,
        totalQuantity: bookData.totalQuantity,
        image: bookData.image ?? '',
      })
    }
  }, [formType, id, bookData])

  // Function to handles changes in input fields
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {name, value} = event.target
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]:
          name === 'price' ||
          name === 'availableQuantity' ||
          name === 'totalQuantity'
            ? Number(value)
            : value,
      }))
    },
    []
  )

  // Function to handles image upload
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Retrieve the selected file from the event target's files array
    const selectedFile: File | undefined = event.target?.files?.[0]
    if (selectedFile) {
      // Create a FileReader object
      const fileReader: FileReader = new FileReader()
      // Define the onload event handler for the FileReader
      fileReader.onload = () => {
        // Update the form data by setting the image field to the result of the FileReader
        setFormData(prevFormData => ({
          ...prevFormData,
          image: fileReader.result as string,
        }))
      }
      // Read the selected file as a data URL
      fileReader.readAsDataURL(selectedFile)
    }
  }

  // Generates a random number and constructs the alternative image path and book ID
  const randomId: string = uuidv4()
  const altImagePath: string = `${formData.title} book cover`
  const bookId: string = `B${randomId}`

  // Function to handle submit the form
  const submitForm = async (): Promise<void> => {
    const {
      title,
      author,
      price,
      description,
      availableQuantity,
      totalQuantity,
      image,
    } = formData

    // Check if all fields have a value using the every() method and store the result in isValid
    const isValid: boolean = [
      title,
      author,
      price,
      description,
      availableQuantity,
      totalQuantity,
      image,
    ].every(Boolean)

    setIsFieldEmpty(!isValid)

    // Combine book ID, altImagePath and formData into newBookData
    const newBookData = {
      id: formType === MODAL.ADD ? bookId : id,
      alt: altImagePath,
      ...formData,
    }

    // Disable the submit button to prevent multiple submissions before the request is complete
    setDisableButton(true)

    // If all fields have values, call the onAdd() function or onEdit() function depending on the formType
    if (isValid) {
      formType === MODAL.ADD ? onAdd(newBookData) : onEdit(id, newBookData)
    }

    // Enable the submit button again after the request is complete
    setDisableButton(false)
  }

  // Renders an error message if a field is empty
  const renderErrorMessage = (
    fieldName: keyof typeof formData,
    message: string
  ): string => {
    if (
      isFieldEmpty &&
      (formData[fieldName] === '' || formData[fieldName] === 0)
    ) {
      return message
    } else {
      return ''
    }
  }

  return (
    <>
      <form className="form-content">
        <Input
          className="input-field"
          name="title"
          label="Name of book:"
          classNameLabel="form-label"
          value={formData.title}
          onChange={handleChange}
          errorMessage={renderErrorMessage(
            'title',
            ERROR_MESSAGES.BOOK_TITLE_IS_MISSING
          )}
        />

        <Input
          className="input-field"
          name="author"
          label="Author:"
          classNameLabel="form-label"
          value={formData.author}
          onChange={handleChange}
          errorMessage={renderErrorMessage(
            'author',
            ERROR_MESSAGES.BOOK_AUTHOR_IS_MISSING
          )}
        />

        <Input
          className="input-field"
          name="price"
          label="Price:"
          classNameLabel="form-label"
          type="number"
          value={formData.price.toString()}
          onChange={handleChange}
          errorMessage={renderErrorMessage(
            'price',
            ERROR_MESSAGES.BOOK_PRICE_IS_LESS_THAN_0
          )}
        />

        <Input
          className="input-field"
          name="description"
          label="Description:"
          value={formData.description}
          classNameLabel="form-label"
          onChange={handleChange}
          errorMessage={renderErrorMessage(
            'description',
            ERROR_MESSAGES.BOOK_DESCRIPTION_IS_MISSING
          )}
        />

        <Input
          className="input-field"
          name="availableQuantity"
          label="Available quantity:"
          classNameLabel="form-label"
          type="number"
          min={0}
          value={formData.availableQuantity.toString()}
          onChange={handleChange}
          errorMessage={renderErrorMessage(
            'availableQuantity',
            ERROR_MESSAGES.AVAILABLE_QUANTITY_IS_LESS_THAN_0
          )}
        />

        <Input
          className="input-field"
          name="totalQuantity"
          label="Total quantity:"
          classNameLabel="form-label"
          type="number"
          min={0}
          value={formData.totalQuantity.toString()}
          onChange={handleChange}
          errorMessage={renderErrorMessage(
            'totalQuantity',
            ERROR_MESSAGES.TOTAL_QUANTITY_IS_LESS_THAN_0
          )}
        />

        <Input
          className="input-field image-uploaded"
          name="image"
          label="Image:"
          classNameLabel="form-label"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          errorMessage={renderErrorMessage(
            'image',
            ERROR_MESSAGES.BOOK_IMAGE_IS_MISSING
          )}
        />
        {formData.image && (
          <img
            className="image-uploaded"
            src={formData.image}
            alt={`${formData.title} book cover`}
          />
        )}
      </form>

      <div className="control-buttons">
        <Button
          onClick={submitForm}
          size="large"
          variant="primary"
          className="submit-form-btn"
          disabled={disableButton}
        >
          {formType === MODAL.ADD ? 'ADD' : 'EDIT'}
        </Button>
      </div>
    </>
  )
}

export default memo(AddAndEditForm)
