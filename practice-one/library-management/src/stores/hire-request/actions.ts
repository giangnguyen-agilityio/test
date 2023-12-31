import {ACTION} from '@constants'
import {
  IHireRequest,
  SetHireRequestsAction,
  AddNewHireRequestAction,
  EditHireRequestAction,
  DeleteHireRequestAction,
} from '@types'

// This function creates an action to set the Hire requests data in the store
export const setHireRequests = (
  payload: IHireRequest[]
): SetHireRequestsAction => ({
  type: ACTION.SET_HIRE_REQUESTS, // Specifies the action type as "SET_HIRE_REQUESTS"
  payload, // Contains the array of hire requests to be set in the store
})

// This function creates an action to add a new hire request to the store
export const addNewHireRequest = (
  payload: IHireRequest
): AddNewHireRequestAction => ({
  type: ACTION.ADD_NEW_HIRE_REQUEST, // Specifies the action type as "ADD_NEW_HIRE_REQUESTS"
  payload, // Contains the hire request object to be added to the store
})

// This function creates an action to edit the hire request in the store
export const editHireRequest = (
  payload: IHireRequest
): EditHireRequestAction => ({
  type: ACTION.EDIT_HIRE_REQUEST, // Specifies the action type as "EDIT_HIRE_REQUEST"
  payload, // Contains the hire request object to be edited in the store
})

// This function creates an action to delete the hire request from the store
export const deleteHireRequest = (
  payload: string
): DeleteHireRequestAction => ({
  type: ACTION.DELETE_HIRE_REQUEST, // Specifies the action type as "DELETE_HIRE_REQUEST"
  payload, // Contains the ID of the hire request to be deleted from the store
})
