import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8080"

class TaskRoute {
    async getTasks() {
        try {
            const response = await axios.get("/tasks")
            return response
        }
        catch (e) {
            console.error('Failed on get tasks. ' + e.message)
        }
    }

    async completeTask(id) {
        try {
            await axios.put(`/tasks/complete/${id}`)
        }
        catch (e) {
            console.error("Failed on complete task. " + e.message)
        }
    }

    async addTask(title) {
        try {
            await axios.post("/tasks", { title: title })
        }
        catch (e) {
            console.error("Failed on add new task." + e.message)
        }
    }

    async deleteTask(id) {
        try {
            await axios.delete(`/tasks/delete/${id}`)
        }
        catch (e) {
            console.error("Failed on delete task." + e.message)
        }
    }
}

export default new TaskRoute();