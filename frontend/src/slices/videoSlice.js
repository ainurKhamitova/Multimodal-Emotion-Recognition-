import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    video: null,
    loading: false,
    error: null,
    results: null
    };

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        getVideoStart(state) {
            state.loading = true;
            state.error = null;
        },
        getVideoSuccess(state, action) {
            state.video = action.payload;
            state.loading = false;
            state.error = null;
        },

        getVideoFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getResultsSuccess(state, action) {
            state.results = action.payload;
            state.loading = false;
            state.error = null;
        },
        getResultsFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetState(state) {
            state.video = null;
            state.loading = false;
            state.error = null;
            state.results = null;
        }
    },
});

export const { getVideoStart, getVideoSuccess, getVideoFail, getResultsFail, getResultsSuccess, resetState } = videoSlice.actions;

export const getVideo = videoId => async dispatch => {
    dispatch(getVideoStart());
    try {
        const res = await axios.get(`/api/videos/${videoId}`);
        dispatch(getVideoSuccess(res.data));
    } catch (err) {
        dispatch(getVideoFail(err.response.data.msg));
    }
}

export const uploadVideo = videoData => async dispatch => {
    dispatch(getVideoStart());
    console.log(videoData);
    try {
        const res = await axios.post('/api/videos/upload', videoData);
        dispatch(getVideoSuccess(res.data));

    } catch (err) {
        dispatch(getVideoFail(err.response.data.msg));
    }
}

export const getResults = email => async dispatch => {
    console.log(email);
    dispatch(resetState());
    try {
        const res = await axios.get(`/api/videoResults`, { params: { email } });
        dispatch(getResultsSuccess(res.data));
    } catch (err) {
        dispatch(getResultsFail(err.response.data.msg));
    }
}

export const setErrorMessage = (msg) => async dispatch => {
    dispatch(getVideoFail(msg));
}


export const selectVideoHistory = (email, video_title) => async dispatch => {
    dispatch(getVideoStart());
   try{
        const res = await axios.get('/api/videoResultHistory',{ params: { email, video_title } });
        dispatch(getVideoSuccess(res.data));
   } catch (err) {
        dispatch(getVideoFail(err.response.data.msg));
        
   }
}

export const deleteVideo = (email, video_title) => async dispatch => {
    dispatch(resetState());
    try {
        const res = await axios.delete('/api/deleteVideo',  { params: { email, video_title } });
        dispatch(getResultsSuccess(res.data));
    } catch (err) {
        dispatch(getResultsFail(err.response.data.msg));
    }
}


export default videoSlice.reducer;