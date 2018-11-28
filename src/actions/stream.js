import axios from 'axios'

export function sampleStream() {
	return function action(dispatch) {
    dispatch({ type: 'SAMPLE_STREAM' })

		axios.get('http://localhost:8080/api/stream/sample/5', {withCredentials: true})
		.then((response) => {
			dispatch(sampleStreamSuccess(response.data))
		})
		.catch((error) => {
			dispatch(sampleStreamError(error))
		})
	}
}

export function sampleStreamSuccess(sample) {
	return {
		type: 'SAMPLE_STREAM_SUCCESS',
		payload: sample,
	}
}

export function sampleStreamError(error) {
	return {
		type: 'SAMPLE_STREAM_ERROR',
		payload: error,
	}
}

export function filterStream(data) {
	return function action(dispatch) {
    dispatch({ type: 'FILTER_STREAM' })
		console.log(data)

		axios({
			method: 'post',
		  url: 'http://localhost:8080/api/stream/filter',
			data: data,
			withCredentials: true,
		})
		.then((response) => {
			console.log(response)
			dispatch(filterStreamSuccess(response.data))
		})
		.catch((error) => {
			dispatch(filterStreamError(error))
		})
	}
}

export function filterStreamSuccess(stream) {
	return {
		type: 'FILTER_STREAM_SUCCESS',
		payload: stream,
	}
}

export function filterStreamError(error) {
	return {
		type: 'FILTER_STREAM_ERROR',
		payload: error,
	}
}
