let initialState = {
	streaming: false,
	streamed: false,
	data: null,
	error: null,
}

export default (state = {...initialState}, action) => {
 switch (action.type) {

  case 'FILTER_STREAM':
		return {
			...state,
			streaming: true,
			streamed: false,
			data: null,
			error: null,
		}

	case 'FILTER_STREAM_SUCCESS':
		return {
			...state,
			streaming: false,
			streamed: true,
			data: action.payload,
			error: null,
		}

	case 'FILTER_STREAM_ERROR':
		return {
			...state,
			streaming: false,
			streamed: true,
			error: action.payload,
			data: null,
		}

  default:
   return state
 }
}
