import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchApi = createAsyncThunk(

    "api/fetchApi",
    async (page, { getState }) => {
        const token = getState().blog.token;
        console.log(token);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post?page=${page}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.token}`
                    },
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }

    }
);

export const postPost = createAsyncThunk(
    "api/postPost",
    async (post, { getState }) => {
        const token = getState().blog.token;


        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`
                },
                body: JSON.stringify(post), // Utilizza formData invece di JSON.stringify(post)
            });

            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const postLogin = createAsyncThunk(
    "api/postLogin",
    async (login, { getState }) => {
        const token = getState().blog.token;


        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`



                },
                body: JSON.stringify(login),
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const registerUser = createAsyncThunk(
    "api/registerUser",
    async (input) => {
        // const token = getState().blog.token;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/author`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token.token}`
                },
                body: JSON.stringify(input),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);



export const postComment = createAsyncThunk(
    "api/postComment",
    async (comment, { getState }) => {
        const token = getState().blog.token;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`
                },
                body: JSON.stringify(comment),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchComment = createAsyncThunk(
    "api/fetchComment",
    async (id, { getState }) => {
        const token = getState().blog.token;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comment/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "api/deleteComment",
    async (id, { getState }) => {
        const token = getState().blog.token;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comment/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchBlogDetail = createAsyncThunk(
    "api/fetchBlogDetail",
    async (postId) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${postId}`);
        const data = await response.json();
        return data;
    }
);

export const editPost = createAsyncThunk(
    "api/editPost",
    async (postId, post) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
        const data = await response.json();
        return data;
    }
);

export const deletePost = createAsyncThunk(
    "api/deletePost",
    async (postId) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }
);

const initialState = {
    data: [],
    token: localStorage.getItem("token") || null,
    // Se Token è null, allora token sarà un oggetto vuoto
    totalPages: 0,
    Detail: null,
    Comment: [],
    posts: [],
    loading: false,
    error: false,
}

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        setAuthor: (state, action) => {
            state.data = action.payload;

        },
        logout: (state, action) => {
            state.token = {};
            localStorage.removeItem("token");
        },
        BlogDetail: (state, action) => {
            const find = state.data.find((post) => post._id === action.payload);
            state.Detail = find;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(postLogin.fulfilled, (state, action) => {
            if (action.payload) { // Verifica se action.payload è definito
                console.log(action.payload);
                state.token = action.payload;
                localStorage.setItem("token", action.payload.token);
            }
            state.loading = false;
        }

        );
        builder.addCase(postLogin.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
        );
        builder.addCase(fetchApi.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(fetchApi.fulfilled, (state, action) => {
            console.log(action.payload);
            state.posts = action.payload;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
        }
        );
        builder.addCase(fetchApi.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
        );
        builder.addCase(fetchComment.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(fetchComment.fulfilled, (state, action) => {
            console.log(action.payload);
            state.Comment = action.payload;
            state.loading = false;
        }
        );
        builder.addCase(fetchComment.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
        );
        builder.addCase(fetchBlogDetail.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(fetchBlogDetail.fulfilled, (state, action) => {
            state.Detail = action.payload;
            state.loading = false;
        }
        );
        builder.addCase(fetchBlogDetail.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
        );
    }
},

);

export const { setAuthor, logout, BlogDetail } = apiSlice.actions;
export default apiSlice.reducer;





