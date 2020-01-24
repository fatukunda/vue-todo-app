import axios from "axios";
const baseUrl = "https://jsonplaceholder.typicode.com/todos";

const state = {
  todos: [],
  isLoading: false,
  error: null
};

const getters = {
  allTodos: state => state.todos,
  isLoading: state => state.isLoading,
  error: state => state.error
};

const actions = {
  async fetchTodos({ commit }) {
    commit("setLoading", true);
    try {
      const response = await axios.get(baseUrl);
      commit("setTodos", response.data);
      commit("setLoading", false);
    } catch (error) {
      commit("setError", error);
      commit("setTodos", []);
      commit("setLoading", false);
    }
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(baseUrl, { title, completed: false });
    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`${baseUrl}/id`);
    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(`${baseUrl}?_limit=${limit}`);
    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(
      `${baseUrl}/${updatedTodo.id}`,
      updatedTodo
    );
    commit("updateTodo", response.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  setLoading: (state, status) => (state.isLoading = status),
  setError: (state, error) => (state.error = error),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
