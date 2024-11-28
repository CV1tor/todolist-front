
<template>
  <main class="container mx-auto p-16">
    <h1 class="text-3xl font-extrabold text-center p-6 text-gray-100">TODO LIST</h1>
    <div class=" " v-for="task in tasks" :key="task.id">
        <div class="p-3 w-75 mx-auto my-3 flex justify-between text-lg rounded-md border bg-gray-100 shadow-lg">
            <div>
                <input type="checkbox" :id="task.id" :checked="task.completed" :onclick="() => !task.completed" class=" mr-3 scale-125 rounded accent-purple-700 text-gray-200" @click="completeTask(task.id)">
                <label :for="task.id" :class="task.completed ? 'text-zinc-400 line-through' : 'text-gray-600'">{{ task.title }}</label>
            </div>
            <div class="text-red-700 text-md font-bold mr-3 hover:cursor-pointer" @click="openDeleteDialog(task.id)">x</div>
        </div>
    </div>
    <button 
        class="font-bold bg-purple-700 rounded-full w-16 h-16 hover:bg-purple-600 absolute bottom-10 right-10" 
        @click="openDialog"
        >
        <span class="text-gray-200 text-4xl">+</span>
    </button>

    <!-- Dialog com Input -->
    <v-dialog v-model="dialog" max-width="500px" class="p-3">
      <v-card >
        <v-card-title>
          <span class="font-bold">Add new task</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="inputText"
            placeholder="Title"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <button type="button" class="bg-purple-700 px-6 py-1  rounded"  @click="addNewTask()"><span class="text-gray-200 font-bold uppercase text-sm">Save</span></button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="font-bold">Are you sure?</span>
            </v-card-title>
            <v-card-subtitle>
                <span class="text-sm">The task will be deleted.</span>
            </v-card-subtitle>
    
            <v-card-actions>
                <button type="button" class="bg-red-700 px-6 py-1  rounded"  @click="deleteTask(this.taskToBeDeleted)"><span class="text-gray-200 font-bold uppercase text-sm">Delete</span></button>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
  </main>
</template>

<script>
import TaskRoutes from '@/routes/TaskRoutes';

    
    export default {
        name: 'TaskList',
        data: () => ({
            tasks: [],
            completed: false,
            dialog: false,
            deleteDialog: false,
            taskToBeDeleted: '',
            title: ''
        }),
        mounted() {
            this.loadTasks();

        },
        methods: {
           async loadTasks() {
                const response = await TaskRoutes.getTasks()
                console.log(response.data)
                this.tasks = response.data
            },
            async completeTask(id) {
                await TaskRoutes.completeTask(id)

                this.loadTasks()
            },
            openDialog() {
                this.dialog = true; 
            },
            openDeleteDialog(id) {
                this.deleteDialog = true;
                this.taskToBeDeleted = id;
            },
            async addNewTask() {
                this.dialog = false;
                await TaskRoutes.addTask(this.inputText)
                this.inputText = ""
                this.loadTasks()
            },
            async deleteTask(id) {
                this.deleteDialog = false;
                await TaskRoutes.deleteTask(id)
                this.taskToBeDeleted = ''
                this.loadTasks()
            }
        }
        
    }
    
</script>

<style scoped>
  
</style>

