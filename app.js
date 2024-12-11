new Vue({
    el: '#app',
    data: {
        newTask: '',
        newTaskCategory: 'Personīgais',
        tasks: [],
        searchQuery: '',
        filterCategory: '',
        filterStatus: ''
    },
    computed: {
        filteredTasks() {
            return this.tasks.filter(task => {
                return (this.filterCategory === '' || task.category === this.filterCategory) &&
                       (this.filterStatus === '' || task.status === this.filterStatus) &&
                       (this.searchQuery === '' || task.name.includes(this.searchQuery));
            });
        }
    },
    methods: {
        addTask() {
            if (this.newTask.trim() !== '') {
                this.tasks.push({
                    id: Date.now(),
                    name: this.newTask,
                    newName: this.newTask,
                    category: this.newTaskCategory,
                    newCategory: this.newTaskCategory,
                    status: 'Nepabeigts',
                    completed: false,
                    isEditing: false
                });
                this.newTask = '';
                this.newTaskCategory = 'Personīgais';
                this.saveTasks();
            }
        },
        toggleTaskStatus(taskId) {
            const task = this.tasks.find(task => task.id === taskId);
            task.completed = !task.completed;
            task.status = task.completed ? 'Pabeigts' : 'Nepabeigts';
            this.saveTasks();
        },
        markInProgress(taskId) {
            const task = this.tasks.find(task => task.id === taskId);
            task.status = 'Progressā';
            task.completed = false;
            this.saveTasks();
        },
        editTask(taskId) {
            const task = this.tasks.find(task => task.id === taskId);
            task.isEditing = true;
            task.newName = task.name;
            task.newCategory = task.category; 
        },
        saveTask(taskId) {
            const task = this.tasks.find(task => task.id === taskId);
            if (task.newName.trim() !== '') {
                task.name = task.newName;
            }
            task.category = task.newCategory;
            task.isEditing = false;
            this.saveTasks();
        },
        deleteTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        loadTasks() {
            const tasks = localStorage.getItem('tasks');
            if (tasks) {
                this.tasks = JSON.parse(tasks);
            }
        }
    },
    mounted() {
        this.loadTasks();
    }
});